import React, { useRef, useEffect } from 'react';
import { Play, MessageCircle, Flame } from 'lucide-react';
import { motion } from 'framer-motion';

const reels = [
  {
    id: 1,
    title: 'A Fonte das Fontes',
    caption: 'Caimento e precisão geométrica nas costuras.',
    videoUrl: '/videos/video-1.mp4'
  },
  {
    id: 2,
    title: 'Edição Limitada',
    caption: 'Lançamentos globais chegando em primeira mão.',
    videoUrl: '/videos/video-2.mp4'
  },
  {
    id: 3,
    title: 'Design e Conforto',
    caption: 'O material fala por si mesmo. Assista em detalhes.',
    videoUrl: '/videos/video-3.mp4'
  }
];

function ReelVideo({ src }) {
  const videoRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          videoRef.current?.play().catch(() => {});
        } else {
          videoRef.current?.pause();
        }
      },
      { threshold: 0.5 }
    );

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <video 
      ref={videoRef}
      src={src} 
      loop 
      muted 
      playsInline 
      preload="none"
      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100"
    />
  );
}

export default function ReelsShowcase({ onWhatsAppClick }) {
  return (
    <section className="py-20 px-4 relative overflow-hidden" aria-labelledby="reels-heading">
      <div className="max-w-6xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-red-500 text-xs font-bold uppercase tracking-widest mb-4">
            <Flame className="w-4 h-4" />
            Se Liga no Caimento
          </div>
          <h2 id="reels-heading" className="text-3xl md:text-5xl font-black mb-4">
            Veja as Peças <span className="text-red-600">em Ação</span>
          </h2>
          <p className="text-zinc-400 text-base md:text-lg max-w-xl mx-auto">
            Confira como veste no corpo. Vídeos gravados diretamente na nossa loja física em Araguatins.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reels.map((reel, index) => (
            <motion.div 
              key={reel.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              className="glass rounded-3xl overflow-hidden group flex flex-col relative shadow-2xl hover:border-red-600/40 transition-all duration-300"
            >
              {/* Container do Vídeo Reel (Aspect Ratio 9:16 estilo Instagram) */}
              <div className="relative aspect-[9/16] bg-black overflow-hidden">
                <ReelVideo src={reel.videoUrl} />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent pointer-events-none" />

                {/* Badge de Destaque */}
                <div className="absolute top-4 left-4 bg-black/60 backdrop-blur text-white text-xs font-bold px-3 py-1 rounded-full border border-white/10 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                  REEL OFICIAL
                </div>
              </div>

              {/* Informações e Ação */}
              <div className="p-6 flex flex-col flex-grow bg-zinc-950/80 backdrop-blur-md">
                <h3 className="font-bold text-xl text-white mb-2">{reel.title}</h3>
                <p className="text-zinc-400 text-sm mb-6 flex-grow leading-relaxed">{reel.caption}</p>

                <button 
                  onClick={() => onWhatsAppClick(`Olá! Vi o vídeo "${reel.title}" no site e quero informações sobre esse kit!`)}
                  className="w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-zinc-950 font-black py-3.5 px-4 rounded-xl transition-all duration-200 shadow-lg active:scale-95"
                >
                  <MessageCircle className="w-5 h-5 fill-current" />
                  <span>Quero Esse Kit no WhatsApp</span>
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
