import React from 'react';
import { SITE_INFO } from '../data/initialData';
import { ABOUT_SERVICES } from '../data/aboutPageData';
import { ABOUT_SLIDER_ITEMS } from '../data/aboutSliderData';
import { normalizeImageUrl, handleImageError } from '../utils/imageUtils';
import { MapPin, Phone, Mail, Award, Flame, Heart, MessageSquare, ArrowRight, Sparkles, ShieldCheck, Star, Globe, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useEmail } from '../context/EmailContext';

interface AboutViewProps {
  onContact: () => void;
  onSelectServiceDetail: (service: string) => void;
}

export const AboutView: React.FC<AboutViewProps> = ({ 
  onContact, 
  onSelectServiceDetail
}) => {
  const { openEmail } = useEmail();

  return (
    <div className="max-w-5xl mx-auto space-y-12 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="bg-slate-900 border border-amber-900/50 rounded-2xl p-6 sm:p-10 shadow-2xl space-y-4 text-center">
        <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-amber-400 via-amber-600 to-amber-950 p-1 border border-amber-500/80 mx-auto shadow-xl overflow-hidden mb-2">
          <img
            src={normalizeImageUrl('/Doctor Baba Mukisa Logo -1.jpg')}
            alt="Doctor Baba Mukisa Logo"
            className="w-full h-full object-cover rounded-full"
            onError={handleImageError}
          />
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold font-serif text-amber-100">
          About Doctor Baba Mukisa
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mx-auto leading-relaxed">
          African traditional herbalist and spiritual practitioner sharing ancestral guidance and cultural herbal heritage.
        </p>
      </div>

      {/* Main Grid: Who we are & How we help */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Who We Are */}
        <div className="about-card bg-slate-900 border border-amber-900/50 rounded-2xl p-6 sm:p-8 space-y-4 shadow-xl">
          <div className="flex items-center gap-2 text-amber-400 font-bold font-serif text-xl border-b border-amber-900/40 pb-3">
            <Award className="w-5 h-5" /> Who We Are
          </div>
          <p className="text-xs sm:text-sm text-amber-100/90 leading-relaxed font-sans">
            Meet <strong>Doctor Baba Mukisa</strong>, a <button onClick={onContact} className="text-amber-400 underline hover:text-amber-300">traditional African herbalist</button> and spiritual guidance practitioner sharing sacred ancestral knowledge passed down through generations from coastal Digo heritage. We specialize in <button onClick={onContact} className="text-amber-400 underline hover:text-amber-300">relationship reconciliation</button>, <button onClick={() => onSelectServiceDetail('Marriage & Family Harmony')} className="text-amber-400 underline hover:text-amber-300">marriage harmony</button>, and <button onClick={() => onSelectServiceDetail('Spiritual Cleansing')} className="text-amber-400 underline hover:text-amber-300">spiritual cleansing</button>.
          </p>
          <p className="text-xs text-slate-300 leading-relaxed">
            With decades of practice, Doctor Baba Mukisa assists individuals seeking <button onClick={() => onSelectServiceDetail('Relationship Guidance')} className="text-amber-400 underline hover:text-amber-300">relationship harmony</button>, personal reflection, spiritual cleansing, and emotional peace. Our temple in Kampala serves as a sanctuary for those seeking <button onClick={() => onSelectServiceDetail('Traditional Herbal Heritage')} className="text-amber-400 underline hover:text-amber-300">authentic ancestral practices</button> and <button onClick={() => onSelectServiceDetail('Ancestral Guidance')} className="text-amber-400 underline hover:text-amber-300">spiritual guidance</button>.
          </p>
        </div>

        {/* How We Help */}
        <div className="about-card bg-slate-900 border border-amber-900/50 rounded-2xl p-6 sm:p-8 space-y-4 shadow-xl">
          <div className="flex items-center gap-2 text-amber-400 font-bold font-serif text-xl border-b border-amber-900/40 pb-3">
            <Heart className="w-5 h-5" /> How We Help
          </div>
          <p className="text-xs sm:text-sm text-amber-100/90 leading-relaxed font-sans">
            Doctor Baba Mukisa provides personal <button onClick={() => onSelectServiceDetail('Ancestral Guidance')} className="text-amber-400 underline hover:text-amber-300">spiritual readings</button>, <button onClick={onContact} className="text-amber-400 underline hover:text-amber-300">traditional healer</button> consultations, and <button onClick={() => onSelectServiceDetail('Ancestral Guidance')} className="text-amber-400 underline hover:text-amber-300">guided meditation</button> for those seeking internal balance and spiritual clarity. We assist clients with <button onClick={onContact} className="text-amber-400 underline hover:text-amber-300">prosperity guidance</button>, <button onClick={() => onSelectServiceDetail('Prosperity Alignment')} className="text-amber-400 underline hover:text-amber-300">career & business focus</button>, and <button onClick={() => onSelectServiceDetail('Spiritual Protection & Shielding')} className="text-amber-400 underline hover:text-amber-300">spiritual protection & shielding</button>.
          </p>
          <p className="text-xs text-slate-300 leading-relaxed">
            Consultations are available both in-person at the Kampala sanctuary and via phone/WhatsApp for remote <button onClick={() => onSelectServiceDetail('Ancestral Guidance')} className="text-amber-400 underline hover:text-amber-300">spiritual reflection</button>. We provide inclusive consultations across all backgrounds, helping nurture emotional well-being, life purpose, and generational harmony.
          </p>
        </div>

      </div>

      {/* Services Showcase Preview */}
      <section className="space-y-8">
        <div className="section-heading-box text-center">
          <span className="text-xs uppercase tracking-widest text-amber-400 font-bold block">Spiritual Legacy & Arts</span>
          <h2 className="text-2xl sm:text-3xl font-bold font-serif text-amber-100 mt-1">
            Doctor Baba Mukisa’s Specialized Services
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {ABOUT_SERVICES.map((item) => (
            <div
              key={item.id}
              onClick={() => onSelectServiceDetail(item.service)}
              className="group service-card bg-slate-900/90 border border-amber-900/50 hover:border-amber-500/80 rounded-2xl overflow-hidden shadow-xl cursor-pointer transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between"
            >
              <div>
                <div className="aspect-video relative overflow-hidden bg-slate-950">
                  <img
                    src={normalizeImageUrl(item.image)}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={handleImageError}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />
                </div>

                <div className="p-5 space-y-2">
                  <h3 className="text-lg font-bold font-serif text-amber-100 group-hover:text-amber-300 transition-colors">
                    {item.name}
                  </h3>
                  <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>

              <div className="p-5 pt-0">
                <span className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-400 group-hover:text-amber-300">
                  Detailed Consultation <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SACRED HEALING METHODS - Carousel Section */}
      <section className="space-y-10 py-12 bg-slate-900/30 rounded-3xl border border-amber-900/20 overflow-hidden">
        <div className="text-center space-y-3 px-4">
          <span className="text-xs uppercase tracking-[0.2em] text-amber-500 font-extrabold flex items-center justify-center gap-2">
            <Flame className="w-4 h-4" /> Timeless Ancestral Wisdom
          </span>
          <h2 className="text-3xl sm:text-5xl font-bold font-serif text-amber-100">
            SACRED TRADITIONAL METHODS
          </h2>
          <p className="text-sm text-slate-400 max-w-2xl mx-auto">
            Discover the profound spiritual techniques passed down through generations. 
            Each method is an authentic reflection of coastal Digo heritage designed for modern challenges.
          </p>
        </div>

        <div className="relative group overflow-hidden">
          <motion.div 
            className="flex gap-6 px-8 pb-8 overflow-x-auto no-scrollbar cursor-grab active:cursor-grabbing"
            drag="x"
            dragConstraints={{ right: 0, left: -1000 }}
          >
            {ABOUT_SLIDER_ITEMS.map((item, idx) => {
              const Icon = item.icon === 'Flame' ? Flame : 
                           item.icon === 'Sparkles' ? Sparkles : 
                           item.icon === 'ShieldCheck' ? ShieldCheck : 
                           item.icon === 'Heart' ? Heart : 
                           item.icon === 'Award' ? Award : 
                           item.icon === 'Star' ? Star : Globe;
              return (
                <button
                  key={idx}
                  onClick={() => onSelectServiceDetail(item.name)}
                  className="flex-shrink-0 w-64 bg-slate-950 border border-amber-900/40 p-6 rounded-2xl hover:border-amber-500/60 transition-all text-center group/card"
                >
                  <div className="w-14 h-14 bg-amber-950/40 border border-amber-800/40 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover/card:scale-110 transition-transform">
                    <Icon className="w-7 h-7 text-amber-400" />
                  </div>
                  <h4 className="text-amber-100 font-bold text-sm group-hover/card:text-amber-400 transition-colors mb-2">
                    {item.name}
                  </h4>
                  <p className="text-[10px] text-slate-400 mb-4 line-clamp-2 italic leading-relaxed">
                    {item.description}
                  </p>
                  <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">
                    View Details &rarr;
                  </p>
                </button>
              );
            })}
          </motion.div>
          
          <div className="absolute top-1/2 -translate-y-1/2 left-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            <div className="w-10 h-10 bg-slate-950/80 border border-amber-700/50 rounded-full flex items-center justify-center text-amber-400">
              <ChevronLeft className="w-6 h-6" />
            </div>
          </div>
          <div className="absolute top-1/2 -translate-y-1/2 right-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            <div className="w-10 h-10 bg-slate-950/80 border border-amber-700/50 rounded-full flex items-center justify-center text-amber-400">
              <ChevronRight className="w-6 h-6" />
            </div>
          </div>
        </div>
      </section>

      {/* Contact & Location Details */}
      <div className="bg-slate-900 border border-amber-900/50 rounded-2xl p-6 sm:p-8 shadow-xl space-y-6">
        <h3 className="text-xl font-bold font-serif text-amber-100 border-b border-amber-900/40 pb-3">
          Direct Contact & Temple Location
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs text-slate-300">
          
          <div className="bg-slate-950 border border-amber-900/30 rounded-xl p-4 space-y-2">
            <div className="text-amber-400 font-bold text-sm flex items-center gap-2">
              <Phone className="w-4 h-4" /> Phone / WhatsApp
            </div>
            <p className="text-amber-200 font-semibold">{SITE_INFO.phone}</p>
            <p className="text-[10px] text-slate-400">Call or message anytime for quick assistance.</p>
          </div>

          <div className="bg-slate-950 border border-amber-900/30 rounded-xl p-4 space-y-2 group">
            <div className="text-amber-400 font-bold text-sm flex items-center gap-2">
              <Mail className="w-4 h-4" /> Email Address
            </div>
            <button
              type="button"
              onClick={() => openEmail()}
              className="text-amber-200 hover:text-amber-100 font-semibold text-left break-all hover:underline cursor-pointer block"
              title="Click to compose with your email service provider"
            >
              {SITE_INFO.email}
            </button>
            <p className="text-[10px] text-slate-400">Click to compose with Gmail, Outlook, Yahoo, or Mail app.</p>
          </div>

          <div className="bg-slate-950 border border-amber-900/30 rounded-xl p-4 space-y-2">
            <div className="text-amber-400 font-bold text-sm flex items-center gap-2">
              <MapPin className="w-4 h-4" /> Temple Address
            </div>
            <p className="text-amber-200 font-semibold">{SITE_INFO.address}</p>
            <p className="text-[10px] text-slate-400">In-person temple visits by appointment.</p>
          </div>

        </div>

        <div className="pt-2 flex flex-wrap justify-center gap-4">
          <button
            onClick={onContact}
            className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-8 py-3 rounded-full text-xs shadow min-h-[44px]"
          >
            Send Consultation Inquiry
          </button>
          
          <a
            href={`https://wa.me/${SITE_INFO.whatsapp}?text=Hello%20Doctor%20Baba%20Mukisa,%20I%20am%20reaching%20out%20after%20reading%20about%20your%20temple`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-emerald-700 hover:bg-emerald-600 text-white font-bold px-7 py-3 rounded-full text-xs shadow flex items-center gap-2 min-h-[44px]"
          >
            <MessageSquare className="w-4 h-4" /> WhatsApp Doctor Baba Mukisa
          </a>
        </div>
      </div>

    </div>
  );
};
