import React from 'react';
import { BlogPost, Category } from '../types';
import { SITE_INFO } from '../data/initialData';
import { Sparkles, Phone, MessageSquare, ArrowRight, ShieldCheck, Heart, Award, Flame } from 'lucide-react';

interface HomeViewProps {
  onNavigate: (tab: 'blog' | 'services' | 'contact' | 'about' | 'videos' | 'gallery') => void;
  onSelectBlog: (blog: BlogPost) => void;
  onSelectCategory: (category: Category) => void;
  featuredBlogs: BlogPost[];
  categories: Category[];
}

export const HomeView: React.FC<HomeViewProps> = ({
  onNavigate,
  onSelectBlog,
  onSelectCategory,
  featuredBlogs,
  categories,
}) => {
  return (
    <div className="space-y-16 animate-in fade-in duration-300">
      
      {/* Hero Welcome Banner */}
      <section className="relative rounded-3xl bg-gradient-to-br from-slate-950 via-amber-950/80 to-slate-900 border border-amber-800/50 p-6 sm:p-10 lg:p-14 overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto space-y-6 text-center">
          
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-900/60 border border-amber-700/60 text-amber-300 text-xs font-medium shadow-inner">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Welcome to the Official Temple Website of Doctor Baba Mukisa</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold font-serif text-amber-100 tracking-tight leading-tight">
            Welcome to <span className="bg-gradient-to-r from-amber-200 via-amber-400 to-amber-600 bg-clip-text text-transparent">Doctor Baba Mukisa’s</span> Spiritual Realm
          </h1>

          <p className="text-sm sm:text-base lg:text-lg text-amber-100/90 leading-relaxed max-w-3xl mx-auto font-sans">
            In Africa is where you can find a traditional doctor who can cast spells to anyone using spiritual powers and local herbs. 
            <strong> Doctor Baba Mukisa</strong> is among the top ten traditional herbalists in spell casting and traditional healing using local medicines—without you even needing to meet him physically. He can meditate your thoughts, feelings, and emotions in just seconds.
          </p>

          <p className="text-xs sm:text-sm text-amber-300/80 max-w-2xl mx-auto italic">
            Visit his temple in Kampala, Uganda, or contact him on mobile / WhatsApp <a href={`tel:${SITE_INFO.phone}`} className="underline font-bold text-amber-200">{SITE_INFO.phone}</a> for direct guidance.
          </p>

          {/* Action Buttons */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => onNavigate('contact')}
              className="bg-gradient-to-r from-amber-500 to-amber-700 hover:from-amber-400 hover:to-amber-600 text-slate-950 font-extrabold px-8 py-3.5 rounded-full text-base shadow-xl shadow-amber-950/60 transition-all hover:scale-105 active:scale-95 flex items-center gap-2 min-h-[44px]"
            >
              Start Now! <ArrowRight className="w-5 h-5" />
            </button>

            <a
              href={`https://wa.me/${SITE_INFO.whatsapp}?text=Hello%20Doctor%20Baba%20Mukisa,%20I%20am%20reaching%20out%20from%20your%20website`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-emerald-700 hover:bg-emerald-600 text-white font-bold px-7 py-3.5 rounded-full text-base shadow-lg transition-all hover:scale-105 active:scale-95 flex items-center gap-2 min-h-[44px]"
            >
              <MessageSquare className="w-5 h-5" /> WhatsApp Direct
            </a>

            <a
              href={`tel:${SITE_INFO.phone}`}
              className="bg-slate-900 border border-amber-700/60 hover:bg-slate-800 text-amber-200 font-semibold px-6 py-3.5 rounded-full text-base transition-all flex items-center gap-2 min-h-[44px]"
            >
              <Phone className="w-5 h-5" /> Call {SITE_INFO.phone}
            </a>
          </div>

        </div>
      </section>

      {/* Trust & Pillars Grid */}
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        <div className="bg-slate-900/90 border border-amber-900/50 rounded-2xl p-6 text-center space-y-2 hover:border-amber-600/50 transition-colors">
          <div className="w-12 h-12 rounded-2xl bg-amber-950 border border-amber-700/60 mx-auto flex items-center justify-center text-amber-400 mb-2">
            <Flame className="w-6 h-6" />
          </div>
          <h3 className="font-bold font-serif text-amber-100 text-base">Ancestral Powers</h3>
          <p className="text-xs text-slate-300">Rooted in ancient coastal Digo traditional spiritual rituals.</p>
        </div>

        <div className="bg-slate-900/90 border border-amber-900/50 rounded-2xl p-6 text-center space-y-2 hover:border-amber-600/50 transition-colors">
          <div className="w-12 h-12 rounded-2xl bg-amber-950 border border-amber-700/60 mx-auto flex items-center justify-center text-amber-400 mb-2">
            <Heart className="w-6 h-6" />
          </div>
          <h3 className="font-bold font-serif text-amber-100 text-base">Love & Reunion</h3>
          <p className="text-xs text-slate-300">Reunite lost lovers and restore harmony in broken marriages.</p>
        </div>

        <div className="bg-slate-900/90 border border-amber-900/50 rounded-2xl p-6 text-center space-y-2 hover:border-amber-600/50 transition-colors">
          <div className="w-12 h-12 rounded-2xl bg-amber-950 border border-amber-700/60 mx-auto flex items-center justify-center text-amber-400 mb-2">
            <Award className="w-6 h-6" />
          </div>
          <h3 className="font-bold font-serif text-amber-100 text-base">Top Traditional Doctor</h3>
          <p className="text-xs text-slate-300">Ranked among top ten traditional herbalists across East Africa.</p>
        </div>

        <div className="bg-slate-900/90 border border-amber-900/50 rounded-2xl p-6 text-center space-y-2 hover:border-amber-600/50 transition-colors">
          <div className="w-12 h-12 rounded-2xl bg-amber-950 border border-amber-700/60 mx-auto flex items-center justify-center text-amber-400 mb-2">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="font-bold font-serif text-amber-100 text-base">Remote Meditation</h3>
          <p className="text-xs text-slate-300">Spiritual energy work effective over distance without travel.</p>
        </div>
      </section>

      {/* Services Showcase Preview */}
      <section className="space-y-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 border-b border-amber-900/40 pb-4">
          <div>
            <span className="text-xs uppercase tracking-widest text-amber-400 font-bold">Spiritual Offerings</span>
            <h2 className="text-2xl sm:text-3xl font-bold font-serif text-amber-100 mt-1">
              Doctor Baba Mukisa’s Main Services
            </h2>
          </div>
          <button
            onClick={() => onNavigate('services')}
            className="text-amber-400 hover:text-amber-300 font-semibold text-xs flex items-center gap-1 min-h-[44px]"
          >
            View All Services <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.slice(0, 6).map((category) => (
            <div
              key={category.id}
              onClick={() => onSelectCategory(category)}
              className="group bg-slate-900/90 border border-amber-900/50 hover:border-amber-500/80 rounded-2xl overflow-hidden shadow-xl cursor-pointer transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between"
            >
              <div>
                <div className="aspect-video relative overflow-hidden bg-slate-950">
                  <img
                    src={category.featured_image}
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/static/upload/blog_travel_01.jpg';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />
                  <span className="absolute bottom-2 right-2 bg-slate-950/80 text-amber-300 text-[10px] px-2 py-1 rounded-md border border-amber-800/40">
                    {category.views} Views
                  </span>
                </div>

                <div className="p-5 space-y-2">
                  <h3 className="text-lg font-bold font-serif text-amber-100 group-hover:text-amber-300 transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed">
                    {category.description}
                  </p>
                </div>
              </div>

              <div className="p-5 pt-0">
                <span className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-400 group-hover:text-amber-300">
                  Read More & Consultation <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Articles Section */}
      <section className="space-y-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 border-b border-amber-900/40 pb-4">
          <div>
            <span className="text-xs uppercase tracking-widest text-amber-400 font-bold">Spiritual Articles</span>
            <h2 className="text-2xl sm:text-3xl font-bold font-serif text-amber-100 mt-1">
              Latest Temple Blog Posts
            </h2>
          </div>
          <button
            onClick={() => onNavigate('blog')}
            className="text-amber-400 hover:text-amber-300 font-semibold text-xs flex items-center gap-1 min-h-[44px]"
          >
            Explore All Blog Posts <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {featuredBlogs.slice(0, 4).map((blog) => (
            <div
              key={blog.id}
              onClick={() => onSelectBlog(blog)}
              className="group bg-slate-900/90 border border-amber-900/50 hover:border-amber-500/80 rounded-2xl p-5 shadow-xl cursor-pointer transition-all hover:-translate-y-1 flex flex-col sm:flex-row gap-4"
            >
              <div className="w-full sm:w-40 h-40 rounded-xl overflow-hidden shrink-0 bg-slate-950 border border-amber-900/30">
                <img
                  src={blog.feature_image}
                  alt={blog.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/static/upload/blog_travel_01.jpg';
                  }}
                />
              </div>

              <div className="flex-1 flex flex-col justify-between space-y-2">
                <div>
                  <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider bg-amber-950/80 px-2 py-0.5 rounded border border-amber-800/40">
                    {blog.category_name}
                  </span>
                  <h3 className="text-base font-bold font-serif text-amber-100 group-hover:text-amber-300 transition-colors mt-2">
                    {blog.name}
                  </h3>
                  <p className="text-xs text-slate-300 line-clamp-2 mt-1">
                    {blog.mini_description}
                  </p>
                </div>

                <div className="flex items-center justify-between text-[11px] text-amber-500/80 pt-2 border-t border-amber-900/30">
                  <span>{blog.post_date}</span>
                  <span className="font-semibold group-hover:text-amber-300">Read Article →</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Call To Action Banner */}
      <section className="bg-gradient-to-r from-amber-950 via-slate-950 to-amber-950 border border-amber-800/60 rounded-3xl p-8 text-center space-y-4 shadow-2xl">
        <h2 className="text-2xl sm:text-4xl font-bold font-serif text-amber-100">
          Ready to Change Your Life & Resolve Your Hardships?
        </h2>
        <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Do not let heartbreaks, debts, legal struggles, or evil omens control your destiny. Connect directly with Doctor Baba Mukisa today for authentic spiritual guidance.
        </p>
        <div className="pt-2 flex flex-wrap justify-center gap-4">
          <button
            onClick={() => onNavigate('contact')}
            className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-8 py-3 rounded-full text-sm shadow-lg min-h-[44px]"
          >
            Contact Doctor Baba Mukisa Now
          </button>
        </div>
      </section>

    </div>
  );
};
