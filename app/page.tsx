'use client';

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { RESTAURANTS, Restaurant, MenuItem } from '@/data/restaurants';

const InteractiveMap = dynamic(() => import('@/components/InteractiveMap'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-64 rounded-2xl flex flex-col items-center justify-center gap-2 text-xs text-purple-300 border border-purple-800/40 glow-purple-sm bg-purple-950/30">
      <span className="text-2xl animate-bounce">🛵</span>
      <span className="font-semibold text-[11px]">Iniciando GPS do Cleiton...</span>
    </div>
  ),
});

interface CartItem {
  item: MenuItem;
  quantity: number;
}

type AppView = 'browse' | 'cart' | 'delivery';

const CATEGORIES = [
  { name: 'Todos', icon: '✨', desc: 'Todos os restaurantes' },
  { name: 'Hambúrgueres', icon: '🍔', desc: 'Sanduíches & Dopamina' },
  { name: 'Pizzas', icon: '🍕', desc: 'Massas & Aconchego' },
  { name: 'Japonesa', icon: '🍣', desc: 'Sushis & Temakis' },
  { name: 'Doces', icon: '🍰', desc: 'Sobremesas sem glicose' },
  { name: 'Mexicana', icon: '🌮', desc: 'Tacos & Nachos' },
  { name: 'Pastéis', icon: '🥟', desc: 'Crocância da feira' },
  { name: 'Italiana', icon: '🍝', desc: 'Massas artesanais' },
  { name: 'Açaí', icon: '🍧', desc: 'Copos & Tigelas' },
  { name: 'Fit', icon: '🥗', desc: 'Alimentação leve' },
  { name: 'Churrasco', icon: '🥩', desc: 'Carnes defumadas' },
];

