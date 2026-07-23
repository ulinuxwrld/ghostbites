import type { Metadata, Viewport } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';
import { Analytics } from '@vercel/analytics/react';
import './globals.css';

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-jakarta',
});

// Configuração da cor da barra de status no navegador/celular
export const viewport: Viewport = {
  themeColor: '#090415',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

// Metadados do App e PWA
export const metadata: Metadata = {
  title: 'GhostBites - Delivery da Mente',
  description: 'Simulador de delivery para controle de ansiedade e economia.',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'GhostBites',
  },
  formatDetection: {
    telephone: false,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={jakarta.variable}>
      <body className="font-sans bg-[#090415] text-purple-50 antialiased selection:bg-purple-500 selection:text-white">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
