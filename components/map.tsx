// app/components/Map.tsx
import { useState, useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';

interface MapProps {
  locations: string[];
  coordinates: number[][];
  routes: any;
}

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
}