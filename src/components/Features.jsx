import React from 'react';
import { Truck, CreditCard, Lock, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';

const features = [
  { icon: <Truck className="w-7 h-7" />, title: 'Enviamos para todo 🇧🇷', desc: 'Frete rápido e seguro' },
  { icon: <CreditCard className="w-7 h-7" />, title: 'Parcelamos nos cartões', desc: 'Em até 12x' },
  { icon: <Lock className="w-7 h-7" />, title: 'Compra 100% segura', desc: 'Seus dados protegidos' },
  { icon: <MapPin className="w-7 h-7" />, title: 'Loja Física', desc: 'Em Araguatins - TO' }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

export default function Features() {
  return (
    <section className="relative z-20 py-12 px-4" aria-label="Benefícios da Loja">
      <div className="max-w-6xl mx-auto">
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {features.map((feature, idx) => (
            <motion.div 
              key={idx} 
              variants={itemVariants}
              className="glass rounded-2xl p-6 flex flex-col items-center text-center group hover:bg-zinc-800/50 transition-colors duration-300"
            >
              <div className="text-red-500 mb-4 group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>
              <h3 className="font-bold text-sm md:text-base text-zinc-100 mb-1">{feature.title}</h3>
              <p className="text-xs text-zinc-500">{feature.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
