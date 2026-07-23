'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { Analytics } from '@vercel/analytics/react';

// Carregamento dinâmico do mapa sem SSR (Server-Side Rendering)
const InteractiveMap = dynamic(() => import('@/components/InteractiveMap'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full min-h-[260px] flex flex-col items-center justify-center bg-purple-950/30 text-purple-300 text-xs animate-pulse rounded-2xl border border-purple-800/40">
      <span className="text-2xl mb-1">🛵</span>
      <span>Localizando moto do Cleiton no GPS...</span>
    </div>
  ),
});

// Dados dos Restaurantes Parceiros GhostBites
const RESTAURANTS = [
  {
    id: 'rest-1',
    name: 'Ghost Burger 🍔',
    category: 'Hamburgueria Artesanal',
    rating: '4.9 ★',
    time: '25-35 min',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&auto=format&fit=crop&q=80',
    menu: [
      { id: 'm1', name: 'Phantom Double Cheese', price: 34.90, desc: 'Dois hambúrgueres 150g, queijo cheddar artesanal derretido e molho especial.', img: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=300&auto=format&fit=crop&q=80' },
      { id: 'm2', name: 'Batata Ectoplasma', price: 19.90, desc: 'Batatas rústicas crocantes com farofa de bacon e molho verde secreto.', img: 'https://images.unsplash.com/photo-1576107232684-1279f3908594?w=300&auto=format&fit=crop&q=80' },
      { id: 'm3', name: 'Milkshake Espectro OREO', price: 18.00, desc: 'Cremoso, com pedaços de biscoito e calda de chocolate belga.', img: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=300&auto=format&fit=crop&q=80' },
    ]
  },
  {
    id: 'rest-2',
    name: 'Pizza Assombrada 🍕',
    category: 'Pizzaria Napolitana',
    rating: '4.8 ★',
    time: '30-40 min',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&auto=format&fit=crop&q=80',
    menu: [
      { id: 'm4', name: 'Pizza Calabresa Infernal', price: 49.90, desc: 'Massa fermentada 48h, calabresa fatiada, cebola roxa e pimenta suave.', img: 'https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?w=300&auto=format&fit=crop&q=80' },
      { id: 'm5', name: 'Pizza Quatro Queijos Místicos', price: 54.90, desc: 'Mussarela, gorgonzola, parmesão e catupiry verdadeiro.', img: 'https://images.unsplash.com/photo-1573821663912-569905455b1c?w=300&auto=format&fit=crop&q=80' },
    ]
  },
  {
    id: 'rest-3',
    name: 'Sushimaru Fantasma 🍣',
    category: 'Culinária Japonesa',
    rating: '5.0 ★',
    time: '35-45 min',
    image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=600&auto=format&fit=crop&q=80',
    menu: [
      { id: 'm6', name: 'Combo Dark Roll (16 pcs)', price: 59.90, desc: 'Hot rolls crocantes com cream cheese, salmão e tarê da casa.', img: 'https://images.unsplash.com/photo-1611143669185-af224c5e3252?w=300&auto=format&fit=crop&q=80' },
      { id: 'm7', name: 'Temaki Salmão Especial', price: 28.90, desc: 'Salmão fresco batido com cebolinha e casquinha super crocante.', img: 'https://images.unsplash.com/photo-1553621042-f6e147245754?w=300&auto=format&fit=crop&q=80' },
    ]
  }
];

// Configuração das Rotas e Diálogos do Cleiton
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
      "Cleiton acabou de ligar a moto! O motor até engasgou de emoção.",
      "Cleiton pegou a via principal. Tá costurando o trânsito como um profissional!",
      "Cleiton deu uma buzinada amigável na rua. Tudo sob controle!",
      "Cleiton avistou seu endereço. Preparando para encostar a moto!",
      "Cleiton tá na sua porta! Pode pegar o prato!"
    ]
  },
  express: {
    id: 'express',
    label: 'Entrega Flash Cleiton',
    duration: 15,
    price: 12.00,
    badge: '⚡ Modo Trovão',
    dialogues: [
      "Cleiton ativou o modo turbo! Segura a fome!",
      "Cleiton cortou caminho por um atalho secreto que só ele conhece!",
      "Cleiton acelerou fundo na reta! Lanche voando quentinho!",
      "Cleiton já tá no seu bairro! Escutou o ronco da moto?",
      "Chegou em tempo recorde! Cleiton merece o troféu do mês!"
    ]
  },
  peak: {
    id: 'peak',
    label: 'Horário de Pico / Chuva',
    duration: 45,
    price: 9.00,
    badge: '🌧️ Trânsito Pesado',
    dialogues: [
      "Cleiton tá no semáforo, mas a bag tá 100% selada e aquecida!",
      "Cleiton desviou de uma poça d'água na manha. Pilotagem nota 10!",
      "Trânsito parado, mas o Cleiton tá avançando entre os carros no talento!",
      "Cleiton saiu do engarrafamento! A reta final é toda dele!",
      "Desafiou a chuva e o trânsito! Pedido entregue com segurança!"
    ]
  }
};

