// app/components/MapMarker.tsx
import { Marker } from "react-map-gl";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface MapMarkerProps {
  locations: string[];
  coordinates: number[][];
}

export default function MapMarker({ locations, coordinates }: MapMarkerProps) {
  return (
    <>
      {locations.map((location, index) => (
        <Marker
          key={location}
          longitude={coordinates[index][0]}
          latitude={coordinates[index][1]}
          anchor="bottom"
        >
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex justify-center items-center w-10 h-10 rounded-full bg-white border-2 border-black shadow-md cursor-pointer transition duration-200 ease-in-out transform hover:scale-110">
                  <div className="flex justify-center items-center w-8 h-8 rounded-full bg-black text-white font-bold text-base">
                    {index + 1}
                  </div>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <h3 className="m-0 text-base font-bold">{location}</h3>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </Marker>
      ))}
    </>
  );
}
