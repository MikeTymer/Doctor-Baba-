import React, { useState } from 'react';
import { ActiveTab } from '../types';
import { SITE_INFO } from '../data/initialData';
import { ChevronDown, ChevronUp, Flame, ShieldAlert, Phone, Mail, MapPin } from 'lucide-react';

interface FooterProps {
  setActiveTab: (tab: ActiveTab) => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveTab }) => {
  const [disclaimerExpanded, setDisclaimerExpanded] = useState(false);

  const handleNavClick = (tab: ActiveTab) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 border-t border-amber-900/50 text-amber-100/90 pt-12 pb-24 md:pb-12 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 pb-8 border-b border-amber-900/40">
          
          {/* Brand Col */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-amber-600 flex items-center justify-center text-slate-950">
                <Flame className="w-5 h-5" />
              </div>
              <span className="text-xl font-bold font-serif text-amber-100">
                Doctor Baba Mukisa
              </span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              {SITE_INFO.aboutShort}
            </p>
            <div className="pt-2 text-xs space-y-1.5 text-amber-300/80">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                <span>{SITE_INFO.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                <span>{SITE_INFO.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                <span>{SITE_INFO.email}</span>
              </div>
            </div>
          </div>

          {/* Quick Links 1 */}
          <div>
            <h4 className="text-sm font-bold font-serif text-amber-200 uppercase tracking-wider mb-4 border-l-2 border-amber-500 pl-2">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => handleNavClick('home')} className="hover:text-amber-300 transition-colors">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => handleNavClick('blog')} className="hover:text-amber-300 transition-colors">
                  Spiritual Blog
                </button>
              </li>
              <li>
                <button onClick={() => handleNavClick('services')} className="hover:text-amber-300 transition-colors">
                  Services & Spells
                </button>
              </li>
              <li>
                <button onClick={() => handleNavClick('videos')} className="hover:text-amber-300 transition-colors">
                  Spiritual Videos
                </button>
              </li>
            </ul>
          </div>

          {/* Quick Links 2 */}
          <div>
            <h4 className="text-sm font-bold font-serif text-amber-200 uppercase tracking-wider mb-4 border-l-2 border-amber-500 pl-2">
              Information
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => handleNavClick('gallery')} className="hover:text-amber-300 transition-colors">
                  Temple Photo Gallery
                </button>
              </li>
              <li>
                <button onClick={() => handleNavClick('about')} className="hover:text-amber-300 transition-colors">
                  About Doctor Baba Mukisa
                </button>
              </li>
              <li>
                <button onClick={() => handleNavClick('contact')} className="hover:text-amber-300 transition-colors">
                  Contact & Temple Visits
                </button>
              </li>
              <li>
                <a href={`https://wa.me/${SITE_INFO.whatsapp}`} target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400 transition-colors">
                  WhatsApp Direct Consultation
                </a>
              </li>
            </ul>
          </div>

          {/* Temple Hours / Info */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold font-serif text-amber-200 uppercase tracking-wider mb-4 border-l-2 border-amber-500 pl-2">
              Temple & Consultations
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Doctor Baba Mukisa conducts both in-person temple consultations in Kampala, Uganda and remote international spiritual consultations worldwide.
            </p>
            <div className="bg-amber-950/60 border border-amber-800/40 rounded-xl p-3 text-xs text-amber-200/90">
              <span className="font-semibold block text-amber-400">Operating Hours:</span>
              <span>Mon - Sun: 7:00 AM - 10:00 PM (EAT)</span>
            </div>
          </div>

        </div>

        {/* Disclaimer Accordion */}
        <div className="bg-slate-900/90 border border-amber-900/40 rounded-2xl p-5 shadow-inner">
          <div className="flex items-center justify-between cursor-pointer" onClick={() => setDisclaimerExpanded(!disclaimerExpanded)}>
            <div className="flex items-center gap-2 text-amber-300 font-semibold text-sm font-serif">
              <ShieldAlert className="w-4 h-4 text-amber-500" />
              <span>Official Disclaimer & Terms of Service</span>
            </div>
            <button className="p-1 text-amber-400 hover:text-amber-200">
              {disclaimerExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
            </button>
          </div>

          <p className="text-xs text-slate-300 mt-2 leading-relaxed">
            {SITE_INFO.disclaimerShort}
          </p>

          {disclaimerExpanded && (
            <div className="mt-4 pt-4 border-t border-amber-900/40 text-xs text-slate-400 space-y-2 whitespace-pre-line leading-relaxed animate-in fade-in duration-200">
              {SITE_INFO.disclaimerFull}
            </div>
          )}
        </div>

        {/* Bottom Copyright */}
        <div className="text-center text-xs text-amber-500/70 pt-4 flex flex-col sm:flex-row items-center justify-between gap-2 border-t border-slate-900">
          <p>© {new Date().getFullYear()} Doctor Baba Mukisa. All Rights Reserved. Sacred African spiritual wisdom.</p>
        </div>

      </div>
    </footer>
  );
};
