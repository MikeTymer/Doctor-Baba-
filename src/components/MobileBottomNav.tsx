import React from 'react';
import { ActiveTab } from '../types';
import { SITE_INFO } from '../data/initialData';
import { Home, MessageCircle, Phone, Mail } from 'lucide-react';
import { useWhatsApp } from '../context/WhatsAppContext';

interface MobileBottomNavProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({ activeTab, setActiveTab }) => {
  const { openWhatsApp } = useWhatsApp();

  return (
    <div className="mobile-bottom-nav md:hidden fixed bottom-2 left-1/2 -translate-x-1/2 z-50 w-[92%] max-w-md bg-slate-950/95 border border-amber-800/60 shadow-2xl shadow-amber-950 rounded-full backdrop-blur-lg px-2 py-1.5 transition-all">
      <div className="flex items-center justify-around">
        {/* Home Button */}
        <button
          onClick={() => {
            setActiveTab('home');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className={`flex flex-col items-center justify-center py-1 px-3 rounded-full text-xs font-medium min-h-[44px] transition-colors ${
            activeTab === 'home' 
              ? 'text-amber-400 font-bold bg-amber-950/80 scale-105' 
              : 'text-amber-200/80 hover:text-amber-300'
          }`}
        >
          <Home className="w-5 h-5 mb-0.5" />
          <span>Home</span>
        </button>

        {/* WhatsApp Chat Button */}
        <button
          type="button"
          id="mobile-whatsapp-nav-btn"
          onClick={() => openWhatsApp('Hello Doctor Baba Mukisa, I am reaching out for spiritual help')}
          className="flex flex-col items-center justify-center py-1 px-3 rounded-full text-xs font-medium text-emerald-400 hover:text-emerald-300 min-h-[44px] transition-colors cursor-pointer"
          aria-label="Open WhatsApp chat composer with Doctor Baba Mukisa"
        >
          <MessageCircle className="w-5 h-5 mb-0.5 text-emerald-400 animate-pulse" />
          <span className="font-semibold">Chat</span>
        </button>

        {/* Contact Us Button */}
        <button
          onClick={() => {
            setActiveTab('contact');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className={`flex flex-col items-center justify-center py-1 px-3 rounded-full text-xs font-medium min-h-[44px] transition-colors ${
            activeTab === 'contact' 
              ? 'text-amber-400 font-bold bg-amber-950/80 scale-105' 
              : 'text-amber-200/80 hover:text-amber-300'
          }`}
        >
          <Mail className="w-5 h-5 mb-0.5" />
          <span>Contact</span>
        </button>

        {/* Call Button */}
        <a
          href={`tel:${SITE_INFO.phone}`}
          className="flex flex-col items-center justify-center py-1 px-3 rounded-full text-xs font-medium text-amber-300 hover:text-amber-200 min-h-[44px] transition-colors"
        >
          <Phone className="w-5 h-5 mb-0.5" />
          <span>Call</span>
        </a>
      </div>
    </div>
  );
};
