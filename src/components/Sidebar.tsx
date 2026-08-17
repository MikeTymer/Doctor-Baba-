import React, { useState } from 'react';
import { BlogPost, Category } from '../types';
import { SITE_INFO } from '../data/initialData';
import { normalizeImageUrl, handleImageError } from '../utils/imageUtils';
import { Mail, CheckCircle2, Flame, Instagram, Sparkles } from 'lucide-react';

interface SidebarProps {
  recentBlogs: BlogPost[];
  categories: Category[];
  onSelectBlog: (blog: BlogPost) => void;
  onSelectCategory: (category: Category) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  recentBlogs,
  categories,
  onSelectBlog,
  onSelectCategory,
}) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);

    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source: 'Sidebar Widget' })
      });
      const data = await res.json();
      if (data.success) {
        setSubscribed(true);
        setEmail('');
        if (data.messageData) {
          try {
            const stored = localStorage.getItem('contact_messages');
            const msgs = stored ? JSON.parse(stored) : [];
            msgs.unshift(data.messageData);
            localStorage.setItem('contact_messages', JSON.stringify(msgs));
            window.dispatchEvent(new Event('contact_messages_updated'));
          } catch (err) {
            console.warn('Sidebar storage update warning:', err);
          }
        }
      }
    } catch {
      setSubscribed(true);
      setEmail('');
    } finally {
      setLoading(false);
    }
  };

  const instagramShots = [
    'https://images.unsplash.com/photo-1545232979-fbfd42e0188d?auto=format&fit=crop&w=300&q=80',
    'https://images.unsplash.com/photo-1514733670139-4d87a1941d55?auto=format&fit=crop&w=300&q=80',
    'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=300&q=80',
    'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=300&q=80',
    'https://images.unsplash.com/photo-1602928321679-560bb453f190?auto=format&fit=crop&w=300&q=80',
    'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=300&q=80',
  ];

  return (
    <aside className="space-y-8">
      {/* Newsletter Widget */}
      <div className="bg-slate-900 border border-amber-900/60 rounded-2xl p-6 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-3 opacity-10">
          <Flame className="w-24 h-24 text-amber-500" />
        </div>
        <div className="relative z-10 text-center">
          <div className="w-12 h-12 rounded-full bg-amber-950 border border-amber-700/60 mx-auto flex items-center justify-center mb-3 text-amber-400">
            <Mail className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold font-serif text-amber-100 mb-2">
            Subscribe Today!
          </h3>
          <p className="text-xs text-slate-300 mb-4 leading-relaxed">
            Subscribe to Doctor Baba Mukisa’s weekly spiritual updates, monthly horoscopes, and ancestral wisdom via email.
          </p>

          {subscribed ? (
            <div className="bg-emerald-950/80 border border-emerald-700/60 rounded-xl p-3 text-emerald-200 text-xs flex items-center justify-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Thank you! You are subscribed to updates.</span>
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="space-y-2.5">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address..."
                required
                className="w-full bg-slate-950 border border-amber-900/50 rounded-xl px-3.5 py-2.5 text-xs text-amber-100 placeholder-slate-500 focus:outline-none focus:border-amber-500"
              />
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold py-2.5 rounded-xl text-xs transition-colors shadow-md"
              >
                {loading ? 'Subscribing...' : 'Subscribe Now'}
              </button>
            </form>
          )}
        </div>
      </div>

      {/* WhatsApp Quick Consultation Card */}
      <div className="bg-gradient-to-br from-emerald-950 to-slate-950 border border-emerald-800/60 rounded-2xl p-5 shadow-xl">
        <div className="flex items-center gap-3 mb-3">
          <Sparkles className="w-5 h-5 text-emerald-400" />
          <h4 className="font-bold text-emerald-100 text-sm font-serif">
            Direct Spiritual Guidance
          </h4>
        </div>
        <p className="direct-guidance-text text-xs text-white dark:text-white mb-4 leading-relaxed font-medium">
          Need spiritual advice or traditional herbal consultation? Speak directly with Doctor Baba Mukisa on WhatsApp.
        </p>
        <a
          href={`https://wa.me/${SITE_INFO.whatsapp}?text=Hello%20Doctor%20Baba%20Mukisa,%20I%20need%20a%20spiritual%20consultation`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold text-xs shadow transition-colors"
        >
          Chat on WhatsApp Now
        </a>
      </div>

      {/* Recent Posts */}
      <div className="bg-slate-900 border border-amber-900/40 rounded-2xl p-6 shadow-xl">
        <h3 className="text-lg font-bold font-serif text-amber-200 mb-4 pb-2 border-b border-amber-900/50 flex items-center gap-2">
          <Flame className="w-4 h-4 text-amber-500" /> Recent Spiritual Articles
        </h3>
        <div className="space-y-4">
          {recentBlogs.slice(0, 4).map((blog) => (
            <div
              key={blog.id}
              onClick={() => onSelectBlog(blog)}
              className="group flex gap-3 cursor-pointer items-center p-2 rounded-xl hover:bg-slate-800/80 transition-colors"
            >
              <div className="w-16 h-16 rounded-lg overflow-hidden shrink-0 bg-slate-950 border border-amber-900/30">
                <img
                  src={normalizeImageUrl(blog.feature_image)}
                  alt={blog.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  onError={handleImageError}
                />
              </div>
              <div className="min-w-0 flex-1">
                <h4 className="text-xs font-semibold text-amber-100 group-hover:text-amber-300 transition-colors line-clamp-2">
                  {blog.name}
                </h4>
                <p className="text-[10px] text-amber-500/80 mt-1">
                  {blog.post_date}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Popular Categories */}
      <div className="sidebar-categories-box bg-slate-900 border border-amber-900/40 rounded-2xl p-6 shadow-xl">
        <h3 className="text-lg font-bold font-serif text-amber-200 mb-4 pb-2 border-b border-amber-900/50">
          Spiritual Services & Categories
        </h3>
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat)}
              className="category-btn text-xs bg-slate-950 hover:bg-amber-950 hover:text-amber-300 text-amber-100/90 border border-amber-900/40 px-3 py-2 rounded-xl transition-colors font-medium text-left"
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Instagram Feed Grid */}
      <div className="bg-slate-900 border border-amber-900/40 rounded-2xl p-6 shadow-xl">
        <div className="flex items-center gap-2 mb-4 pb-2 border-b border-amber-900/50">
          <Instagram className="w-4 h-4 text-amber-400" />
          <h3 className="text-lg font-bold font-serif text-amber-200">
            Temple Gallery
          </h3>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {instagramShots.map((imgSrc, idx) => (
            <div key={idx} className="aspect-square rounded-lg overflow-hidden bg-slate-950 border border-amber-900/20">
              <img
                src={imgSrc}
                alt="Temple Instagram"
                className="w-full h-full object-cover hover:opacity-80 transition-opacity"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?auto=format&fit=crop&w=800&q=80';
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
};
