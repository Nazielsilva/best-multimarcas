import React, { useState, useEffect } from 'react';
import { Clock, MapPin, Phone } from 'lucide-react';

export default function StoreStatus() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const checkOpenStatus = () => {
      const now = new Date();
      const day = now.getDay(); // 0: Dom, 1: Seg, ..., 6: Sáb
      const hour = now.getHours();
      const minute = now.getMinutes();
      const timeInMinutes = hour * 60 + minute;

      // Seg-Sex: 08:00 (480) - 17:30 (1050)
      if (day >= 1 && day <= 5) {
        setIsOpen(timeInMinutes >= 480 && timeInMinutes <= 1050);
      } 
      // Sáb: 08:00 (480) - 13:00 (780)
      else if (day === 6) {
        setIsOpen(timeInMinutes >= 480 && timeInMinutes <= 780);
      } 
      // Dom: Fechado
      else {
        setIsOpen(false);
      }
    };

    checkOpenStatus();
    const interval = setInterval(checkOpenStatus, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative z-20 -mt-6 mb-6 px-4">
      <div className="flex flex-wrap items-center justify-center gap-4 py-3.5 px-6 glass rounded-full max-w-fit mx-auto text-sm shadow-2xl border border-zinc-800/60 bg-zinc-900/90 backdrop-blur-md">
        <div className="flex items-center gap-2.5">
          <span className="relative flex h-3 w-3">
            {isOpen && <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>}
            <span className={`relative inline-flex rounded-full h-3 w-3 ${isOpen ? 'bg-emerald-500' : 'bg-red-500'}`}></span>
          </span>
          <span className="font-bold text-zinc-100 tracking-wide">
            {isOpen ? 'Loja Física Aberta Agora' : 'Loja Fechada - Abre às 08h'}
          </span>
        </div>
        <span className="text-zinc-700 hidden sm:inline">|</span>
        <div className="flex items-center gap-1.5 text-zinc-400 font-medium">
          <Clock className="w-4 h-4 text-amber-400" />
          <span>Seg-Sex: 08h às 17h30 | Sáb: 08h às 13h</span>
        </div>
      </div>
    </div>
  );
}
