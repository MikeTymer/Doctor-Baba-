import React, { useState, useEffect } from 'react';
import { BlogPost, Category } from '../types';
import { SITE_INFO, TESTIMONIALS } from '../data/initialData';
import { LOVE_SPELLS_AREAS } from '../data/loveSpellsData';
import { SACRED_RITUALS_ITEMS } from '../data/homeSacredRitualsData';
import { normalizeImageUrl, handleImageError } from '../utils/imageUtils';
import { Sparkles, Phone, MessageSquare, ArrowRight, ShieldCheck, Heart, Award, Flame, Star, Quote, ChevronLeft, ChevronRight, Globe, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';

interface HomeViewProps {
  onNavigate: (tab: 'blog' | 'services' | 'contact' | 'about' | 'videos' | 'gallery') => void;
  onSelectBlog: (blog: BlogPost) => void;
  onSelectCategory: (category: Category) => void;
  onSelectServiceDetail: (service: string) => void;
  featuredBlogs: BlogPost[];
  categories: Category[];
}

export const HomeView: React.FC<HomeViewProps> = ({
  onNavigate,
  onSelectBlog,
  onSelectCategory,
  onSelectServiceDetail,
  featuredBlogs,
  categories,
}) => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="space-y-16 animate-in fade-in duration-300">
      
      {/* Hero Welcome Banner */}
      <section 
        className="relative rounded-3xl border border-amber-800/50 p-6 sm:p-10 lg:p-14 overflow-hidden shadow-2xl bg-cover bg-center"
        style={{ backgroundImage: 'url("/banner1.jpg")' }}
      >
        {/* Dark Overlay for Readability - Persists in Light Mode */}
        <div className="absolute inset-0" style={{ backgroundColor: 'rgba(2, 6, 23, 0.75)' }} />
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950/60 via-amber-950/40 to-slate-900/60" />
        
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto space-y-6 text-center">
          
          <div className="welcome-pill inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-900/60 border border-amber-700/60 text-amber-300 text-xs font-medium shadow-inner">
            <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
            <span>Welcome to the Official Temple Website of Doctor Baba Mukisa</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold font-serif text-amber-100 tracking-tight leading-tight">
            Welcome to <span className="bg-gradient-to-r from-amber-200 via-amber-400 to-amber-600 bg-clip-text text-transparent">Doctor Baba Mukisa’s</span> Spiritual Realm
          </h1>

          <p className="text-sm sm:text-base lg:text-lg text-amber-100/90 leading-relaxed max-w-3xl mx-auto font-sans">
            Welcome to the spiritual consultation sanctuary of <strong>Doctor Baba Mukisa</strong>, a respected African traditional herbalist providing <button onClick={() => onNavigate('contact')} className="text-amber-400 underline hover:text-amber-300">relationship reconciliation</button>, mindfulness meditation, and <button onClick={() => onSelectServiceDetail('Traditional Healer')} className="text-amber-400 underline hover:text-amber-300">traditional herbal practices</button> to support emotional well-being, personal clarity, and cultural heritage.
          </p>

          <p className="text-xs sm:text-sm text-amber-300/80 max-w-2xl mx-auto italic">
            Visit his temple in Kampala, Uganda, or contact him on mobile / WhatsApp <a href={`tel:${SITE_INFO.phone}`} className="underline font-bold text-amber-200">{SITE_INFO.phone}</a> for <a href="/#contact" className="text-amber-200 underline">direct guidance</a>.
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

      {/* Why Trust Doctor Baba Mukisa Section - SEO Rich */}
      <section className="bg-slate-900/50 border border-amber-900/30 rounded-3xl p-8 sm:p-12 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-amber-600/5 rounded-full blur-3xl" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="section-heading-box">
              <span className="text-xs uppercase tracking-widest text-amber-400 font-bold block">Legacy of Wisdom</span>
              <h2 className="text-2xl sm:text-4xl font-bold font-serif text-amber-100 mt-1">
                Why Choose Doctor Baba Mukisa?
              </h2>
            </div>
            <p className="text-sm text-slate-300 leading-relaxed">
              With a legacy of spiritual power and thousands of satisfied clients worldwide, Doctor Baba Mukisa provides deep insights and effective traditional solutions for life's most complex challenges.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
              <div className="flex gap-3">
                <div className="shrink-0 w-8 h-8 rounded-lg bg-amber-950 border border-amber-800/50 flex items-center justify-center">
                  <span className="text-amber-400 font-bold text-xs">20+</span>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-amber-100">Years Experience</h4>
                  <p className="text-[11px] text-slate-400">Deep knowledge of Digo & Voodoo traditions.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="shrink-0 w-8 h-8 rounded-lg bg-amber-950 border border-amber-800/50 flex items-center justify-center">
                  <ShieldCheck className="w-4 h-4 text-amber-400" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-amber-100">100% Confidential</h4>
                  <p className="text-[11px] text-slate-400">Private & secure spiritual consultations.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="shrink-0 w-8 h-8 rounded-lg bg-amber-950 border border-amber-800/50 flex items-center justify-center">
                  <Flame className="w-4 h-4 text-amber-400" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-amber-100">Fast Manifestation</h4>
                  <p className="text-[11px] text-slate-400">Rituals designed for quick spiritual results.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="shrink-0 w-8 h-8 rounded-lg bg-amber-950 border border-amber-800/50 flex items-center justify-center">
                  <Award className="w-4 h-4 text-amber-400" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-amber-100">Global Service</h4>
                  <p className="text-[11px] text-slate-400">Helping clients in USA, UK, Canada & worldwide.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-square rounded-2xl overflow-hidden border border-amber-800/50 shadow-2xl bg-slate-900">
              <img 
                src="/baba.jpg" 
                alt="Doctor Baba Mukisa" 
                className="w-full h-full object-cover grayscale-[0.3] hover:grayscale-0 transition-all duration-700"
                onError={handleImageError}
              />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-slate-950 border border-amber-500/50 p-6 rounded-2xl shadow-2xl max-w-[240px] hidden sm:block">
              <p className="text-xs italic text-amber-200 leading-relaxed">
                "Spiritual healing is the alignment of one's soul with the ancestors to unlock doors that were once shut."
              </p>
              <p className="text-[10px] font-bold text-amber-600 mt-2 uppercase tracking-tighter">
                — Doctor Baba Mukisa
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Showcase Preview */}
      <section className="space-y-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 border-b border-amber-900/40 pb-4">
          <div className="section-heading-box">
            <span className="text-xs uppercase tracking-widest text-amber-400 font-bold block">Spiritual Offerings</span>
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
              className="group service-card bg-slate-900/90 border border-amber-900/50 hover:border-amber-500/80 rounded-2xl overflow-hidden shadow-xl cursor-pointer transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between"
            >
              <div>
                <div className="aspect-video relative overflow-hidden bg-slate-950">
                  <img
                    src={normalizeImageUrl(category.featured_image)}
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={handleImageError}
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

      {/* Cascading Ad Section 1 - Love Spells focus */}
      <section className="bg-slate-900/40 rounded-3xl border border-amber-900/20 overflow-hidden shadow-2xl">
        <div className="flex flex-col lg:flex-row items-stretch">
          <div className="w-full lg:w-1/2 relative bg-slate-950 flex items-center justify-center overflow-hidden min-h-[300px] group/adimg">
            <a 
              href={`https://wa.me/${SITE_INFO.whatsapp}?text=Hello%20Doctor%20Baba%20Mukisa,%20I%20am%20interested%20in%20your%20Love%20Spells%20services%20seen%20on%20the%20website.`}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute inset-0 z-10 block"
              title="Click to Chat on WhatsApp"
            >
              <div className="absolute inset-0 bg-amber-600/0 group-hover/adimg:bg-amber-600/10 transition-colors flex items-center justify-center opacity-0 group-hover/adimg:opacity-100">
                <div className="bg-emerald-600 text-white p-3 rounded-full shadow-2xl scale-75 group-hover/adimg:scale-100 transition-transform">
                  <MessageSquare className="w-6 h-6" />
                </div>
              </div>
            </a>
            <img 
              src={normalizeImageUrl("/ad1.jpg")} 
              alt="Powerful Love Spells USA UK Canada" 
              className="w-full h-full object-cover lg:object-center group-hover/adimg:scale-105 transition-transform duration-700"
              onError={handleImageError}
            />
            {/* Mobile Overlay to ensure characters are seen if contain is used, but for desktop we use cover with center */}
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950/20 to-transparent pointer-events-none" />
          </div>
          <div className="w-full lg:w-1/2 p-8 lg:p-12 flex flex-col justify-center space-y-6 bg-slate-900/60">
            <span className="text-xs uppercase tracking-widest text-amber-500 font-bold block">Spiritual Attraction</span>
            <h2 className="text-2xl sm:text-4xl font-bold font-serif text-amber-100 leading-tight">
              Powerful Love Spells in USA, UK & Canada
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              Seeking to reunite with a lost lover in <strong>New York</strong>, <strong>London</strong>, or <strong>Toronto</strong>? 
              Doctor Baba Mukisa provides authentic ancestral attraction rituals and binding spells designed to bridge emotional gaps and restore passion. 
              Our spiritual reach extends across <strong>California</strong>, <strong>Los Angeles</strong>, and all major regions of <strong>North America</strong> and the <strong>United Kingdom</strong>.
            </p>
            <div className="pt-2">
              <button 
                onClick={() => onSelectServiceDetail('Love Spells')}
                className="bg-amber-600 hover:bg-amber-500 text-slate-950 font-bold px-8 py-3 rounded-full text-xs transition-all shadow-lg active:scale-95"
              >
                Consult Now
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* SACRED RITUALS & ARTIFACTS - Unique Slider Section */}
      <section className="space-y-10 py-12 bg-slate-900/40 rounded-3xl border border-amber-900/20 overflow-hidden">
        <div className="text-center space-y-3 px-4">
          <span className="text-xs uppercase tracking-[0.2em] text-amber-500 font-extrabold flex items-center justify-center gap-2">
            <Award className="w-4 h-4" /> Empowered Ancestral Tools
          </span>
          <h2 className="text-3xl sm:text-5xl font-bold font-serif text-amber-100">
            SACRED RITUALS & ARTIFACTS
          </h2>
          <p className="text-sm text-slate-400 max-w-2xl mx-auto">
            Experience the power of consecrated tools and specialized spiritual rituals. 
            Doctor Baba Mukisa crafts each artifact with ancestral precision to manifest your desires.
          </p>
        </div>

        <div className="relative group overflow-hidden">
          <motion.div 
            className="flex gap-6 px-8 pb-8 overflow-x-auto no-scrollbar cursor-grab active:cursor-grabbing"
            drag="x"
            dragConstraints={{ right: 0, left: -1000 }}
          >
            {SACRED_RITUALS_ITEMS.map((item, idx) => {
              const Icon = item.icon === 'ShieldCheck' ? ShieldCheck : 
                           item.icon === 'Sparkles' ? Sparkles : 
                           item.icon === 'Heart' ? Heart : 
                           item.icon === 'Award' ? Award : 
                           item.icon === 'Globe' ? Globe : 
                           item.icon === 'Flame' ? Flame : 
                           item.icon === 'MapPin' ? MapPin : Star;
              return (
                <button
                  key={idx}
                  onClick={() => onSelectServiceDetail(item.name)}
                  className="flex-shrink-0 w-64 bg-slate-900/90 border border-amber-900/50 hover:border-amber-500/80 p-6 rounded-2xl hover:-translate-y-1 transition-all text-center group/card shadow-xl flex flex-col justify-between"
                >
                  <div>
                    <div className="w-14 h-14 bg-amber-950/60 border border-amber-800/50 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover/card:scale-110 transition-transform">
                      <Icon className="w-7 h-7 text-amber-400" />
                    </div>
                    <h4 className="text-amber-100 font-bold text-sm group-hover/card:text-amber-300 transition-colors mb-2 font-serif">
                      {item.name}
                    </h4>
                    <p className="text-[11px] text-slate-300 mb-4 line-clamp-2 italic leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                  <div className="mt-auto pt-2">
                    <span className="inline-block w-full py-2 bg-slate-950/80 border border-amber-900/50 rounded-xl text-[10px] text-amber-300 uppercase tracking-widest font-bold group-hover/card:bg-amber-600 group-hover/card:text-slate-950 group-hover/card:border-amber-500 transition-all">
                      Learn More &rarr;
                    </span>
                  </div>
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

      {/* Key Global Spells Areas - Deep Links Section */}
      <section className="space-y-12">
        <div className="text-center space-y-3">
          <span className="text-xs uppercase tracking-[0.2em] text-amber-400 font-bold">Worldwide Services</span>
          <h2 className="text-3xl sm:text-5xl font-bold font-serif text-amber-100">
            Key Global Spells Areas
          </h2>
          <p className="text-xs text-slate-400 max-w-2xl mx-auto">Providing powerful spiritual services to clients in every country, worldwide. Seek <button onClick={() => onSelectServiceDetail('Marriage Spells')} className="text-amber-500 underline hover:text-amber-400">marriage spells</button>, <button onClick={() => onSelectServiceDetail('Money Spells')} className="text-amber-500 underline hover:text-amber-400">money & wealth rituals</button>, and <button onClick={() => onSelectServiceDetail('Black Magic Spells')} className="text-amber-500 underline hover:text-amber-400">wiccan spells</button>.</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {[
            { name: "Marriage Spells", service: "Marriage Spells", icon: Heart, desc: "Restore marital harmony and stop divorce proceedings permanently." },
            { name: "Money & Wealth", service: "Money Spells", icon: Award, desc: "Attract financial favor and unlock prosperity through ancestral energy." },
            { name: "Wiccan Spells", service: "Black Magic Spells", icon: Sparkles, desc: "Powerful Wiccan traditions for spiritual protection and intervention." },
            { name: "Gay Love Spells", service: "Gay Love Spells", icon: Heart, desc: "Specialized same-sex love rituals for commitment and soulmate attraction." },
            { name: "Love Healing Spells", service: "Love Healing Spells", icon: Flame, desc: "Heal emotional wounds and clear blockages in your romantic life." },
            { name: "Reconciliation Love Spells", service: "Reconciliation Love Spells", icon: Star, desc: "Bring back a lost lover and restore the bond of deep affection." },
            { name: "Commitment Love Spells", service: "Binding Love Spells", icon: ShieldCheck, desc: "Strengthen the bond of fidelity and ensure long-term relationship stability." },
            { name: "Broken Heart Spells", service: "Love Rituals", icon: Heart, desc: "Soothe the pain of separation and find the strength to love again." }
          ].map((service, idx) => (
            <button 
              key={idx} 
              onClick={() => onSelectServiceDetail(service.service)} 
              className="bg-slate-900/90 border border-amber-900/50 hover:border-amber-500/80 p-6 rounded-2xl hover:-translate-y-1 transition-all text-center group w-full flex flex-col items-center justify-between space-y-3 shadow-xl"
            >
              <div className="w-10 h-10 bg-amber-950/60 border border-amber-800/50 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <service.icon className="w-5 h-5 text-amber-400" />
              </div>
              <div className="space-y-1">
                <h4 className="text-white font-bold text-sm group-hover:text-amber-300 transition-colors font-serif">{service.name}</h4>
                <p className="text-[11px] text-slate-300 line-clamp-2 leading-relaxed">
                  {service.desc}
                </p>
                <div className="pt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                   <span className="text-[9px] text-amber-400 font-bold uppercase tracking-wider">View Details &rarr;</span>
                </div>
              </div>
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 text-[10px] uppercase font-bold tracking-tighter">
          {[
            "Commitment Love Spells UAE", "Broken Heart Spells London", "France Love Spells", "Sweden Love Spells", "USA Love Spells",
            "Germany Love Spells", "Oman Love Spells", "Switzerland Love Spells", "Russia Love Spells", "India Love Spells",
            "China Love Spells", "Ireland Love Spells", "Singapore Love Spells", "Turkey Love Spells", "Malaysia Love Spells",
            "Canada Love Spells", "Australia Love Spells", "Netherlands Love Spells", "Kuwait Love Spells", "San Francisco Love Spells",
            "Seoul Love Spells", "Amsterdam Love Spells", "Denmark Love Spells", "Bahrain Love Spells"
          ].map((area, idx) => (
            <button 
              key={idx} 
              onClick={() => onSelectServiceDetail(area)}
              className="spell-region-btn bg-white dark:bg-slate-900/80 border border-amber-200 dark:border-amber-900/40 p-3 rounded-xl hover:border-amber-500/60 hover:bg-amber-50 dark:hover:bg-slate-900 transition-all cursor-pointer text-slate-950 dark:text-white hover:text-amber-700 dark:hover:text-amber-300 text-center w-full shadow-sm dark:shadow-md font-bold"
            >
              {area}
            </button>
          ))}
        </div>
      </section>

      {/* Cascading Ad Section 2 - Marriage Spells focus */}
      <section className="marriage-divorce-box bg-white dark:bg-slate-900/40 rounded-3xl border border-amber-200 dark:border-amber-900/20 overflow-hidden shadow-2xl">
        <div className="flex flex-col lg:flex-row-reverse items-stretch">
          <div className="w-full lg:w-1/2 relative bg-slate-950 flex items-center justify-center overflow-hidden min-h-[300px] group/adimg">
            <a 
              href={`https://wa.me/${SITE_INFO.whatsapp}?text=Hello%20Doctor%20Baba%20Mukisa,%20I%20am%20interested%20in%20your%20Marriage%20and%20Divorce%20rituals%20seen%20on%20the%20website.`}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute inset-0 z-10 block"
              title="Click to Chat on WhatsApp"
            >
              <div className="absolute inset-0 bg-amber-600/0 group-hover/adimg:bg-amber-600/10 transition-colors flex items-center justify-center opacity-0 group-hover/adimg:opacity-100">
                <div className="bg-emerald-600 text-white p-3 rounded-full shadow-2xl scale-75 group-hover/adimg:scale-100 transition-transform">
                  <MessageSquare className="w-6 h-6" />
                </div>
              </div>
            </a>
            <img 
              src={normalizeImageUrl("/ad2.jpg")} 
              alt="Marriage and Divorce Spells Dubai Germany South Africa" 
              className="w-full h-full object-cover group-hover/adimg:scale-105 transition-transform duration-700"
              onError={handleImageError}
            />
            <div className="absolute inset-0 bg-gradient-to-l from-slate-950/20 to-transparent pointer-events-none" />
          </div>
          <div className="w-full lg:w-1/2 p-8 lg:p-12 flex flex-col justify-center space-y-6 bg-slate-50 dark:bg-slate-900/60">
            <span className="marital-harmony-tag text-xs uppercase tracking-widest text-slate-950 dark:text-amber-400 font-extrabold block">Marital Harmony</span>
            <h2 className="marriage-divorce-heading text-2xl sm:text-4xl font-bold font-serif text-slate-950 dark:text-white leading-tight">
              Marriage & Divorce Spells in Dubai, Germany & SA
            </h2>
            <p className="marriage-divorce-text text-sm text-slate-800 dark:text-slate-300 leading-relaxed">
              Restore peace to your home in <strong className="text-slate-950 dark:text-white font-bold">Dubai</strong>, <strong className="text-slate-950 dark:text-white font-bold">Berlin</strong>, or <strong className="text-slate-950 dark:text-white font-bold">Johannesburg</strong>. 
              Doctor Baba Mukisa specializes in marriage stabilization rituals that stop unwanted divorces and remove outside interference. 
              From <strong className="text-slate-950 dark:text-white font-bold">Soweto</strong> to <strong className="text-slate-950 dark:text-white font-bold">Hamburg</strong>, our ancestral guidance helps couples in <strong className="text-slate-950 dark:text-white font-bold">South Africa</strong>, <strong className="text-slate-950 dark:text-white font-bold">Germany</strong>, and the <strong className="text-slate-950 dark:text-white font-bold">UAE</strong> find their way back to love.
            </p>
            <div className="pt-2">
              <button 
                onClick={() => onSelectServiceDetail('Marriage Spells')}
                className="bg-amber-600 hover:bg-amber-500 text-slate-950 font-bold px-8 py-3 rounded-full text-xs transition-all shadow-lg active:scale-95"
              >
                Protect My Marriage
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* LOVE SPELLS THAT WORK - Carousel Section */}
      <section className="space-y-10 py-12 bg-slate-900/30 rounded-3xl border border-amber-900/20 overflow-hidden">
        <div className="text-center space-y-3 px-4">
          <span className="text-xs uppercase tracking-[0.2em] text-amber-500 font-extrabold flex items-center justify-center gap-2">
            <Sparkles className="w-4 h-4" /> Proven Spiritual Results
          </span>
          <h2 className="text-3xl sm:text-5xl font-bold font-serif text-amber-100">
            LOVE SPELLS THAT WORK
          </h2>
          <p className="text-sm text-slate-400 max-w-2xl mx-auto">
            Explore our specialized love rituals and spiritual healing services available in your region. 
            Doctor Baba Mukisa provides authentic ancestral solutions for thousands of clients globally.
          </p>
        </div>

        <div className="relative group overflow-hidden">
          <motion.div 
            className="flex gap-6 px-8 pb-8 overflow-x-auto no-scrollbar cursor-grab active:cursor-grabbing"
            drag="x"
            dragConstraints={{ right: 0, left: -2000 }}
          >
            {LOVE_SPELLS_AREAS.map((area, idx) => {
              const Icon = area.icon === 'Globe' ? Globe : 
                           area.icon === 'MapPin' ? MapPin : 
                           area.icon === 'Flame' ? Flame : 
                           area.icon === 'Sparkles' ? Sparkles : 
                           area.icon === 'Award' ? Award : Heart;
              return (
                <button
                  key={idx}
                  onClick={() => onSelectServiceDetail(area.name)}
                  className="flex-shrink-0 w-64 bg-slate-900/90 border border-amber-900/50 hover:border-amber-500/80 p-6 rounded-2xl hover:-translate-y-1 transition-all text-center group/card shadow-xl flex flex-col justify-between"
                >
                  <div>
                    <div className="w-14 h-14 bg-amber-950/60 border border-amber-800/50 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover/card:scale-110 transition-transform">
                      <Icon className="w-7 h-7 text-amber-400" />
                    </div>
                    <h4 className="text-amber-100 font-bold text-sm group-hover/card:text-amber-300 transition-colors mb-2 font-serif">
                      {area.name}
                    </h4>
                    <p className="text-[11px] text-slate-300 mb-4 line-clamp-2 italic leading-relaxed">
                      Authentic spiritual guidance and specialized {area.name.toLowerCase()} for permanent results.
                    </p>
                  </div>
                  <div className="mt-auto pt-2">
                    <span className="inline-block w-full py-2 bg-slate-950/80 border border-amber-900/50 rounded-xl text-[10px] text-amber-300 uppercase tracking-widest font-bold group-hover/card:bg-amber-600 group-hover/card:text-slate-950 group-hover/card:border-amber-500 transition-all">
                      Learn More &rarr;
                    </span>
                  </div>
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

      {/* Cascading Ad Section 3 - Money Spells focus */}
      <section className="bg-slate-900/40 rounded-3xl border border-amber-900/20 overflow-hidden shadow-2xl">
        <div className="flex flex-col lg:flex-row items-stretch">
          <div className="w-full lg:w-1/2 relative bg-slate-950 flex items-center justify-center overflow-hidden min-h-[300px] group/adimg">
            <a 
              href={`https://wa.me/${SITE_INFO.whatsapp}?text=Hello%20Doctor%20Baba%20Mukisa,%20I%20am%20interested%20in%20your%20Wealth%20and%20Success%20rituals%20seen%20on%20the%20website.`}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute inset-0 z-10 block"
              title="Click to Chat on WhatsApp"
            >
              <div className="absolute inset-0 bg-amber-600/0 group-hover/adimg:bg-amber-600/10 transition-colors flex items-center justify-center opacity-0 group-hover/adimg:opacity-100">
                <div className="bg-emerald-600 text-white p-3 rounded-full shadow-2xl scale-75 group-hover/adimg:scale-100 transition-transform">
                  <MessageSquare className="w-6 h-6" />
                </div>
              </div>
            </a>
            <img 
              src={normalizeImageUrl("/ad3.jpg")} 
              alt="Wealth and Success Spells London California New York" 
              className="w-full h-full object-cover group-hover/adimg:scale-105 transition-transform duration-700"
              onError={handleImageError}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950/20 to-transparent pointer-events-none" />
          </div>
          <div className="w-full lg:w-1/2 p-8 lg:p-12 flex flex-col justify-center space-y-6 bg-slate-900/60">
            <span className="text-xs uppercase tracking-widest text-amber-500 font-bold block">Financial Favor</span>
            <h2 className="text-2xl sm:text-4xl font-bold font-serif text-amber-100 leading-tight">
              Wealth & Success Spells in London & USA
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              Unlock the doors of prosperity in <strong>London</strong>, <strong>California</strong>, or <strong>New York</strong>. 
              Doctor Baba Mukisa's money spells are designed to attract financial favor, business success, and debt relief. 
              Whether you are in <strong>Australia</strong>, <strong>Oman</strong>, or <strong>Singapore</strong>, our wealth rituals help entrepreneurs and professionals achieve their highest financial potential through spiritual alignment.
            </p>
            <div className="pt-2">
              <button 
                onClick={() => onSelectServiceDetail('Money Spells')}
                className="bg-amber-600 hover:bg-amber-500 text-slate-950 font-bold px-8 py-3 rounded-full text-xs transition-all shadow-lg active:scale-95"
              >
                Attract Wealth
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Sliding Testimonials Section */}
      <section className="bg-slate-950 border-y border-amber-900/30 py-12 overflow-hidden relative">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 text-amber-500 mb-6">
            <Quote className="w-8 h-8 opacity-50" />
            <span className="text-xs uppercase tracking-widest font-bold">Client Success Stories</span>
          </div>

          <div className="relative min-h-[200px] flex items-center justify-center">
            {TESTIMONIALS.map((t, idx) => (
              <div
                key={t.id}
                className={`absolute w-full transition-all duration-700 transform ${
                  idx === currentTestimonial ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'
                }`}
              >
                <p className="text-lg sm:text-2xl font-serif text-amber-100 italic leading-relaxed">
                  "{t.text}"
                </p>
                <div className="mt-6 flex flex-col items-center">
                  <span className="font-bold text-amber-400 text-sm">{t.name}</span>
                  <span className="text-[10px] text-slate-500 uppercase tracking-widest">{t.service} Consultation</span>
                  <div className="flex gap-0.5 mt-2">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} className="w-3 h-3 text-amber-500 fill-amber-500" />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center gap-4 mt-12">
            <button
              onClick={() => setCurrentTestimonial((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)}
              className="p-2 rounded-full border border-amber-900/50 text-amber-400 hover:bg-amber-900/20 transition-all"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => setCurrentTestimonial((prev) => (prev + 1) % TESTIMONIALS.length)}
              className="p-2 rounded-full border border-amber-900/50 text-amber-400 hover:bg-amber-900/20 transition-all"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* Global & Regional Footprint - SEO Specific Section */}
      <section className="space-y-12">
        <div className="text-center space-y-3">
          <span className="text-xs uppercase tracking-[0.2em] text-amber-400 font-bold">International Presence</span>
          <h2 className="text-3xl sm:text-5xl font-bold font-serif text-amber-100">
            Global Spiritual Reach
          </h2>
          <p className="text-xs text-slate-400 max-w-2xl mx-auto">Providing powerful <button onClick={() => onSelectServiceDetail('Love Spells')} className="text-amber-500 underline hover:text-amber-400">lost lover spells</button>, <button onClick={() => onSelectServiceDetail('Marriage Spells')} className="text-amber-400 underline hover:text-amber-400">marriage rituals</button>, and <button onClick={() => onSelectServiceDetail('Ancestral Guidance')} className="text-amber-500 underline hover:text-amber-400">ancestral healing</button> to clients in every corner of the world.</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8">
          <div className="bg-slate-900/60 p-6 rounded-3xl border border-amber-900/30 text-center space-y-4 shadow-xl">
            <h4 className="text-amber-400 font-bold text-sm uppercase tracking-wider font-serif">North America</h4>
            <ul className="text-[11px] text-slate-300 space-y-2">
              <li onClick={() => onSelectServiceDetail('Love Spells')} className="hover:text-amber-300 cursor-pointer transition-colors">Love Spells USA (New York, LA, Chicago)</li>
              <li onClick={() => onSelectServiceDetail('Spiritual Cleansing')} className="hover:text-amber-300 cursor-pointer transition-colors">Spiritual Healing Canada (Toronto, Vancouver)</li>
              <li onClick={() => onSelectServiceDetail('Love Spells')} className="hover:text-amber-300 cursor-pointer transition-colors">Lost Lover Spells California</li>
              <li onClick={() => onSelectServiceDetail('Marriage Spells')} className="hover:text-amber-300 cursor-pointer transition-colors">Marriage Spells Ontario</li>
            </ul>
          </div>
          <div className="bg-slate-900/60 p-6 rounded-3xl border border-amber-900/30 text-center space-y-4 shadow-xl">
            <h4 className="text-amber-400 font-bold text-sm uppercase tracking-wider font-serif">Europe & UK</h4>
            <ul className="text-[11px] text-slate-300 space-y-2">
              <li onClick={() => onSelectServiceDetail('Love Spells')} className="hover:text-amber-300 cursor-pointer transition-colors">Lost Lover Spells London & UK</li>
              <li onClick={() => onSelectServiceDetail('Marriage Spells')} className="hover:text-amber-300 cursor-pointer transition-colors">Marriage Protection Germany (Berlin)</li>
              <li onClick={() => onSelectServiceDetail('Voodoo Spells')} className="hover:text-amber-300 cursor-pointer transition-colors">Voodoo Spells France (Paris)</li>
              <li onClick={() => onSelectServiceDetail('Spiritual Cleansing')} className="hover:text-amber-300 cursor-pointer transition-colors">Spiritual Healing Ireland & Norway</li>
            </ul>
          </div>
          <div className="bg-slate-900/60 p-6 rounded-3xl border border-amber-900/30 text-center space-y-4 shadow-xl">
            <h4 className="text-amber-400 font-bold text-sm uppercase tracking-wider font-serif">Africa & Regions</h4>
            <ul className="text-[11px] text-slate-300 space-y-2">
              <li onClick={() => onSelectServiceDetail('Traditional Healer')} className="hover:text-amber-300 cursor-pointer transition-colors">Traditional Healer South Africa (Soweto, Joburg)</li>
              <li onClick={() => onSelectServiceDetail('Ancestral Guidance')} className="hover:text-amber-300 cursor-pointer transition-colors">Spiritual Guidance Kenya (Nairobi, Mombasa)</li>
              <li onClick={() => onSelectServiceDetail('Ancestral Guidance')} className="hover:text-amber-300 cursor-pointer transition-colors">Ancestral Wisdom Uganda (Kampala)</li>
              <li onClick={() => onSelectServiceDetail('Money Spells')} className="hover:text-amber-300 cursor-pointer transition-colors">Wealth Spells Botswana & Namibia</li>
            </ul>
          </div>
          <div className="bg-slate-900/60 p-6 rounded-3xl border border-amber-900/30 text-center space-y-4 shadow-xl">
            <h4 className="text-amber-400 font-bold text-sm uppercase tracking-wider font-serif">Middle East & Asia</h4>
            <ul className="text-[11px] text-slate-300 space-y-2">
              <li onClick={() => onSelectServiceDetail('Love Spells')} className="hover:text-amber-300 cursor-pointer transition-colors">Love & Relationship Spells Dubai & UAE</li>
              <li onClick={() => onSelectServiceDetail('Money Spells')} className="hover:text-amber-300 cursor-pointer transition-colors">Business Luck Spells Singapore & Malaysia</li>
              <li onClick={() => onSelectServiceDetail('Money Spells')} className="hover:text-amber-300 cursor-pointer transition-colors">Success Spells Qatar & Kuwait</li>
              <li onClick={() => onSelectServiceDetail('Spiritual Cleansing')} className="hover:text-amber-300 cursor-pointer transition-colors">Spiritual Cleansing Oman & Bahrain</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Cascading Ad Section 4 - Spiritual Protection focus */}
      <section className="bg-slate-900/40 rounded-3xl border border-amber-900/20 overflow-hidden shadow-2xl">
        <div className="flex flex-col lg:flex-row-reverse items-stretch">
          <div className="w-full lg:w-1/2 relative bg-slate-950 flex items-center justify-center overflow-hidden min-h-[300px] group/adimg">
            <a 
              href={`https://wa.me/${SITE_INFO.whatsapp}?text=Hello%20Doctor%20Baba%20Mukisa,%20I%20am%20interested%20in%20your%20Spiritual%20Protection%20and%20Voodoo%20rituals%20seen%20on%20the%20website.`}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute inset-0 z-10 block"
              title="Click to Chat on WhatsApp"
            >
              <div className="absolute inset-0 bg-amber-600/0 group-hover/adimg:bg-amber-600/10 transition-colors flex items-center justify-center opacity-0 group-hover/adimg:opacity-100">
                <div className="bg-emerald-600 text-white p-3 rounded-full shadow-2xl scale-75 group-hover/adimg:scale-100 transition-transform">
                  <MessageSquare className="w-6 h-6" />
                </div>
              </div>
            </a>
            <img 
              src={normalizeImageUrl("/ad4.jpg")} 
              alt="Spiritual Protection and Voodoo Spells Global" 
              className="w-full h-full object-cover group-hover/adimg:scale-105 transition-transform duration-700"
              onError={handleImageError}
            />
            <div className="absolute inset-0 bg-gradient-to-l from-slate-950/20 to-transparent pointer-events-none" />
          </div>
          <div className="w-full lg:w-1/2 p-8 lg:p-12 flex flex-col justify-center space-y-6 bg-slate-900/60">
            <span className="text-xs uppercase tracking-widest text-amber-500 font-bold block">Divine Shielding</span>
            <h2 className="text-2xl sm:text-4xl font-bold font-serif text-amber-100 leading-tight">
              Spiritual Protection & Voodoo Globally
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              Safeguard your future with authentic African voodoo and spiritual protection rituals. 
              Doctor Baba Mukisa provides shielding against negative energy and generational curses for clients in <strong>Kenya</strong>, <strong>Uganda</strong>, <strong>Mauritius</strong>, and beyond. 
              Our traditional healer services are sought after in <strong>Russia</strong>, <strong>France</strong>, and <strong>Norway</strong> for their deep-rooted effectiveness in cleansing the spirit and protecting the home.
            </p>
            <div className="pt-2">
              <button 
                onClick={() => onSelectServiceDetail('Spiritual Protection')}
                className="bg-amber-600 hover:bg-amber-500 text-slate-950 font-bold px-8 py-3 rounded-full text-xs transition-all shadow-lg active:scale-95"
              >
                Get Protected
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Authentic Voodoo & Traditional Healing - SEO Focus */}
      <section className="space-y-12">
        <div className="text-center space-y-3">
          <span className="text-xs uppercase tracking-[0.2em] text-amber-400 font-bold">Sacred African Arts</span>
          <h2 className="text-3xl sm:text-5xl font-bold font-serif text-amber-100">
            Authentic Voodoo & Healing
          </h2>
          <div className="w-24 h-1 bg-amber-600 mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div 
            onClick={() => onSelectServiceDetail('Binding Love Spells')} 
            className="group p-8 bg-slate-900 border border-amber-900/40 rounded-3xl hover:border-amber-500/50 transition-all cursor-pointer"
          >
            <h3 className="text-xl font-bold text-amber-100 font-serif mb-4 flex items-center gap-2">
              <Heart className="w-5 h-5 text-amber-500" /> Love Binding
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Make someone fall in love with you or attract your soulmate. My attraction spells create a powerful aura around you that makes you irresistible to the one you desire.
            </p>
          </div>
          <div 
            onClick={() => onSelectServiceDetail('Marriage Spells')} 
            className="group p-8 bg-slate-900 border border-amber-900/40 rounded-3xl hover:border-amber-500/50 transition-all cursor-pointer"
          >
            <h3 className="text-xl font-bold text-amber-100 font-serif mb-4 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-amber-500" /> Stop Divorce
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Is your marriage on the brink of collapse? My divorce spells can soften your partner's heart, remove outside interference, and restore the love and commitment you once shared.
            </p>
          </div>
          <div 
            onClick={() => onSelectServiceDetail('Money Spells')} 
            className="group p-8 bg-slate-900 border border-amber-900/40 rounded-3xl hover:border-amber-500/50 transition-all cursor-pointer"
          >
            <h3 className="text-xl font-bold text-amber-100 font-serif mb-4 flex items-center gap-2">
              <Flame className="w-5 h-5 text-amber-500" /> Wealth Rituals
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Money Spells aimed to bring Money, Luck, and Wealth from known or unknown openings to make you free from debts and become Rich. Release energy into the universe today.
            </p>
          </div>
        </div>
      </section>


      {/* Featured Articles Section */}
      <section className="space-y-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 border-b border-amber-900/40 pb-4">
          <div className="section-heading-box">
            <span className="text-xs uppercase tracking-widest text-amber-400 font-bold block">Spiritual Articles</span>
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
              className="group blog-card bg-slate-900/90 border border-amber-900/50 hover:border-amber-500/80 rounded-2xl p-5 shadow-xl cursor-pointer transition-all hover:-translate-y-1 flex flex-col sm:flex-row gap-4"
            >
              <div className="w-full sm:w-40 h-40 rounded-xl overflow-hidden shrink-0 bg-slate-950 border border-amber-900/30">
                <img
                  src={normalizeImageUrl(blog.feature_image)}
                  alt={blog.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  onError={handleImageError}
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
                  <span className="text-slate-400">{blog.post_date}</span>
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
        <p className="cta-description text-xs sm:text-sm text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Seek personal peace of mind, traditional herbal consultations, and spiritual guidance. Connect directly with Doctor Baba Mukisa today.
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
