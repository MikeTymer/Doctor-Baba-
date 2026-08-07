import React from 'react';
import { Category, BlogPost } from '../types';
import { Sidebar } from './Sidebar';
import { ArrowLeft, Eye, BookOpen, MessageSquare, Phone } from 'lucide-react';
import { SITE_INFO } from '../data/initialData';

interface CategoryDetailViewProps {
  category: Category;
  blogs: BlogPost[];
  categories: Category[];
  recentBlogs: BlogPost[];
  onBack: () => void;
  onSelectBlog: (blog: BlogPost) => void;
  onSelectCategory: (category: Category) => void;
}

export const CategoryDetailView: React.FC<CategoryDetailViewProps> = ({
  category,
  blogs,
  categories,
  recentBlogs,
  onBack,
  onSelectBlog,
  onSelectCategory,
}) => {
  const categoryBlogs = blogs.filter(
    (b) => b.category_slug === category.slug || b.category_name === category.name
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-in fade-in duration-300">
      
      {/* Main Content */}
      <div className="lg:col-span-8 space-y-8">
        
        {/* Back Button */}
        <div>
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 text-xs font-bold text-amber-400 hover:text-amber-300 bg-slate-900 border border-amber-900/50 px-4 py-2 rounded-xl transition-colors min-h-[44px]"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Services
          </button>
        </div>

        {/* Category Banner Card */}
        <div className="bg-slate-900 border border-amber-900/50 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6">
          
          <div className="space-y-2 border-b border-amber-900/40 pb-4">
            <span className="text-xs font-bold text-amber-400 uppercase bg-amber-950 px-2.5 py-1 rounded border border-amber-800/40">
              Spiritual Service Category
            </span>

            <h1 className="text-2xl sm:text-4xl font-extrabold font-serif text-amber-100">
              {category.name}
            </h1>

            <div className="flex items-center gap-3 text-xs text-amber-300/80 pt-1">
              <span className="flex items-center gap-1">
                <Eye className="w-3.5 h-3.5 text-amber-500" /> {category.views} Views
              </span>
            </div>
          </div>

          {/* Featured Image */}
          <div className="rounded-xl overflow-hidden bg-slate-950 border border-amber-900/40 aspect-video">
            <img
              src={category.featured_image}
              alt={category.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src = '/static/upload/blog_travel_01.jpg';
              }}
            />
          </div>

          {/* Category Description */}
          <div className="bg-slate-950 border border-amber-900/40 rounded-xl p-5 text-amber-100 text-sm sm:text-base leading-relaxed space-y-3 font-sans">
            <h3 className="font-bold font-serif text-amber-200 text-lg">
              About {category.name}
            </h3>
            <p>{category.description}</p>
            <p className="text-xs text-slate-300">
              Doctor Baba Mukisa performs personalized rituals for {category.name}. For immediate guidance or to discuss your specific needs, connect directly with his temple.
            </p>
          </div>

          {/* Action Row */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <a
              href={`https://wa.me/${SITE_INFO.whatsapp}?text=Hello%20Doctor%20Baba%20Mukisa,%20I%20am%20asking%20about%20${encodeURIComponent(category.name)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-emerald-700 hover:bg-emerald-600 text-white font-bold px-6 py-2.5 rounded-xl text-xs flex items-center gap-2 shadow transition-colors min-h-[44px]"
            >
              <MessageSquare className="w-4 h-4" /> WhatsApp Consultation
            </a>

            <a
              href={`tel:${SITE_INFO.phone}`}
              className="bg-slate-950 border border-amber-700/60 text-amber-200 font-semibold px-5 py-2.5 rounded-xl text-xs flex items-center gap-2 transition-colors min-h-[44px]"
            >
              <Phone className="w-4 h-4" /> Call {SITE_INFO.phone}
            </a>
          </div>

        </div>

        {/* Blogs under this Category */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold font-serif text-amber-100 border-b border-amber-900/40 pb-2">
            Articles & Spell Guides Under {category.name} ({categoryBlogs.length})
          </h3>

          {categoryBlogs.length === 0 ? (
            <div className="bg-slate-900 border border-amber-900/40 rounded-2xl p-8 text-center text-amber-200">
              <p className="text-xs text-slate-400">No blog articles currently listed under this category.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {categoryBlogs.map((post) => (
                <div
                  key={post.id}
                  onClick={() => onSelectBlog(post)}
                  className="group bg-slate-900 border border-amber-900/50 hover:border-amber-600/60 rounded-2xl p-5 shadow-xl cursor-pointer transition-all flex flex-col sm:flex-row gap-4"
                >
                  <div className="w-full sm:w-40 h-36 rounded-xl overflow-hidden shrink-0 bg-slate-950 border border-amber-900/30">
                    <img
                      src={post.feature_image}
                      alt={post.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/static/upload/blog_travel_01.jpg';
                      }}
                    />
                  </div>

                  <div className="flex-1 flex flex-col justify-between space-y-2">
                    <div>
                      <h4 className="text-base font-bold font-serif text-amber-100 group-hover:text-amber-300 transition-colors">
                        {post.name}
                      </h4>
                      <p className="text-xs text-slate-300 line-clamp-2 mt-1">
                        {post.mini_description}
                      </p>
                    </div>

                    <div className="flex items-center justify-between text-xs text-amber-400 font-semibold pt-2 border-t border-amber-900/30">
                      <span>{post.post_date}</span>
                      <span className="flex items-center gap-1">
                        <BookOpen className="w-3.5 h-3.5" /> Read Article →
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>

      {/* Sidebar */}
      <div className="lg:col-span-4">
        <Sidebar
          recentBlogs={recentBlogs}
          categories={categories}
          onSelectBlog={onSelectBlog}
          onSelectCategory={onSelectCategory}
        />
      </div>

    </div>
  );
};
