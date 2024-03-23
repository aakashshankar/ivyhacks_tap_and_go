// app/api/generatePlan.ts
import { NextApiRequest, NextApiResponse } from 'next';
import Client from '@anthropic-ai/sdk';

const client = new Client({ apiKey: process.env.CLAUDE_API_KEY! });

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { destination, travelStyle, budget, companion, startDate, endDate } = req.body;

    const systemPrompt = `You are an AI-powered travel assistant that helps users plan their trips by generating personalized itineraries based on their preferences and constraints. Given the user's desired destination, travel style, budget, companion, and travel dates, your task is to suggest a list of recommended locations to visit for the given day of the trip.

When generating the itinerary, consider the following:
- Tailor the suggestions to the specified travel style (e.g., adventurous, relaxing, cultural) and budget (e.g., budget, moderate, luxury).
- Take into account the companion type (e.g., solo, couple, family, friends) and suggest activities and locations suitable for that group.
- Ensure that the itinerary is feasible within the given travel dates and allows for a balanced mix of activities and rest.
- Provide a diverse range of suggestions, including popular attractions, hidden gems, local experiences, and dining options.
- Optimize the route to minimize travel time between locations while maximizing the overall experience.
- Give only 3 suggested locations.

For each suggested location, include only the name of the location.

Please format the itinerary as follows:
{
  "day_1": ["location_1", "location_2", "location_3"],
  "day_2": ["location_1", "location_2", "location_3"],
  // ...Continue for each day of the trip
}

Let's generate an amazing personalized itinerary that will make the user's trip unforgettable!`;

    const prompt = `Please suggest a travel itinerary for a ${travelStyle} ${budget} trip to ${destination} for ${companion}, from ${startDate} to ${endDate}.`;

    try {
      const response = await client.messages.create({
        messages: [
          { role: 'assistant', content: systemPrompt },
          { role: 'user', content: prompt },
        ],
        stop_sequences: ['\n\n'],
        max_tokens: 1000,
        model: 'claude-3-opus-20240229',
      });

      const itinerary = response.content[0].text.trim();
      const locations = JSON.parse(itinerary);

      res.status(200).json({ locations, itinerary });
    } catch (error) {
      console.error('Error generating plan:', error);
      res.status(500).json({ error: 'Failed to generate plan' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}