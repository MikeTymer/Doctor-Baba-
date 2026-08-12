import React, { useState } from 'react';
import { GALLERY_ITEMS } from '../data/initialData';
import { GalleryItem } from '../types';
import { normalizeImageUrl, handleImageError } from '../utils/imageUtils';
import { Image, X, ZoomIn } from 'lucide-react';

export const GalleryView: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [lightboxImage, setLightboxImage] = useState<GalleryItem | null>(null);

  const categories = ['All', 'Temple', 'Herbs', 'Charms', 'Ceremonies'];

  const filteredItems = selectedCategory === 'All'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter((i) => i.category === selectedCategory);

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
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />

            <div className="absolute bottom-0 inset-x-0 p-4 space-y-1">
              <span className="text-[10px] font-bold text-amber-400 uppercase tracking-widest">
                {item.category}
              </span>
              <h3 className="text-sm font-bold font-serif text-amber-100 group-hover:text-amber-300 transition-colors">
                {item.title}
              </h3>
            </div>

            <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-slate-950/80 border border-amber-700/60 flex items-center justify-center text-amber-400 opacity-0 group-hover:opacity-100 transition-opacity">
              <ZoomIn className="w-4 h-4" />
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {lightboxImage && (
        <div className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative max-w-4xl w-full bg-slate-900 border border-amber-800/60 rounded-3xl overflow-hidden shadow-2xl p-4 sm:p-6 space-y-4">
            <button
              onClick={() => setLightboxImage(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-slate-950 text-amber-400 hover:text-white border border-amber-800/40 min-h-[44px] min-w-[44px] flex items-center justify-center"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="max-h-[70vh] rounded-2xl overflow-hidden bg-slate-950 flex items-center justify-center">
              <img
                src={lightboxImage.image}
                alt={lightboxImage.title}
                className="max-h-[70vh] w-auto object-contain"
              />
            </div>

            <div className="text-center space-y-1">
              <span className="text-xs text-amber-400 font-bold uppercase">{lightboxImage.category}</span>
              <h3 className="text-xl font-bold font-serif text-amber-100">{lightboxImage.title}</h3>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
