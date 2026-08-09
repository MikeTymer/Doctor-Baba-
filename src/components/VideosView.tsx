import React from 'react';
import { Video, Phone, MessageSquare, Sparkles } from 'lucide-react';
import { SITE_INFO } from '../data/initialData';

export const VideosView: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto space-y-10 animate-in fade-in duration-300">
      
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

    </div>
  );
};
