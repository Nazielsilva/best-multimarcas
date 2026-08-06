import React, { useState } from 'react';
import { Tag, ShoppingBag, Maximize2, X, ChevronDown, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const promoItems = [
  { id: 1, name: 'Gola Polo', oldPrice: 85, newPrice: 75, image: '/promo-crops/gola-polo.png',
    tagline: 'O clássico que nunca sai de moda. Do churrasco ao rolê noturno.' },
  { id: 2, name: 'Camisa Básica', oldPrice: 25, newPrice: 20, image: '/promo-crops/camisa-basica.png',
    tagline: 'Estampa exclusiva que ninguém tem. O tipo de peça que vira assunto.' },
  { id: 3, name: 'Peruanas Fio 40.1', oldPrice: 65, newPrice: 50, image: '/promo-crops/peruanas.png',
    tagline: 'Levi\'s legítima por 50 reais. Seu guarda-roupa vai te agradecer.' },
  { id: 4, name: 'Oversized Malha Suedine', oldPrice: 85, newPrice: 75, image: '/promo-crops/malha-suedine.png',
    tagline: 'O oversized que encaixa em qualquer corpo. Nike no peito, atitude no look.' },
  { id: 5, name: 'Camisa Malha Gold 50.1', oldPrice: 85, newPrice: 70, image: '/promo-crops/malha-gold.png',
    tagline: 'Tecido premium que fica bom até sem passar. Praticidade com estilo.' },
  { id: 6, name: 'Cargos 4 Bolsos', oldPrice: 75, newPrice: 60, image: '/promo-crops/cargos-4.png',
    tagline: 'Quatro bolsos pra guardar tudo que importa. Funcional e estiloso.' },
  { id: 7, name: 'Bermuda Jeans Tradicional', oldPrice: 65, newPrice: 50, image: '/promo-crops/bermuda-jeans.png',
    tagline: 'O jeans destroyed que as pessoas param na rua pra perguntar onde comprou.' },
  { id: 8, name: 'Cargos 2 Bolsos', oldPrice: 65, newPrice: 50, image: '/promo-crops/cargos-2.png',
    tagline: 'Limpa, versátil e pesada. A cargo que combina com qualquer camisa.' },
  { id: 9, name: 'Bermuda Jogador Original', oldPrice: 95, newPrice: 85, image: '/promo-crops/bermuda-jogador.png',
    tagline: 'O jeans com cara de edição limitada. Pesada, escura e impossível de ignorar.' },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.07 }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 60, scale: 0.9 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', stiffness: 200, damping: 20 } }
};

