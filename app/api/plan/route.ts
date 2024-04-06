// app/api/generatePlan.ts
"use server";
// import Client from "@anthropic-ai/sdk";
import { NextRequest } from "next/server";
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// const client = new Client({ apiKey: process.env.CLAUDE_API_KEY! });

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
{
  "date": (date in UTC),
  "weatherCode": (code that corresponds to the description)
  "weatherType": (weather description)
}

For each suggested location, include the following:
- location
- time
- budget
- activity
- locationType

Please format the itinerary as follows:
{
  "day_1": [{"location": "location_1", "time": "10AM - 12PM", "budget": "25", "activity": "Look at art", "locationType": "museum" }, {"location": "location_2", "time": "12:30PM - 2PM", "budget": "0", "activity": "Stroll through the park", "locationType": "park" }, {"name": "location_3", "time": "2 - 3PM", "budget": "20", "location": "Eat street food near central park", "locationType": "restaurant" }],
  // ...Continue for each day of the trip
}
In your generated text, only include the JSON object with the suggested activities. Do not include any additional text or formatting.
If there are any undefined or missing data. Please assume something and make sure you always give an output. Do not give anything besides valid output as we defined above.

Let's generate an amazing personalized itinerary that will make the user's trip unforgettable!`;

  const prompt = `Please suggest a travel itinerary for a ${travelStyle} ${budget} trip to ${destination} for ${companion}, from ${startDate} to ${endDate}. The weather at ${destination} is formatted as follows: \n${forecast}. Each day, the user would like to start their activities at ${startTime} and end by ${endTime}.`;

  try {
    // Claude
    // const response = await client.messages.create({
    // OpenAI
    const response = await client.chat.completions.create({
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: prompt },
      ],
      // system: systemPrompt,
      // stop_sequences: ["::"],
      response_format: { type: "json_object" },
      max_tokens: 2500,
      // model: "claude-3-opus-20240229",
      model: "gpt-4-turbo-preview",
    });

    // const itinerary = response.content[0].text.trim();
    const itinerary = response.choices[0].message.content?.trim();
    if (!itinerary) {
      console.error("Failed to generate plan:", response);
      return new Response("Failed to generate plan", { status: 500 });
    }
    console.log("Generated itinerary:", itinerary);
    const locations = JSON.parse(itinerary);

    return Response.json({ locations, itinerary });
  } catch (error) {
    console.error("Error generating plan:", error);
    return new Response("Failed to generate plan", { status: 500 });
  }
}
