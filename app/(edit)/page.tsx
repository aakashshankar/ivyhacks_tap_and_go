// app/planner/[id]/edit/page.tsx
import fs from "fs/promises";
import path from "path";
import { notFound } from "next/navigation";
import EditForm from "./component";
import { Itinerary } from "../../lib/types";

export type Trip = {
  id: string;
  destination: string;
  travelStyle: string;
  budget: string;
  companion: string[];
  startDate: string;
  endDate: string;
  locations: { [key: string]: Itinerary[] };
  coordinates: { [key: string]: number[][] };
  routes: { [key: string]: any };
};

export default async function EditTripPage() {
  try {
    const jsonDirectory = path.join(process.cwd(), "data");
    const fileContents = await fs.readFile(
      path.join(jsonDirectory, `db.json`),
      "utf8"
    );
    const tripData: Trip = JSON.parse(fileContents);

    if (!tripData) {
      notFound();
    }

    return <EditForm tripData={tripData} />;
  } catch (error) {
    console.error("Error fetching trip data:", error);
    notFound();
  }
}
