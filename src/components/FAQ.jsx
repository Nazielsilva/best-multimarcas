import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const faqs = [
  {
    question: 'A loja física fica em qual endereço?',
    answer: 'Nossa loja fica na Rua Tenente Siqueira Campos, Nº 969 - B, Centro, Araguatins - TO (ao lado da Cacau Show). Venha nos fazer uma visita!'
  },
  {
    question: 'Vocês fazem envio para outras cidades?',
    answer: 'Sim! Enviamos para todas as cidades do Tocantins (Augustinópolis, Tocantinópolis, Sampaio, Esperantina, Palmas) e para qualquer lugar do Brasil via Correios ou Expresso.'
  },
  {
    question: 'Quais as formas de pagamento aceitas?',
    answer: 'Aceitamos Pix com aprovação imediata e parcelamos no cartão de crédito em até 12x.'
  },
  {
    question: 'Como funciona o envio do produto pelo WhatsApp?',
    answer: 'Ao clicar no botão de qualquer kit ou produto no site, você será redirecionado para o nosso WhatsApp oficial com o pedido já formatado. Nosso atendente vai confirmar o tamanho e combinar a entrega.'
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 px-4 relative max-w-4xl mx-auto" aria-labelledby="faq-heading">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-zinc-400 text-xs font-bold uppercase tracking-wider mb-3">
          <HelpCircle className="w-4 h-4 text-amber-400" />
          Tire Suas Dúvidas
        </div>
        <h2 id="faq-heading" className="text-3xl md:text-5xl font-black text-white">
          Perguntas <span className="text-red-600">Frequentes</span>
        </h2>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div 
            key={index}
            className={`glass rounded-2xl overflow-hidden border transition-all duration-300 ${openIndex === index ? 'border-amber-400/50 shadow-[0_0_20px_rgba(251,191,36,0.1)]' : 'border-zinc-800/80 hover:border-zinc-700'}`}
          >
            <button
              onClick={() => toggle(index)}
              className="w-full p-6 text-left font-bold text-base md:text-lg text-white flex items-center justify-between gap-4 group"
            >
              <span className={`transition-colors ${openIndex === index ? 'text-amber-400' : 'group-hover:text-amber-400'}`}>{faq.question}</span>
              <ChevronDown 
                className={`w-5 h-5 shrink-0 transition-transform duration-300 ${
                  openIndex === index ? 'rotate-180 text-amber-400' : 'text-zinc-500 group-hover:text-amber-400'
                }`}
              />
            </button>

            <AnimatePresence>
              {openIndex === index && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  <div className="px-6 pb-6 text-zinc-400 text-sm md:text-base leading-relaxed border-t border-amber-400/10 pt-4 mt-1 mx-6">
                    {faq.answer}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </section>
  );
}
