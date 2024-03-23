"use client";

import { useEffect, useRef, useState } from 'react';
import MapGL, { MapRef } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import mapboxgl from 'mapbox-gl';
import MapMarker from './mapmarker';

interface MapProps {
  locations: string[];
  coordinates: number[][];
  routes: any;
}
export default function MapComponent({ locations, coordinates, routes }: MapProps) {
  const [viewState, setViewState] = useState({
    longitude: coordinates[0][0],
    latitude: coordinates[0][1],
    zoom: 10,
  });

  const mapRef = useRef<MapRef>(null);

  useEffect(() => {
    if (mapRef.current) {
      const bounds = new mapboxgl.LngLatBounds();
      coordinates.forEach((coord) => {
        bounds.extend(coord as any);
      });
      mapRef.current.fitBounds(bounds, { padding: 50, duration: 1000 });
    }
  }, [coordinates]);

  return (
    <MapGL
      ref={mapRef}
      {...viewState}
      onMove={(evt) => setViewState(evt.viewState)}
      style={{ width: '100%', height: '400px' }}
      mapStyle="mapbox://styles/mapbox/streets-v11"
      mapboxAccessToken="pk.eyJ1IjoicnBtb24iLCJhIjoiY2x1NDk3ZTBiMTg5OTJxbzZoZ2UycnkwbyJ9.hEboNmvtkFEWh5OAIT2OOw"
    >
      <MapMarker locations={locations} coordinates={coordinates} />
      {/* Render routes */}
    </MapGL>
  );
}
