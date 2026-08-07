import { useState } from 'react';
import { ActiveTab, BlogPost, Category, BlogComment } from './types';
import { INITIAL_BLOGS, INITIAL_CATEGORIES, INITIAL_COMMENTS } from './data/initialData';
import { Navbar } from './components/Navbar';
import { MobileBottomNav } from './components/MobileBottomNav';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';

import { HomeView } from './components/HomeView';
import { BlogView } from './components/BlogView';
import { BlogDetailView } from './components/BlogDetailView';
import { ServicesView } from './components/ServicesView';
import { CategoryDetailView } from './components/CategoryDetailView';
import { VideosView } from './components/VideosView';
import { GalleryView } from './components/GalleryView';
import { AboutView } from './components/AboutView';
import { ContactView } from './components/ContactView';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('home');
  const [blogs, setBlogs] = useState<BlogPost[]>(INITIAL_BLOGS);
  const [categories] = useState<Category[]>(INITIAL_CATEGORIES);
  const [comments, setComments] = useState<BlogComment[]>(INITIAL_COMMENTS);

  const [selectedBlog, setSelectedBlog] = useState<BlogPost | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

  const handleAddBlog = (newBlog: BlogPost) => {
    setBlogs((prev) => [newBlog, ...prev]);
  };

  const handleDeleteBlog = (blogId: string) => {
    setBlogs((prev) => prev.filter((b) => b.id !== blogId));
  };

  const handleSelectBlog = (blog: BlogPost) => {
    setSelectedBlog(blog);
    setActiveTab('blog-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectCategory = (category: Category) => {
    setSelectedCategory(category);
    setActiveTab('category-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAddComment = (newComment: { author_name: string; description: string }) => {
    if (!selectedBlog) return;
    const commentObj: BlogComment = {
      id: `c-${Date.now()}`,
      blog_id: selectedBlog.id,
      author_name: newComment.author_name,
      comment_date: new Date().toISOString().split('T')[0],
      description: newComment.description,
    };
    setComments((prev) => [commentObj, ...prev]);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-amber-500 selection:text-slate-950">
      
      {/* Navbar Header */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {/* Main App Content Viewport */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-20 md:pb-12">
        {activeTab === 'home' && (
          <HomeView
            onNavigate={(tab) => setActiveTab(tab)}
            onSelectBlog={handleSelectBlog}
            onSelectCategory={handleSelectCategory}
            featuredBlogs={blogs}
            categories={categories}
          />
        )}

        {activeTab === 'blog' && (
          <BlogView
            blogs={blogs}
            categories={categories}
            recentBlogs={blogs}
            onSelectBlog={handleSelectBlog}
            onSelectCategory={handleSelectCategory}
          />
        )}

        {activeTab === 'blog-detail' && selectedBlog && (
          <BlogDetailView
            blog={selectedBlog}
            comments={comments}
            categories={categories}
            recentBlogs={blogs}
            onBack={() => setActiveTab('blog')}
            onSelectBlog={handleSelectBlog}
            onSelectCategory={handleSelectCategory}
            onAddComment={handleAddComment}
          />
        )}

        {activeTab === 'services' && (
          <ServicesView
            categories={categories}
            onSelectCategory={handleSelectCategory}
            onContact={() => setActiveTab('contact')}
          />
        )}

        {activeTab === 'category-detail' && selectedCategory && (
          <CategoryDetailView
            category={selectedCategory}
            blogs={blogs}
            categories={categories}
            recentBlogs={blogs}
            onBack={() => setActiveTab('services')}
            onSelectBlog={handleSelectBlog}
            onSelectCategory={handleSelectCategory}
          />
        )}

        {activeTab === 'videos' && <VideosView />}

        {activeTab === 'gallery' && <GalleryView />}

        {activeTab === 'about' && (
          <AboutView onContact={() => setActiveTab('contact')} />
        )}

        {activeTab === 'contact' && <ContactView />}
      </main>

      {/* Footer */}
      <Footer setActiveTab={setActiveTab} />

      {/* Mobile Bottom Navigation Bar */}
      <MobileBottomNav activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Floating Desktop WhatsApp Button */}
      <FloatingWhatsApp />

    </div>
  );
}
