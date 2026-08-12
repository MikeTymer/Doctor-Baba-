import React, { useState } from 'react';
import { BlogPost, BlogComment, Category } from '../types';
import { Sidebar } from './Sidebar';
import { SITE_INFO } from '../data/initialData';
import { normalizeImageUrl, handleImageError } from '../utils/imageUtils';
import { Calendar, User, Eye, Share2, Facebook, Twitter, MessageSquare, Send, ArrowLeft, CheckCircle2, Phone, Sparkles, ShieldCheck } from 'lucide-react';

interface BlogDetailViewProps {
  blog: BlogPost;
  comments: BlogComment[];
  categories: Category[];
  recentBlogs: BlogPost[];
  onBack: () => void;
  onSelectBlog: (blog: BlogPost) => void;
  onSelectCategory: (category: Category) => void;
  onAddComment: (comment: { author_name: string; description: string }) => void;
}

export const BlogDetailView: React.FC<BlogDetailViewProps> = ({
  blog,
  comments,
  categories,
  recentBlogs,
  onBack,
  onSelectBlog,
  onSelectCategory,
  onAddComment,
}) => {
  const [commentName, setCommentName] = useState('');
  const [commentText, setCommentText] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentName || !commentText) return;
    onAddComment({
      author_name: commentName,
      description: commentText,
    });
    setCommentName('');
    setCommentText('');
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  const blogComments = comments.filter((c) => c.blog_id === blog.id);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-in fade-in duration-300">
      
      {/* Main Content */}
      <div className="lg:col-span-8 space-y-8">
        
        {/* Back Button & Breadcrumbs */}
        <div className="flex items-center justify-between gap-4">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 text-xs font-bold text-amber-400 hover:text-amber-300 bg-slate-900 border border-amber-900/50 px-4 py-2 rounded-xl transition-colors min-h-[44px]"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Articles
          </button>

          <div className="hidden sm:flex items-center gap-2 text-xs text-slate-400">
            <span>Home</span> / <span>Blog</span> / <span className="text-amber-300 truncate max-w-xs">{blog.name}</span>
          </div>
        </div>

        {/* Article Container */}
        <article className="blog-article-card bg-slate-900 border border-amber-900/50 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6">
          
          {/* Title & Metadata */}
          <div className="space-y-3 pb-6 border-b border-amber-900/40">
            <span className="text-xs font-bold text-amber-400 uppercase bg-amber-950 px-2.5 py-1 rounded border border-amber-800/40">
              {blog.category_name}
            </span>

            <h1 className="text-2xl sm:text-4xl font-extrabold font-serif text-amber-100 leading-tight">
              {blog.name}
            </h1>

            <div className="blog-meta-details flex flex-wrap items-center gap-4 text-xs text-amber-300/80 pt-1">
              <span className="flex items-center gap-1">
                <User className="w-3.5 h-3.5 text-amber-500" /> By {blog.author}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-amber-500" /> {blog.post_date}
              </span>
              <span className="flex items-center gap-1">
                <Eye className="w-3.5 h-3.5 text-amber-500" /> {blog.views} Views
              </span>
            </div>

            {/* Social Sharing */}
            <div className="flex items-center gap-2 pt-2 text-xs">
              <span className="text-slate-400 text-[11px] flex items-center gap-1">
                <Share2 className="w-3 h-3" /> Share:
              </span>
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-900/60 hover:bg-blue-800 text-blue-200 px-3 py-1 rounded text-[11px] flex items-center gap-1"
              >
                <Facebook className="w-3 h-3" /> Facebook
              </a>
              <a
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(blog.name)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-sky-900/60 hover:bg-sky-800 text-sky-200 px-3 py-1 rounded text-[11px] flex items-center gap-1"
              >
                <Twitter className="w-3 h-3" /> Twitter
              </a>
            </div>
          </div>

          {/* Article Image */}
          <div className="rounded-xl overflow-hidden bg-slate-950 border border-amber-900/40 aspect-video">
            <img
              src={normalizeImageUrl(blog.feature_image)}
              alt={blog.name}
              className="w-full h-full object-cover"
              onError={handleImageError}
            />
          </div>

          {/* Mini Description Callout */}
          <div className="bg-amber-950/50 border-l-4 border-amber-500 p-4 rounded-r-xl text-amber-100 italic text-sm leading-relaxed">
            "{blog.mini_description}"
          </div>

          {/* Main Content Body */}
          <div className="text-amber-100/90 text-sm sm:text-base leading-relaxed space-y-6 font-sans">
            <p className="text-base sm:text-lg text-amber-200 font-medium border-l-2 border-amber-500 pl-4 py-1">
              {blog.description}
            </p>

            {blog.content_sections && blog.content_sections.length > 0 ? (
              blog.content_sections.map((section, idx) => (
                <div key={idx} className="space-y-3 pt-3">
                  <h3 className="text-lg sm:text-xl font-bold font-serif text-amber-300 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
                    {section.heading}
                  </h3>
                  <p className="text-slate-300 leading-relaxed text-sm sm:text-base">
                    {section.body}
                  </p>
                </div>
              ))
            ) : (
              <p>
                Doctor Baba Mukisa’s traditional spiritual practices combine sacred herbs gathered from coastal Kenya with traditional meditation in Kampala, Uganda. Each situation is examined thoroughly to deliver tailored spiritual guidance and long-lasting peace.
              </p>
            )}
          </div>

          {/* Urgent Consultation Callout Banner */}
          <div className="bg-gradient-to-r from-amber-950 via-slate-950 to-emerald-950 border border-amber-700/60 rounded-2xl p-6 shadow-xl space-y-4 my-6">
            <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <span>Direct Spiritual Help from Doctor Baba Mukisa</span>
            </div>
            <h4 className="text-xl font-bold font-serif text-amber-100">
              Need Help With This Challenge?
            </h4>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Do not suffer in silence. Doctor Baba Mukisa provides confidential, immediate spiritual readings and remote meditation. Distance is no barrier to spiritual healing.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <a
                href={`https://wa.me/${SITE_INFO.whatsapp}?text=Hello%20Doctor%20Baba%20Mukisa,%20I%20read%20your%20article%20'${encodeURIComponent(blog.name)}'%20and%20I%20need%20your%20spiritual%20help`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-5 py-3 rounded-xl text-xs flex items-center gap-2 shadow transition-all hover:scale-105 active:scale-95 min-h-[44px]"
              >
                <MessageSquare className="w-4 h-4" /> Consult via WhatsApp ({SITE_INFO.phone})
              </a>
              <a
                href={`tel:${SITE_INFO.phone}`}
                className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-5 py-3 rounded-xl text-xs flex items-center gap-2 shadow transition-all hover:scale-105 active:scale-95 min-h-[44px]"
              >
                <Phone className="w-4 h-4" /> Call Doctor Baba Mukisa
              </a>
            </div>
          </div>

          {/* Author Box */}
          <div className="bg-slate-950 border border-amber-900/40 rounded-xl p-5 flex flex-col sm:flex-row items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-amber-900 overflow-hidden shrink-0 border border-amber-500">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80"
                alt="Doctor Baba Mukisa"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="space-y-1 text-center sm:text-left">
              <h4 className="font-bold font-serif text-amber-200 text-base">
                Doctor Baba Mukisa (Author & Healer)
              </h4>
              <p className="text-xs text-slate-300">
                Renowned African traditional doctor with ancestral spiritual powers. For direct consultations, call or WhatsApp <a href={`tel:${SITE_INFO.phone}`} className="text-amber-400 underline font-semibold">{SITE_INFO.phone}</a>.
              </p>
            </div>
          </div>

        </article>

        {/* Comments Section */}
        <div className="bg-slate-900 border border-amber-900/50 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6">
          <div className="flex items-center justify-between border-b border-amber-900/40 pb-4">
            <h3 className="text-xl font-bold font-serif text-amber-100 flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-amber-500" />
              Comments ({blogComments.length})
            </h3>
          </div>

          {/* Comments List */}
          <div className="space-y-4">
            {blogComments.length === 0 ? (
              <p className="text-xs text-slate-400 italic">No comments yet. Be the first to share your thoughts!</p>
            ) : (
              blogComments.map((c) => (
                <div key={c.id} className="bg-slate-950 border border-amber-900/30 rounded-xl p-4 space-y-2">
                  <div className="flex items-center justify-between text-xs text-amber-300">
                    <span className="font-bold">{c.author_name}</span>
                    <span className="text-[10px] text-slate-500">{c.comment_date}</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">{c.description}</p>
                </div>
              ))
            )}
          </div>

          {/* Add Comment Form */}
          <div className="pt-4 border-t border-amber-900/40">
            <h4 className="text-sm font-bold font-serif text-amber-200 mb-3">
              Leave a Comment
            </h4>

            {submitted && (
              <div className="bg-emerald-950 border border-emerald-700/60 rounded-xl p-3 text-emerald-200 text-xs flex items-center gap-2 mb-4">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Your comment has been posted successfully!</span>
              </div>
            )}

            <form onSubmit={handleSubmitComment} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-amber-200 mb-1">Your Name</label>
                <input
                  type="text"
                  required
                  value={commentName}
                  onChange={(e) => setCommentName(e.target.value)}
                  placeholder="e.g. Samuel K."
                  className="w-full bg-slate-950 border border-amber-900/50 rounded-xl px-4 py-2.5 text-xs text-amber-100 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-amber-200 mb-1">Your Comment</label>
                <textarea
                  required
                  rows={3}
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  placeholder="Write your comment or spiritual inquiry here..."
                  className="w-full bg-slate-950 border border-amber-900/50 rounded-xl px-4 py-2.5 text-xs text-amber-100 focus:outline-none focus:border-amber-500"
                />
              </div>

              <button
                type="submit"
                className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-6 py-2.5 rounded-xl text-xs flex items-center gap-2 transition-colors min-h-[44px]"
              >
                <Send className="w-3.5 h-3.5" /> Submit Comment
              </button>
            </form>
          </div>

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
