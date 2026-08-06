import React from 'react';
import { MessageCircle, Crown } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Hero({ onWhatsAppClick }) {
  return (
    <section className="relative pt-40 pb-20 md:pt-48 md:pb-32 px-4 overflow-hidden">
      {/* Background de Tijolinhos Autêntico da Loja */}
      <div 
        className="absolute inset-0 z-0 opacity-[0.07] mix-blend-overlay pointer-events-none bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url(/images/bermuda-jogador.jpg)' }}
      />
      
      {/* Glow Effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-red-600/15 blur-[150px] rounded-full pointer-events-none z-0" />
      
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-4xl mx-auto text-center relative z-10"
      >
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-amber-400 text-xs font-bold tracking-widest uppercase mb-8 shadow-lg"
        >
          <Crown className="w-4 h-4" aria-hidden="true" />
          A Fonte das Fontes
        </motion.div>
        
        <h2 className="text-5xl md:text-7xl lg:text-8xl font-black mb-8 leading-[1.1] tracking-tight">
          Exclusividade <br className="hidden md:block"/> 
          é na <span className="text-red-600 text-glow">01.</span>
        </h2>
        
        <p className="text-zinc-400 text-lg md:text-xl mb-12 max-w-2xl mx-auto leading-relaxed">
          A principal loja de moda masculina de Araguatins e região Bico do Papagaio. Trabalhamos com as melhores marcas do mercado para garantir que você ande sempre exclusivo e no estilo. Visite nossa loja no Centro ou peça pelo WhatsApp.
        </p>
        
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onWhatsAppClick}
          aria-label="Garantir Meu Kit no WhatsApp"
          className="group relative inline-flex items-center gap-3 bg-[#25D366] text-zinc-950 px-8 py-5 rounded-2xl font-black text-lg transition-colors hover:bg-[#22c55e] hover:shadow-[0_0_40px_rgba(37,211,102,0.4)] w-full sm:w-auto justify-center"
        >
          <MessageCircle className="w-6 h-6" aria-hidden="true" />
          <span>Garantir Meu Kit no WhatsApp</span>
        </motion.button>
      </motion.div>
    </section>
  );
}
