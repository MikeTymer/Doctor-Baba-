import React from 'react';
import { SITE_INFO } from '../data/initialData';
import { MapPin, Phone, Mail, Award, Flame, Heart, MessageSquare } from 'lucide-react';

interface AboutViewProps {
  onContact: () => void;
}

export const AboutView: React.FC<AboutViewProps> = ({ onContact }) => {
  return (
    <div className="max-w-5xl mx-auto space-y-12 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="bg-slate-900 border border-amber-900/50 rounded-2xl p-6 sm:p-10 shadow-2xl space-y-4 text-center">
        <div className="w-16 h-16 rounded-full bg-amber-950 border border-amber-700 mx-auto flex items-center justify-center text-amber-400 mb-2">
          <Flame className="w-8 h-8" />
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold font-serif text-amber-100">
          About Doctor Baba Mukisa
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Renowned African traditional healer and witch doctor, possessing sacred spiritual powers passed down through generations.
        </p>
      </div>

      {/* Main Grid: Who we are & How we help */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Who We Are */}
        <div className="bg-slate-900 border border-amber-900/50 rounded-2xl p-6 sm:p-8 space-y-4 shadow-xl">
          <div className="flex items-center gap-2 text-amber-400 font-bold font-serif text-xl border-b border-amber-900/40 pb-3">
            <Award className="w-5 h-5" /> Who We Are
          </div>
          <p className="text-xs sm:text-sm text-amber-100/90 leading-relaxed font-sans">
            Meet <strong>Doctor Baba Mukisa</strong>, a renowned African traditional healer and witch doctor possessing sacred spiritual powers passed down through generations from the Digo land in coastal Kenya.
          </p>
          <p className="text-xs text-slate-300 leading-relaxed">
            With decades of dedicated traditional practice, Doctor Baba Mukisa has assisted thousands of individuals across East Africa and internationally. His temple in Kampala, Uganda, serves as a sanctuary for those seeking love restoration, business luck, spiritual cleansing, and freedom from negative forces.
          </p>
        </div>

        {/* How We Help */}
        <div className="bg-slate-900 border border-amber-900/50 rounded-2xl p-6 sm:p-8 space-y-4 shadow-xl">
          <div className="flex items-center gap-2 text-amber-400 font-bold font-serif text-xl border-b border-amber-900/40 pb-3">
            <Heart className="w-5 h-5" /> How We Help
          </div>
          <p className="text-xs sm:text-sm text-amber-100/90 leading-relaxed font-sans">
            Whether you are struggling with a broken relationship, stagnant career, financial debt, court cases, or unexplained bad luck, Doctor Baba Mukisa provides personal spiritual readings and remote meditation.
          </p>
          <p className="text-xs text-slate-300 leading-relaxed">
            You do not need to travel to Kampala if distance is a barrier. Through remote spiritual meditation, feelings and thoughts are harmonized across any distance.
          </p>
        </div>

      </div>

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

          <div className="bg-slate-950 border border-amber-900/30 rounded-xl p-4 space-y-2">
            <div className="text-amber-400 font-bold text-sm flex items-center gap-2">
              <Mail className="w-4 h-4" /> Email Address
            </div>
            <p className="text-amber-200 font-semibold">{SITE_INFO.email}</p>
            <p className="text-[10px] text-slate-400">Send email inquiries or consultation notes.</p>
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
