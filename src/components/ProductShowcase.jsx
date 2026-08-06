import React, { useState } from 'react';
import { Search, Eye } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const initialProducts = [
  {
    id: 1,
    category: 'Kits VIP',
    name: 'Kit Premium Dolce & Gabbana',
    price: 'R$ 249,90',
    details: 'Camiseta Elastano Premium + Bermuda Mavelly',
    image: '/images/kit-dolce.jpg'
  },
  {
    id: 2,
    category: 'Bermudas',
    name: 'Bermudas Jogador Jorranix',
    price: 'R$ 129,90',
    details: 'Modelagem destroyed, várias lavagens',
    image: '/images/bermuda-jogador.jpg'
  },
  {
    id: 3,
    category: 'Bermudas',
    name: 'Bermuda Maurinho Premium',
    price: 'R$ 139,90',
    details: 'Qualidade sem comparação, do 36 ao 44',
    image: '/images/bermuda-maurinho.jpg'
  },
  {
    id: 4,
    category: 'Promoções',
    name: 'Coleção Lançamento',
    price: 'Ver Preço',
    details: 'Novas estampas exclusivas acabaram de chegar',
    image: '/promo-banner-new.jpg'
  }
];

const categories = ['Todos', 'Kits VIP', 'Bermudas', 'Promoções'];

export default function ProductShowcase({ onSelectProduct }) {
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProducts = initialProducts.filter((product) => {
    const matchesCategory = selectedCategory === 'Todos' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          product.details.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section className="py-24 px-4 relative" aria-labelledby="vitrine-heading">
      <div className="max-w-6xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row items-center justify-between mb-10 gap-6"
        >
          <div className="text-center md:text-left">
            <h2 id="vitrine-heading" className="text-3xl md:text-5xl font-black mb-3">
              Lançamentos <span className="text-amber-400">🥇</span>
            </h2>
            <p className="text-zinc-400 text-base md:text-lg">Os kits mais brabos da semana, qualidade garantida.</p>
          </div>

          {/* Barra de Busca Dinâmica */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-zinc-500 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Buscar produtos ou marcas..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-zinc-900 border border-zinc-800 rounded-xl pl-11 pr-4 py-3 text-sm text-white focus:outline-none focus:border-red-600 transition-colors"
            />
          </div>
        </motion.div>

        {/* Filtros por Categoria com Layout Animation */}
        <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`relative px-5 py-2.5 rounded-xl font-bold text-xs md:text-sm transition-all duration-200 z-10 ${
                selectedCategory === cat ? 'text-white shadow-lg shadow-red-600/30' : 'glass text-zinc-400 hover:text-white hover:border-zinc-700'
              }`}
            >
              {selectedCategory === cat && (
                <motion.div
                  layoutId="activeCategory"
                  className="absolute inset-0 bg-red-600 rounded-xl"
                  initial={false}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  style={{ zIndex: -1 }}
                />
              )}
              {cat}
            </button>
          ))}
        </div>
        
        {/* Grid de Produtos Animado */}
        <motion.div layout className="min-h-[400px]">
          <AnimatePresence mode="popLayout">
            {filteredProducts.length === 0 ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="text-center py-16 glass rounded-3xl w-full"
              >
                <p className="text-zinc-400 text-lg">Nenhum produto encontrado para essa busca.</p>
              </motion.div>
            ) : (
              <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {filteredProducts.map((product) => (
                  <motion.div 
                    layout
                    key={product.id} 
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    className="group flex flex-col glass rounded-3xl overflow-hidden hover:border-zinc-700/80 transition-colors duration-300 relative cursor-pointer"
                    onClick={() => onSelectProduct(product)}
                  >
                    {/* Imagem */}
                    <div className="relative aspect-[4/5] bg-zinc-900 overflow-hidden">
                      <img 
                        src={product.image} 
                        alt={product.name} 
                        className="w-full h-full object-cover object-center transform group-hover:scale-110 transition-transform duration-700 ease-in-out"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent opacity-60" />
                      
                      {/* Selo Exclusivo */}
                      <div className="absolute top-4 right-4 bg-zinc-950/80 backdrop-blur text-amber-400 text-xs font-black tracking-widest px-3 py-1.5 rounded-full border border-amber-400/20 shadow-lg">
                        EXCLUSIVO
                      </div>

                      {/* Overlay ao passar o mouse */}
                      <div className="absolute inset-0 bg-red-600/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
                        <div className="bg-zinc-950/90 text-white font-bold text-xs px-4 py-2 rounded-full flex items-center gap-2 shadow-xl border border-white/20">
                          <Eye className="w-4 h-4 text-amber-400" />
                          <span>Ver Detalhes e Tamanhos</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Conteúdo */}
                    <div className="p-6 flex flex-col flex-grow relative z-10 bg-zinc-950/50 backdrop-blur-sm -mt-10 pt-10 rounded-t-3xl border-t border-zinc-800/50">
                      <h3 className="font-bold text-xl mb-1 leading-tight text-white">{product.name}</h3>
                      <p className="text-zinc-400 text-xs mb-4 h-8">{product.details}</p>
                      <p className="text-red-500 font-black text-2xl mb-6">
                        {product.price}
                      </p>
                      
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectProduct(product);
                        }}
                        className="w-full flex items-center justify-center gap-2 bg-white hover:bg-zinc-200 text-zinc-950 px-4 py-3.5 rounded-xl font-bold transition-all text-sm shadow-md"
                      >
                        Ver Tamanhos Disponíveis
                      </button>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
