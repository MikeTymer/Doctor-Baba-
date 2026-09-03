import React, { useState, useEffect } from 'react';
import { MessageCircle } from 'lucide-react';
import { useWhatsApp } from '../context/WhatsAppContext';

export const FloatingWhatsApp: React.FC = () => {
  const { openWhatsApp } = useWhatsApp();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Appear once the user scrolls down a bit (past 100px)
      if (window.scrollY > 100) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Check initial scroll in case user loaded the page midway
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <button
      type="button"
      id="floating-whatsapp-btn"
      onClick={() => openWhatsApp('Hello Doctor Baba Mukisa, I am reaching out for spiritual help')}
      className={`fixed z-40 flex items-center gap-2 sm:gap-2.5 bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white font-bold px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-full shadow-2xl shadow-emerald-950 border border-emerald-400/40 hover:scale-105 active:scale-95 transition-all duration-300 ease-out min-h-[44px] cursor-pointer group ${
        /* Positioned above the mobile bottom navigation bar on mobile (bottom-20), and bottom-6 on desktop */
        'bottom-20 right-3 sm:right-5 md:bottom-6 md:right-6'
      } ${
        isVisible
          ? 'opacity-100 translate-y-0 scale-100 pointer-events-auto'
          : 'opacity-0 translate-y-6 scale-90 pointer-events-none'
      }`}
      title="Chat directly on WhatsApp with Doctor Baba Mukisa"
      aria-label="Open WhatsApp chat composer with Doctor Baba Mukisa"
      aria-hidden={!isVisible}
    >
      <div className="relative flex-shrink-0">
        <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6 text-white group-hover:scale-110 transition-transform" />
        <span 
          className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-300 rounded-full border-2 border-emerald-700 animate-pulse" 
          aria-hidden="true" 
        />
      </div>
      <span className="text-xs sm:text-sm font-bold tracking-wide whitespace-nowrap">
        Chat on WhatsApp
      </span>
    </button>
  );
};
