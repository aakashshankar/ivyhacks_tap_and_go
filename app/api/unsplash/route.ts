import { createApi } from "unsplash-js";
import type { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const location = searchParams.get("location");
  const unsplash = createApi({
    accessKey: process.env.UNSPLASH_ACCESS_KEY!,
    // `fetch` options to be sent with every request
    // headers: { "X-Custom-Header": "foo" },
  });

  const photo = await unsplash.photos.getRandom({
    query: location || "",
    count: 1,
  });

  if (!photo.response) {
    return new Response("Failed to get photos", { status: 500 });
  }
  if (Array.isArray(photo.response)) {
    return Response.json({ url: photo.response[0].urls.small });
  }
  return Response.json({ url: photo.response?.urls?.small });
}