export default function GhostBitesPage() {
  const [selectedRestaurant, setSelectedRestaurant] = useState(RESTAURANTS[0]);
  const [currentView, setCurrentView] = useState<'restaurants' | 'menu' | 'cart' | 'delivery'>('restaurants');
  const [cart, setCart] = useState<{ id: string; name: string; price: number; quantity: number }[]>([]);
  const [selectedRoute, setSelectedRoute] = useState<RouteOption>(ROUTE_CONFIGS.standard);

  // Estados de Rastreio da Entrega
  const [progress, setProgress] = useState(0);
  const [currentDialogue, setCurrentDialogue] = useState('');
  const [isDelivered, setIsDelivered] = useState(false);

  // Manipulação do Carrinho
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
    <main className="min-h-screen bg-[#090415] text-purple-100 font-sans pb-16 select-none">
      <Analytics />

      {/* HEADER PRINCIPAL */}
      <header className="sticky top-0 z-50 bg-[#090415]/90 backdrop-blur-md border-b border-purple-900/40 px-4 py-3.5 flex justify-between items-center shadow-lg shadow-purple-950/50">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => setCurrentView('restaurants')}>
          <span className="text-2xl">👻</span>
          <div>
            <h1 className="text-lg font-black tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-fuchsia-300 to-indigo-300">
              GhostBites
            </h1>
            <p className="text-[10px] text-purple-400 font-medium">Entrega Rápida do Além</p>
          </div>
        </div>

        {currentView !== 'delivery' && (
          <button
            onClick={() => setCurrentView(currentView === 'cart' ? 'restaurants' : 'cart')}
            className="relative bg-purple-900/60 hover:bg-purple-800/80 border border-purple-700/50 px-3.5 py-1.5 rounded-full text-xs font-semibold flex items-center gap-2 transition-all active:scale-95"
          >
            <span>🛒 Carrinho</span>
            {totalItems > 0 && (
              <span className="bg-fuchsia-500 text-white font-bold px-1.5 py-0.5 rounded-full text-[10px]">
                {totalItems}
              </span>
            )}
          </button>
        )}
      </header>

      <div className="max-w-md mx-auto px-4 pt-5">

        {/* VISTA 1: LISTA DE RESTAURANTES */}
        {currentView === 'restaurants' && (
          <div className="space-y-4">
            <div className="bg-gradient-to-r from-purple-900/40 via-fuchsia-900/20 to-indigo-900/30 p-4 rounded-2xl border border-purple-800/40">
              <h2 className="text-base font-bold text-purple-200">Restaurantes Disponíveis 🍽️</h2>
              <p className="text-xs text-purple-300/70 mt-0.5">Selecione onde você deseja pedir hoje.</p>
            </div>

            <div className="grid gap-4">
              {RESTAURANTS.map((rest) => (
                <div
                  key={rest.id}
                  onClick={() => {
                    setSelectedRestaurant(rest);
                    setCurrentView('menu');
                  }}
                  className="bg-purple-950/40 border border-purple-900/50 rounded-2xl overflow-hidden hover:border-purple-600/80 transition-all cursor-pointer group shadow-lg shadow-purple-950/40"
                >
                  <div className="h-32 w-full relative overflow-hidden">
                    <img
                      src={rest.image}
                      alt={rest.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-2 right-2 bg-black/70 backdrop-blur-md px-2.5 py-1 rounded-full text-[11px] font-bold text-amber-300 border border-amber-500/30">
                      {rest.rating}
                    </div>
                  </div>
                  <div className="p-3.5 flex justify-between items-center">
                    <div>
                      <h3 className="font-bold text-sm text-purple-100">{rest.name}</h3>
                      <p className="text-[11px] text-purple-300/60 mt-0.5">{rest.category}</p>
                    </div>
                    <span className="text-xs font-semibold bg-purple-900/60 border border-purple-800/50 px-2.5 py-1 rounded-lg text-purple-300">
                      🕒 {rest.time}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* VISTA 2: CARDÁPIO DO RESTAURANTE SELECIONADO */}
        {currentView === 'menu' && (
          <div className="space-y-4">
            <button
              onClick={() => setCurrentView('restaurants')}
              className="text-xs font-bold text-purple-400 hover:text-purple-300 flex items-center gap-1"
            >
              ← Voltar aos restaurantes
            </button>

            <div className="bg-purple-950/50 border border-purple-800/40 rounded-2xl p-4 flex items-center gap-3">
              <img
                src={selectedRestaurant.image}
                alt={selectedRestaurant.name}
                className="w-14 h-14 rounded-xl object-cover border border-purple-700/50"
              />
              <div>
                <h2 className="text-base font-bold text-purple-100">{selectedRestaurant.name}</h2>
                <p className="text-xs text-purple-300/70">{selectedRestaurant.category} • {selectedRestaurant.rating}</p>
              </div>
            </div>

            <div className="grid gap-3">
              {selectedRestaurant.menu.map((item) => (
                <div
                  key={item.id}
                  className="bg-purple-950/40 border border-purple-900/40 rounded-2xl p-3 flex gap-3 items-center hover:border-purple-700/60 transition-all"
                >
                  <img
                    src={item.img}
                    alt={item.name}
                    className="w-20 h-20 rounded-xl object-cover flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-xs text-purple-100 truncate">{item.name}</h3>
                    <p className="text-[10px] text-purple-300/60 mt-0.5 line-clamp-2">{item.desc}</p>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-xs font-black text-fuchsia-400">
                        R$ {item.price.toFixed(2).replace('.', ',')}
                      </span>
                      <button
                        onClick={() => addToCart(item)}
                        className="bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:from-purple-500 hover:to-fuchsia-500 text-white font-bold text-[11px] px-2.5 py-1 rounded-lg active:scale-95 transition-all shadow-md"
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
                  className="w-full bg-gradient-to-r from-fuchsia-600 to-purple-600 text-white font-bold py-3 px-4 rounded-2xl shadow-xl shadow-fuchsia-950/80 flex justify-between items-center active:scale-[0.98] transition-all"
                >
                  <span className="text-xs bg-black/30 px-2.5 py-1 rounded-lg">
                    {totalItems} {totalItems === 1 ? 'item' : 'itens'}
                  </span>
                  <span className="text-xs font-black">Ver Carrinho</span>
                  <span className="text-xs bg-black/30 px-2.5 py-1 rounded-lg">
                    R$ {subtotal.toFixed(2).replace('.', ',')}
                  </span>
                </button>
              </div>
            )}
          </div>
        )}

        {/* VISTA 3: CARRINHO E ROTAS */}
        {currentView === 'cart' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-base font-bold text-purple-200">Seu Carrinho 🛒</h2>
              <button
                onClick={() => setCurrentView('menu')}
                className="text-xs text-purple-400 hover:text-purple-300 underline"
              >
                + Adicionar mais
              </button>
            </div>

            {cart.length === 0 ? (
              <div className="text-center py-10 bg-purple-950/20 rounded-2xl border border-purple-900/30">
                <span className="text-3xl">👻</span>
                <p className="text-xs text-purple-300/70 mt-2">Seu carrinho está sem nenhum item.</p>
                <button
                  onClick={() => setCurrentView('restaurants')}
                  className="mt-3 bg-purple-800/60 text-xs font-bold px-3.5 py-1.5 rounded-xl"
                >
                  Escolher Restaurante
                </button>
              </div>
            ) : (
              <>
                <div className="bg-purple-950/40 border border-purple-900/40 rounded-2xl p-3.5 divide-y divide-purple-900/30">
                  {cart.map((item) => (
                    <div key={item.id} className="py-2 first:pt-0 last:pb-0 flex justify-between items-center">
                      <div>
                        <h4 className="font-bold text-xs text-purple-100">{item.name}</h4>
                        <span className="text-[10px] text-purple-400">
                          R$ {item.price.toFixed(2).replace('.', ',')} cada
                        </span>
                      </div>
                      <div className="flex items-center gap-2 bg-purple-900/50 p-1 rounded-xl border border-purple-800/40">
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="w-5 h-5 flex items-center justify-center font-bold text-xs bg-purple-950 rounded-lg"
                        >
                          -
                        </button>
                        <span className="text-xs font-bold px-1">{item.quantity}</span>
                        <button
                          onClick={() => addToCart(item)}
                          className="w-5 h-5 flex items-center justify-center font-bold text-xs bg-purple-950 rounded-lg"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* ESCOLHA DA ROTA DO CLEITON */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-purple-300 block">
                    Escolha o Estilo de Entrega do Cleiton 🛵:
                  </label>
                  <div className="grid gap-2">
                    {Object.values(ROUTE_CONFIGS).map((route) => (
                      <div
                        key={route.id}
                        onClick={() => setSelectedRoute(route)}
                        className={`p-3 rounded-xl border cursor-pointer transition-all flex justify-between items-center ${
                          selectedRoute.id === route.id
                            ? 'bg-purple-900/60 border-fuchsia-500 shadow-md shadow-fuchsia-950/50'
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
                            Simulação: ~{route.duration} segundos
                          </span>
                        </div>
                        <span className="font-black text-xs text-fuchsia-400">
                          R$ {route.price.toFixed(2).replace('.', ',')}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* VALOR TOTAL */}
                <div className="bg-purple-950/60 border border-purple-800/50 rounded-2xl p-3.5 space-y-1.5 text-xs">
                  <div className="flex justify-between text-purple-300">
                    <span>Subtotal:</span>
                    <span>R$ {subtotal.toFixed(2).replace('.', ',')}</span>
                  </div>
                  <div className="flex justify-between text-purple-300">
                    <span>Entrega ({selectedRoute.label}):</span>
                    <span>R$ {selectedRoute.price.toFixed(2).replace('.', ',')}</span>
                  </div>
                  <div className="border-t border-purple-800/40 pt-2 flex justify-between font-black text-xs text-purple-100">
                    <span>Total:</span>
                    <span className="text-fuchsia-400 text-sm">R$ {total.toFixed(2).replace('.', ',')}</span>
                  </div>
                </div>

                <button
                  onClick={handleStartDelivery}
                  className="w-full bg-gradient-to-r from-fuchsia-600 via-purple-600 to-indigo-600 hover:opacity-95 text-white font-black py-3 rounded-2xl shadow-xl shadow-fuchsia-950/80 active:scale-[0.98] transition-all text-xs"
                >
                  Confirmar e Chamar o Cleiton 🛵
                </button>
              </>
            )}
          </div>
        )}

        {/* VISTA 4: RASTREIO NO MAPA COM CLEITON */}
        {currentView === 'delivery' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-base font-bold text-purple-200">Rastreio em Tempo Real 🛵</h2>
                <p className="text-[11px] text-purple-400">{selectedRoute.label} • {selectedRoute.badge}</p>
              </div>
              <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full border ${
                isDelivered
                  ? 'bg-emerald-950/80 border-emerald-600 text-emerald-300'
                  : 'bg-fuchsia-950/80 border-fuchsia-600 text-fuchsia-300 animate-pulse'
              }`}>
                {isDelivered ? 'Entregue! 🎉' : `${progress}%`}
              </span>
            </div>

            {/* CONTAINER DO MAPA INTERATIVO */}
            <div className="w-full h-64 rounded-2xl overflow-hidden border border-purple-800/50 shadow-xl shadow-purple-950/80 relative bg-[#090415]">
              <InteractiveMap progress={progress} />
            </div>

            {/* PROGRESSO E RADIOCONVERSA DO CLEITON */}
            <div className="bg-purple-950/40 border border-purple-900/40 rounded-2xl p-3.5 space-y-3">
              <div className="w-full bg-purple-950 rounded-full h-2.5 overflow-hidden border border-purple-800/50 p-0.5">
                <div
                  className="bg-gradient-to-r from-purple-500 to-fuchsia-500 h-full rounded-full transition-all duration-300 ease-linear"
                  style={{ width: `${progress}%` }}
                />
              </div>

              <div className="bg-purple-900/40 border border-purple-800/40 rounded-xl p-3 flex items-start gap-2.5">
                <span className="text-lg">💬</span>
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
              <div className="bg-emerald-950/40 border border-emerald-800/50 p-4 rounded-2xl text-center space-y-2">
                <span className="text-2xl block">🎉🍔</span>
                <h3 className="font-bold text-xs text-emerald-200">Pedido Entregue!</h3>
                <p className="text-[11px] text-emerald-300/80">Bom apetite! Cleiton já está a caminho da próxima entrega.</p>
                <button
                  onClick={() => {
                    setCart([]);
                    setCurrentView('restaurants');
                  }}
                  className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold px-4 py-2 rounded-xl transition-all shadow-lg active:scale-95"
                >
                  Novo Pedido
                </button>
              </div>
            )}
          </div>
        )}

      </div>
    </main>
  );
}
