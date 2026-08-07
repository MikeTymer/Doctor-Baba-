import React from 'react';
import { SITE_INFO } from '../data/initialData';
import { MessageCircle } from 'lucide-react';

export const FloatingWhatsApp: React.FC = () => {
  return (
    <a
      href={`https://wa.me/${SITE_INFO.whatsapp}?text=Hello%20Doctor%20Baba%20Mukisa,%20I%20am%20reaching%20out%20for%20spiritual%20help`}
      target="_blank"
      rel="noopener noreferrer"
      className="hidden md:flex fixed bottom-6 right-6 z-40 items-center gap-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-4 py-3 rounded-full shadow-2xl shadow-emerald-950 hover:scale-105 active:scale-95 transition-all min-h-[44px]"
      title="Chat directly on WhatsApp with Doctor Baba Mukisa"
    >
      <MessageCircle className="w-6 h-6 animate-pulse" />
      <span className="text-xs">Chat with Doctor Baba Mukisa</span>
    </a>
  );
};
