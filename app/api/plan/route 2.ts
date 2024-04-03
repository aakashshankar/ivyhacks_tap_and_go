// app/api/generatePlan.ts
import Client from "@anthropic-ai/sdk";
import { NextRequest } from "next/server";

const client = new Client({ apiKey: process.env.CLAUDE_API_KEY! });

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { destination, travelStyle, budget, companion, startDate, endDate, weather } =
    body;

  const systemPrompt = `You are an AI-powered travel assistant that helps users plan their trips by generating personalized itineraries based on their preferences and constraints. Given the user's desired destination, travel style, budget, companion, and travel dates, your task is to suggest a list of recommended locations to visit for the given day of the trip.

When generating the itinerary, consider the following:
- Tailor the suggestions to the specified travel style (e.g., adventurous, relaxing, cultural) and budget (e.g., budget, moderate, luxury).
- Take into account the companion type (e.g., solo, couple, family, friends) and suggest activities and locations suitable for that group.
- Account for any weather or seasonal constraints that may impact the travel experience.
- Ensure that the itinerary is feasible within the given travel dates and allows for a balanced mix of activities and rest.
- Provide a diverse range of suggestions, including popular attractions, hidden gems, local experiences, and dining options.
- Optimize the route to minimize travel time between locations while maximizing the overall experience.
- Give only 3 suggested locations.

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

Please format the itinerary as follows:
{
  "day_1": [{"location": "location_1", "time": "10AM - 12PM", "budget": "Around 25$ per person", "activity": "Look at art"}, {"location": "location_2", "time": "12:30PM - 2PM", "budget": "Free", "activity": "Stroll through the park"}, {"name": "location_3", "time": "2 - 3PM", "budget": "10$-20$ per person", "location": "Eat street food near central park"}],
  // ...Continue for each day of the trip
}
In your generated text, only include the JSON object with the suggested activities. Do not include any additional text or formatting.

Let's generate an amazing personalized itinerary that will make the user's trip unforgettable!`;

  const prompt = `Please suggest a travel itinerary for a ${travelStyle} ${budget} trip to ${destination} for ${companion}, from ${startDate} to ${endDate}. The weather at ${destination} is formatted as follows: \n${weather}.`;

  try {
    const response = await client.messages.create({
      messages: [{ role: "user", content: prompt }],
      system: systemPrompt,
      stop_sequences: ["::"],
      max_tokens: 1000,
      model: "claude-3-opus-20240229",
    });

    const itinerary = response.content[0].text.trim();
    console.log("Generated itinerary:", itinerary);
    const locations = JSON.parse(itinerary);

    return Response.json({ locations, itinerary });
  } catch (error) {
    console.error("Error generating plan:", error);
    return new Response("Failed to generate plan", { status: 500 });
  }
}
