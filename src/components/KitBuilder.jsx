import React, { useState } from 'react';
import { Check, MessageCircle, Sparkles, ChevronRight, ChevronLeft, ShoppingBag } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// ─── PRODUTOS REAIS DA LOJA ─────────────────────────────────────────────────
const steps = [
  {
    step: 1,
    label: 'Camiseta',
    emoji: '👕',
    items: [
      { id: 'c1', name: 'Gola Polo Boss', price: 75, image: '/promo-crops/gola-polo.png', tagline: 'Estilo clássico que nunca decepciona.' },
      { id: 'c2', name: 'Camisa Básica Nike', price: 20, image: '/promo-crops/camisa-basica.png', tagline: 'Estampa exclusiva, preço impossível.' },
      { id: 'c3', name: 'Oversized Malha Suedine', price: 75, image: '/promo-crops/malha-suedine.png', tagline: 'O oversized pesado que fecha qualquer look.' },
      { id: 'c4', name: 'Camisa Malha Gold 50.1', price: 70, image: '/promo-crops/malha-gold.png', tagline: 'Tecido premium — conforto o dia todo.' },
      { id: 'c5', name: 'Peruanas Fio 40.1', price: 50, image: '/promo-crops/peruanas.png', tagline: "Levi's legítima. Seu guarda-roupa agradece." },
    ]
  },
  {
    step: 2,
    label: 'Bermuda',
    emoji: '🩳',
    items: [
      { id: 'b1', name: 'Bermuda Jeans Tradicional', price: 50, image: '/promo-crops/bermuda-jeans.png', tagline: 'O jeans que as pessoas param na rua pra perguntar onde comprou.' },
      { id: 'b2', name: 'Cargos 2 Bolsos', price: 50, image: '/promo-crops/cargos-2.png', tagline: 'Limpa, versátil e pesada. Combina com tudo.' },
      { id: 'b3', name: 'Cargos 4 Bolsos', price: 60, image: '/promo-crops/cargos-4.png', tagline: 'Quatro bolsos pra guardar tudo que importa.' },
      { id: 'b4', name: 'Bermuda Jogador Original', price: 85, image: '/promo-crops/bermuda-jogador.png', tagline: 'Pesada, escura e impossível de ignorar.' },
    ]
  },
  {
    step: 3,
    label: 'Tamanho',
    emoji: '📏',
    sizes: ['P', 'M', 'G', 'GG', 'XGG'],
  }
];

const DISCOUNT = 0.10;

