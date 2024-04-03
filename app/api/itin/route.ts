"use server";
import { readFile } from "node:fs/promises";

export async function GET() {
  try {
    const data = await readFile("data/db.json", "utf-8");
    const user = JSON.parse(data);
    return Response.json(user);
  } catch (error) {
    console.error("Error reading db.json:", error);
    return new Response("Failed to read db.json", { status: 500 });
  }
}
