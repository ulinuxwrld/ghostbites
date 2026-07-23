'use client';

import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';

// Fix dos ícones nativos do Leaflet para o bundler do Next.js
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Ícone customizado da moto do Cleiton
const cleitonIcon = L.icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/2972/2972185.png',
  iconSize: [38, 38],
  iconAnchor: [19, 19],
  popupAnchor: [0, -10],
});

// Componente que força o recalculamento das dimensões do mapa quando a view muda
function MapController({ lat, lng }: { lat: number; lng: number }) {
  const map = useMap();

  useEffect(() => {
    // Redesenha as tiles imediatamente e em intervalos curtos de transição de layout
    map.invalidateSize();
    const t1 = setTimeout(() => map.invalidateSize(), 150);
    const t2 = setTimeout(() => map.invalidateSize(), 400);

    map.flyTo([lat, lng], 15, { duration: 1 });

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [lat, lng, map]);

  return null;
}

export default function InteractiveMap({ progress }: { progress: number }) {
  // Posição padrão em Santos - SP
  const [userLocation, setUserLocation] = useState<[number, number]>([-23.9608, -46.3339]);

  useEffect(() => {
    if (typeof window !== 'undefined' && 'geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation([latitude, longitude]);
        },
        () => {},
        { timeout: 3000 }
      );
    }
  }, []);

  // Movimento progressivo da moto do Cleiton
  const startOffset = 0.008;
  const cleitonLat = userLocation[0] + (1 - progress / 100) * startOffset;
  const cleitonLng = userLocation[1] + (1 - progress / 100) * startOffset;

  return (
    <div className="w-full h-full min-h-[256px] relative">
      {/* Injeção direta da folha de estilo via CDN para evitar bloqueios do PostCSS/Tailwind */}
      <link
        rel="stylesheet"
        href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
        integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
        crossOrigin=""
      />

      <MapContainer
        center={userLocation}
        zoom={15}
        scrollWheelZoom={false}
        style={{ width: '100%', height: '100%', minHeight: '256px', borderRadius: '1rem', zIndex: 1 }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <MapController lat={userLocation[0]} lng={userLocation[1]} />

        <Marker position={[cleitonLat, cleitonLng]} icon={cleitonIcon}>
          <Popup>
            <span className="font-bold text-xs text-purple-900">Cleiton Reflexivo 🛵</span>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
