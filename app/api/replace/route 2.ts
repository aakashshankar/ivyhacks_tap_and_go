// app/api/updateItinerary.ts
import Client from "@anthropic-ai/sdk";
import { NextRequest } from "next/server";

const client = new Client({ apiKey: process.env.CLAUDE_API_KEY! });

export async function POST(req: NextRequest) {
  const body = await req.json();
  const {
    itinerary,
    day,
    destination,
    travelStyle,
    budget,
    companion,
    startDate,
    endDate,
  } = body;

  const systemPrompt = `
Variables:

{'$ITINERARY', '$DAY', 'day_{$DAY'}

************************

Prompt:
Here is the user's full itinerary:

<itinerary>
{$ITINERARY}
</itinerary>

The user would like to change the locations they visit on day {$DAY}.

First, carefully review the itinerary and extract the relevant information about the user's
preferences, including their travel style, budget, destination, companions, and trip dates.

Next, brainstorm 3 new locations that the user could visit on day {$DAY} that would align well with
their extracted preferences. Consider factors like the type of activities available, cost, proximity
to other places on the itinerary, and overall fit with the user's travel style and interests.

Format your suggested locations in the following JSON format:

{day_{$DAY}: [location_1, location_2, location_3]}

In your generated text, only include the JSON object with the suggested locations. Do not include any additional text or formatting.

Only include 3 suggested locations in your output. Make sure the locations you suggest are feasible
given the user's full itinerary and could realistically be visited on the specified day. Also make sure that the suggested locations are not already included in the user's existing itinerary.
`;

  const prompt = `Itinerary: ${JSON.stringify(itinerary)}\nPlease suggest new locations for day ${day}. Preferences: A ${travelStyle} ${budget} trip to ${destination} for ${companion}, from ${startDate} to ${endDate}.`;

  try {
    const response = await client.messages.create({
      messages: [{ role: "user", content: prompt }],
      system: systemPrompt,
      stop_sequences: ["::"],
      max_tokens: 1000,
      model: "claude-3-opus-20240229",
    });

    // is this correct? What does the original itinerary look like?
    console.log("Updated itinerary:", response.content[0].text.trim());
    const itinerary = JSON.parse(response.content[0].text.trim());
    return Response.json({ itinerary });
  } catch (error) {
    console.error("Error updating itinerary:", error);
    return new Response("Failed to generate itinerary", { status: 500 });
  }
}
