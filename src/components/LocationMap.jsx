import React from 'react';
import { MapPin, Navigation } from 'lucide-react';

export default function LocationMap() {
  const address = "Best Multimarcas, Araguatins - TO";
  const query = encodeURIComponent(address);
  const mapUrl = `https://maps.google.com/maps?q=${query}&t=&z=16&ie=UTF8&iwloc=&output=embed`;

  const openGoogleMaps = () => {
    window.open(`https://www.google.com/maps/search/?api=1&query=${query}`, '_blank');
  };

  return (
    <section className="py-20 px-4 relative max-w-6xl mx-auto" aria-labelledby="location-heading">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-zinc-400 text-xs font-bold uppercase tracking-wider mb-3">
          <MapPin className="w-4 h-4 text-red-500" />
          Como Chegar
        </div>
        <h2 id="location-heading" className="text-3xl md:text-5xl font-black text-white">
          Nossa <span className="text-red-600">Localização</span>
        </h2>
      </div>

      <div className="glass rounded-3xl overflow-hidden border border-zinc-800/80 shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative">
        <div className="flex flex-col lg:flex-row">
          
          {/* Informações */}
          <div className="p-8 lg:p-12 lg:w-1/3 flex flex-col justify-center bg-zinc-900/80 relative z-20 shadow-[20px_0_30px_rgba(0,0,0,0.3)]">
            <div className="w-12 h-12 bg-red-500/10 rounded-2xl flex items-center justify-center mb-6">
              <MapPin className="w-6 h-6 text-red-500" />
            </div>
            <h3 className="text-2xl font-black text-white mb-4">Best Multimarcas</h3>
            <p className="text-zinc-400 leading-relaxed mb-8">
              Rua Tenente Siqueira Campos, Nº 969 - B, Centro.<br />
              <span className="text-sm text-zinc-500 mt-2 block">(Ao lado da Cacau Show)</span><br />
              Araguatins - TO
            </p>
            
            <button 
              onClick={openGoogleMaps}
              className="group flex items-center justify-center gap-3 w-full bg-red-600 hover:bg-red-500 text-white font-black px-6 py-4 rounded-xl text-sm transition-all duration-300 active:scale-95 shadow-[0_0_15px_rgba(220,38,38,0.3)] hover:shadow-[0_0_25px_rgba(220,38,38,0.5)]"
            >
              <Navigation className="w-5 h-5 group-hover:animate-bounce" />
              Traçar Rota no Mapa
            </button>
          </div>

          {/* Mapa Iframe */}
          <div className="h-[400px] lg:h-[500px] lg:w-2/3 relative bg-zinc-950">
            <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_50px_rgba(0,0,0,0.8)] z-10"></div>
            <iframe
              src={mapUrl}
              width="100%"
              height="100%"
              style={{ border: 0, filter: 'grayscale(0.5) invert(100%) hue-rotate(180deg) brightness(95%) contrast(85%) opacity(0.8)' }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Mapa da Loja Best Multimarcas"
              className="w-full h-full object-cover"
            ></iframe>
          </div>
          
        </div>
      </div>
    </section>
  );
}
