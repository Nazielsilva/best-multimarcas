import React from 'react';
import { MapPin, Phone, MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Footer({ onWhatsAppClick }) {
  return (
    <footer className="border-t border-zinc-900 bg-black pt-20 pb-10 px-4 relative overflow-hidden" role="contentinfo">
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-red-600/10 blur-[150px] rounded-full pointer-events-none" />
      
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-black mb-12 tracking-tighter"
        >
          Chique é comprar barato <span className="text-red-500" aria-hidden="true">🔥🚀</span>
        </motion.h2>
        
        {/* Card de Localização & WhatsApp */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="glass px-8 py-6 rounded-3xl mb-16 w-full max-w-xl mx-auto text-left hover:border-red-500/30 transition-colors shadow-2xl flex flex-col sm:flex-row items-center gap-6"
        >
          <div className="bg-red-500/10 p-4 rounded-2xl shrink-0 text-red-500">
            <MapPin className="w-8 h-8" aria-hidden="true" />
          </div>
          <div className="flex-grow">
            <h4 className="font-black text-zinc-100 text-lg mb-1">Loja Física em Araguatins - TO</h4>
            <address className="text-sm text-zinc-400 leading-relaxed not-italic mb-3">
              Rua Tenente Siqueira Campos, Nº 969 - B, Centro (Ao Lado Da Cacau Show).
            </address>
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
              <Phone className="w-4 h-4" />
              <span>(63) 99951-6964</span>
            </div>
          </div>
        </motion.div>
        
        <div className="border-t border-zinc-900 pt-8 flex flex-col md:flex-row items-center justify-between gap-6 text-zinc-500 text-sm font-medium">
          <p>© {new Date().getFullYear()} Best Multimarcas. Todos os direitos reservados.</p>
          <nav className="flex items-center gap-6" aria-label="Links Sociais">
            <a 
              href="https://www.instagram.com/bestmultimarcasaraguatins/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-amber-400 transition-colors flex items-center gap-1.5"
            >
              Instagram Official
            </a>
            <button 
              onClick={() => onWhatsAppClick('Fala irmão! Quero falar com um consultor da loja sobre os kits exclusivos.')}
              className="hover:text-[#25D366] transition-colors flex items-center gap-1.5 font-bold text-[#25D366]"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>WhatsApp Direct</span>
            </button>
          </nav>
        </div>
      </div>
    </footer>
  );
}
