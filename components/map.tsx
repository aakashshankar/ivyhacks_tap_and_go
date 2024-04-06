"use client";

import { useEffect, useRef, useState } from "react";
import MapGL, { type MapRef } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import mapboxgl from "mapbox-gl";
import MapMarker from "./mapmarker";

interface MapProps {
  locations: string[];
  coordinates: number[][];
  routes: any;
}
export default function MapComponent({
  locations,
  coordinates,
  routes,
}: MapProps) {
  const [viewState, setViewState] = useState({
    longitude: coordinates[0][0],
    latitude: coordinates[0][1],
    zoom: 12,
  });

  const mapRef = useRef<MapRef>(null);

  const fitMapBounds = () => {
    if (mapRef.current && locations.length > 0) {
      const bounds = new mapboxgl.LngLatBounds();
      locations.forEach((_, index) => {
        bounds.extend(coordinates[index] as [number, number]);
      });
      mapRef.current.fitBounds(bounds, { padding: 75, duration: 1000 });
      setViewState({
        ...viewState,
        longitude: bounds.getCenter().lng,
        latitude: bounds.getCenter().lat,
      });
    }
  };

  useEffect(() => {
    fitMapBounds();
  }, [locations]);

  return (
    <MapGL
      ref={mapRef}
      {...viewState}
      onMove={(evt) => setViewState(evt.viewState)}
      style={{ width: "100%", height: "400px" }}
      mapStyle="mapbox://styles/jk2933/clu5m9xg500hp01pabwfocrjz"
      mapboxAccessToken="pk.eyJ1IjoiamsyOTMzIiwiYSI6ImNsdTVtNXBsbDBsMnUybG44OXo0MGx4bWsifQ.NuqAVKMztokOZg2PsZXWEA"
    >
      <MapMarker locations={locations} coordinates={coordinates} />
      {/* Render routes */}
    </MapGL>
  );
}
