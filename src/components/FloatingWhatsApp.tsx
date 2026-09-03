import React from 'react';
import { SITE_INFO } from '../data/initialData';
import { MessageCircle } from 'lucide-react';
import { useWhatsApp } from '../context/WhatsAppContext';

export const FloatingWhatsApp: React.FC = () => {
  const { openWhatsApp } = useWhatsApp();

  return (
    <button
      type="button"
      id="floating-whatsapp-btn"
      onClick={() => openWhatsApp('Hello Doctor Baba Mukisa, I am reaching out for spiritual help')}
      className="hidden md:flex fixed bottom-6 right-6 z-40 items-center gap-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-4 py-3 rounded-full shadow-2xl shadow-emerald-950 hover:scale-105 active:scale-95 transition-all min-h-[44px] cursor-pointer"
      title="Chat directly on WhatsApp with Doctor Baba Mukisa"
      aria-label="Open WhatsApp chat composer with Doctor Baba Mukisa"
    >
      <MessageCircle className="w-6 h-6 animate-pulse" />
      <span className="text-xs font-bold">Chat on WhatsApp</span>
    </button>
  );
};

