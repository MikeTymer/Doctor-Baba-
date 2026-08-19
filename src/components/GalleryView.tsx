import React, { useState } from 'react';
import { GALLERY_ITEMS } from '../data/initialData';
import { GALLERY_REGIONAL_CARDS, GALLERY_SLIDER_LOCATIONS } from '../data/galleryPageData';
import { GalleryItem } from '../types';
import { normalizeImageUrl, handleImageError } from '../utils/imageUtils';
import { Image, X, ZoomIn, Heart, Award, Sparkles, Flame, ShieldCheck, ChevronRight, Globe, ChevronLeft } from 'lucide-react';
import { motion } from 'framer-motion';

interface GalleryViewProps {
  onSelectServiceDetail?: (service: string) => void;
}

export const GalleryView: React.FC<GalleryViewProps> = ({ onSelectServiceDetail }) => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [lightboxImage, setLightboxImage] = useState<GalleryItem | null>(null);

  const categories = ['All', 'Temple', 'Herbs', 'Charms', 'Ceremonies'];

  const filteredItems = selectedCategory === 'All'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter((i) => i.category === selectedCategory);

  const handleServiceClick = (service: string) => {
    if (onSelectServiceDetail) onSelectServiceDetail(service);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-10 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="bg-slate-900 border border-amber-900/50 rounded-2xl p-6 sm:p-10 text-center space-y-3 shadow-xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-950 border border-amber-800/40 text-amber-400 text-xs font-semibold">
          <Image className="w-3.5 h-3.5" />
          <span>Temple Photography & Sacred Items</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold font-serif text-amber-100">
          Temple Gallery
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Explore photographs of Doctor Baba Mukisa’s temple shrines, natural herbs, sacred charms, and spiritual ceremony rituals.
        </p>

        {/* Filter Buttons */}
        <div className="pt-4 flex flex-wrap justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-colors min-h-[44px] ${
                selectedCategory === cat
                  ? 'bg-amber-500 text-slate-950 font-bold shadow'
                  : 'bg-slate-950 text-amber-200 border border-amber-900/40 hover:bg-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            onClick={() => setLightboxImage(item)}
            className="group relative bg-slate-900 border border-amber-900/50 rounded-2xl overflow-hidden shadow-xl cursor-pointer aspect-square"
          >
            <img
              src={normalizeImageUrl(item.image)}
              alt={item.title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              onError={handleImageError}
            />
            {/* Dark gradient overlay for high contrast readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/50 to-transparent opacity-85 group-hover:opacity-95 transition-opacity" />

            {/* Bottom text overlay on image - pure white and gold with text shadow */}
            <div className="absolute bottom-0 inset-x-0 p-4 sm:p-5 space-y-1 z-10 gallery-img-overlay">
              <span className="text-[11px] font-extrabold text-amber-300 uppercase tracking-widest block drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
                {item.category}
              </span>
              <h3 className="text-base sm:text-lg font-bold font-serif text-white group-hover:text-amber-200 transition-colors drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] leading-tight">
                {item.title}
              </h3>
            </div>

            <div className="absolute top-3 right-3 w-9 h-9 rounded-full bg-slate-950/80 border border-amber-500/60 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity z-10 shadow-lg">
              <ZoomIn className="w-4 h-4 text-white" />
            </div>

            {/* Quick Link to Service */}
            <div className="absolute top-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity z-10">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  const serviceMap: Record<string, string> = {
                    'Temple': 'Spiritual Guidance',
                    'Herbs': 'Traditional Healer',
                    'Charms': 'Protection Artifacts',
                    'Ceremonies': 'Spiritual Rituals'
                  };
                  handleServiceClick(serviceMap[item.category] || 'Spiritual Services');
                }}
                className="bg-amber-600 hover:bg-amber-500 text-white text-[9px] font-bold px-2.5 py-1.5 rounded-lg shadow-lg flex items-center gap-1 uppercase tracking-wider border border-amber-400/40"
              >
                View Service Details <ChevronRight className="w-3 h-3 text-white" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Unique Regional Artifacts Showcase */}
      <section className="space-y-8">
        <div className="text-center space-y-2">
          <span className="text-xs uppercase tracking-widest text-amber-500 font-bold">Sacred Artifacts</span>
          <h2 className="text-2xl sm:text-4xl font-bold font-serif text-amber-100">Regional Spiritual Tools</h2>
          <p className="text-xs text-slate-400 max-w-2xl mx-auto">Explore photographs of consecrated items specifically prepared for different global regions.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {GALLERY_REGIONAL_CARDS.map((item) => (
            <div 
              key={item.id}
              onClick={() => handleServiceClick(item.service)}
              className="group bg-slate-900 border border-amber-900/40 rounded-3xl overflow-hidden hover:border-amber-500/50 transition-all cursor-pointer shadow-xl"
            >
              <div className="aspect-video relative overflow-hidden">
                <img 
                  src={normalizeImageUrl(item.image)} 
                  alt={item.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  onError={handleImageError}
                />
                <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute top-2 left-2 bg-amber-600 text-white text-[9px] font-bold px-2 py-0.5 rounded uppercase shadow-md z-10">
                  {item.location}
                </div>
              </div>
              <div className="p-6 space-y-3 bg-slate-900/60">
                <h3 className="text-lg font-bold font-serif text-amber-100 group-hover:text-amber-400 transition-colors leading-tight">
                  {item.title}
                </h3>
                <p className="text-[11px] text-slate-400 leading-relaxed line-clamp-2">
                  {item.description}
                </p>
                <div className="pt-2">
                  <span className="inline-flex items-center gap-1.5 px-4 py-2 bg-amber-950/40 border border-amber-800/40 rounded-xl text-[10px] text-amber-400 font-bold uppercase tracking-widest group-hover:bg-amber-600 group-hover:text-slate-950 transition-all">
                    Learn More <ChevronRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* GALLERY SLIDER SECTION */}
      <section className="space-y-10 py-12 bg-slate-900/30 rounded-3xl border border-amber-900/20 overflow-hidden">
        <div className="text-center space-y-3 px-4">
          <span className="text-xs uppercase tracking-[0.2em] text-amber-500 font-extrabold flex items-center justify-center gap-2">
            <Globe className="w-4 h-4" /> Global Presence
          </span>
          <h2 className="text-3xl sm:text-5xl font-bold font-serif text-amber-100 uppercase">
            Spiritual Works Worldwide
          </h2>
          <p className="text-sm text-slate-400 max-w-2xl mx-auto">
            Our sacred tools and rituals reach across oceans to bring peace and resolution to international clients.
          </p>
        </div>

        <div className="relative group overflow-hidden">
          <motion.div 
            className="flex gap-6 px-8 pb-8 overflow-x-auto no-scrollbar cursor-grab active:cursor-grabbing"
            drag="x"
            dragConstraints={{ right: 0, left: -1000 }}
          >
            {GALLERY_SLIDER_LOCATIONS.map((item, idx) => {
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
                      Explore Details &rarr;
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

      {/* Lightbox Modal */}
      {lightboxImage && (
        <div className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative max-w-4xl w-full bg-slate-950 border border-amber-800/60 rounded-3xl overflow-hidden shadow-2xl p-4 sm:p-6 space-y-4 text-white">
            <button
              onClick={() => setLightboxImage(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-slate-900 text-white hover:text-amber-300 border border-amber-800/40 min-h-[44px] min-w-[44px] flex items-center justify-center z-10"
              aria-label="Close image modal"
            >
              <X className="w-6 h-6 text-white" />
            </button>

            <div className="max-h-[70vh] rounded-2xl overflow-hidden bg-slate-950 flex items-center justify-center">
              <img
                src={normalizeImageUrl(lightboxImage.image)}
                alt={lightboxImage.title}
                className="max-h-[70vh] w-auto object-contain"
                onError={handleImageError}
              />
            </div>

            <div className="text-center space-y-1">
              <span className="text-xs text-amber-300 font-bold uppercase tracking-wider block drop-shadow-md">{lightboxImage.category}</span>
              <h3 className="text-xl font-bold font-serif text-white drop-shadow-md">{lightboxImage.title}</h3>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
