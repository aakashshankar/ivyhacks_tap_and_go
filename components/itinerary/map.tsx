import React from "react";
import MapComponent from "../map";
import type { Itinerary, Coordinates } from "@/lib/types";

type HeaderProps = {
  itin: Itinerary;
};
const Map = ({ itin }: HeaderProps) => {
  const locations = itin.locations.map((i) => i.locationName);
  const coordinates = itin.locations
    .map((i) => i.coordinates.split(",").map((coord) => parseFloat(coord)))
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