export default function KitBuilder({ onWhatsAppClick }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedShirt, setSelectedShirt] = useState(null);
  const [selectedShort, setSelectedShort] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [direction, setDirection] = useState(1);

  const stepData = steps[currentStep];
  const isLastStep = currentStep === steps.length - 1;
  const isFirstStep = currentStep === 0;

  const totalOriginal = (selectedShirt?.price || 0) + (selectedShort?.price || 0);
  const totalDiscount = totalOriginal * (1 - DISCOUNT);

  const canAdvance = () => {
    if (currentStep === 0) return selectedShirt !== null;
    if (currentStep === 1) return selectedShort !== null;
    if (currentStep === 2) return selectedSize !== null;
    return false;
  };

  const goNext = () => {
    if (!canAdvance()) return;
    setDirection(1);
    setCurrentStep(s => s + 1);
  };

  const goPrev = () => {
    setDirection(-1);
    setCurrentStep(s => s - 1);
  };

  const handleSendKit = () => {
    const text = `Olá! Montei meu Kit VIP no site da Best Multimarcas 🔥\n\n👕 *Camiseta:* ${selectedShirt.name}\n🩳 *Bermuda:* ${selectedShort.name}\n📏 *Tamanho:* ${selectedSize}\n\n💰 *Total com 10% OFF:* R$ ${totalDiscount.toFixed(2).replace('.', ',')}\n\nQuero confirmar meu pedido!`;
    onWhatsAppClick(text);
  };

  const slideVariants = {
    enter: (dir) => ({ x: dir > 0 ? 60 : -60, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir) => ({ x: dir > 0 ? -60 : 60, opacity: 0 }),
  };

  return (
    <section className="py-20 px-4 relative" aria-labelledby="kit-builder-heading">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 text-amber-400 text-xs font-black uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" /> Combo Exclusivo — 10% OFF
          </div>
          <h2 id="kit-builder-heading" className="text-4xl md:text-6xl font-black tracking-tighter mb-3">
            Monte Seu <span className="text-amber-400">Kit VIP</span>
          </h2>
          <p className="text-zinc-400">Escolha sua camiseta, bermuda e tamanho — a gente garante o desconto.</p>
        </motion.div>

        {/* Progress Bar */}
        <div className="flex items-center justify-center gap-3 mb-10">
          {steps.map((s, i) => (
            <React.Fragment key={s.step}>
              <button
                onClick={() => { if (i < currentStep) { setDirection(-1); setCurrentStep(i); } }}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-all duration-300 ${
                  i === currentStep
                    ? 'bg-amber-500 text-black shadow-[0_0_20px_rgba(245,158,11,0.4)]'
                    : i < currentStep
                    ? 'bg-zinc-800 text-amber-400 cursor-pointer hover:bg-zinc-700'
                    : 'bg-zinc-900 text-zinc-600 cursor-default'
                }`}
              >
                {i < currentStep ? <Check className="w-3 h-3" /> : <span>{s.emoji}</span>}
                {s.label}
              </button>
              {i < steps.length - 1 && (
                <div className={`w-8 h-0.5 rounded-full transition-colors duration-500 ${i < currentStep ? 'bg-amber-400' : 'bg-zinc-800'}`} />
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Main Card */}
        <div className="glass rounded-[2rem] border border-zinc-800/80 overflow-hidden shadow-2xl">

          {/* Resumo do kit selecionado (sticky top) */}
          {(selectedShirt || selectedShort) && (
            <div className="px-6 pt-4 pb-3 border-b border-zinc-800/60 flex gap-4 items-center bg-zinc-950/60 backdrop-blur-sm">
              {selectedShirt && (
                <div className="flex items-center gap-2">
                  <img src={selectedShirt.image} alt={selectedShirt.name} className="w-10 h-10 rounded-lg object-cover border border-zinc-700" />
                  <div>
                    <p className="text-[10px] text-zinc-500">Camiseta</p>
                    <p className="text-xs font-bold text-white leading-tight">{selectedShirt.name}</p>
                  </div>
                </div>
              )}
              {selectedShirt && selectedShort && <ChevronRight className="w-4 h-4 text-zinc-700 shrink-0" />}
              {selectedShort && (
                <div className="flex items-center gap-2">
                  <img src={selectedShort.image} alt={selectedShort.name} className="w-10 h-10 rounded-lg object-cover border border-zinc-700" />
                  <div>
                    <p className="text-[10px] text-zinc-500">Bermuda</p>
                    <p className="text-xs font-bold text-white leading-tight">{selectedShort.name}</p>
                  </div>
                </div>
              )}
              {selectedShort && selectedSize && <ChevronRight className="w-4 h-4 text-zinc-700 shrink-0" />}
              {selectedSize && (
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-lg border border-amber-400/50 bg-amber-400/10 flex items-center justify-center">
                    <span className="text-amber-400 font-black text-sm">{selectedSize}</span>
                  </div>
                  <div>
                    <p className="text-[10px] text-zinc-500">Tamanho</p>
                    <p className="text-xs font-bold text-white">{selectedSize}</p>
                  </div>
                </div>
              )}

              {totalOriginal > 0 && (
                <div className="ml-auto text-right shrink-0">
                  <p className="text-zinc-600 line-through text-xs">R$ {totalOriginal.toFixed(2).replace('.', ',')}</p>
                  <p className="text-amber-400 font-black text-lg">R$ {totalDiscount.toFixed(2).replace('.', ',')}</p>
                </div>
              )}
            </div>
          )}

          {/* Step Content */}
          <div className="p-6 md:p-8 min-h-[400px] relative overflow-hidden">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={currentStep}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              >
                {/* Steps 0 & 1: product grid */}
                {(currentStep === 0 || currentStep === 1) && (
                  <div>
                    <h3 className="text-lg font-black text-white mb-1">
                      {stepData.emoji} Escolha a {stepData.label}
                    </h3>
                    <p className="text-zinc-500 text-sm mb-6">Clique na peça que você quer no kit</p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {stepData.items.map((item) => {
                        const isSelected = currentStep === 0
                          ? selectedShirt?.id === item.id
                          : selectedShort?.id === item.id;
                        return (
                          <button
                            key={item.id}
                            onClick={() => {
                              currentStep === 0 ? setSelectedShirt(item) : setSelectedShort(item);
                            }}
                            className={`group relative rounded-2xl overflow-hidden border-2 transition-all duration-300 flex flex-col text-left ${
                              isSelected
                                ? 'border-amber-400 shadow-[0_0_20px_rgba(245,158,11,0.3)]'
                                : 'border-zinc-800 hover:border-zinc-600'
                            }`}
                          >
                            {/* Foto */}
                            <div className="relative aspect-square bg-zinc-900">
                              <img
                                src={item.image}
                                alt={item.name}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                              />
                              {isSelected && (
                                <div className="absolute inset-0 bg-amber-500/20 flex items-center justify-center">
                                  <div className="bg-amber-500 rounded-full p-1.5 shadow-lg">
                                    <Check className="w-4 h-4 text-black" />
                                  </div>
                                </div>
                              )}
                            </div>
                            {/* Info */}
                            <div className={`p-3 flex-grow transition-colors ${isSelected ? 'bg-amber-500/10' : 'bg-zinc-900/60'}`}>
                              <p className="text-xs font-bold text-white leading-tight mb-1">{item.name}</p>
                              <p className="text-amber-400 font-black text-sm">R$ {item.price}</p>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Step 2: Tamanho */}
                {currentStep === 2 && (
                  <div className="flex flex-col items-center text-center">
                    <h3 className="text-2xl font-black text-white mb-2">📏 Qual o seu tamanho?</h3>
                    <p className="text-zinc-500 text-sm mb-8">Serve tanto para a camiseta quanto para a bermuda</p>
                    <div className="flex flex-wrap justify-center gap-4">
                      {stepData.sizes.map((size) => (
                        <button
                          key={size}
                          onClick={() => setSelectedSize(size)}
                          className={`w-20 h-20 rounded-2xl font-black text-xl border-2 transition-all duration-200 ${
                            selectedSize === size
                              ? 'border-amber-400 bg-amber-400/10 text-amber-400 shadow-[0_0_20px_rgba(245,158,11,0.3)] scale-110'
                              : 'border-zinc-800 bg-zinc-900 text-zinc-400 hover:border-zinc-600 hover:scale-105'
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>

                    {/* Preview final do kit */}
                    {selectedShirt && selectedShort && (
                      <div className="mt-10 p-4 rounded-2xl bg-zinc-900/60 border border-zinc-800 flex gap-4 items-center max-w-sm">
                        <img src={selectedShirt.image} alt="" className="w-16 h-16 rounded-xl object-cover border border-zinc-700" />
                        <span className="text-zinc-600 font-black text-xl">+</span>
                        <img src={selectedShort.image} alt="" className="w-16 h-16 rounded-xl object-cover border border-zinc-700" />
                        <div className="ml-auto text-right">
                          <p className="text-zinc-500 text-xs line-through">R$ {totalOriginal.toFixed(2).replace('.', ',')}</p>
                          <p className="text-amber-400 font-black text-2xl">R$ {totalDiscount.toFixed(2).replace('.', ',')}</p>
                          <span className="text-[10px] text-amber-400/80 font-bold">10% OFF no kit</span>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation */}
          <div className="px-6 pb-6 md:px-8 md:pb-8 flex items-center justify-between gap-4 border-t border-zinc-800/60 pt-5">
            <button
              onClick={goPrev}
              disabled={isFirstStep}
              className="flex items-center gap-2 text-zinc-400 hover:text-white disabled:opacity-0 disabled:pointer-events-none transition-colors font-bold text-sm"
            >
              <ChevronLeft className="w-4 h-4" /> Voltar
            </button>

            {!isLastStep ? (
              <button
                onClick={goNext}
                disabled={!canAdvance()}
                className={`flex items-center gap-2 px-8 py-3.5 rounded-2xl font-black text-sm transition-all duration-300 ${
                  canAdvance()
                    ? 'bg-amber-500 hover:bg-amber-400 text-black shadow-[0_0_20px_rgba(245,158,11,0.3)] hover:shadow-[0_0_30px_rgba(245,158,11,0.5)]'
                    : 'bg-zinc-800 text-zinc-600 cursor-not-allowed'
                }`}
              >
                Próximo passo <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={handleSendKit}
                disabled={!canAdvance()}
                className={`flex items-center gap-3 px-8 py-3.5 rounded-2xl font-black text-sm transition-all duration-300 ${
                  canAdvance()
                    ? 'bg-[#25D366] hover:bg-[#20bd5a] text-black shadow-xl'
                    : 'bg-zinc-800 text-zinc-600 cursor-not-allowed'
                }`}
              >
                <MessageCircle className="w-5 h-5 fill-current" />
                Garantir Kit no WhatsApp
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
