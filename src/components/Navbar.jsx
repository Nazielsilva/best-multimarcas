import React from 'react';
import { MessageCircle } from 'lucide-react';

export default function Navbar({ onWhatsAppClick }) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 py-4">
      <div className="max-w-6xl mx-auto glass rounded-2xl h-16 flex items-center justify-between px-6 shadow-[0_10px_30px_rgba(0,0,0,0.5)] border border-zinc-800/80 bg-zinc-900/60 backdrop-blur-xl">
        <div className="flex items-center gap-2">
          <h1 className="text-xl md:text-2xl font-black tracking-tighter">
            <span className="text-red-600 drop-shadow-[0_0_15px_rgba(220,38,38,0.5)]">BEST</span>
            <span className="text-white"> MULTIMARCAS</span>
          </h1>
        </div>
        
        <button 
          onClick={() => onWhatsAppClick('Olá! Vim pelo site da Best Multimarcas e gostaria de atendimento!')}
          aria-label="Falar no WhatsApp da Loja"
          className="group relative flex items-center gap-2.5 bg-[#25D366] hover:bg-[#20bd5a] text-zinc-950 font-black px-5 py-2 rounded-xl text-sm transition-all duration-300 active:scale-95 shadow-[0_0_15px_rgba(37,211,102,0.3)] hover:shadow-[0_0_25px_rgba(37,211,102,0.5)] overflow-hidden"
        >
          <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
          <MessageCircle className="w-5 h-5 fill-current relative z-10" />
          <span className="hidden sm:inline relative z-10">Falar com Atendente</span>
        </button>
      </div>
    </header>
  );
}
