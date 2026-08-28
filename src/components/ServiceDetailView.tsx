import React from 'react';
import { Breadcrumb } from './Breadcrumb';
import { SITE_INFO } from '../data/initialData';
import { SERVICE_DESCRIPTIONS, REGIONAL_SEO_CONTENT } from '../data/serviceDetails';
import { Flame, Heart, Award, ShieldCheck, Star, MapPin, Globe, Sparkles, MessageSquare, Phone, ArrowRight, ArrowLeft } from 'lucide-react';

interface ServiceDetailViewProps {
  serviceName: string;
  onContact: () => void;
  onBack?: () => void;
  onNavigateHome?: () => void;
  onNavigateServices?: () => void;
}

export const ServiceDetailView: React.FC<ServiceDetailViewProps> = ({ 
  serviceName, 
  onContact,
  onBack,
  onNavigateHome,
  onNavigateServices
}) => {
  const getServiceIcon = () => {
    const name = serviceName.toLowerCase();
    if (name.includes('love') || name.includes('marriage') || name.includes('reconciliation') || name.includes('binding') || name.includes('psychic')) {
      return <Heart className="w-12 h-12 text-amber-500" />;
    }
    if (name.includes('healer') || name.includes('guidance') || name.includes('ancestral') || name.includes('herbalist')) {
      return <Flame className="w-12 h-12 text-amber-500" />;
    }
    if (name.includes('voodoo') || name.includes('magic') || name.includes('cleansing') || name.includes('protection') || name.includes('wiccan')) {
      return <ShieldCheck className="w-12 h-12 text-amber-500" />;
    }
    if (name.includes('money') || name.includes('wealth') || name.includes('business') || name.includes('success')) {
      return <Award className="w-12 h-12 text-amber-500" />;
    }
    return <Sparkles className="w-12 h-12 text-amber-500" />;
  };

  const getCustomDescription = () => {
    if (SERVICE_DESCRIPTIONS[serviceName]) return SERVICE_DESCRIPTIONS[serviceName];
    
    // Fallback logic for regional content
    for (const [region, content] of Object.entries(REGIONAL_SEO_CONTENT)) {
      if (serviceName.includes(region)) return `${content} ${serviceName} is one of our most requested services in this region.`;
    }
    
    return `Professional and authentic ${serviceName.toLowerCase()} consultations provided by Doctor Baba Mukisa. Experience the ancient spiritual wisdom of coastal Digo heritage to nurture balance and peace in your life.`;
  };

  const locations = [
    { region: "North America", cities: "New York, Los Angeles, Chicago, Houston, Phoenix, Philadelphia, San Antonio, San Diego, Dallas, San Jose. Toronto, Vancouver, Montreal, Calgary, Ottawa, Edmonton, Winnipeg, Mississauga, Brampton, Hamilton." },
    { region: "Europe & UK", cities: "London, Birmingham, Manchester, Glasgow, Liverpool, Leeds, Sheffield, Edinburgh, Bristol, Leicester. Paris, Berlin, Madrid, Rome, Bucharest, Vienna, Hamburg, Budapest, Warsaw, Barcelona." },
    { region: "Africa & Middle East", cities: "Johannesburg, Cape Town, Durban, Pretoria, Soweto. Nairobi, Mombasa, Kisumu, Nakuru, Eldoret. Kampala, Entebbe, Jinja, Mbarara. Dubai, Abu Dhabi, Sharjah, Doha, Kuwait City, Muscat, Manama, Riyadh, Jeddah." },
    { region: "Asia & Australia", cities: "Singapore, Kuala Lumpur, Hong Kong, Bangkok, Seoul, Tokyo. Sydney, Melbourne, Brisbane, Perth, Adelaide, Gold Coast, Canberra, Newcastle, Wollongong, Logan City." }
  ];

  const handleGoBack = onBack || onNavigateServices || onNavigateHome;

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      
      {/* Top Breadcrumb Navigation Trail & Back Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        {handleGoBack && (
          <button
            onClick={handleGoBack}
            className="inline-flex items-center gap-2 text-xs font-bold text-amber-400 hover:text-amber-300 bg-slate-900/90 border border-amber-900/50 px-4 py-2.5 rounded-xl hover:border-amber-500/60 transition-all min-h-[44px] self-start shadow-sm"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Services
          </button>
        )}

        <Breadcrumb
          items={[
            { label: 'Home', onClick: onNavigateHome },
            { label: 'Spiritual Services', onClick: onNavigateServices || handleGoBack },
            { label: serviceName, isCurrent: true }
          ]}
        />
      </div>

      {/* Hero Header */}
      <section 
        className="relative rounded-3xl border border-amber-900/50 p-8 sm:p-16 overflow-hidden shadow-2xl text-center bg-cover bg-center"
        style={{ backgroundImage: 'url("/banner1.jpg")' }}
      >
        {/* Dark Overlay for Readability */}
        <div className="absolute inset-0" style={{ backgroundColor: 'rgba(2, 6, 23, 0.75)' }} />
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950/60 via-amber-950/40 to-slate-900/60 pointer-events-none" />
        
        <div className="relative z-10 space-y-6">
          <div className="flex justify-center mb-4">
            <div className="p-5 bg-amber-950/60 border border-amber-800/40 rounded-3xl shadow-inner">
              {getServiceIcon()}
            </div>
          </div>
          <h1 className="text-4xl sm:text-6xl font-extrabold font-serif text-amber-100 tracking-tight">
            Authentic {serviceName}
          </h1>
          <p className="text-sm sm:text-xl text-amber-200/80 max-w-3xl mx-auto leading-relaxed">
            {getCustomDescription()}
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-4">
            <button onClick={onContact} className="bg-amber-600 hover:bg-amber-500 text-slate-950 font-bold px-8 py-3.5 rounded-full text-sm shadow-xl transition-all hover:scale-105 active:scale-95">
              Request Consultation
            </button>
            <a href={`https://wa.me/${SITE_INFO.whatsapp}`} target="_blank" rel="noopener noreferrer" className="bg-emerald-700 hover:bg-emerald-600 text-white font-bold px-8 py-3.5 rounded-full text-sm shadow-xl flex items-center gap-2 transition-all hover:scale-105 active:scale-95">
              <MessageSquare className="w-4 h-4" /> WhatsApp Now
            </a>
          </div>
        </div>
      </section>

      {/* Comprehensive Content Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-10">
          
          <div className="bg-slate-900/40 border border-amber-900/20 rounded-3xl p-8 space-y-6 shadow-xl">
            <h2 className="text-2xl font-bold font-serif text-amber-100 flex items-center gap-3">
              <Star className="w-6 h-6 text-amber-500" /> Understanding {serviceName}
            </h2>
            <div className="space-y-4 text-slate-300 text-sm leading-relaxed">
              <p>
                The spiritual world is intricate, and navigating life's challenges is aided by a guide with deep <button onClick={onContact} className="text-amber-400 underline hover:text-amber-300">ancestral connection</button> and years of traditional heritage. {serviceName} consultations are designed to help align your spiritual focus with positive energy, tailored to your personal circumstances.
              </p>
              <p>
                Whether you are seeking <button onClick={() => window.scrollTo({top: 0})} className="text-amber-400 underline font-bold">{serviceName}</button> or specialized <button onClick={onContact} className="text-amber-400 underline hover:text-amber-300">spiritual guidance</button>, Doctor Baba Mukisa's methods are grounded in respect, cultural wisdom, and peaceful understanding.
              </p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                {[
                  "Ancestral Heritage & Wisdom",
                  "Deep Spiritual Connection",
                  "Total Privacy & Confidentiality",
                  "Personalized Spiritual Reflection",
                  "Safe & Natural Traditional Herbs",
                  "Worldwide Distance Consultations"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-xs font-bold text-amber-200">
                    <ShieldCheck className="w-4 h-4 text-emerald-500" /> {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="bg-slate-900/40 border border-amber-900/20 rounded-3xl p-8 space-y-6 shadow-xl">
            <h2 className="text-2xl font-bold font-serif text-amber-100 flex items-center gap-3">
              <Globe className="w-6 h-6 text-amber-500" /> Global Reach & Regional Consultations
            </h2>
            <p className="text-slate-400 text-xs italic leading-relaxed">
              Doctor Baba Mukisa provides {serviceName} consultations to clients across the globe. Distance is no barrier to spiritual guidance.
            </p>
            <div className="space-y-8">
              {locations.map((loc, i) => (
                <div key={i} className="space-y-2 border-l-2 border-amber-900/40 pl-6">
                  <h4 className="text-amber-500 font-bold text-sm uppercase tracking-widest flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5" /> {loc.region}
                  </h4>
                  <p className="text-[10px] text-slate-500 leading-loose">
                    {loc.cities.split(', ').map((city, idx) => (
                      <span key={idx} className="hover:text-amber-300 cursor-default transition-colors">
                        {city}{idx < loc.cities.split(', ').length - 1 ? ' • ' : ''}
                      </span>
                    ))}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Sidebar / Quick Contact */}
        <div className="space-y-8">
          <div className="bg-gradient-to-br from-amber-900/40 to-slate-900 border border-amber-700/40 rounded-3xl p-8 text-center space-y-6 shadow-2xl sticky top-24">
            <div className="w-16 h-16 bg-amber-950 border border-amber-500/50 rounded-full flex items-center justify-center mx-auto shadow-lg">
              <Phone className="w-8 h-8 text-amber-400" />
            </div>
            <h3 className="text-xl font-bold font-serif text-white">Need Guidance?</h3>
            <p className="text-xs text-amber-100/70 leading-relaxed">
              Speak directly with Doctor Baba Mukisa for personalized guidance on {serviceName.toLowerCase()}.
            </p>
            <div className="space-y-3 pt-2">
              <a href={`tel:${SITE_INFO.phone}`} className="flex items-center justify-center gap-2 w-full py-3.5 bg-slate-950 border border-amber-500/30 text-amber-400 rounded-2xl font-bold text-sm hover:bg-slate-900 transition-all">
                Call {SITE_INFO.phone}
              </a>
              <a href={`https://wa.me/${SITE_INFO.whatsapp}`} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 w-full py-3.5 bg-emerald-600 text-white rounded-2xl font-bold text-sm hover:bg-emerald-500 transition-all shadow-lg">
                <MessageSquare className="w-5 h-5" /> WhatsApp Doctor
              </a>
            </div>
            <div className="pt-4 text-[10px] text-amber-500/60 uppercase font-bold tracking-tighter">
              Confidential Spiritual Consultations
            </div>
          </div>

          <div className="bg-slate-900 border border-amber-900/30 rounded-3xl p-6 space-y-4">
            <h4 className="text-sm font-bold text-amber-200 border-b border-amber-900/30 pb-2">Related Offerings</h4>
            <div className="space-y-2">
              {[
                "Relationship Guidance", "Traditional Herbalist", "Marriage Harmony", "Ancestral Guidance", "Prosperity Consultations"
              ].filter(n => n !== serviceName).slice(0, 4).map((n, idx) => (
                <button 
                  key={idx} 
                  onClick={onContact}
                  className="flex items-center justify-between w-full p-3 bg-slate-950/50 hover:bg-amber-950/20 border border-amber-900/10 rounded-xl transition-all group"
                >
                  <span className="text-[11px] text-slate-400 group-hover:text-amber-200">{n}</span>
                  <ArrowRight className="w-3 h-3 text-amber-700 group-hover:text-amber-500 group-hover:translate-x-1 transition-all" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* FAQ / Trust Builder */}
      <section className="bg-slate-900 border border-amber-900/30 rounded-3xl p-8 sm:p-12 text-center space-y-8 shadow-inner">
        <h2 className="text-3xl font-bold font-serif text-amber-100">Frequently Asked Questions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
          <div className="space-y-2">
            <h4 className="text-amber-400 font-bold text-sm">How do consultations work?</h4>
            <p className="text-xs text-slate-400 leading-relaxed">Spiritual consultations involve discussing your personal circumstances, exploring ancestral perspectives, and identifying traditional practices to cultivate peace and clarity.</p>
          </div>
          <div className="space-y-2">
            <h4 className="text-amber-400 font-bold text-sm">Is distance a barrier for {serviceName.toLowerCase()}?</h4>
            <p className="text-xs text-slate-400 leading-relaxed">No. Doctor Baba Mukisa provides telephone, WhatsApp, and remote meditation guidance to clients globally with the same dedication as in-person visits.</p>
          </div>
          <div className="space-y-2">
            <h4 className="text-amber-400 font-bold text-sm">Are traditional herbal practices safe?</h4>
            <p className="text-xs text-slate-400 leading-relaxed">Yes. Traditional consultations focus on non-invasive herbal heritage and mindfulness meditation to support emotional well-being.</p>
          </div>
          <div className="space-y-2">
            <h4 className="text-amber-400 font-bold text-sm">What should I prepare for a consultation?</h4>
            <p className="text-xs text-slate-400 leading-relaxed">Simply bring an open mind and a clear understanding of the questions or challenges you would like guidance on.</p>
          </div>
        </div>
      </section>

    </div>
  );
};
