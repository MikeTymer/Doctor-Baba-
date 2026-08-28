import React from 'react';
import { Video, Phone, MessageSquare, Sparkles, Heart, Award, ShieldCheck, Flame, ChevronLeft, ChevronRight, Globe, Star } from 'lucide-react';
import { SITE_INFO } from '../data/initialData';
import { VIDEO_REGIONAL_SERVICES, VIDEO_SLIDER_ITEMS } from '../data/videoPageData';
import { motion } from 'framer-motion';
import { normalizeImageUrl, handleImageError } from '../utils/imageUtils';

interface VideosViewProps {
  onSelectServiceDetail?: (service: string) => void;
}

export const VideosView: React.FC<VideosViewProps> = ({ onSelectServiceDetail }) => {
  const handleServiceClick = (service: string) => {
    if (onSelectServiceDetail) onSelectServiceDetail(service);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-16 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="bg-slate-900 border border-amber-900/50 rounded-2xl p-6 sm:p-10 text-center space-y-3 shadow-xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-950 border border-amber-800/40 text-amber-400 text-xs font-semibold">
          <Video className="w-3.5 h-3.5" />
          <span>Temple Work & Spiritual Demonstrations</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold font-serif text-amber-100">
          Video of Our Work
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Watch footage from Doctor Baba Mukisa’s temple, traditional herbal preparations, and ancestral spiritual ceremonies in Uganda.
        </p>
      </div>

      {/* Main Video Frame */}
      <div className="bg-slate-900 border border-amber-900/60 rounded-3xl p-4 sm:p-6 shadow-2xl space-y-4">
        <div className="aspect-video w-full rounded-2xl overflow-hidden bg-slate-950 border border-amber-900/40 shadow-inner">
          <iframe
            className="w-full h-full border-0"
            src="https://www.youtube.com/embed/qpfckdgXQnw?rel=0&mute=1&showinfo=0&autoplay=1&loop=1&playlist=qpfckdgXQnw"
            title="Doctor Baba Mukisa Spiritual Healer Video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 bg-slate-950 rounded-xl border border-amber-900/30">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="font-bold font-serif text-amber-200 text-sm flex items-center gap-2 justify-center sm:justify-start">
              <Sparkles className="w-4 h-4 text-amber-400" /> Doctor Baba Mukisa Temple Showcase
            </h3>
            <p className="text-xs text-slate-400">
              Authentic traditional herbal practices & spiritual meditation rituals.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <a
              href={`https://wa.me/${SITE_INFO.whatsapp}?text=Hello%20Doctor%20Baba%20Mukisa,%20I%20watched%20your%20video%20and%20would%20like%20to%20consult`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-emerald-700 hover:bg-emerald-600 text-white font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-1.5 shadow min-h-[44px]"
            >
              <MessageSquare className="w-4 h-4" /> WhatsApp Us
            </a>
            <a
              href={`tel:${SITE_INFO.phone}`}
              className="bg-slate-900 border border-amber-700/60 text-amber-200 font-semibold px-4 py-2 rounded-xl text-xs flex items-center gap-1.5 min-h-[44px]"
            >
              <Phone className="w-4 h-4" /> Call
            </a>
          </div>
        </div>
      </div>

      {/* Unique Regional Video Showcase */}
      <section className="space-y-8">
        <div className="text-center space-y-2">
          <span className="text-xs uppercase tracking-widest text-amber-500 font-bold">Global Demonstrations</span>
          <h2 className="text-2xl sm:text-4xl font-bold font-serif text-amber-100">Spiritual Reach in Action</h2>
          <p className="text-xs text-slate-400 max-w-2xl mx-auto">Watch how Doctor Baba Mukisa assists clients across different continents with unique spiritual solutions.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {VIDEO_REGIONAL_SERVICES.map((item) => (
            <div 
              key={item.id}
              onClick={() => handleServiceClick(item.service)}
              className="group bg-slate-900 border border-amber-900/40 rounded-3xl overflow-hidden hover:border-amber-500/50 transition-all cursor-pointer shadow-xl flex flex-col sm:flex-row"
            >
              <div className="w-full sm:w-1/3 aspect-video sm:aspect-square relative overflow-hidden">
                <img 
                  src={normalizeImageUrl(item.image)} 
                  alt={item.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  onError={handleImageError}
                />
                <div className="absolute inset-0 bg-slate-950/20" />
                <div className="absolute top-2 left-2 bg-amber-600 text-slate-950 text-[8px] font-bold px-1.5 py-0.5 rounded uppercase">
                  {item.region}
                </div>
              </div>
              <div className="w-full sm:w-2/3 p-6 flex flex-col justify-center space-y-3 bg-slate-900/60">
                <h3 className="text-lg font-bold font-serif text-amber-100 group-hover:text-amber-400 transition-colors leading-tight">
                  {item.title}
                </h3>
                <p className="text-[11px] text-slate-400 leading-relaxed italic">
                  "{item.description}"
                </p>
                <div className="pt-2">
                  <span className="inline-flex items-center gap-1.5 px-4 py-2 bg-amber-950/40 border border-amber-800/40 rounded-xl text-[10px] text-amber-400 font-bold uppercase tracking-widest group-hover:bg-amber-600 group-hover:text-slate-950 transition-all">
                    View Service Details <ChevronRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* VIDEO SLIDER SECTION */}
      <section className="space-y-10 py-12 bg-slate-900/30 rounded-3xl border border-amber-900/20 overflow-hidden">
        <div className="text-center space-y-3 px-4">
          <span className="text-xs uppercase tracking-[0.2em] text-amber-500 font-extrabold flex items-center justify-center gap-2">
            <Globe className="w-4 h-4" /> Worldwide Guidance
          </span>
          <h2 className="text-3xl sm:text-5xl font-bold font-serif text-amber-100 uppercase">
            Global Spiritual Services
          </h2>
          <p className="text-sm text-slate-400 max-w-2xl mx-auto">
            Experience the far-reaching impact of ancestral wisdom. 
            Providing authentic traditional spiritual consultations for clients in these major global hubs.
          </p>
        </div>

        <div className="relative group overflow-hidden">
          <motion.div 
            className="flex gap-6 px-8 pb-8 overflow-x-auto no-scrollbar cursor-grab active:cursor-grabbing"
            drag="x"
            dragConstraints={{ right: 0, left: -1000 }}
          >
            {VIDEO_SLIDER_ITEMS.map((item, idx) => {
              const Icon = item.icon === 'Heart' ? Heart : 
                           item.icon === 'Award' ? Award : 
                           item.icon === 'ShieldCheck' ? ShieldCheck : 
                           item.icon === 'Sparkles' ? Sparkles : 
                           item.icon === 'Flame' ? Flame : Globe;
              return (
                <button
                  key={idx}
                  onClick={() => handleServiceClick(item.name)}
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
                  <div className="mt-auto">
                    <span className="inline-block w-full py-2 bg-slate-900 border border-amber-900/40 rounded-xl text-[10px] text-amber-200 uppercase tracking-widest font-bold group-hover/card:bg-amber-600 group-hover/card:text-slate-950 transition-all">
                      View Details &rarr;
                    </span>
                  </div>
                </button>
              );
            })}
          </motion.div>
          
          <div className="absolute top-1/2 -translate-y-1/2 left-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            <div className="w-10 h-10 bg-slate-950/80 border border-amber-700/50 rounded-full flex items-center justify-center text-amber-400 shadow-lg">
              <ChevronLeft className="w-6 h-6" />
            </div>
          </div>
          <div className="absolute top-1/2 -translate-y-1/2 right-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            <div className="w-10 h-10 bg-slate-950/80 border border-amber-700/50 rounded-full flex items-center justify-center text-amber-400 shadow-lg">
              <ChevronRight className="w-6 h-6" />
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};
