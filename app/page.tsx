'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { Analytics } from '@vercel/analytics/react';

// Importação Dinâmica do Mapa com SSR Desativado (evita quebrar no servidor)
const InteractiveMap = dynamic(() => import('@/components/InteractiveMap'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full min-h-[256px] flex flex-col items-center justify-center bg-purple-950/20 text-purple-300 text-xs animate-pulse rounded-2xl border border-purple-800/40">
      <span className="text-xl mb-1">🛵</span>
      <span>Sintonizando GPS do Cleiton...</span>
    </div>
  ),
});

// Cardápio do GhostBites
const RESTAURANT_MENU = [
  { id: '1', name: 'Ghost Burger Suculento', price: 32.90, desc: 'Hambúrguer artesanal de 180g com queijo fantasma derretido.' },
  { id: '2', name: 'Batata Frita Assombrada', price: 18.50, desc: 'Crocantes por fora, macias por dentro, com páprica e bacon.' },
  { id: '3', name: 'Milkshake Esmagador', price: 16.00, desc: 'Milkshake cremoso de chocolate com pedaços de brownie.' },
  { id: '4', name: 'Nuggets de Frango Neon', price: 22.00, desc: '6 pedaços empanados super crocantes com molho especial.' },
];

// Tipos das Rotas de Entrega
type RouteOption = {
  id: 'standard' | 'express' | 'peak';
  label: string;
  duration: number; // em segundos para o teste
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
      "Cleiton pegou a via principal. Tá costurando o trânsito com habilidade de mestre!",
      "Cleiton deu uma buzinada pra um cachorro na calçada. Sinal de boa sorte!",
      "Cleiton avistou o seu prédio. Preparando o freio de mão!",
      "Cleiton tá na sua porta! Pega o prato que a fome acabou!"
    ]
  },
  express: {
    id: 'express',
    label: 'Entrega Flash Cleiton',
    duration: 15,
    price: 12.00,
    badge: '⚡ Modo Trovão',
    dialogues: [
      "Cleiton ativou o nitro da moto! Prepara o capacete!",
      "Cleiton cortou caminho por um beco secreto que nem o GPS conhece!",
      "O capacete do Cleiton até voou de tão rápido! Mas o lanche tá seguro!",
      "Cleiton já tá no seu bairro! O escapamento furado tá avisando!",
      "Chegou em tempo recorde! Cleiton merece o troféu de entregador do ano!"
    ]
  },
  peak: {
    id: 'peak',
    label: 'Horário de Pico / Chuva',
    duration: 45,
    price: 9.00,
    badge: '🌧️ Trânsito Pesado',
    dialogues: [
      "Cleiton tá preso no semáforo, mas garantiu que a bag tá quentinha!",
      "Cleiton desviou de uma poça gigante. Pilotagem nível Fórmula 1!",
      "Trânsito parado, mas Cleiton tá avançando entre os carros no talento!",
      "Cleiton saiu do engarrafamento! A reta final é toda dele!",
      "Desafiou a tempestade e o trânsito! Cleiton entregou com sucesso!"
    ]
  }
};