export default function GhostBitesHome() {
  const [currentView, setCurrentView] = useState<AppView>('browse');
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [note, setNote] = useState('');

  const [deliveryStep, setDeliveryStep] = useState(1);
  const [progress, setProgress] = useState(0);

  const addToCart = (item: MenuItem) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.item.id === item.id);
      if (existing) {
        return prev.map((i) =>
          i.item.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { item, quantity: 1 }];
    });
  };

  const removeFromCart = (itemId: string) => {
    setCart((prev) =>
      prev
        .map((i) => (i.item.id === itemId ? { ...i, quantity: i.quantity - 1 } : i))
        .filter((i) => i.quantity > 0)
    );
  };

  const totalItems = cart.reduce((sum, i) => sum + i.quantity, 0);

  const getItemQuantity = (itemId: string) => {
    return cart.find((i) => i.item.id === itemId)?.quantity || 0;
  };

  const handleConfirmOrder = () => {
    if (cart.length === 0) return;
    setCurrentView('delivery');
    setDeliveryStep(1);
    setProgress(5);
  };

  useEffect(() => {
    if (currentView !== 'delivery') return;

    const timer1 = setTimeout(() => {
      setDeliveryStep(2);
      setProgress(35);
    }, 4000);

    const timer2 = setTimeout(() => {
      setDeliveryStep(3);
      setProgress(70);
    }, 8000);

    const timer3 = setTimeout(() => {
      setDeliveryStep(4);
      setProgress(100);
    }, 12000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [currentView]);

  const resetApp = () => {
    setCart([]);
    setNote('');
    setCurrentView('browse');
    setDeliveryStep(1);
    setProgress(0);
    setSelectedRestaurant(null);
  };

  const filteredRestaurants = selectedCategory === 'Todos'
    ? RESTAURANTS
    : RESTAURANTS.filter(r => r.category.toLowerCase().includes(selectedCategory.toLowerCase()));

  const activeCategoryObj = CATEGORIES.find(c => c.name === selectedCategory) || CATEGORIES[0];

  // =========================================================================
  // TELA 3: RASTREIO DA MOTO DO CLEITON
  // =========================================================================
  if (currentView === 'delivery') {
    return (
      <main className="min-h-screen text-purple-50 flex flex-col items-center justify-center p-4 select-none font-sans">
        <div className="max-w-md w-full bg-[#130a2a]/95 backdrop-blur-xl border border-purple-800/40 rounded-3xl p-5 shadow-2xl space-y-4 glow-purple">
          <div className="flex justify-between items-center border-b border-purple-900/40 pb-3">
            <div>
              <span className="text-[10px] font-black text-purple-400 uppercase tracking-widest">Rastreio em Tempo Real</span>
              <h2 className="text-base font-black text-white tracking-tight">Entrega do Cleiton 🛵</h2>
            </div>
            <span className="text-xs bg-purple-950/80 text-purple-200 font-bold px-3 py-1 rounded-full border border-purple-700/50">
              {progress}%
            </span>
          </div>

          {/* CONTAINER DO MAPA DE TAMANHO EQUILIBRADO */}
          <div className="w-full h-64 rounded-2xl overflow-hidden border border-purple-800/50 shadow-xl shadow-purple-950/80 relative bg-[#090415]">
            <InteractiveMap progress={progress} />
          </div>

          <div className="bg-[#090415] p-4 rounded-2xl border border-purple-900/40 space-y-2 min-h-[110px] flex flex-col justify-center">
            {deliveryStep === 1 && (
              <>
                <h3 className="font-bold text-purple-300 text-sm">1. Cleiton ligou a Biz...</h3>
                <p className="text-xs text-purple-200/80 leading-relaxed">
                  "Sua sacola veio cheia de intenção. Enquanto eu corto as ruas até aí, me diz: a fome era real ou o cérebro só queria um estímulo fácil?"
                </p>
              </>
            )}

            {deliveryStep === 2 && (
              <>
                <h3 className="font-bold text-amber-300 text-sm">2. Dobrando a esquina dos impulsos...</h3>
                <p className="text-xs text-purple-200/80 leading-relaxed">
                  "Passei pelo sinal vermelho da ansiedade. Reparou como a vontade de gastar passa rápido se você espera 5 minutos?"
                </p>
              </>
            )}

            {deliveryStep === 3 && (
              <>
                <h3 className="font-bold text-purple-400 text-sm">3. Cleiton encostou na sua rua!</h3>
                <p className="text-xs text-purple-200/80 leading-relaxed">
                  "Tô buzinando aqui fora! Respira fundo. O cheiro da comida era ILUSÃO, mas a economia de hoje é 100% REAL no seu bolso."
                </p>
              </>
            )}

            {deliveryStep === 4 && (
              <>
                <h3 className="font-bold text-emerald-400 text-sm">4. Pedido Concluído com Sucesso! ✨</h3>
                <p className="text-xs text-purple-200/80 leading-relaxed italic">
                  "Valeu pelo pedido! O dinheiro continua na sua conta e você dominou o impulso. Até a próxima corrida!"
                </p>
              </>
            )}
          </div>

          {deliveryStep === 4 && (
            <button
              onClick={resetApp}
              className="w-full bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-500 hover:to-violet-500 active:scale-95 text-white font-black py-3.5 rounded-2xl transition shadow-lg shadow-purple-950 text-sm glow-purple-sm tracking-wide"
            >
              Fazer Outra Economia 💰
            </button>
          )}
        </div>
      </main>
    );
  }

  // =========================================================================
  // TELA 2: CHECKOUT COMPLETO (SACOLA)
  // =========================================================================
  if (currentView === 'cart') {
    return (
      <main className="min-h-screen text-purple-50 p-4 pb-28 select-none font-sans">
        <div className="max-w-lg mx-auto space-y-5">
          <div className="flex items-center justify-between border-b border-purple-900/40 pb-3">
            <button
              onClick={() => setCurrentView('browse')}
              className="text-xs font-bold text-purple-300 hover:text-white bg-[#130a2a] px-3.5 py-2 rounded-xl border border-purple-800/50"
            >
              ← Voltar
            </button>
            <h2 className="text-base font-black text-purple-200 tracking-tight">Minha Sacola Fantasma 🛍️</h2>
          </div>

          <div className="space-y-2">
            <h3 className="text-[11px] font-black uppercase tracking-wider text-purple-400">Itens Selecionados</h3>
            {cart.map(({ item, quantity }) => (
              <div key={item.id} className="p-3.5 bg-[#130a2a]/80 border border-purple-900/40 rounded-2xl flex justify-between items-center gap-3 shadow-sm">
                <div className="flex-1">
                  <h4 className="font-bold text-xs text-white tracking-tight">{item.name}</h4>
                  <p className="text-[11px] text-purple-300/60 line-clamp-1 mt-0.5">{item.description}</p>
                  <span className="text-xs font-black text-emerald-400 mt-1 block">R$ 0,00</span>
                </div>

                <div className="flex items-center gap-2 bg-[#090415] border border-purple-800/50 p-1 rounded-xl shrink-0">
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="w-6 h-6 bg-purple-950 hover:bg-purple-900 text-purple-200 font-bold rounded-lg text-xs"
                  >
                    -
                  </button>
                  <span className="text-xs font-black px-1 text-purple-200">{quantity}</span>
                  <button
                    onClick={() => addToCart(item)}
                    className="w-6 h-6 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-lg text-xs"
                  >
                    +
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-1.5">
            <label className="text-[11px] font-black text-purple-300 uppercase tracking-wider">Observações para o Cleiton</label>
            <input
              type="text"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Ex: Traz um pouco de calma e paz mental..."
              className="w-full bg-[#130a2a] border border-purple-800/50 rounded-xl p-3 text-xs text-purple-100 placeholder-purple-400/40 focus:outline-none focus:border-purple-500 font-medium"
            />
          </div>

          <div className="bg-[#130a2a]/90 border border-purple-800/50 rounded-2xl p-4 space-y-2.5 text-xs shadow-lg">
            <div className="flex justify-between text-purple-300/60 font-medium">
              <span>Subtotal simulado:</span>
              <span className="line-through">R$ 114,80</span>
            </div>
            <div className="flex justify-between text-purple-300 font-bold">
              <span>Cupom "DOPAMINA_100":</span>
              <span className="text-purple-400">- R$ 114,80</span>
            </div>
            <div className="flex justify-between text-purple-300/60 font-medium">
              <span>Taxa de Entrega (Cleiton):</span>
              <span className="text-emerald-400 font-black">Grátis</span>
            </div>
            <div className="border-t border-purple-900/50 pt-2.5 flex justify-between items-center text-sm font-black">
              <span>Total a Pagar:</span>
              <span className="text-emerald-400 text-base font-black">R$ 0,00</span>
            </div>
          </div>

          <div className="bg-[#130a2a] border border-purple-800/50 p-3.5 rounded-2xl flex items-center justify-between text-xs">
            <div className="flex items-center gap-2.5">
              <span className="text-lg">💳</span>
              <div>
                <p className="font-bold text-white">Pagamento na Entrega da Mente</p>
                <p className="text-purple-300/60 text-[10px]">Cartão Fictício **** 0000</p>
              </div>
            </div>
            <span className="text-emerald-400 font-bold text-[10px] bg-emerald-950/80 px-2.5 py-1 rounded-md border border-emerald-800/60">
              Aprovado
            </span>
          </div>

          <div className="fixed bottom-0 left-0 right-0 p-4 bg-[#090415]/95 backdrop-blur-md border-t border-purple-900/40 z-20">
            <div className="max-w-lg mx-auto">
              <button
                onClick={handleConfirmOrder}
                className="w-full bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-500 hover:to-violet-500 active:scale-[0.98] text-white font-black py-3.5 rounded-2xl transition shadow-xl shadow-purple-950 text-sm glow-purple-sm tracking-wide"
              >
                Fazer Pedido em R$ 0,00 →
              </button>
            </div>
          </div>
        </div>
      </main>
    );
  }

  // =========================================================================
  // TELA 1: HOME
  // =========================================================================
  return (
    <main className="min-h-screen text-purple-50 pb-28 select-none font-sans">
      {/* CABEÇALHO PRINCIPAL REFORMULADO */}
      <header className="py-4 px-4 border-b border-purple-900/40 sticky top-0 bg-[#090415]/95 backdrop-blur-md z-30 shadow-2xl">
        <div className="max-w-lg mx-auto flex items-center justify-between relative">
          
          {/* LOGO CENTRALIZADA COM EFEITO NEON E TAMANHO RESPONSIVO */}
          <div 
            onClick={() => setSelectedRestaurant(null)} 
            className="cursor-pointer flex items-center gap-2.5 group shrink min-w-0"
          >
            <div className="relative flex items-center justify-center shrink-0">
              {/* Brilho neon atrás da logo */}
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur-md opacity-70 group-hover:opacity-100 transition duration-300"></div>
              
              <div className="relative bg-[#090415] border border-purple-500/40 rounded-2xl p-1.5 sm:p-2 shadow-xl">
                <img
                  src="/logo.png"
                  alt="GhostBites Logo"
                  className="h-8 sm:h-10 max-w-[120px] sm:max-w-none w-auto object-contain drop-shadow-[0_0_8px_rgba(168,85,247,0.8)] transition-all"
                />
              </div>
            </div>

            <div className="text-left shrink min-w-0">
              <h1 className="text-base sm:text-lg font-black tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-pink-400 to-purple-200 leading-tight truncate">
                GHOSTBITES
              </h1>
            </div>
          </div>

          {/* BOTÃO DA SACOLA EM DESTAQUE NO CANTO DIREITO */}
          <button
            onClick={() => setCurrentView('cart')}
            className={`group relative flex items-center gap-2 px-3 sm:px-3.5 py-2 rounded-2xl border transition-all duration-300 shadow-xl shrink-0 ${
              totalItems > 0
                ? 'bg-gradient-to-r from-purple-600 via-fuchsia-600 to-violet-600 border-purple-400/80 text-white shadow-purple-950/80 animate-pulse glow-purple-sm'
                : 'bg-[#130a2a] border border-purple-800/50 text-purple-300 hover:border-purple-500/60 hover:text-white'
            }`}
          >
            <div className="relative flex items-center justify-center">
              <span className="text-base sm:text-lg group-hover:scale-110 transition duration-300">🛒</span>
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-emerald-500 text-[#090415] text-[10px] font-black px-1.5 py-0.2 rounded-full border border-emerald-300 shadow-md">
                  {totalItems}
                </span>
              )}
            </div>

            <div className="text-left hidden sm:block">
              <p className="text-[10px] font-black uppercase tracking-wider opacity-80 leading-none">Sacola</p>
              <p className="text-xs font-black tracking-tight leading-tight mt-0.5">
                {totalItems > 0 ? `${totalItems} itens` : 'Vazia'}
              </p>
            </div>
          </button>
        </div>
      </header>

      <div className="max-w-lg mx-auto p-4 space-y-5">
        {selectedRestaurant ? (
          /* CARDÁPIO DO RESTAURANTE SELECIONADO */
          <div className="space-y-4">
            <button
              onClick={() => setSelectedRestaurant(null)}
              className="text-xs font-bold text-purple-300 hover:text-white flex items-center gap-1 bg-[#130a2a] px-3.5 py-2 rounded-xl border border-purple-800/50 transition"
            >
              ← Voltar para lista
            </button>

            {/* Capa e Detalhes do Restaurante */}
            <div className="bg-[#130a2a] rounded-3xl border border-purple-800/40 overflow-hidden shadow-xl glow-purple-sm">
              <div className="h-32 w-full relative bg-purple-950/40">
                <img
                  src={selectedRestaurant.image}
                  alt={selectedRestaurant.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=400&auto=format&fit=crop';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#130a2a] via-transparent to-transparent" />
              </div>
              <div className="p-4 -mt-6 relative">
                <span className="text-[10px] font-black text-purple-300 bg-purple-950/90 px-2.5 py-1 rounded-lg border border-purple-700/50 uppercase tracking-wider">
                  {selectedRestaurant.category}
                </span>
                <h2 className="text-xl font-black text-white mt-2 tracking-tight">{selectedRestaurant.name}</h2>
                <p className="text-xs text-purple-300/70 mt-1 leading-relaxed">{selectedRestaurant.description}</p>
                <div className="flex items-center gap-3 mt-2.5 text-xs font-semibold text-purple-200">
                  <span className="text-amber-300 font-bold">★ {selectedRestaurant.rating}</span>
                  <span>•</span>
                  <span>{selectedRestaurant.deliveryTime}</span>
                  <span>•</span>
                  <span className="text-emerald-400 font-black">Frete R$ 0,00</span>
                </div>
              </div>
            </div>

            {/* Lista de Pratos */}
            <div className="space-y-2.5">
              <h3 className="text-[11px] font-black text-purple-400 uppercase tracking-widest">Cardápio de Desejos</h3>
              {selectedRestaurant.menu.map((item) => {
                const qty = getItemQuantity(item.id);
                return (
                  <div
                    key={item.id}
                    className="p-3.5 bg-[#130a2a]/80 border border-purple-900/30 rounded-2xl flex justify-between items-center gap-3 hover:border-purple-600/50 transition shadow-sm"
                  >
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-xs text-white tracking-tight">{item.name}</h4>
                      <p className="text-[11px] text-purple-300/60 mt-0.5 leading-relaxed line-clamp-2">{item.description}</p>
                      <span className="text-xs font-black text-emerald-400 mt-1.5 block">R$ 0,00</span>
                    </div>

                    <div className="shrink-0">
                      {qty === 0 ? (
                        <button
                          onClick={() => addToCart(item)}
                          className="bg-purple-600 hover:bg-purple-500 active:scale-95 text-white font-bold px-3 py-1.5 rounded-xl text-xs transition shadow-md shadow-purple-950"
                        >
                          + Adicionar
                        </button>
                      ) : (
                        <div className="flex items-center gap-1.5 bg-[#090415] border border-purple-700/50 p-1 rounded-xl">
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="w-6 h-6 bg-purple-950 hover:bg-purple-900 text-purple-200 font-bold rounded-lg text-xs"
                          >
                            -
                          </button>
                          <span className="text-xs font-black px-1.5 text-purple-200">{qty}</span>
                          <button
                            onClick={() => addToCart(item)}
                            className="w-6 h-6 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-lg text-xs"
                          >
                            +
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          /* FEED PRINCIPAL */
          <>
            {/* DROPDOWN DE CATEGORIAS */}
            <div className="relative z-20">
              <label className="text-[10px] font-black uppercase tracking-widest text-purple-400 block mb-1.5 ml-1">
                Filtrar por Categoria
              </label>

              <button
                onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                className="w-full bg-[#130a2a] border border-purple-800/40 hover:border-purple-600/60 p-3.5 rounded-2xl flex justify-between items-center text-xs font-bold text-white transition shadow-lg glow-purple-sm"
              >
                <div className="flex items-center gap-2.5">
                  <span className="text-lg bg-purple-950 p-1.5 rounded-xl border border-purple-800/50">
                    {activeCategoryObj.icon}
                  </span>
                  <div className="text-left">
                    <p className="font-extrabold text-sm text-white tracking-tight">{activeCategoryObj.name}</p>
                    <p className="text-[10px] font-medium text-purple-300/60">{activeCategoryObj.desc}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[10px] bg-purple-950 text-purple-300 font-bold px-2 py-1 rounded-md border border-purple-800/60">
                    {filteredRestaurants.length} opções
                  </span>
                  <span className={`text-purple-400 transition-transform duration-300 text-base ${isCategoryOpen ? 'rotate-180' : ''}`}>
                    ▼
                  </span>
                </div>
              </button>

              {/* Lista Suspensa (Dropdown) */}
              {isCategoryOpen && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-[#130a2a] border border-purple-700/50 rounded-2xl p-2 shadow-2xl shadow-purple-950/90 z-30 max-h-72 overflow-y-auto no-scrollbar space-y-1 backdrop-blur-xl">
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat.name}
                      onClick={() => {
                        setSelectedCategory(cat.name);
                        setIsCategoryOpen(false);
                      }}
                      className={`w-full p-2.5 rounded-xl flex items-center justify-between text-xs text-left transition ${
                        selectedCategory === cat.name
                          ? 'bg-gradient-to-r from-purple-600 to-violet-600 text-white font-bold shadow-md'
                          : 'text-purple-200/80 hover:bg-purple-950/60 hover:text-white font-medium'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="text-base">{cat.icon}</span>
                        <div>
                          <p className="font-bold">{cat.name}</p>
                          <p className="text-[10px] opacity-70">{cat.desc}</p>
                        </div>
                      </div>

                      {selectedCategory === cat.name && (
                        <span className="text-xs text-emerald-300 font-bold">✓</span>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Título da Lista */}
            <div className="flex justify-between items-center pt-2">
              <h2 className="font-bold text-white text-xs tracking-wide">
                {selectedCategory === 'Todos' ? 'Lojas em Destaque' : `Opções em ${selectedCategory}`}
              </h2>
              <span className="text-[10px] text-purple-300/60 font-medium">{filteredRestaurants.length} estabelecimentos</span>
            </div>

            {/* GRID 3 COLUNAS */}
            <div className="grid grid-cols-3 gap-3">
              {filteredRestaurants.map((resto) => (
                <div
                  key={resto.id}
                  onClick={() => setSelectedRestaurant(resto)}
                  className="group bg-[#130a2a]/90 border border-purple-900/30 hover:border-purple-600/50 rounded-3xl p-3 flex flex-col justify-between items-center text-center cursor-pointer transition-all duration-300 active:scale-[0.97] shadow-md hover:shadow-purple-950/60 overflow-hidden"
                >
                  <div className="relative w-16 h-16 shrink-0 rounded-2xl overflow-hidden mb-2 border border-purple-800/40 shadow-md bg-purple-950/50">
                    <img
                      src={resto.image}
                      alt={resto.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=400&auto=format&fit=crop';
                      }}
                    />
                    <span className="absolute bottom-0.5 right-0.5 text-[8px] font-black text-amber-300 bg-amber-950/90 px-1 py-0.2 rounded border border-amber-800/50 backdrop-blur-sm">
                      ★ {resto.rating}
                    </span>
                  </div>

                  <div className="w-full flex flex-col justify-between flex-1">
                    <div>
                      <h3 className="font-bold text-[11px] text-slate-100 leading-snug line-clamp-2 tracking-tight group-hover:text-purple-300 transition">
                        {resto.name}
                      </h3>
                      <p className="text-[9px] font-medium text-purple-300/60 line-clamp-1 mt-0.5">
                        {resto.category}
                      </p>
                    </div>

                    <div className="flex items-center justify-between w-full mt-2 pt-1 border-t border-purple-900/30 text-[9px]">
                      <span className="text-purple-300/80 font-medium">{resto.deliveryTime}</span>
                      <span className="text-emerald-400 font-bold">Grátis</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* BARRA FIXA INFERIOR DE VER SACOLA */}
      {totalItems > 0 && (
        <div className="fixed bottom-4 left-4 right-4 max-w-lg mx-auto z-20">
          <button
            onClick={() => setCurrentView('cart')}
            className="w-full bg-gradient-to-r from-purple-600 via-fuchsia-600 to-violet-600 hover:from-purple-500 hover:to-violet-500 active:scale-[0.98] text-white p-3.5 rounded-2xl flex justify-between items-center shadow-2xl shadow-purple-950 transition border border-purple-400/40 glow-purple"
          >
            <div className="flex items-center gap-2.5">
              <span className="bg-purple-950 text-purple-200 font-black text-xs px-2.5 py-1 rounded-lg border border-purple-700/60">
                {totalItems}
              </span>
              <span className="text-xs font-black tracking-wide">Ver Sacola Fantasma</span>
            </div>
            <span className="text-xs font-black tracking-wide text-emerald-300">R$ 0,00 →</span>
          </button>
        </div>
      )}
    </main>
  );
}
