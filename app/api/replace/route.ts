// app/api/updateItinerary.ts
import Client from "@anthropic-ai/sdk";
import { NextRequest } from "next/server";

const client = new Client({ apiKey: process.env.CLAUDE_API_KEY! });

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { itinerary, day } =
    body;

  const systemPrompt = `Here is the current itinerary in JSON format:
  ${itinerary}
  I would like you to modify the activities for the following day: ${day}
  
  Please follow these steps:
  1. Parse the itinerary JSON and find the array of activities for ${day}.
  2. Brainstorm a new set of activities for that day. The new activities should be different than the
  existing ones and should not overlap with activities already planned for other days in the
  itinerary.
  3. Remove the old activities for ${day} and replace them with your new suggested activities.
  
  In your generated text, only include the JSON object. Do not include any additional text or formatting.
`;

  const prompt = `Output the updated complete itinerary in the original JSON format.`;

  try {
    const response = await client.messages.create({
      messages: [{ role: "user", content: prompt }],
      system: systemPrompt,
      stop_sequences: ["::"],
      max_tokens: 1000,
      model: "claude-3-opus-20240229",
    });
    
    
    // is this correct? What does the original itinerary look like?
    const itinerary = JSON.parse(response.content[0].text.trim());
    console.log("Updated itinerary:", itinerary);
    return Response.json({ itinerary });
  } catch (error) {
    console.error("Error updating itinerary:", error);
    return new Response("Failed to generate itinerary", { status: 500 });
  }
}
