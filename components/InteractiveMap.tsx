'use client';

import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix para os ícones padrão do Leaflet no Next.js
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Ícone customizado do Cleiton
const cleitonIcon = L.icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/2972/2972185.png',
  iconSize: [36, 36],
  iconAnchor: [18, 18],
  popupAnchor: [0, -10],
});

function RecenterAutomap({ lat, lng }: { lat: number; lng: number }) {
  const map = useMap();
  useEffect(() => {
    map.flyTo([lat, lng], 15, { duration: 1 });
  }, [lat, lng, map]);
  return null;
}

export default function InteractiveMap({ progress }: { progress: number }) {
  // Coordenadas padrão para o mapa carregar de cara (Santos - SP)
  const [userLocation, setUserLocation] = useState<[number, number]>([-23.9608, -46.3339]);

  useEffect(() => {
    // Tenta obter o GPS sem travar a renderização do mapa
    if (typeof window !== 'undefined' && 'geolocation' in navigator) {
      const options = { enableHighAccuracy: false, timeout: 2000, maximumAge: 60000 };
      
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation([latitude, longitude]);
        },
        (err) => {
          console.log('GPS não disponível/desativado. Mantendo localização padrão.');
        },
        options
      );
    }
  }, []);

  // Simulação de movimento do Cleiton
  const startOffset = 0.008;
  const cleitonLat = userLocation[0] + (1 - progress / 100) * startOffset;
  const cleitonLng = userLocation[1] + (1 - progress / 100) * startOffset;

  return (
    <div style={{ width: '100%', height: '100%', minHeight: '256px', position: 'relative' }}>
      <MapContainer
        center={userLocation}
        zoom={15}
        scrollWheelZoom={false}
        style={{ width: '100%', height: '100%', borderRadius: '1rem', zIndex: 0 }}
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
