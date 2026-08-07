import React, { useState } from 'react';
import { BlogPost, Category } from '../types';
import { Sidebar } from './Sidebar';
import { Search, Share2, Facebook, Twitter, Eye, Calendar, User, BookOpen, ChevronLeft, ChevronRight } from 'lucide-react';

interface BlogViewProps {
  blogs: BlogPost[];
  categories: Category[];
  recentBlogs: BlogPost[];
  onSelectBlog: (blog: BlogPost) => void;
  onSelectCategory: (category: Category) => void;
}

export const BlogView: React.FC<BlogViewProps> = ({
  blogs,
  categories,
  recentBlogs,
  onSelectBlog,
  onSelectCategory,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  const filteredBlogs = blogs.filter((b) =>
    b.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    b.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    b.category_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredBlogs.length / itemsPerPage) || 1;
  const paginatedBlogs = filteredBlogs.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-in fade-in duration-300">
      
      {/* Main Blog List Column */}
      <div className="lg:col-span-8 space-y-8">
        
        {/* Header & Search */}
        <div className="bg-slate-900 border border-amber-900/50 rounded-2xl p-6 shadow-xl space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold font-serif text-amber-100">
                Spiritual Temple Blog
              </h1>
              <p className="text-xs text-slate-300 mt-1">
                Articles, spell casting guides, and traditional wisdom from Doctor Baba Mukisa.
              </p>
            </div>
            
            {/* Search Input */}
            <div className="relative w-full sm:w-64">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
                placeholder="Search articles..."
                className="w-full bg-slate-950 border border-amber-900/50 rounded-xl pl-9 pr-4 py-2 text-xs text-amber-100 placeholder-slate-500 focus:outline-none focus:border-amber-500"
              />
              <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
            </div>
          </div>
        </div>

        {/* Blog Post Cards */}
        <div className="space-y-6">
          {paginatedBlogs.length === 0 ? (
            <div className="bg-slate-900 border border-amber-900/40 rounded-2xl p-12 text-center text-amber-200">
              <p className="text-sm">No articles matched your search.</p>
            </div>
          ) : (
            paginatedBlogs.map((data) => (
              <article
                key={data.id}
                className="bg-slate-900 border border-amber-900/50 hover:border-amber-600/60 rounded-2xl p-6 shadow-xl transition-all space-y-4"
              >
                {/* Meta Header */}
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-amber-900/40 pb-3 text-xs text-amber-300/80">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1">
                      <User className="w-3.5 h-3.5 text-amber-500" /> {data.author}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-amber-500" /> {data.post_date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Eye className="w-3.5 h-3.5 text-amber-500" /> {data.views} Views
                    </span>
                  </div>

                  <span className="text-[10px] font-bold text-amber-400 uppercase bg-amber-950 px-2 py-0.5 rounded border border-amber-800/40">
                    {data.category_name}
                  </span>
                </div>

                {/* Main Content Layout */}
                <div className="flex flex-col md:flex-row gap-5">
                  <div className="w-full md:w-56 h-48 rounded-xl overflow-hidden shrink-0 bg-slate-950 border border-amber-900/30">
                    <img
                      src={data.feature_image}
                      alt={data.name}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/static/upload/blog_travel_01.jpg';
                      }}
                    />
                  </div>

                  <div className="flex-1 space-y-3">
                    <h2
                      onClick={() => onSelectBlog(data)}
                      className="text-xl font-bold font-serif text-amber-100 hover:text-amber-300 cursor-pointer transition-colors leading-snug"
                    >
                      {data.name}
                    </h2>

                    <p className="text-xs text-slate-300 leading-relaxed line-clamp-3">
                      {data.description}
                    </p>

                    {/* Social Share Buttons */}
                    <div className="flex items-center gap-2 pt-2 text-xs">
                      <span className="text-slate-400 text-[11px] flex items-center gap-1">
                        <Share2 className="w-3 h-3" /> Share:
                      </span>
                      <a
                        href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-blue-900/60 hover:bg-blue-800 text-blue-200 px-2.5 py-1 rounded text-[10px] flex items-center gap-1"
                      >
                        <Facebook className="w-3 h-3" /> Facebook
                      </a>
                      <a
                        href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(data.name)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-sky-900/60 hover:bg-sky-800 text-sky-200 px-2.5 py-1 rounded text-[10px] flex items-center gap-1"
                      >
                        <Twitter className="w-3 h-3" /> Twitter
                      </a>
                    </div>
                  </div>
                </div>

                {/* Card Action Footer */}
                <div className="pt-3 border-t border-amber-900/30 flex items-center justify-between">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[10px] text-amber-500 font-semibold">Services:</span>
                    {categories.slice(0, 3).map((cat) => (
                      <button
                        key={cat.id}
                        onClick={() => onSelectCategory(cat)}
                        className="text-[10px] bg-slate-950 text-slate-300 hover:text-amber-300 px-2 py-0.5 rounded border border-amber-900/30"
                      >
                        {cat.name}
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={() => onSelectBlog(data)}
                    className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-1.5 transition-colors shadow"
                  >
                    <BookOpen className="w-3.5 h-3.5" /> Read Article
                  </button>
                </div>

              </article>
            ))
          )}
        </div>

        {/* Pagination Control */}
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

      </div>

      {/* Sidebar Column */}
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
