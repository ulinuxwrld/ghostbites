import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'GhostBites Delivery',
    short_name: 'GhostBites',
    description: 'Acompanhe suas entregas de comida em tempo real com o Cleiton!',
    start_url: '/',
    display: 'standalone',
    background_color: '#0c051a',
    theme_color: '#0c051a',
    icons: [
      {
        src: 'https://cdn-icons-png.flaticon.com/512/2972/2972185.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: 'https://cdn-icons-png.flaticon.com/512/2972/2972185.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  };
}
