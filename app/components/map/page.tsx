"use client";

import React, { useEffect, useRef, useState } from "react";
import mapboxgl, { type Map } from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

mapboxgl.accessToken = process.env.MAPBOX_ACCESS_TOKEN!;

const MapComponent = () => {
  const mapContainerRef = useRef(null);
  const [map, setMap] = useState<Map>(null!);

  useEffect(() => {
    const initializeMap = () => {
      const map = new mapboxgl.Map({
        container: mapContainerRef.current!,
        style: "mapbox://styles/mapbox/streets-v12",
        center: [-73.985664, 40.748817], // NYC coordinates
        zoom: 9,
      });

      setMap(map!);
    };

    if (!map) initializeMap();
  }, [map]);

  useEffect(() => {
    return () => {
      if (map) map.remove();
    };
  }, [map]);

  return <div ref={mapContainerRef} style={{ height: "500px" }} />;
};

export default MapComponent;
