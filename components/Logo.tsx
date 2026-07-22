import React from 'react';

export default function Logo() {
  return (
    <div className="flex flex-col items-center justify-center text-center py-2 cursor-pointer group">
      {/* LOGO EMBLEMA VETORIAL COMPLETA (SEM CORTE DE TEXTO) */}
      <div className="relative flex items-center justify-center">
        {/* Efeito Glow / Neon de Fundo */}
        <div className="absolute -inset-2 bg-gradient-to-r from-purple-600 via-fuchsia-500 to-violet-600 rounded-3xl blur-md opacity-60 group-hover:opacity-100 transition duration-500 animate-pulse" />
        
        {/* Card da Logo */}
        <div className="relative px-5 py-3 rounded-2xl bg-gradient-to-b from-[#1b0c3a] to-[#0c051a] border border-purple-400/40 flex items-center gap-3 shadow-2xl shadow-purple-950">
          
          {/* Ícone Fantasma em Posição de Destaque */}
          <div className="relative w-12 h-12 rounded-xl bg-gradient-to-tr from-purple-700 via-violet-600 to-fuchsia-500 p-[1px] shrink-0 shadow-lg shadow-purple-950">
            <div className="w-full h-full bg-[#0c051a] rounded-[11px] flex items-center justify-center text-2xl">
              👻
            </div>
            <span className="absolute -bottom-1 -right-1 text-[10px] bg-purple-950 p-0.5 rounded border border-purple-500/50">🛵</span>
          </div>

          {/* Tipografia da Marca com Bordo Gradient Vetorial */}
          <div className="text-left">
            <div className="flex items-center">
              <span className="text-2xl font-black tracking-tight text-white drop-shadow-md">
                Ghost
              </span>
              <span className="text-2xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-fuchsia-300 to-purple-200 drop-shadow-md">
                Bites
              </span>
            </div>
            <p className="text-[9px] font-extrabold uppercase tracking-widest text-purple-300/80 -mt-1">
              Delivery da Mente
            </p>
          </div>
        </div>
      </div>

      {/* Tagline Badge Inferior */}
      <div className="mt-2.5">
        <span className="text-[10px] font-black uppercase tracking-widest text-purple-300 bg-purple-950/90 border border-purple-600/50 px-3 py-1 rounded-full shadow-lg">
          Mente Sã • Bolso Cheio 💰
        </span>
      </div>
    </div>
  );
}