export default function GhostBitesPage() {
  const [currentView, setCurrentView] = useState<'menu' | 'cart' | 'delivery'>('menu');
  const [cart, setCart] = useState<{ id: string; name: string; price: number; quantity: number }[]>([]);
  const [selectedRoute, setSelectedRoute] = useState<RouteOption>(ROUTE_CONFIGS.standard);

  // Estados da Entrega
  const [progress, setProgress] = useState(0);
  const [currentDialogue, setCurrentDialogue] = useState('');
  const [isDelivered, setIsDelivered] = useState(false);

  // Adicionar ao Carrinho
  const addToCart = (item: typeof RESTAURANT_MENU[0]) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) => (i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i));
      }
      return [...prev, { id: item.id, name: item.name, price: item.price, quantity: 1 }];
    });
  };

  // Remover ou diminuir item
  const removeFromCart = (id: string) => {
    setCart((prev) =>
      prev
        .map((i) => (i.id === id ? { ...i, quantity: i.quantity - 1 } : i))
        .filter((i) => i.quantity > 0)
    );
  };

  // Cálculos do Carrinho
  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const total = subtotal > 0 ? subtotal + selectedRoute.price : 0;
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  // Iniciar Pedido
  const handleStartDelivery = () => {
    if (cart.length === 0) return;
    setProgress(0);
    setIsDelivered(false);
    setCurrentDialogue(selectedRoute.dialogues[0]);
    setCurrentView('delivery');
  };

  // Timer do Progresso da Entrega
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

        // Atualiza os diálogos do Cleiton conforme o progresso da rota
        if (nextProgress === 25) setCurrentDialogue(selectedRoute.dialogues[1]);
        if (nextProgress === 50) setCurrentDialogue(selectedRoute.dialogues[2]);
        if (nextProgress === 75) setCurrentDialogue(selectedRoute.dialogues[3]);

        return nextProgress;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, [currentView, selectedRoute, isDelivered]);

  return (
    <main className="min-h-screen bg-[#090415] text-purple-100 font-sans pb-12 select-none">
      <Analytics />

      {/* HEADER FIXO */}
      <header className="sticky top-0 z-50 bg-[#090415]/90 backdrop-blur-md border-b border-purple-900/40 px-4 py-3.5 flex justify-between items-center shadow-lg shadow-purple-950/50">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => setCurrentView('menu')}>
          <span className="text-2xl">👻</span>
          <h1 className="text-xl font-black tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-fuchsia-300 to-indigo-300">
            GhostBites
          </h1>
        </div>

        {currentView !== 'delivery' && (
          <button
            onClick={() => setCurrentView(currentView === 'cart' ? 'menu' : 'cart')}
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

      {/* CONTEÚDO PRINCIPAL */}
      <div className="max-w-md mx-auto px-4 pt-6">

        {/* TELA 1: CARDÁPIO */}
        {currentView === 'menu' && (
          <div className="space-y-4">
            <div className="bg-gradient-to-r from-purple-900/40 to-indigo-900/30 p-4 rounded-2xl border border-purple-800/40">
              <h2 className="text-lg font-bold text-purple-200">Cardápio do Além 🍔</h2>
              <p className="text-xs text-purple-300/70 mt-0.5">Escolha seus rangos fantasmagóricos favoritos.</p>
            </div>

            <div className="grid gap-3">
              {RESTAURANT_MENU.map((item) => (
                <div
                  key={item.id}
                  className="bg-purple-950/40 border border-purple-900/40 rounded-2xl p-4 flex justify-between items-center hover:border-purple-700/60 transition-all"
                >
                  <div className="pr-3">
                    <h3 className="font-bold text-sm text-purple-100">{item.name}</h3>
                    <p className="text-[11px] text-purple-300/60 mt-0.5 line-clamp-2">{item.desc}</p>
                    <span className="text-xs font-black text-fuchsia-400 mt-2 block">
                      R$ {item.price.toFixed(2).replace('.', ',')}
                    </span>
                  </div>
                  <button
                    onClick={() => addToCart(item)}
                    className="bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:from-purple-500 hover:to-fuchsia-500 text-white font-bold text-xs px-3 py-2 rounded-xl active:scale-95 transition-all shadow-md shadow-purple-950"
                  >
                    + Pedir
                  </button>
                </div>
              ))}
            </div>

            {cart.length > 0 && (
              <div className="fixed bottom-4 left-4 right-4 max-w-md mx-auto z-40">
                <button
                  onClick={() => setCurrentView('cart')}
                  className="w-full bg-gradient-to-r from-fuchsia-600 to-purple-600 hover:from-fuchsia-500 hover:to-purple-500 text-white font-bold py-3 px-4 rounded-2xl shadow-xl shadow-fuchsia-950/80 flex justify-between items-center active:scale-[0.98] transition-all"
                >
                  <span className="text-xs bg-black/30 px-2.5 py-1 rounded-lg">
                    {totalItems} {totalItems === 1 ? 'item' : 'itens'}
                  </span>
                  <span className="text-sm font-black">Ver Carrinho</span>
                  <span className="text-xs bg-black/30 px-2.5 py-1 rounded-lg">
                    R$ {subtotal.toFixed(2).replace('.', ',')}
                  </span>
                </button>
              </div>
            )}
          </div>
        )}

        {/* TELA 2: CARRINHO E ROTAS DO CLEITON */}
        {currentView === 'cart' && (
          <div className="space-y-5">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-bold text-purple-200">Seu Carrinho 🛒</h2>
              <button
                onClick={() => setCurrentView('menu')}
                className="text-xs text-purple-400 hover:text-purple-300 underline"
              >
                + Adicionar mais itens
              </button>
            </div>

            {cart.length === 0 ? (
              <div className="text-center py-12 bg-purple-950/20 rounded-2xl border border-purple-900/30">
                <span className="text-4xl">👻</span>
                <p className="text-sm text-purple-300/70 mt-2">Seu carrinho está assustadoramente vazio!</p>
                <button
                  onClick={() => setCurrentView('menu')}
                  className="mt-4 bg-purple-800/60 hover:bg-purple-700/80 text-xs font-bold px-4 py-2 rounded-xl"
                >
                  Ir para o Cardápio
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
                          className="w-6 h-6 flex items-center justify-center font-bold text-xs bg-purple-950 hover:bg-purple-900 rounded-lg"
                        >
                          -
                        </button>
                        <span className="text-xs font-bold px-1">{item.quantity}</span>
                        <button
                          onClick={() => addToCart(item as any)}
                          className="w-6 h-6 flex items-center justify-center font-bold text-xs bg-purple-950 hover:bg-purple-900 rounded-lg"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* OPÇÕES DE ROTA DO CLEITON */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-purple-300 block">
                    Escolha a Rota do Cleiton 🛵:
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
                            <span className="text-[10px] bg-purple-950 px-2 py-0.5 rounded-md border border-purple-800/50 text-purple-300">
                              {route.badge}
                            </span>
                          </div>
                          <span className="text-[11px] text-purple-400 mt-0.5 block">
                            Tempo estimado: ~{route.duration}s no simulador
                          </span>
                        </div>
                        <span className="font-black text-xs text-fuchsia-400">
                          R$ {route.price.toFixed(2).replace('.', ',')}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* RESUMO DO VALOR */}
                <div className="bg-purple-950/60 border border-purple-800/50 rounded-2xl p-4 space-y-2 text-xs">
                  <div className="flex justify-between text-purple-300">
                    <span>Subtotal:</span>
                    <span>R$ {subtotal.toFixed(2).replace('.', ',')}</span>
                  </div>
                  <div className="flex justify-between text-purple-300">
                    <span>Taxa de Entrega ({selectedRoute.label}):</span>
                    <span>R$ {selectedRoute.price.toFixed(2).replace('.', ',')}</span>
                  </div>
                  <div className="border-t border-purple-800/40 pt-2 flex justify-between font-black text-sm text-purple-100">
                    <span>Total Final:</span>
                    <span className="text-fuchsia-400">R$ {total.toFixed(2).replace('.', ',')}</span>
                  </div>
                </div>

                <button
                  onClick={handleStartDelivery}
                  className="w-full bg-gradient-to-r from-fuchsia-600 via-purple-600 to-indigo-600 hover:opacity-95 text-white font-black py-3.5 rounded-2xl shadow-xl shadow-fuchsia-950/80 active:scale-[0.98] transition-all text-sm"
                >
                  Confirmar e Chamar o Cleiton 🛵
                </button>
              </>
            )}
          </div>
        )}

        {/* TELA 3: RASTREIO E MAPA AO VIVO */}
        {currentView === 'delivery' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-lg font-bold text-purple-200">Acompanhar Cleiton 🛵</h2>
                <p className="text-xs text-purple-400">{selectedRoute.label} • {selectedRoute.badge}</p>
              </div>
              <span className={`text-xs font-bold px-2.5 py-1 rounded-full border ${
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

            {/* BARRA DE PROGRESSO DO PERCURSO */}
            <div className="bg-purple-950/40 border border-purple-900/40 rounded-2xl p-4 space-y-3">
              <div className="w-full bg-purple-950 rounded-full h-3 overflow-hidden border border-purple-800/50 p-0.5">
                <div
                  className="bg-gradient-to-r from-purple-500 to-fuchsia-500 h-full rounded-full transition-all duration-300 ease-linear shadow-sm shadow-fuchsia-500/50"
                  style={{ width: `${progress}%` }}
                />
              </div>

              {/* DIÁLOGO DINÂMICO DO CLEITON */}
              <div className="bg-purple-900/40 border border-purple-800/40 rounded-xl p-3 flex items-start gap-3">
                <span className="text-xl">💬</span>
                <div>
                  <span className="text-[10px] font-bold text-purple-400 block uppercase tracking-wider">
                    Rádio do Cleiton
                  </span>
                  <p className="text-xs text-purple-100 font-medium italic mt-0.5">
                    "{currentDialogue}"
                  </p>
                </div>
              </div>
            </div>

            {isDelivered && (
              <div className="bg-emerald-950/40 border border-emerald-800/50 p-4 rounded-2xl text-center space-y-3 animate-fade-in">
                <span className="text-3xl block">🎉🍔</span>
                <h3 className="font-bold text-sm text-emerald-200">Pedido Entregue com Sucesso!</h3>
                <p className="text-xs text-emerald-300/80">Bom apetite! O Cleiton já está a caminho da próxima missão.</p>
                <button
                  onClick={() => {
                    setCart([]);
                    setCurrentView('menu');
                  }}
                  className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-all shadow-lg active:scale-95"
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
