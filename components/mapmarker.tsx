// app/components/MapMarker.tsx
import { Marker } from 'react-map-gl';

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
          <div className="marker">
            <span className="text-sm font-semibold">{location}</span>
          </div>
        </Marker>
      ))}
    </>
  );
}