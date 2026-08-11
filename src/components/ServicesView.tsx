import React, { useState } from 'react';
import { Category } from '../types';
import { Sparkles, Eye, ArrowRight, ChevronLeft, ChevronRight, Phone, MessageSquare } from 'lucide-react';
import { SITE_INFO } from '../data/initialData';

interface ServicesViewProps {
  categories: Category[];
  onSelectCategory: (category: Category) => void;
  onContact: () => void;
}

export const ServicesView: React.FC<ServicesViewProps> = ({
  categories,
  onSelectCategory,
  onContact,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const totalPages = Math.ceil(categories.length / itemsPerPage) || 1;
  const paginatedCategories = categories.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="space-y-10 animate-in fade-in duration-300">
      
      {/* Header Banner */}
      <div className="bg-slate-900 border border-amber-900/50 rounded-2xl p-6 sm:p-8 shadow-xl text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-950 border border-amber-800/40 text-amber-400 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Traditional Herbal & Spiritual Guidance</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold font-serif text-amber-100">
          Our Spiritual Services
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Doctor Baba Mukisa provides authentic spiritual guidance, distance meditation, traditional herbal solutions, and cultural reflections for emotional harmony, business clarity, protection, legal stress relief, and family peace.
        </p>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {paginatedCategories.map((cat) => (
          <div
            key={cat.id}
            className="group bg-slate-900 border border-amber-900/50 hover:border-amber-500/80 rounded-2xl overflow-hidden shadow-xl flex flex-col justify-between transition-all duration-300 hover:-translate-y-1"
          >
            <div>
              {/* Category Image */}
              <div 
                onClick={() => onSelectCategory(cat)}
                className="aspect-video relative overflow-hidden bg-slate-950 cursor-pointer"
              >
                <img
                  src={cat.featured_image}
                  alt={cat.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/static/upload/blog_travel_01.jpg';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />
                <span className="absolute bottom-2 right-2 bg-slate-950/80 text-amber-300 text-[10px] px-2 py-0.5 rounded border border-amber-800/40 flex items-center gap-1">
                  <Eye className="w-3 h-3" /> {cat.views} Views
                </span>
              </div>

              {/* Content */}
              <div className="p-5 space-y-2">
                <h2 
                  onClick={() => onSelectCategory(cat)}
                  className="text-lg font-bold font-serif text-amber-100 group-hover:text-amber-300 cursor-pointer transition-colors"
                >
                  {cat.name}
                </h2>
                <p className="text-xs text-slate-300 leading-relaxed line-clamp-3">
                  {cat.description}
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="p-5 pt-0 flex items-center justify-between gap-2">
              <button
                onClick={() => onSelectCategory(cat)}
                className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-1.5 transition-colors shadow min-h-[44px]"
              >
                Read More <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <a
                href={`https://wa.me/${SITE_INFO.whatsapp}?text=Hello%20Doctor%20Baba%20Mukisa,%20I%20am%20interested%20in%20your%20${encodeURIComponent(cat.name)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-emerald-950 border border-emerald-700/60 hover:bg-emerald-900 text-emerald-300 p-2.5 rounded-xl text-xs flex items-center justify-center min-h-[44px] min-w-[44px]"
                title="Consult via WhatsApp"
              >
                <MessageSquare className="w-4 h-4" />
              </a>
            </div>

          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="bg-slate-900 border border-amber-900/40 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-xs text-amber-200 font-medium">
            Page {currentPage} of {totalPages}
          </span>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
              className="bg-slate-950 hover:bg-slate-800 disabled:opacity-50 text-amber-200 border border-amber-900/40 px-3.5 py-2 rounded-xl text-xs flex items-center gap-1 min-h-[44px]"
            >
              <ChevronLeft className="w-4 h-4" /> Previous
            </button>

            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`w-9 h-9 rounded-xl text-xs font-bold transition-colors ${
                  currentPage === i + 1
                    ? 'bg-amber-500 text-slate-950'
                    : 'bg-slate-950 text-amber-200 border border-amber-900/40 hover:bg-slate-800'
                }`}
              >
                {i + 1}
              </button>
            ))}

            <button
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="bg-slate-950 hover:bg-slate-800 disabled:opacity-50 text-amber-200 border border-amber-900/40 px-3.5 py-2 rounded-xl text-xs flex items-center gap-1 min-h-[44px]"
            >
              Next <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Bottom Contact Banner */}
      <div className="custom-assistance-banner bg-gradient-to-r from-amber-950 to-slate-950 border border-amber-800/60 rounded-2xl p-6 sm:p-8 text-center space-y-3">
        <h3 className="text-xl font-bold font-serif text-amber-100">
          Need Custom Spiritual Assistance?
        </h3>
        <p className="text-xs text-slate-300 max-w-xl mx-auto">
          Doctor Baba Mukisa provides tailored consultations for your specific challenges. Get in touch directly via phone or WhatsApp.
        </p>
        <div className="pt-2 flex justify-center gap-3">
          <button
            onClick={onContact}
            className="bg-amber-600 hover:bg-amber-500 text-white font-bold px-6 py-2.5 rounded-full text-xs shadow min-h-[44px]"
          >
            Contact Temple Now
          </button>
          <a
            href={`tel:${SITE_INFO.phone}`}
            className="bg-slate-900 border border-amber-700/60 text-amber-300 hover:text-amber-200 px-5 py-2.5 rounded-full text-xs font-semibold flex items-center gap-1.5 min-h-[44px]"
          >
            <Phone className="w-3.5 h-3.5 text-amber-400" /> Call Doctor Baba Mukisa
          </a>
        </div>
      </div>

    </div>
  );
};
