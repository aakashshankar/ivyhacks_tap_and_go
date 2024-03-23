<<<<<<< HEAD
"use client";

import { useEffect, useRef, useState } from 'react';
import MapGL, { MapRef } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import mapboxgl from 'mapbox-gl';
import MapMarker from './mapmarker';
=======
// app/components/Map.tsx
import { useState, useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
>>>>>>> 59ab4b5 (includes claude and mapbox stuff)

interface MapProps {
  locations: string[];
  coordinates: number[][];
  routes: any;
}
<<<<<<< HEAD
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
=======

export default function Map({ locations, coordinates, routes }: MapProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    mapboxgl.accessToken = process.env.MAPBOX_ACCESS_TOKEN!;

    if (mapContainerRef.current) {
      mapRef.current = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: coordinates[0],
        zoom: 10,
      });

      const bounds = new mapboxgl.LngLatBounds();

      coordinates.forEach((coord) => {
        new mapboxgl.Marker().setLngLat(coord).addTo(mapRef.current!);
        bounds.extend(coord);
      });

      mapRef.current.fitBounds(bounds, { padding: 50 });

      mapRef.current.on('load', () => {
        mapRef.current!.addSource('route', {
          type: 'geojson',
          data: {
            type: 'Feature',
            properties: {},
            geometry: routes,
          },
        });

        mapRef.current!.addLayer({
          id: 'route',
          type: 'line',
          source: 'route',
          layout: {
            'line-join': 'round',
            'line-cap': 'round',
          },
          paint: {
            'line-color': '#888',
            'line-width': 8,
          },
        });
      });
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
      }
    };
  }, [locations, coordinates, routes]);

  return <div ref={mapContainerRef} style={{ width: '100%', height: '400px' }} />;
>>>>>>> 59ab4b5 (includes claude and mapbox stuff)
}