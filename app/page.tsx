'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { Analytics } from '@vercel/analytics/react';

// Carregamento dinâmico do mapa isolando o SSR para evitar telas pretas/cinzas
const InteractiveMap = dynamic(() => import('@/components/InteractiveMap'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[280px] flex flex-col items-center justify-center bg-purple-950/30 text-purple-300 text-xs animate-pulse rounded-2xl border border-purple-800/40">
      <span className="text-2xl mb-1">🛵</span>
      <span>Localizando moto do Cleiton no GPS...</span>
    </div>
  ),
});

// LISTA COMPLETA E EXPANDIDA DE RESTAURANTES PARCEIROS GHOSTBITES
const RESTAURANTS = [
  {
    id: 'rest-1',
    name: 'Ghost Burger 🍔',
    category: 'Hamburgueria Artesanal',
    rating: '4.9 ★',
    time: '20-30 min',
    deliveryFee: 'R$ 5,90',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&auto=format&fit=crop&q=80',
    menu: [
      { id: 'm1', name: 'Phantom Double Cheese', price: 34.90, desc: 'Dois hambúrgueres de 150g, queijo cheddar artesanal derretido e molho especial.', img: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=400&auto=format&fit=crop&q=80' },
      { id: 'm2', name: 'Batata Ectoplasma', price: 19.90, desc: 'Batatas rústicas crocantes com farofa de bacon e molho verde da casa.', img: 'https://images.unsplash.com/photo-1576107232684-1279f3908594?w=400&auto=format&fit=crop&q=80' },
      { id: 'm3', name: 'Milkshake Espectro OREO', price: 18.00, desc: 'Cremoso, com pedaços de biscoito OREO e calda de chocolate belga.', img: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=400&auto=format&fit=crop&q=80' },
    ]
  },
  {
    id: 'rest-2',
    name: 'Pizza Assombrada 🍕',
    category: 'Pizzaria Napolitana',
    rating: '4.8 ★',
    time: '30-40 min',
    deliveryFee: 'R$ 6,50',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&auto=format&fit=crop&q=80',
    menu: [
      { id: 'm4', name: 'Pizza Calabresa Infernal', price: 49.90, desc: 'Massa fermentada 48h, calabresa fatiada, cebola roxa e pimenta suave.', img: 'https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?w=400&auto=format&fit=crop&q=80' },
      { id: 'm5', name: 'Pizza Quatro Queijos Místicos', price: 54.90, desc: 'Mussarela, gorgonzola, parmesão e catupiry verdadeiro.', img: 'https://images.unsplash.com/photo-1573821663912-569905455b1c?w=400&auto=format&fit=crop&q=80' },
    ]
  },
  {
    id: 'rest-3',
    name: 'Sushimaru Fantasma 🍣',
    category: 'Culinária Japonesa',
    rating: '5.0 ★',
    time: '35-45 min',
    deliveryFee: 'R$ 7,90',
    image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=800&auto=format&fit=crop&q=80',
    menu: [
      { id: 'm6', name: 'Combo Dark Roll (16 pcs)', price: 59.90, desc: 'Hot rolls crocantes com cream cheese, salmão fresco e molho tarê.', img: 'https://images.unsplash.com/photo-1611143669185-af224c5e3252?w=400&auto=format&fit=crop&q=80' },
      { id: 'm7', name: 'Temaki Salmão Especial', price: 28.90, desc: 'Salmão fresco batido com cebolinha e casquinha de nori super crocante.', img: 'https://images.unsplash.com/photo-1553621042-f6e147245754?w=400&auto=format&fit=crop&q=80' },
    ]
  },
  {
    id: 'rest-4',
    name: 'Taco Espiritual 🌮',
    category: 'Comida Mexicana',
    rating: '4.7 ★',
    time: '25-35 min',
    deliveryFee: 'R$ 5,00',
    image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=800&auto=format&fit=crop&q=80',
    menu: [
      { id: 'm8', name: 'Tacos Al Pastor do Além', price: 32.00, desc: '3 tacos de carne suína marinada, abacaxi grelhado e coentro.', img: 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=400&auto=format&fit=crop&q=80' },
      { id: 'm9', name: 'Nachos Supremos com Guacamole', price: 26.50, desc: 'Tortillas crocantes cobertas com queijo derretido, jalapeños e guacamole.', img: 'https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?w=400&auto=format&fit=crop&q=80' }
    ]
  },
  {
    id: 'rest-5',
    name: 'Fogão de Lacerda 🥘',
    category: 'Comida Caseira & Marmitarias',
    rating: '4.9 ★',
    time: '20-30 min',
    deliveryFee: 'Grátis',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&auto=format&fit=crop&q=80',
    menu: [
      { id: 'm10', name: 'Feijoada Completa da Vó', price: 38.90, desc: 'Acompanha couve refogada, farofa de alho, torresmo e laranja.', img: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&auto=format&fit=crop&q=80' },
      { id: 'm11', name: 'Stroganoff de Filé Mignon', price: 35.00, desc: 'Arroz branco soltinho, batata palha caseira bem crocante.', img: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=400&auto=format&fit=crop&q=80' }
    ]
  },
  {
    id: 'rest-6',
    name: 'Doces do Vampiro 🍩',
    category: 'Sobremesas & Confeitaria',
    rating: '4.9 ★',
    time: '15-25 min',
    deliveryFee: 'R$ 4,50',
    image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=800&auto=format&fit=crop&q=80',
    menu: [
      { id: 'm12', name: 'Donut Sangue de Frutas Vermelhas', price: 12.00, desc: 'Massa fofinha com recheio abundante de geleia de morango e cobertura rosa.', img: 'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?w=400&auto=format&fit=crop&q=80' },
      { id: 'm13', name: 'Brownie de Chocolate Amargo 70%', price: 15.50, desc: 'Super denso, servido quente com nozes picadas.', img: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=400&auto=format&fit=crop&q=80' }
    ]
  }
];

// Configuração das Rotas do Cleiton
type RouteOption = {
  id: 'standard' | 'express' | 'peak';
  label: string;
  duration: number;
  price: number;
  badge: string;
  dialogues: string[];
};

const ROUTE_CONFIGS: Record<string, RouteOption> = {
  standard: {
    id: 'standard',
    label: 'Entrega Padrão',
    duration: 30,
    price: 6.00,
    badge: '🚀 Rápida e Segura',
    dialogues: [
      "Cleiton ligou a moto! O motor até roncou forte.",
      "Cleiton pegou a via principal. Tá costurando o trânsito com habilidade!",
      "Cleiton deu uma buzinada amigável na rua. Caminho livre!",
      "Cleiton avistou o seu endereço. Chegando na sua calçada!",
      "Cleiton tá na sua porta! Pega o rango!"
    ]
  },
  express: {
    id: 'express',
    label: 'Entrega Flash Cleiton',
    duration: 15,
    price: 12.00,
    badge: '⚡ Modo Trovão',
    dialogues: [
      "Cleiton ativou o modo turbo! Prepara o prato!",
      "Cleiton cortou caminho por um atalho secreto!",
      "Cleiton acelerou fundo! Lanche vai chegar voando!",
      "Cleiton já virou na sua rua! Escutou a moto?",
      "Chegou em tempo recorde! Cleiton é o mito das entregas!"
    ]
  },
  peak: {
    id: 'peak',
    label: 'Horário de Pico / Chuva',
    duration: 45,
    price: 9.00,
    badge: '🌧️ Trânsito Pesado',
    dialogues: [
      "Cleiton parou no sinal, mas a bag tá aquecida!",
      "Cleiton desviou da poça na manha. Pilotagem classe A!",
      "Trânsito parado, mas Cleiton tá avançando no corredor!",
      "Cleiton saiu do engarrafamento! A reta final é dele!",
      "Desafiou o trânsito e a chuva! Pedido entregue!"
    ]
  }
};

export default function GhostBitesPage() {
  const [selectedRestaurant, setSelectedRestaurant] = useState(RESTAURANTS[0]);
  const [currentView, setCurrentView] = useState<'restaurants' | 'menu' | 'cart' | 'delivery'>('restaurants');
  const [cart, setCart] = useState<{ id: string; name: string; price: number; quantity: number }[]>([]);
  const [selectedRoute, setSelectedRoute] = useState<RouteOption>(ROUTE_CONFIGS.standard);

  // Estados do Rastreio
  const [progress, setProgress] = useState(0);
  const [currentDialogue, setCurrentDialogue] = useState('');
  const [isDelivered, setIsDelivered] = useState(false);

  // Ações do Carrinho
  const addToCart = (item: { id: string; name: string; price: number }) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) => (i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i));
      }
      return [...prev, { id: item.id, name: item.name, price: item.price, quantity: 1 }];
    });
  };

  const removeFromCart = (id: string) => {
    setCart((prev) =>
      prev
        .map((i) => (i.id === id ? { ...i, quantity: i.quantity - 1 } : i))
        .filter((i) => i.quantity > 0)
    );
  };

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const total = subtotal > 0 ? subtotal + selectedRoute.price : 0;
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  const handleStartDelivery = () => {
    if (cart.length === 0) return;
    setProgress(0);
    setIsDelivered(false);
    setCurrentDialogue(selectedRoute.dialogues[0]);
    setCurrentView('delivery');
  };

  useEffect(() => {
    if (currentView !== 'delivery' || isDelivered) return;

    const intervalTime = (selectedRoute.duration * 1000) / 100;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setIsDelivered(true);
          setCurrentDialogue(selectedRoute.dialogues[4]);
          return 100;
        }

        const nextProgress = prev + 1;
        if (nextProgress === 25) setCurrentDialogue(selectedRoute.dialogues[1]);
        if (nextProgress === 50) setCurrentDialogue(selectedRoute.dialogues[2]);
        if (nextProgress === 75) setCurrentDialogue(selectedRoute.dialogues[3]);

        return nextProgress;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, [currentView, selectedRoute, isDelivered]);

  return (
    <main className="min-h-screen bg-[#090415] text-purple-100 font-sans pb-20 select-none">
      <Analytics />

      {/* HEADER DA APLICAÇÃO */}
      <header className="sticky top-0 z-50 bg-[#090415]/90 backdrop-blur-md border-b border-purple-900/40 px-6 py-4 flex justify-between items-center shadow-xl shadow-purple-950/60">
        <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => setCurrentView('restaurants')}>
          <span className="text-3xl">👻</span>
          <div>
            <h1 className="text-xl font-black tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-fuchsia-300 to-indigo-300">
              GhostBites
            </h1>
            <p className="text-[10px] text-purple-400 font-medium tracking-wide">Delivery Assustadoramente Rápido</p>
          </div>
        </div>

        {currentView !== 'delivery' && (
          <button
            onClick={() => setCurrentView(currentView === 'cart' ? 'restaurants' : 'cart')}
            className="relative bg-gradient-to-r from-purple-900/80 to-indigo-900/80 hover:border-fuchsia-500/60 border border-purple-700/50 px-4 py-2 rounded-full text-xs font-bold flex items-center gap-2 transition-all active:scale-95 shadow-md shadow-purple-950"
          >
            <span>🛒 Carrinho</span>
            {totalItems > 0 && (
              <span className="bg-fuchsia-500 text-white font-black px-2 py-0.5 rounded-full text-[10px] shadow-sm">
                {totalItems}
              </span>
            )}
          </button>
        )}
      </header>

      {/* CONTEÚDO PRINCIPAL COM CONTAINER AMPLO */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-6">

        {/* TELA 1: GRADE RESPONSIVA DE RESTAURANTES (CARDS COM BANNERS GRANDES) */}
        {currentView === 'restaurants' && (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-purple-900/50 via-fuchsia-900/30 to-indigo-900/40 p-6 rounded-3xl border border-purple-800/50 shadow-xl">
              <h2 className="text-xl sm:text-2xl font-black text-purple-100">Restaurantes na sua Região 🍽️</h2>
              <p className="text-xs sm:text-sm text-purple-300/80 mt-1">Selecione seu restaurante favorito e faça o pedido com o Cleiton.</p>
            </div>

            {/* GRADE MULTICOLUNA (1 col no celular, 2 no tablet, 3 no PC) */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {RESTAURANTS.map((rest) => (
                <div
                  key={rest.id}
                  onClick={() => {
                    setSelectedRestaurant(rest);
                    setCurrentView('menu');
                  }}
                  className="bg-purple-950/40 border border-purple-900/50 rounded-3xl overflow-hidden hover:border-fuchsia-500/80 hover:shadow-2xl hover:shadow-purple-950/80 transition-all duration-300 cursor-pointer group flex flex-col justify-between"
                >
                  <div>
                    {/* BANNER GRANDE DO RESTAURANTE */}
                    <div className="h-44 w-full relative overflow-hidden bg-purple-900/20">
                      <img
                        src={rest.image}
                        alt={rest.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-3 right-3 bg-black/80 backdrop-blur-md px-3 py-1 rounded-full text-xs font-black text-amber-300 border border-amber-500/40 shadow-lg">
                        {rest.rating}
                      </div>
                      <div className="absolute bottom-3 left-3 bg-purple-950/80 backdrop-blur-md px-2.5 py-1 rounded-lg text-[10px] font-bold text-purple-200 border border-purple-700/50">
                        🛵 Taxa: {rest.deliveryFee}
                      </div>
                    </div>

                    <div className="p-4">
                      <h3 className="font-black text-base text-purple-100 group-hover:text-fuchsia-300 transition-colors">
                        {rest.name}
                      </h3>
                      <p className="text-xs text-purple-300/70 mt-1">{rest.category}</p>
                    </div>
                  </div>

                  <div className="px-4 pb-4 flex justify-between items-center text-xs border-t border-purple-900/30 pt-3 mt-2">
                    <span className="font-medium text-purple-300/80">Tempo médio</span>
                    <span className="font-bold text-fuchsia-400 bg-purple-900/50 px-2.5 py-1 rounded-md border border-purple-800/40">
                      ⏱️ {rest.time}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TELA 2: CARDÁPIO DO RESTAURANTE */}
        {currentView === 'menu' && (
          <div className="space-y-6">
            <button
              onClick={() => setCurrentView('restaurants')}
              className="text-xs font-bold text-purple-400 hover:text-purple-300 flex items-center gap-1.5 bg-purple-950/40 px-3 py-1.5 rounded-lg border border-purple-800/40 w-fit"
            >
              ← Voltar para todos os restaurantes
            </button>

            {/* BANNER DO RESTAURANTE ATIVO */}
            <div className="bg-purple-950/60 border border-purple-800/50 rounded-3xl p-5 flex flex-col sm:flex-row items-center gap-5 shadow-xl">
              <img
                src={selectedRestaurant.image}
                alt={selectedRestaurant.name}
                className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-cover border-2 border-purple-700/50 shadow-md"
              />
              <div className="text-center sm:text-left">
                <h2 className="text-xl font-black text-purple-100">{selectedRestaurant.name}</h2>
                <p className="text-xs text-purple-300/80 mt-1">{selectedRestaurant.category} • {selectedRestaurant.rating}</p>
                <div className="flex gap-2 mt-3 justify-center sm:justify-start text-xs">
                  <span className="bg-purple-900/60 border border-purple-800/50 px-2.5 py-1 rounded-lg text-purple-300">
                    ⏱️ {selectedRestaurant.time}
                  </span>
                  <span className="bg-purple-900/60 border border-purple-800/50 px-2.5 py-1 rounded-lg text-purple-300">
                    🛵 Entrega: {selectedRestaurant.deliveryFee}
                  </span>
                </div>
              </div>
            </div>

            {/* ITENS DO CARDÁPIO */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {selectedRestaurant.menu.map((item) => (
                <div
                  key={item.id}
                  className="bg-purple-950/40 border border-purple-900/40 rounded-2xl p-4 flex gap-4 items-center hover:border-purple-700/60 transition-all shadow-md"
                >
                  <img
                    src={item.img}
                    alt={item.name}
                    className="w-24 h-24 rounded-xl object-cover flex-shrink-0 border border-purple-800/30"
                  />
                  <div className="flex-1 min-w-0 flex flex-col justify-between h-full">
                    <div>
                      <h3 className="font-bold text-sm text-purple-100 truncate">{item.name}</h3>
                      <p className="text-[11px] text-purple-300/60 mt-1 line-clamp-2">{item.desc}</p>
                    </div>
                    <div className="flex justify-between items-center mt-3">
                      <span className="text-sm font-black text-fuchsia-400">
                        R$ {item.price.toFixed(2).replace('.', ',')}
                      </span>
                      <button
                        onClick={() => addToCart(item)}
                        className="bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:from-purple-500 hover:to-fuchsia-500 text-white font-bold text-xs px-3 py-1.5 rounded-xl active:scale-95 transition-all shadow-md shadow-purple-950"
                      >
                        + Adicionar
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {cart.length > 0 && (
              <div className="fixed bottom-4 left-4 right-4 max-w-md mx-auto z-40">
                <button
                  onClick={() => setCurrentView('cart')}
                  className="w-full bg-gradient-to-r from-fuchsia-600 to-purple-600 text-white font-black py-3.5 px-5 rounded-2xl shadow-2xl shadow-fuchsia-950 flex justify-between items-center active:scale-[0.98] transition-all border border-fuchsia-400/40"
                >
                  <span className="text-xs bg-black/40 px-3 py-1 rounded-lg">
                    {totalItems} {totalItems === 1 ? 'item' : 'itens'}
                  </span>
                  <span className="text-sm font-black tracking-wide">Acessar Carrinho</span>
                  <span className="text-xs bg-black/40 px-3 py-1 rounded-lg">
                    R$ {subtotal.toFixed(2).replace('.', ',')}
                  </span>
                </button>
              </div>
            )}
          </div>
        )}

        {/* TELA 3: CARRINHO E ROTAS DO CLEITON */}
        {currentView === 'cart' && (
          <div className="max-w-xl mx-auto space-y-5">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-black text-purple-200">Seu Carrinho 🛒</h2>
              <button
                onClick={() => setCurrentView('menu')}
                className="text-xs text-purple-400 hover:text-purple-300 underline"
              >
                + Adicionar mais itens
              </button>
            </div>

            {cart.length === 0 ? (
              <div className="text-center py-12 bg-purple-950/20 rounded-3xl border border-purple-900/30">
                <span className="text-4xl">👻</span>
                <p className="text-xs text-purple-300/70 mt-2">Nenhum rango selecionado ainda.</p>
                <button
                  onClick={() => setCurrentView('restaurants')}
                  className="mt-4 bg-purple-800/60 text-xs font-bold px-4 py-2 rounded-xl"
                >
                  Ver Restaurantes
                </button>
              </div>
            ) : (
              <>
                <div className="bg-purple-950/40 border border-purple-900/40 rounded-2xl p-4 divide-y divide-purple-900/30">
                  {cart.map((item) => (
                    <div key={item.id} className="py-2.5 first:pt-0 last:pb-0 flex justify-between items-center">
                      <div>
                        <h4 className="font-bold text-xs text-purple-100">{item.name}</h4>
                        <span className="text-[11px] text-purple-400">
                          R$ {item.price.toFixed(2).replace('.', ',')} cada
                        </span>
                      </div>
                      <div className="flex items-center gap-2 bg-purple-900/50 p-1 rounded-xl border border-purple-800/40">
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="w-6 h-6 flex items-center justify-center font-bold text-xs bg-purple-950 rounded-lg hover:bg-purple-900"
                        >
                          -
                        </button>
                        <span className="text-xs font-bold px-1">{item.quantity}</span>
                        <button
                          onClick={() => addToCart(item)}
                          className="w-6 h-6 flex items-center justify-center font-bold text-xs bg-purple-950 rounded-lg hover:bg-purple-900"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* MODOS DE ENTREGA DO CLEITON */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-purple-300 block">
                    Modo de Entrega do Cleiton 🛵:
                  </label>
                  <div className="grid gap-2.5">
                    {Object.values(ROUTE_CONFIGS).map((route) => (
                      <div
                        key={route.id}
                        onClick={() => setSelectedRoute(route)}
                        className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex justify-between items-center ${
                          selectedRoute.id === route.id
                            ? 'bg-purple-900/70 border-fuchsia-500 shadow-lg shadow-fuchsia-950/50'
                            : 'bg-purple-950/30 border-purple-900/40 opacity-70 hover:opacity-100'
                        }`}
                      >
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-xs text-purple-100">{route.label}</span>
                            <span className="text-[9px] bg-purple-950 px-2 py-0.5 rounded text-purple-300 border border-purple-800/50">
                              {route.badge}
                            </span>
                          </div>
                          <span className="text-[10px] text-purple-400 mt-0.5 block">
                            Simulação rápida: ~{route.duration}s
                          </span>
                        </div>
                        <span className="font-black text-xs text-fuchsia-400">
                          R$ {route.price.toFixed(2).replace('.', ',')}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* DETALHES DE PREÇO */}
                <div className="bg-purple-950/60 border border-purple-800/50 rounded-2xl p-4 space-y-2 text-xs">
                  <div className="flex justify-between text-purple-300">
                    <span>Subtotal do Pedido:</span>
                    <span>R$ {subtotal.toFixed(2).replace('.', ',')}</span>
                  </div>
                  <div className="flex justify-between text-purple-300">
                    <span>Taxa de Entrega ({selectedRoute.label}):</span>
                    <span>R$ {selectedRoute.price.toFixed(2).replace('.', ',')}</span>
                  </div>
                  <div className="border-t border-purple-800/40 pt-2 flex justify-between font-black text-xs text-purple-100">
                    <span>Total a Pagar:</span>
                    <span className="text-fuchsia-400 text-sm">R$ {total.toFixed(2).replace('.', ',')}</span>
                  </div>
                </div>

                <button
                  onClick={handleStartDelivery}
                  className="w-full bg-gradient-to-r from-fuchsia-600 via-purple-600 to-indigo-600 hover:opacity-95 text-white font-black py-3.5 rounded-2xl shadow-xl shadow-fuchsia-950 active:scale-[0.98] transition-all text-xs"
                >
                  Confirmar e Chamar o Cleiton 🛵
                </button>
              </>
            )}
          </div>
        )}

        {/* TELA 4: RASTREIO E MAPA AO VIVO DO CLEITON */}
        {currentView === 'delivery' && (
          <div className="max-w-2xl mx-auto space-y-5">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-lg font-black text-purple-200">Rastreio do Cleiton 🛵</h2>
                <p className="text-xs text-purple-400">{selectedRoute.label} • {selectedRoute.badge}</p>
              </div>
              <span className={`text-xs font-bold px-3 py-1 rounded-full border ${
                isDelivered
                  ? 'bg-emerald-950/80 border-emerald-600 text-emerald-300'
                  : 'bg-fuchsia-950/80 border-fuchsia-600 text-fuchsia-300 animate-pulse'
              }`}>
                {isDelivered ? 'Entregue! 🎉' : `${progress}%`}
              </span>
            </div>

            {/* MAPA INTERATIVO */}
            <div className="w-full h-[280px] rounded-3xl overflow-hidden border border-purple-800/50 shadow-2xl shadow-purple-950 relative bg-[#090415]">
              <InteractiveMap progress={progress} />
            </div>

            {/* PROGRESSO E RADIOCONVERSA */}
            <div className="bg-purple-950/40 border border-purple-900/40 rounded-3xl p-4 space-y-4">
              <div className="w-full bg-purple-950 rounded-full h-3 overflow-hidden border border-purple-800/50 p-0.5">
                <div
                  className="bg-gradient-to-r from-purple-500 to-fuchsia-500 h-full rounded-full transition-all duration-300 ease-linear shadow-sm"
                  style={{ width: `${progress}%` }}
                />
              </div>

              <div className="bg-purple-900/40 border border-purple-800/40 rounded-2xl p-3.5 flex items-start gap-3">
                <span className="text-2xl">💬</span>
                <div>
                  <span className="text-[9px] font-bold text-purple-400 block uppercase tracking-wider">
                    Rádio do Cleiton
                  </span>
                  <p className="text-xs text-purple-100 font-medium italic mt-0.5">
                    "{currentDialogue}"
                  </p>
                </div>
              </div>
            </div>

            {isDelivered && (
              <div className="bg-emerald-950/40 border border-emerald-800/50 p-5 rounded-3xl text-center space-y-3">
                <span className="text-3xl block">🎉🍔</span>
                <h3 className="font-bold text-sm text-emerald-200">Pedido Entregue com Sucesso!</h3>
                <p className="text-xs text-emerald-300/80">Bom apetite! O Cleiton já está pronto para a próxima missão.</p>
                <button
                  onClick={() => {
                    setCart([]);
                    setCurrentView('restaurants');
                  }}
                  className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold px-5 py-2.5 rounded-xl transition-all shadow-lg active:scale-95"
                >
                  Fazer Novo Pedido
                </button>
              </div>
            )}
          </div>
        )}

      </div>
    </main>
  );
}
