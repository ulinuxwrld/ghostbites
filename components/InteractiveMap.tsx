'use client';

import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

interface InteractiveMapProps {
  progress: number;
}

export default function InteractiveMap({ progress }: InteractiveMapProps) {
  const mapRef = useRef<L.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const markerRef = useRef<L.Marker | null>(null);

  // Coordenadas base (Santos / SP)
  const START_LAT = -23.9631;
  const START_LNG = -46.3323;

  // Rota zigue-zagueante com curvas suaves
  const ZIG_ZAG_WAYPOINTS: [number, number][] = [
    [START_LAT, START_LNG],
    [START_LAT + 0.003, START_LNG - 0.002],
    [START_LAT + 0.004, START_LNG + 0.003],
    [START_LAT + 0.001, START_LNG + 0.005],
    [START_LAT + 0.006, START_LNG + 0.008],
    [START_LAT + 0.003, START_LNG + 0.011],
    [START_LAT + 0.008, START_LNG + 0.013],
    [START_LAT + 0.007, START_LNG + 0.017],
    [START_LAT + 0.010, START_LNG + 0.020],
  ];

  const getInterpolatedPosition = (prog: number): [number, number] => {
    const totalSegments = ZIG_ZAG_WAYPOINTS.length - 1;
    const factor = (prog / 100) * totalSegments;
    const index = Math.floor(factor);
    const segmentProgress = factor - index;

    if (index >= totalSegments) return ZIG_ZAG_WAYPOINTS[totalSegments];

    const [lat1, lng1] = ZIG_ZAG_WAYPOINTS[index];
    const [lat2, lng2] = ZIG_ZAG_WAYPOINTS[index + 1];

    const currentLat = lat1 + (lat2 - lat1) * segmentProgress;
    const currentLng = lng1 + (lng2 - lng1) * segmentProgress;

    return [currentLat, currentLng];
  };

  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapRef.current) {
      const map = L.map(mapContainerRef.current, {
        zoomControl: false,
        attributionControl: false,
      }).setView([START_LAT + 0.005, START_LNG + 0.008], 14);

      L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        maxZoom: 19,
      }).addTo(map);

      const polyline = L.polyline(ZIG_ZAG_WAYPOINTS, {
        color: '#c084fc',
        weight: 4,
        opacity: 0.9,
        dashArray: '6, 6',
      }).addTo(map);

      const cleitonIcon = L.divIcon({
        className: 'custom-cleiton-icon',
        html: `<div style="
          font-size: 22px; 
          background: #130a2a; 
          border: 2px solid #c084fc; 
          border-radius: 50%; 
          width: 40px; 
          height: 40px; 
          display: flex; 
          align-items: center; 
          justify-content: center; 
          box-shadow: 0 0 12px #a855f7;
        ">🛵</div>`,
        iconSize: [40, 40],
        iconAnchor: [20, 20],
      });

      const storeIcon = L.divIcon({
        className: 'custom-store-icon',
        html: `<div style="font-size: 16px; background: #090415; border: 1px solid #7e22ce; border-radius: 10px; padding: 4px; box-shadow: 0 0 8px rgba(168,85,247,0.5);">🏪</div>`,
        iconSize: [28, 28],
        iconAnchor: [14, 14],
      });

      const homeIcon = L.divIcon({
        className: 'custom-home-icon',
        html: `<div style="font-size: 16px; background: #090415; border: 1px solid #10b981; border-radius: 10px; padding: 4px; box-shadow: 0 0 8px rgba(16,185,129,0.5);">📍</div>`,
        iconSize: [28, 28],
        iconAnchor: [14, 14],
      });

      L.marker(ZIG_ZAG_WAYPOINTS[0], { icon: storeIcon }).addTo(map);
      L.marker(ZIG_ZAG_WAYPOINTS[ZIG_ZAG_WAYPOINTS.length - 1], { icon: homeIcon }).addTo(map);

      const marker = L.marker(ZIG_ZAG_WAYPOINTS[0], { icon: cleitonIcon }).addTo(map);
      markerRef.current = marker;

      map.fitBounds(polyline.getBounds(), { padding: [25, 25] });

      mapRef.current = map;

      // Recalibra o canvas do Leaflet após a montagem do container
      setTimeout(() => {
        map.invalidateSize();
      }, 200);
    }
  }, []);

  useEffect(() => {
    if (markerRef.current && mapRef.current) {
      const newPos = getInterpolatedPosition(progress);
      markerRef.current.setLatLng(newPos);
      mapRef.current.panTo(newPos, { animate: true, duration: 1 });
      mapRef.current.invalidateSize();
    }
  }, [progress]);

  return <div ref={mapContainerRef} className="w-full h-full rounded-2xl z-10" style={{ minHeight: '260px' }} />;
}
