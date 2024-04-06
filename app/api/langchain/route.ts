"use server";
import { ChatOpenAI, OpenAIEmbeddings } from "@langchain/openai";
import {
  ChatPromptTemplate,
  HumanMessagePromptTemplate,
  SystemMessagePromptTemplate,
} from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { MongoDBAtlasVectorSearch } from "@langchain/mongodb";
import { formatDocumentsAsString } from "langchain/util/document";
import {
  RunnablePassthrough,
  RunnableSequence,
} from "@langchain/core/runnables";
import { MongoClient } from "mongodb";
import type { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const {
    destination,
    travelStyle,
    budget,
    companion,
    startDate,
    endDate,
    startTime,
    endTime,
    forecast,
  } = body;

  const systemPrompt = `You are an AI-powered travel assistant that helps users plan their trips by generating personalized itineraries based on their preferences and constraints. Given the user's desired destination, travel style, budget, companion, and travel dates, your task is to suggest a list of recommended locations to visit for the given day of the trip.

When generating the itinerary, consider the following:
- Tailor the suggestions to the specified travel style (e.g., adventurous, relaxing, cultural, foodie) and budget (e.g., budget, moderate, luxury).
- Take into account the companion type (e.g., solo, couple, family, friends) and suggest activities and locations suitable for that group.
- Account for any weather or seasonal constraints that may impact the travel experience.
- Ensure that the itinerary is feasible within the given travel dates and allows for a balanced mix of activities and rest. The endDate is inclusive.
- Provide a diverse range of suggestions, but within the constraints of the travel style.
- Optimize the route to minimize travel time between locations while maximizing the overall experience.
- Give only 3 suggested locations.
- You will be given a startTime and endTime, make sure to suggest activities that fit within that time frame.
- Make sure the activity description is detailed enough. Make it at most 2 sentences long.
- Make sure the location name contains only one location. Do not combine multiple locations into one. Each activity should be at a different location.
- locationType should be something common like "Museum", "Park", "Restaurant", etc.

The weather for the destination on each date (from start to end) is formatted as the following JSON:
{{
  "date": (date in UTC),
  "weatherCode": (code that corresponds to the description)
  "weatherType": (weather description)
}}

For each suggested location, include the following:
- location
- time
- budget
- activity
- locationType

Please format the itinerary as follows:
{{
  "day_1": [{{"location": "location_1", "time": "10AM - 12PM", "budget": "25", "activity": "Look at art", "locationType": "museum" }}, {{"location": "location_2", "time": "12:30PM - 2PM", "budget": "0", "activity": "Stroll through the park", "locationType": "park" }}, {{"name": "location_3", "time": "2 - 3PM", "budget": "20", "location": "Eat street food near central park", "locationType": "restaurant" }}],
  // ...Continue for each day of the trip
}}
In your generated text, only include the JSON object with the suggested activities. Do not include any additional text or formatting.
If there are any undefined or missing data. Please assume something and make sure you always give an output. Do not give anything besides valid output as we defined above.

Answer the user's question based on the following context: {context}.

Let's generate an amazing personalized itinerary that will make the user's trip unforgettable!`;

  const prompt = `Please suggest a travel itinerary for a ${travelStyle} ${budget} trip to ${destination} for ${companion}, from ${startDate} to ${endDate}. The weather at ${destination} is formatted as follows: \n${forecast}. Each day, the user would like to start their activities at ${startTime} and end by ${endTime}.`;

  try {
    // Claude
    // const response = await client.messages.create({
    // OpenAI
    const system = SystemMessagePromptTemplate.fromTemplate(systemPrompt);
    const human = HumanMessagePromptTemplate.fromTemplate("{question}");

    const lcPrompt = ChatPromptTemplate.fromMessages([system, human]);

    const llm = new ChatOpenAI({
      temperature: 0.8,
      maxTokens: 2500,
      modelName: "gpt-4-turbo-preview",
    });

    const mongoClient = await MongoClient.connect(process.env.MONGO_URL!);
    const db = mongoClient.db("rag");
    const collection = db.collection("locations");

    // const embeddings = {};
    const embeddings = new OpenAIEmbeddings({
      openAIApiKey: process.env.OPENAI_API_KEY, // In Node.js defaults to process.env.OPENAI_API_KEY
      batchSize: 512, // Default value if omitted is 512. Max is 2048
      modelName: "text-embedding-3-large",
    });
    const vectorStore = new MongoDBAtlasVectorSearch(embeddings, {
      collection: collection,
    });

    const retriever = vectorStore.asRetriever();

    // @ts-ignore
    const chain = RunnableSequence.from([
      {
        context: retriever.pipe(formatDocumentsAsString),
        question: new RunnablePassthrough(),
      },
      lcPrompt,
      llm,
      new StringOutputParser(),
    ]);

    const answer = await chain.invoke(prompt);

    return Response.json({ locations: JSON.parse(answer) });
  } catch (error) {
    console.error("Error generating plan:", error);
    return new Response("Failed to generate plan", { status: 500 });
  }
}
