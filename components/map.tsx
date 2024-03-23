"use client";

import { useState } from 'react';
import MapGL, { Marker } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

interface MapProps {
  initialViewState?: {
    longitude: number;
    latitude: number;
    zoom: number;
  };
  onSelectLocation?: (location: { longitude: number; latitude: number }) => void;
}

export default function Map({ initialViewState, onSelectLocation }: MapProps) {
  const [viewState, setViewState] = useState(initialViewState || {
    longitude: -122.4,
    latitude: 37.8,
    zoom: 10,
  });

  const handleMapClick = (event: mapboxgl.MapMouseEvent) => {
    const { lng, lat } = event.lngLat;
    onSelectLocation?.({ longitude: lng, latitude: lat });
  };

  return (
    <MapGL
      {...viewState}
      onMove={evt => setViewState(evt.viewState)}
      style={{ width: '100%', height: '400px' }}
      mapStyle="mapbox://styles/mapbox/streets-v11"
      mapboxAccessToken="pk.eyJ1IjoicnBtb24iLCJhIjoiY2x1NDk3ZTBiMTg5OTJxbzZoZ2UycnkwbyJ9.hEboNmvtkFEWh5OAIT2OOw"
      onClick={handleMapClick}
    >
      {/* Add markers for selected locations */}
    </MapGL>
  );
}