export default function PromoBanner({ onWhatsAppClick }) {
  const [catalogOpen, setCatalogOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  return (
    <section className="py-20 px-4 relative z-10 overflow-hidden" aria-label="Promoção Best Multimarcas">
      
      {/* HERO DA PROMOÇÃO — sempre visível */}
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative rounded-[2.5rem] overflow-hidden"
        >
          {/* Fundo com glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 via-zinc-950 to-black" />
          <div className="absolute -top-20 -left-20 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />
          
          {/* Textura de grid sutil */}
          <div className="absolute inset-0 opacity-[0.03]" style={{
            backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
            backgroundSize: '40px 40px'
          }} />

          <div className="relative z-10 px-8 py-16 md:py-24 flex flex-col items-center text-center gap-6">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="flex items-center gap-2 bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-black tracking-widest px-4 py-2 rounded-full uppercase"
            >
              <Zap className="w-3 h-3 fill-amber-400" />
              Promoção relâmpago — tempo limitado
            </motion.div>

            {/* Título */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-5xl md:text-8xl font-black tracking-tighter leading-none"
            >
              <span className="text-white">TODA LOJA</span><br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-red-500">
                EM PROMOÇÃO
              </span>
            </motion.h2>

            {/* Subtítulo */}
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-zinc-400 text-lg max-w-xl"
            >
              9 peças selecionadas com até <span className="text-white font-bold">45% OFF</span>.
              Válido no Pix ou Dinheiro. Cartão com taxa mínima.
            </motion.p>

            {/* Contador de peças */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="flex items-center gap-6 py-6 border-y border-zinc-800/60 w-full max-w-sm"
            >
              {[
                { label: 'Peças', value: '9' },
                { label: 'Desconto Médio', value: '28%' },
                { label: 'Pagamento', value: 'Pix' },
              ].map(stat => (
                <div key={stat.label} className="flex-1 text-center">
                  <div className="text-3xl font-black text-white">{stat.value}</div>
                  <div className="text-zinc-500 text-xs mt-1">{stat.label}</div>
                </div>
              ))}
            </motion.div>

            {/* Botão de revelar */}
            <motion.button
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              onClick={() => setCatalogOpen(prev => !prev)}
              className="group relative overflow-hidden bg-amber-500 hover:bg-amber-400 text-black font-black text-lg px-12 py-5 rounded-2xl transition-colors shadow-[0_0_40px_rgba(245,158,11,0.4)] hover:shadow-[0_0_60px_rgba(245,158,11,0.6)] flex items-center gap-3"
            >
              <span>{catalogOpen ? 'FECHAR CATÁLOGO' : 'VER CATÁLOGO COMPLETO'}</span>
              <motion.div animate={{ rotate: catalogOpen ? 180 : 0 }} transition={{ duration: 0.3 }}>
                <ChevronDown className="w-6 h-6" />
              </motion.div>
              {/* Shimmer */}
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            </motion.button>
          </div>
        </motion.div>

        {/* CATÁLOGO — aparece ao clicar */}
        <AnimatePresence>
          {catalogOpen && (
            <motion.div
              key="catalog"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden"
            >
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-2 md:grid-cols-3 gap-4 pt-8"
              >
                {promoItems.map((item) => (
                  <motion.div
                    key={item.id}
                    variants={cardVariants}
                    className="group relative glass rounded-3xl overflow-hidden border border-zinc-800/80 hover:border-amber-500/40 transition-all duration-300 hover:shadow-[0_10px_40px_rgba(245,158,11,0.12)] cursor-pointer flex flex-col"
                    onClick={() => setSelectedItem(item)}
                  >
                    {/* Badge desconto */}
                    <div className="absolute top-3 left-3 z-10 bg-red-600 text-white text-[10px] font-black px-2 py-1 rounded-lg shadow-lg">
                      -{Math.round((1 - item.newPrice / item.oldPrice) * 100)}% OFF
                    </div>

                    {/* Imagem */}
                    <div className="relative aspect-square bg-zinc-900 overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-transparent" />
                      <div className="absolute inset-0 bg-amber-500/0 group-hover:bg-amber-500/10 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                        <div className="bg-black/70 backdrop-blur-sm text-white text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 border border-white/10">
                          <Maximize2 className="w-3 h-3" /> Ver detalhes
                        </div>
                      </div>
                    </div>

                    {/* Info */}
                    <div className="p-4 flex flex-col flex-grow">
                      <h3 className="font-black text-sm text-white leading-tight mb-1">{item.name}</h3>
                      <p className="text-zinc-500 text-xs leading-snug mb-3 flex-grow line-clamp-2">{item.tagline}</p>
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-zinc-600 line-through text-xs">R$ {item.oldPrice}</span>
                          <span className="text-amber-500 font-black text-xl ml-2">R$ {item.newPrice}</span>
                        </div>
                      </div>
                      <button
                        onClick={(e) => { e.stopPropagation(); onWhatsAppClick(`Opa! Quero a promoção: ${item.name} por R$ ${item.newPrice}! Ainda tem disponível?`); }}
                        className="mt-3 w-full bg-zinc-800 hover:bg-[#25D366] text-white hover:text-black text-xs font-bold py-2.5 rounded-xl transition-all flex items-center justify-center gap-1.5"
                      >
                        <Tag className="w-3 h-3" /> Comprar
                      </button>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* MODAL DE DETALHE */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/95 backdrop-blur-md"
            onClick={() => setSelectedItem(null)}
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0, y: 40 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.85, opacity: 0, y: 40 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              className="relative w-full max-w-md glass rounded-[2rem] overflow-hidden border border-zinc-700/50 shadow-2xl"
              onClick={e => e.stopPropagation()}
            >
              {/* Botão fechar */}
              <button
                onClick={() => setSelectedItem(null)}
                className="absolute top-4 right-4 z-10 bg-zinc-900/80 backdrop-blur text-white p-2 rounded-full hover:bg-red-600 transition-colors border border-zinc-700/50"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Badge */}
              <div className="absolute top-4 left-4 z-10 bg-red-600 text-white text-xs font-black px-3 py-1 rounded-full">
                -{Math.round((1 - selectedItem.newPrice / selectedItem.oldPrice) * 100)}% OFF
              </div>

              {/* Imagem */}
              <div className="aspect-square bg-zinc-900 overflow-hidden">
                <img src={selectedItem.image} alt={selectedItem.name} className="w-full h-full object-cover" />
              </div>

              {/* Conteúdo */}
              <div className="p-6">
                <h3 className="font-black text-2xl text-white mb-2">{selectedItem.name}</h3>
                <p className="text-zinc-400 text-sm leading-relaxed mb-6 italic">"{selectedItem.tagline}"</p>

                <div className="flex items-baseline gap-3 mb-6">
                  <span className="text-zinc-600 line-through">R$ {selectedItem.oldPrice},00</span>
                  <span className="text-amber-500 font-black text-4xl">R$ {selectedItem.newPrice}</span>
                </div>

                <p className="text-xs text-zinc-600 mb-4">✓ Válido no Pix ou Dinheiro &nbsp;|&nbsp; Cartão com taxa mínima</p>

                <button
                  onClick={() => { setSelectedItem(null); onWhatsAppClick(`Opa! Quero a promoção: ${selectedItem.name} por R$ ${selectedItem.newPrice}!`); }}
                  className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-black font-black py-4 rounded-xl shadow-lg flex justify-center items-center gap-2 transition-colors text-lg"
                >
                  <ShoppingBag className="w-5 h-5" />
                  EU QUERO ESSA PEÇA!
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
