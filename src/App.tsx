import { useState, useEffect } from 'react';
import { ActiveTab, BlogPost, Category, BlogComment, Subscriber } from './types';
import { INITIAL_BLOGS, INITIAL_CATEGORIES, INITIAL_COMMENTS, INITIAL_SUBSCRIBERS } from './data/initialData';
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
import { AdminView } from './components/AdminView';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('home');
  const [blogs, setBlogs] = useState<BlogPost[]>(INITIAL_BLOGS);
  const [categories, setCategories] = useState<Category[]>(INITIAL_CATEGORIES);

  const handleAddCategory = (newCategory: Category) => {
    setCategories((prev) => {
      if (prev.some((c) => c.slug === newCategory.slug)) return prev;
      return [...prev, newCategory];
    });
  };
  const [comments, setComments] = useState<BlogComment[]>(INITIAL_COMMENTS);
  const [subscribers, setSubscribers] = useState<Subscriber[]>(INITIAL_SUBSCRIBERS);

  const [selectedBlog, setSelectedBlog] = useState<BlogPost | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

  // Sync route /admin if user navigates directly or clicks Admin facilities
  useEffect(() => {
    if (window.location.pathname === '/admin') {
      setActiveTab('admin');
    }

    const handlePopState = () => {
      if (window.location.pathname === '/admin') {
        setActiveTab('admin');
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleTabChange = (tab: ActiveTab) => {
    setActiveTab(tab);
    if (tab === 'admin') {
      window.history.pushState({}, '', '/admin');
    } else if (window.location.pathname === '/admin') {
      window.history.pushState({}, '', '/');
    }
  };

  const handleAddBlog = (newBlog: BlogPost) => {
    setBlogs((prev) => [newBlog, ...prev]);
  };

  const handleUpdateBlog = (updatedBlog: BlogPost) => {
    setBlogs((prev) => prev.map((b) => (b.id === updatedBlog.id ? updatedBlog : b)));
    if (selectedBlog && selectedBlog.id === updatedBlog.id) {
      setSelectedBlog(updatedBlog);
    }
  };

  const handleDeleteBlog = (blogId: string) => {
    setBlogs((prev) => prev.filter((b) => b.id !== blogId));
  };

  const handleDeleteComment = (commentId: string) => {
    setComments((prev) => prev.filter((c) => c.id !== commentId));
  };

  const handleAddSubscriber = (email: string, source: string = 'Footer Form') => {
    if (!email) return { added: false, isDuplicate: false, message: 'Please enter a valid email address.' };
    const cleanEmail = email.trim().toLowerCase();

    // Check if email already exists
    const isAlreadySubscribed = subscribers.some((s) => s.email.toLowerCase() === cleanEmail);

    if (isAlreadySubscribed) {
      return {
        added: false,
        isDuplicate: true,
        message: 'This email has already been subscribed, please wait for an official communication from the Doctor.'
      };
    }

    const uniqueId = `SUB-${Math.random().toString(36).substring(2, 7).toUpperCase()}-${Date.now()}`;
    const newSub: Subscriber = {
      id: uniqueId,
      email: email.trim(),
      subscribed_date: new Date().toISOString().split('T')[0],
      status: 'Active',
      source
    };

    setSubscribers((prev) => [newSub, ...prev]);

    return {
      added: true,
      isDuplicate: false,
      subscriberId: uniqueId,
      message: 'Thank you for subscribing! Your email has been registered for weekly spiritual updates.'
    };
  };

  const handleDeleteSubscriber = (subscriberId: string) => {
    setSubscribers((prev) => prev.filter((s) => s.id !== subscriberId));
  };

  const handleSelectBlog = (blog: BlogPost) => {
    setSelectedBlog(blog);
    handleTabChange('blog-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectCategory = (category: Category) => {
    setSelectedCategory(category);
    handleTabChange('category-detail');
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
        setActiveTab={handleTabChange}
      />

      {/* Main App Content Viewport */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-20 md:pb-12">
        {activeTab === 'home' && (
          <HomeView
            onNavigate={(tab) => handleTabChange(tab)}
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
            onBack={() => handleTabChange('blog')}
            onSelectBlog={handleSelectBlog}
            onSelectCategory={handleSelectCategory}
            onAddComment={handleAddComment}
          />
        )}

        {activeTab === 'services' && (
          <ServicesView
            categories={categories}
            onSelectCategory={handleSelectCategory}
            onContact={() => handleTabChange('contact')}
          />
        )}

        {activeTab === 'category-detail' && selectedCategory && (
          <CategoryDetailView
            category={selectedCategory}
            blogs={blogs}
            categories={categories}
            recentBlogs={blogs}
            onBack={() => handleTabChange('services')}
            onSelectBlog={handleSelectBlog}
            onSelectCategory={handleSelectCategory}
          />
        )}

        {activeTab === 'videos' && <VideosView />}

        {activeTab === 'gallery' && <GalleryView />}

        {activeTab === 'about' && (
          <AboutView onContact={() => handleTabChange('contact')} />
        )}

        {activeTab === 'contact' && <ContactView />}

        {activeTab === 'admin' && (
          <AdminView
            blogs={blogs}
            categories={categories}
            onAddCategory={handleAddCategory}
            comments={comments}
            subscribers={subscribers}
            onAddBlog={handleAddBlog}
            onUpdateBlog={handleUpdateBlog}
            onDeleteBlog={handleDeleteBlog}
            onDeleteComment={handleDeleteComment}
            onAddSubscriber={(email) => handleAddSubscriber(email, 'Admin Added')}
            onDeleteSubscriber={handleDeleteSubscriber}
            onBackToSite={() => handleTabChange('home')}
          />
        )}
      </main>

      {/* Footer */}
      <Footer setActiveTab={handleTabChange} onSubscribe={(email) => handleAddSubscriber(email, 'Website Newsletter')} />

      {/* Mobile Bottom Navigation Bar */}
      <MobileBottomNav activeTab={activeTab} setActiveTab={handleTabChange} />

      {/* Floating Desktop WhatsApp Button */}
      <FloatingWhatsApp />

    </div>
  );
}
