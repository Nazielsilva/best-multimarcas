import React, { useState, Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import StoreStatus from './components/StoreStatus';
import Features from './components/Features';
import Footer from './components/Footer';

// Componentes pesados (Lazy Loading)
const ReelsShowcase = lazy(() => import('./components/ReelsShowcase'));
const ProductShowcase = lazy(() => import('./components/ProductShowcase'));
const KitBuilder = lazy(() => import('./components/KitBuilder'));
const PromoBanner = lazy(() => import('./components/PromoBanner'));
const GoogleReviews = lazy(() => import('./components/GoogleReviews'));
const FAQ = lazy(() => import('./components/FAQ'));
const LocationMap = lazy(() => import('./components/LocationMap'));
const ProductModal = lazy(() => import('./components/ProductModal'));
const Admin = lazy(() => import('./pages/Admin'));

function StoreFront() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const WHATSAPP_NUMBER = '5563999516964';

  const handleWhatsApp = (customText) => {
    const text = customText || 'Salve! Tô no site da loja e quero falar com o atendimento.';
    const encodedText = encodeURIComponent(text);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodedText}`, '_blank');
  };

  return (
    <>
      <Navbar onWhatsAppClick={handleWhatsApp} />
      <main>
        <Hero onWhatsAppClick={() => handleWhatsApp()} />
        <Suspense fallback={<div className="h-96" />}><PromoBanner onWhatsAppClick={handleWhatsApp} /></Suspense>
        <StoreStatus />
        <Features />
        <Suspense fallback={<div className="h-96" />}><ReelsShowcase onWhatsAppClick={handleWhatsApp} /></Suspense>
        <Suspense fallback={<div className="h-96" />}><ProductShowcase onSelectProduct={setSelectedProduct} /></Suspense>
        <Suspense fallback={<div className="h-96" />}><KitBuilder onWhatsAppClick={handleWhatsApp} /></Suspense>
        <Suspense fallback={<div className="h-40" />}><GoogleReviews /></Suspense>
        <Suspense fallback={<div className="h-40" />}><FAQ /></Suspense>
        <Suspense fallback={<div className="h-[500px]" />}><LocationMap /></Suspense>
      </main>
      <Footer onWhatsAppClick={handleWhatsApp} />
      <Suspense fallback={null}>
        {selectedProduct && <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} onWhatsAppClick={handleWhatsApp} />}
      </Suspense>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-zinc-950 text-white font-sans selection:bg-red-600 selection:text-white relative">
        <Routes>
          <Route path="/" element={<StoreFront />} />
          <Route path="/admin" element={
            <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-zinc-950 text-white">Carregando painel...</div>}>
              <Admin />
            </Suspense>
          } />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
