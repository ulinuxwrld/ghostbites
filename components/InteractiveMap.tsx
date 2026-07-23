'use client';

import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Ícone customizado da moto do Cleiton
const cleitonIcon = L.icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/2972/2972185.png',
  iconSize: [38, 38],
  iconAnchor: [19, 19],
  popupAnchor: [0, -10],
});

// Componente auxiliar para centralizar o mapa na localização do usuário
function RecenterAutomap({ lat, lng }: { lat: number; lng: number }) {
  const map = useMap();
  useEffect(() => {
    map.flyTo([lat, lng], 15, { duration: 1.5 });
  }, [lat, lng, map]);
  return null;
}

export default function InteractiveMap({ progress }: { progress: number }) {
  // Posição inicial padrão (Santos - SP) como reserva/fallback
  const [userLocation, setUserLocation] = useState<[number, number]>([-23.9608, -46.3339]);
  const [geoError, setGeoError] = useState<string | null>(null);

  useEffect(() => {
    // Tenta capturar a localização real do dispositivo do testador
    if (typeof window !== 'undefined' && 'geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation([latitude, longitude]);
        },
        (error) => {
          console.warn('Geolocalização não autorizada ou indisponível:', error.message);
          setGeoError('GPS não detectado. Exibindo rota demonstrativa.');
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0,
        }
      );
    }
  }, []);

  // Simulação: Cleiton começa a ~800m de distância do usuário e vai se aproximando
  const startOffset = 0.008;
  const cleitonLat = userLocation[0] + (1 - progress / 100) * startOffset;
  const cleitonLng = userLocation[1] + (1 - progress / 100) * startOffset;

  return (
    <div className="relative w-full h-full">
      {geoError && (
        <div className="absolute top-2 left-2 right-2 z-[1000] bg-amber-950/90 border border-amber-700/60 text-amber-200 text-[10px] px-2.5 py-1 rounded-lg text-center backdrop-blur-md">
          ⚠️ {geoError}
        </div>
      )}

      <MapContainer
        center={userLocation}
        zoom={15}
        scrollWheelZoom={false}
        className="w-full h-full z-0 rounded-2xl"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <RecenterAutomap lat={userLocation[0]} lng={userLocation[1]} />

        {/* Marcador da Moto do Cleiton */}
        <Marker position={[cleitonLat, cleitonLng]} icon={cleitonIcon}>
          <Popup>
            <span className="font-bold text-xs">Cleiton em Ação 🛵</span>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
