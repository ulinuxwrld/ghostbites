'use client';

import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Ícone do Cleiton
const cleitonIcon = L.icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/2972/2972185.png',
  iconSize: [38, 38],
  iconAnchor: [19, 19],
  popupAnchor: [0, -10],
});

// Componente para re-centralizar o mapa
function RecenterAutomap({ lat, lng }: { lat: number; lng: number }) {
  const map = useMap();
  useEffect(() => {
    map.flyTo([lat, lng], 15, { duration: 1 });
  }, [lat, lng, map]);
  return null;
}

export default function InteractiveMap({ progress }: { progress: number }) {
  // Posição base (Santos - SP)
  const [userLocation, setUserLocation] = useState<[number, number]>([-23.9608, -46.3339]);

  useEffect(() => {
    if (typeof window !== 'undefined' && 'geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation([latitude, longitude]);
        },
        () => {
          // Se der erro ou negar, mantém Santos silenciosamente
        },
        { timeout: 3000 }
      );
    }
  }, []);

  // Simulação da posição do Cleiton
  const startOffset = 0.008;
  const cleitonLat = userLocation[0] + (1 - progress / 100) * startOffset;
  const cleitonLng = userLocation[1] + (1 - progress / 100) * startOffset;

  return (
    <div className="w-full h-full min-h-[256px] relative">
      <MapContainer
        center={userLocation}
        zoom={15}
        scrollWheelZoom={false}
        className="w-full h-full rounded-2xl z-0"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <RecenterAutomap lat={userLocation[0]} lng={userLocation[1]} />

        <Marker position={[cleitonLat, cleitonLng]} icon={cleitonIcon}>
          <Popup>
            <span className="font-bold text-xs text-purple-900">Cleiton em Ação 🛵</span>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
