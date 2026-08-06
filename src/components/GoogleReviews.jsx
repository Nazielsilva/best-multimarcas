import React from 'react';
import { Star, Quote, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';

const reviews = [
  {
    id: 1,
    name: 'Mateus Silva',
    city: 'Araguatins - TO',
    rating: 5,
    comment: 'Melhor atendimento de Araguatins disparado! As bermudas jogador são diferenciadas demais, pano pesado e gola ribana no padrão.'
  },
  {
    id: 2,
    name: 'Lucas Eduardo',
    city: 'Augustinópolis - TO',
    rating: 5,
    comment: 'Pedi pelo WhatsApp e entregaram super rápido aqui na minha cidade! A malha suedine é de outro nível. Recomendo demais!'
  },
  {
    id: 3,
    name: 'Gabriel Costa',
    city: 'Tocantinópolis - TO',
    rating: 5,
    comment: 'A fonte das fontes mesmo. Roupa de qualidade de grife com preço justo. Sou cliente fiel já!'
  }
];

export default function GoogleReviews() {
  return (
    <section className="py-20 px-4 relative overflow-hidden" aria-labelledby="reviews-heading">
      <div className="max-w-6xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          {/* Badge 5.0 Google Maps */}
          <div className="inline-flex items-center gap-2 bg-zinc-900 border border-zinc-800 px-5 py-2 rounded-full mb-6 shadow-xl">
            <div className="flex text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-current" />
              ))}
            </div>
            <span className="font-black text-white text-sm">5.0 no Google Maps</span>
            <span className="text-zinc-500 text-xs">(Araguatins - TO)</span>
          </div>

          <h2 id="reviews-heading" className="text-3xl md:text-5xl font-black mb-4">
            Quem Compra <span className="text-amber-400">Recomenda</span>
          </h2>
          <p className="text-zinc-400 text-base md:text-lg max-w-lg mx-auto">
            Veja a opinião real de quem já é cliente e veste os kits da 01.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((review, index) => (
            <motion.div 
              key={review.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="glass p-6 md:p-8 rounded-3xl relative flex flex-col justify-between border border-zinc-800/80 hover:border-amber-400/50 hover:shadow-[0_10px_30px_rgba(251,191,36,0.1)] hover:-translate-y-1.5 transition-all duration-300 group"
            >
              <Quote className="w-8 h-8 text-amber-400/20 absolute top-6 right-6" />

              <div>
                <div className="flex text-amber-400 mb-4">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <p className="text-zinc-300 text-sm leading-relaxed mb-6 italic">
                  "{review.comment}"
                </p>
              </div>

              <div className="border-t border-zinc-800/60 pt-4 flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-white text-sm">{review.name}</h4>
                  <div className="flex items-center gap-1 text-xs text-zinc-500 mt-0.5">
                    <MapPin className="w-3 h-3 text-red-500" />
                    <span>{review.city}</span>
                  </div>
                </div>
                <span className="text-xs bg-emerald-500/10 text-emerald-400 font-bold px-2.5 py-1 rounded-full border border-emerald-500/20">
                  Cliente Verificado
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
