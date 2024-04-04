// app/api/weather.ts
import { weatherCodes } from "@/lib/weathercodes";
import { NextRequest, NextResponse } from "next/server";
import { fetchWeatherApi } from "openmeteo";
import { auth } from "@clerk/nextjs";


export async function GET(request: NextRequest) {

}
