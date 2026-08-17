import React, { useState } from 'react';
import { Category } from '../types';
import { Sparkles, Eye, ArrowRight, ChevronLeft, ChevronRight, Phone, MessageSquare, Heart, ShieldCheck, Flame, Award, MapPin, Globe, Star } from 'lucide-react';
import { SITE_INFO } from '../data/initialData';
import { handleImageError } from '../utils/imageUtils';

interface ServicesViewProps {
  categories: Category[];
  onSelectCategory: (category: Category) => void;
  onSelectServiceDetail: (service: string) => void;
  onContact: () => void;
}

export const ServicesView: React.FC<ServicesViewProps> = ({
  categories,
  onSelectCategory,
  onSelectServiceDetail,
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

      {/* Extensive SEO Categories & Offerings */}
      <section className="bg-slate-900/30 border border-amber-900/20 rounded-3xl p-8 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          
          {/* Love Spells & Relationships */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-amber-400">
              <Heart className="w-5 h-5" />
              <h3 className="font-bold font-serif text-lg text-amber-100">Love & Marriage Spells</h3>
            </div>
            <ul className="text-xs text-slate-400 space-y-2.5">
              <li className="flex items-start gap-2 group cursor-pointer" onClick={() => onSelectServiceDetail('Love Spells')}>
                <ArrowRight className="w-3 h-3 text-amber-600 mt-0.5 group-hover:translate-x-1 transition-transform" />
                <span>Return Lost Lover Spells - Bring back an ex partner permanently.</span>
              </li>
              <li className="flex items-start gap-2 group cursor-pointer" onClick={() => onSelectServiceDetail('Binding Love Spells')}>
                <ArrowRight className="w-3 h-3 text-amber-600 mt-0.5 group-hover:translate-x-1 transition-transform" />
                <span>Binding Love Spells - Create an unbreakable bond between two hearts.</span>
              </li>
              <li className="flex items-start gap-2 group cursor-pointer" onClick={() => onSelectServiceDetail('Marriage Spells')}>
                <ArrowRight className="w-3 h-3 text-amber-600 mt-0.5 group-hover:translate-x-1 transition-transform" />
                <span>Stop Divorce Spells - Heal marriages and resolve domestic disputes.</span>
              </li>
              <li className="flex items-start gap-2 group cursor-pointer" onClick={() => onSelectServiceDetail('Love Rituals')}>
                <ArrowRight className="w-3 h-3 text-amber-600 mt-0.5 group-hover:translate-x-1 transition-transform" />
                <span>Cheating Partner Spells - Bind your lover's heart to yours only.</span>
              </li>
            </ul>
          </div>

          {/* Traditional Healing & Voodoo */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-amber-400">
              <Flame className="w-5 h-5" />
              <h3 className="font-bold font-serif text-lg text-amber-100">Authentic Voodoo & Healing</h3>
            </div>
            <ul className="text-xs text-slate-400 space-y-2.5">
              <li className="flex items-start gap-2 group cursor-pointer" onClick={() => onSelectServiceDetail('Voodoo Spells')}>
                <ArrowRight className="w-3 h-3 text-amber-600 mt-0.5 group-hover:translate-x-1 transition-transform" />
                <span>Voodoo Doll Rituals - Specialized distance healing and influence.</span>
              </li>
              <li className="flex items-start gap-2 group cursor-pointer" onClick={() => onSelectServiceDetail('Black Magic Spells')}>
                <ArrowRight className="w-3 h-3 text-amber-600 mt-0.5 group-hover:translate-x-1 transition-transform" />
                <span>Black Magic Removal - Protection against evil eye and witchcraft.</span>
              </li>
              <li className="flex items-start gap-2 group cursor-pointer" onClick={() => onSelectServiceDetail('Spiritual Cleansing')}>
                <ArrowRight className="w-3 h-3 text-amber-600 mt-0.5 group-hover:translate-x-1 transition-transform" />
                <span>Spiritual Cleansing - Rituals to wash away bad luck and stagnation.</span>
              </li>
              <li className="flex items-start gap-2 group cursor-pointer" onClick={() => onSelectServiceDetail('Ancestral Guidance')}>
                <ArrowRight className="w-3 h-3 text-amber-600 mt-0.5 group-hover:translate-x-1 transition-transform" />
                <span>Ancestral Spirit Alignment - Connecting you with your spirit guides.</span>
              </li>
            </ul>
          </div>

          {/* Money & Success */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-amber-400">
              <Award className="w-5 h-5" />
              <h3 className="font-bold font-serif text-lg text-amber-100">Wealth & Business Spells</h3>
            </div>
            <ul className="text-xs text-slate-400 space-y-2.5">
              <li className="flex items-start gap-2 group cursor-pointer" onClick={() => onSelectServiceDetail('Money Spells')}>
                <ArrowRight className="w-3 h-3 text-amber-600 mt-0.5 group-hover:translate-x-1 transition-transform" />
                <span>Business Growth Spells - Attract customers and increase sales.</span>
              </li>
              <li className="flex items-start gap-2 group cursor-pointer" onClick={() => onSelectServiceDetail('Money Spells')}>
                <ArrowRight className="w-3 h-3 text-amber-600 mt-0.5 group-hover:translate-x-1 transition-transform" />
                <span>Money Attraction Rituals - Open doors for financial opportunities.</span>
              </li>
              <li className="flex items-start gap-2 group cursor-pointer" onClick={() => onSelectServiceDetail('Money Spells')}>
                <ArrowRight className="w-3 h-3 text-amber-600 mt-0.5 group-hover:translate-x-1 transition-transform" />
                <span>Debt Relief Spells - Clear your name and settle financial burdens.</span>
              </li>
              <li className="flex items-start gap-2 group cursor-pointer" onClick={() => onSelectServiceDetail('Money Spells')}>
                <ArrowRight className="w-3 h-3 text-amber-600 mt-0.5 group-hover:translate-x-1 transition-transform" />
                <span>Job & Promotion Spells - Secure your position or get a new career.</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Global SEO Grid - Locations & Cities */}
        <div className="pt-8 border-t border-amber-900/30 space-y-8">
          <div className="flex items-center gap-2 text-amber-500">
            <Globe className="w-5 h-5" />
            <h3 className="font-bold font-serif text-lg text-amber-100 uppercase tracking-widest text-sm">International Reach & Regional Support</h3>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6">
            <div className="space-y-2">
              <h5 className="text-[10px] font-bold text-amber-600 uppercase flex items-center gap-1"><MapPin className="w-2.5 h-2.5" /> North America</h5>
              <p className="text-[9px] text-slate-500 leading-relaxed">Love Spells New York, Los Angeles, Chicago, Houston, Phoenix. Lost Lover Spells Toronto, Vancouver, Montreal.</p>
            </div>
            <div className="space-y-2">
              <h5 className="text-[10px] font-bold text-amber-600 uppercase flex items-center gap-1"><MapPin className="w-2.5 h-2.5" /> Europe & UK</h5>
              <p className="text-[9px] text-slate-500 leading-relaxed">Spiritual Healing London, Manchester, Birmingham. Marriage Rituals Paris, Berlin, Stockholm, Oslo, Amsterdam.</p>
            </div>
            <div className="space-y-2">
              <h5 className="text-[10px] font-bold text-amber-600 uppercase flex items-center gap-1"><MapPin className="w-2.5 h-2.5" /> Africa & Regions</h5>
              <p className="text-[9px] text-slate-500 leading-relaxed">Traditional Healer Johannesburg, Pretoria, Soweto, Durban. Spiritual Guidance Nairobi, Mombasa, Kampala, Dar es Salaam.</p>
            </div>
            <div className="space-y-2">
              <h5 className="text-[10px] font-bold text-amber-600 uppercase flex items-center gap-1"><MapPin className="w-2.5 h-2.5" /> Middle East & Asia</h5>
              <p className="text-[9px] text-slate-500 leading-relaxed">Relationship Spells Dubai, Abu Dhabi, Doha, Kuwait City. Wealth Rituals Singapore, Kuala Lumpur, Hong Kong.</p>
            </div>
          </div>
        </div>
      </section>

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
