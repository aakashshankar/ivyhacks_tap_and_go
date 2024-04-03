import React from "react";
import MapComponent from "../map";
import { Itinerary, Coordinates } from "@/lib/types";

type HeaderProps = {
  itin: Itinerary[];
};
const Map = ({ itin }: HeaderProps) => {
  const locations = itin.map((i) => i.location);
  const coordinates = itin
    .map((i) => i.coordinates)
    .filter((i) => i !== undefined) as Coordinates[];

  return (
    <div className="border w-full bg-white">
      <MapComponent
        locations={locations}
        coordinates={coordinates || []}
        routes={{}}
      />
    </div>
  );
};

export default Map;
