import React, { useState } from 'react';
import { X, Check, MessageCircle, ShieldCheck, Truck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ProductModal({ product, onClose, onWhatsAppClick }) {
  const [selectedSize, setSelectedSize] = useState('M');

  if (!product) return null;

  const sizes = product.name.includes('Bermuda') 
    ? ['38', '40', '42', '44'] 
    : ['P', 'M', 'G', 'GG'];

  const handleOrder = () => {
    const text = `Opa! Quero o produto "${product.name}" no Tamanho ${selectedSize}.`;
    onWhatsAppClick(text);
  };

  return (
    <AnimatePresence>
      {/* Container Principal: Items-end no Mobile (Bottom Sheet), Center no Desktop */}
      <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center p-0 md:p-4 bg-zinc-950/80 backdrop-blur-sm">
        <motion.div 
          initial={{ opacity: 0, y: "100%" }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: "100%" }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className="glass-panel w-full md:max-w-3xl rounded-t-[2rem] md:rounded-[2rem] overflow-hidden shadow-2xl relative flex flex-col md:flex-row max-h-[90vh] md:max-h-[80vh] bg-zinc-950 border-t border-white/10 md:border-white/10"
        >
          {/* Botão Fechar */}
          <button 
            onClick={onClose}
            aria-label="Fechar Modal"
            className="absolute top-4 right-4 z-20 bg-zinc-900/80 backdrop-blur border border-white/10 text-white p-2 rounded-full hover:bg-white hover:text-zinc-950 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Grip Handle para Mobile (Visual apenas) */}
          <div className="absolute top-2 left-1/2 -translate-x-1/2 w-12 h-1.5 bg-zinc-700 rounded-full md:hidden z-20" />

          {/* Imagem do Produto */}
          <div className="w-full md:w-1/2 aspect-square md:aspect-auto relative bg-zinc-900 overflow-hidden shrink-0">
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 left-4 bg-red-600 text-white font-black text-xs px-3 py-1 rounded-full uppercase tracking-wider shadow-lg">
              Destaque 01
            </div>
            {/* Fade para mesclar imagem e conteúdo no mobile */}
            <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-zinc-950 to-transparent md:hidden" />
          </div>

          {/* Informações & Tamanhos */}
          <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col justify-between overflow-y-auto">
            <div>
              <h3 className="text-2xl md:text-3xl font-black text-white mb-2 leading-tight tracking-tight">{product.name}</h3>
              <p className="text-zinc-400 text-sm md:text-base mb-4 leading-relaxed">{product.details}</p>
              <div className="text-red-500 font-black text-2xl md:text-3xl mb-6">
                {product.price}
              </div>

              {/* Seletor de Tamanho */}
              <div className="mb-6">
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2">
                  Selecione o Tamanho:
                </label>
                <div className="flex gap-2">
                  {sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`flex-1 py-2.5 rounded-xl font-bold text-sm border transition-all ${
                        selectedSize === size
                          ? 'border-red-600 bg-red-600/20 text-white'
                          : 'border-zinc-800 bg-zinc-900 text-zinc-400 hover:border-zinc-700'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Garantias */}
              <div className="space-y-2 text-xs md:text-sm text-zinc-400 mb-6">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Garantia de Qualidade Best Multimarcas</span>
                </div>
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-amber-400" />
                  <span>Envio Imediato para todo o Brasil</span>
                </div>
              </div>
            </div>

            {/* Ação */}
            <button
              onClick={handleOrder}
              className="w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-zinc-950 font-black py-4 px-6 rounded-xl transition-all shadow-xl active:scale-95 text-base"
            >
              <MessageCircle className="w-5 h-5 fill-current" />
              <span>Pedir Tamanho {selectedSize} no WhatsApp</span>
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
