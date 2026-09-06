import { useState, useEffect, useCallback, useRef } from 'react';
import { ActiveTab, BlogPost, Category, BlogComment, Subscriber } from './types';
import { INITIAL_BLOGS, INITIAL_CATEGORIES, INITIAL_COMMENTS, INITIAL_SUBSCRIBERS } from './data/initialData';
import { normalizeImageUrl } from './utils/imageUtils';
import { updateSEO, getSEOForView } from './utils/seo';
import { 
  getPathnameForState, 
  resolveRouteFromPathname, 
  trackGoogleAdsPageView 
} from './utils/routes';
import { Navbar } from './components/Navbar';
import { MobileBottomNav } from './components/MobileBottomNav';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { WhatsAppProvider } from './context/WhatsAppContext';
import { WhatsAppModal } from './components/WhatsAppModal';
import { EmailProvider } from './context/EmailContext';
import { EmailModal } from './components/EmailModal';

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
import { ServiceDetailView } from './components/ServiceDetailView';

export default function App() {
  const [blogs, setBlogs] = useState<BlogPost[]>(() => {
    try {
      const saved = localStorage.getItem('doctor_blogs');
      if (saved) {
        const parsed: BlogPost[] = JSON.parse(saved);
        return parsed.map((b) => ({
          ...b,
          feature_image: normalizeImageUrl(b.feature_image)
        }));
      }
    } catch (err) {
      console.warn('Failed to load saved blogs from localStorage:', err);
    }
    return INITIAL_BLOGS.map((b) => ({
      ...b,
      feature_image: normalizeImageUrl(b.feature_image)
    }));
  });

  const [categories, setCategories] = useState<Category[]>(() => {
    try {
      const saved = localStorage.getItem('doctor_categories');
      if (saved) {
        const parsed: Category[] = JSON.parse(saved);
        return parsed.map((c) => ({
          ...c,
          featured_image: normalizeImageUrl(c.featured_image)
        }));
      }
    } catch (err) {
      console.warn('Failed to load saved categories from localStorage:', err);
    }
    return INITIAL_CATEGORIES.map((c) => ({
      ...c,
      featured_image: normalizeImageUrl(c.featured_image)
    }));
  });

  // Calculate initial route based on initial URL
  const [activeTab, setActiveTab] = useState<ActiveTab>(() => {
    if (typeof window !== 'undefined') {
      const initialRoute = resolveRouteFromPathname(window.location.pathname, INITIAL_BLOGS, INITIAL_CATEGORIES);
      return initialRoute.tab;
    }
    return 'home';
  });

  const [selectedBlog, setSelectedBlog] = useState<BlogPost | null>(() => {
    if (typeof window !== 'undefined') {
      const initialRoute = resolveRouteFromPathname(window.location.pathname, INITIAL_BLOGS, INITIAL_CATEGORIES);
      return initialRoute.blog;
    }
    return null;
  });

  const [selectedCategory, setSelectedCategory] = useState<Category | null>(() => {
    if (typeof window !== 'undefined') {
      const initialRoute = resolveRouteFromPathname(window.location.pathname, INITIAL_BLOGS, INITIAL_CATEGORIES);
      return initialRoute.category;
    }
    return null;
  });

  const [selectedServiceDetail, setSelectedServiceDetail] = useState<string | null>(() => {
    if (typeof window !== 'undefined') {
      const initialRoute = resolveRouteFromPathname(window.location.pathname, INITIAL_BLOGS, INITIAL_CATEGORIES);
      return initialRoute.serviceName;
    }
    return null;
  });

  useEffect(() => {
    try {
      localStorage.setItem('doctor_blogs', JSON.stringify(blogs));
    } catch (err) {
      console.warn('Failed to save blogs to localStorage:', err);
    }
  }, [blogs]);

  useEffect(() => {
    try {
      localStorage.setItem('doctor_categories', JSON.stringify(categories));
    } catch (err) {
      console.warn('Failed to save categories to localStorage:', err);
    }
  }, [categories]);

  // Ensure new initial blogs are loaded even if localStorage exists
  useEffect(() => {
    const missingBlogs = INITIAL_BLOGS.filter(ib => !blogs.some(b => b.id === ib.id));
    if (missingBlogs.length > 0) {
      setBlogs(prev => {
        const existingIds = new Set(prev.map(b => b.id));
        const toAdd = INITIAL_BLOGS.filter(ib => !existingIds.has(ib.id));
        return [...prev, ...toAdd.map(b => ({
          ...b,
          feature_image: normalizeImageUrl(b.feature_image)
        }))];
      });
    }
  }, []);

  // Fetch blogs from server to synchronize any newly published articles or view counts
  useEffect(() => {
    fetch('/api/blogs')
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.blogs) && data.blogs.length > 0) {
          setBlogs((prev) => {
            const serverMap = new Map<string, BlogPost>(data.blogs.map((b: BlogPost) => [b.id, b]));
            const merged = prev.map((localB) => {
              const serverB = serverMap.get(localB.id);
              if (serverB) {
                return {
                  ...serverB,
                  views: Math.max(Number(serverB.views) || 0, Number(localB.views) || 0),
                  feature_image: normalizeImageUrl(serverB.feature_image || localB.feature_image)
                };
              }
              return localB;
            });
            const existingIds = new Set(prev.map((b) => b.id));
            for (const sb of data.blogs) {
              if (!existingIds.has(sb.id)) {
                merged.push({
                  ...sb,
                  views: Number(sb.views) || 100,
                  feature_image: normalizeImageUrl(sb.feature_image)
                });
              }
            }
            return merged;
          });
        }
      })
      .catch((err) => {
        console.warn('Could not sync blogs from server API:', err);
      });
  }, []);

  // Track visited blog post to increment views when visited
  const lastVisitedBlogIdRef = useRef<string | null>(null);

  const handleIncrementBlogViews = useCallback(async (blogId: string) => {
    // 1. Immediately increment in React blogs state
    setBlogs((prev) =>
      prev.map((b) => (b.id === blogId ? { ...b, views: (Number(b.views) || 0) + 1 } : b))
    );

    // 2. Immediately increment in selectedBlog state so current screen reflects +1
    setSelectedBlog((prev) => {
      if (prev && (prev.id === blogId || prev.slug === blogId)) {
        return { ...prev, views: (Number(prev.views) || 0) + 1 };
      }
      return prev;
    });

    // 3. Persist increment to server store
    try {
      const res = await fetch(`/api/blogs/${encodeURIComponent(blogId)}/view`, {
        method: 'POST'
      });
      const data = await res.json();
      if (data.success && typeof data.views === 'number') {
        setBlogs((prev) =>
          prev.map((b) => (b.id === blogId ? { ...b, views: Math.max(Number(b.views) || 0, data.views) } : b))
        );
        setSelectedBlog((prev) => {
          if (prev && (prev.id === blogId || prev.slug === blogId)) {
            return { ...prev, views: Math.max(Number(prev.views) || 0, data.views) };
          }
          return prev;
        });
      }
    } catch {
      // Local state and localStorage already updated
    }
  }, []);

  // Whenever a blog post is visited, add a view count
  useEffect(() => {
    if (activeTab === 'blog-detail' && selectedBlog) {
      if (lastVisitedBlogIdRef.current !== selectedBlog.id) {
        lastVisitedBlogIdRef.current = selectedBlog.id;
        handleIncrementBlogViews(selectedBlog.id);
      }
    } else {
      // Reset ref when user navigates away from the blog detail view
      lastVisitedBlogIdRef.current = null;
    }
  }, [activeTab, selectedBlog?.id, handleIncrementBlogViews]);

  const [comments, setComments] = useState<BlogComment[]>(INITIAL_COMMENTS);
  const [subscribers, setSubscribers] = useState<Subscriber[]>(INITIAL_SUBSCRIBERS);

  // Centralized navigation function that updates URL and tracking
  const navigateTo = useCallback((
    tab: ActiveTab, 
    options?: {
      blog?: BlogPost | null;
      category?: Category | null;
      service?: string | null;
      replace?: boolean;
    }
  ) => {
    const blog = options?.blog !== undefined ? options.blog : (tab === 'blog-detail' ? selectedBlog : null);
    const category = options?.category !== undefined ? options.category : (tab === 'category-detail' ? selectedCategory : null);
    const service = options?.service !== undefined ? options.service : (tab === 'service-detail' ? selectedServiceDetail : null);

    setActiveTab(tab);
    setSelectedBlog(blog);
    setSelectedCategory(category);
    setSelectedServiceDetail(service);

    if (typeof window !== 'undefined') {
      const targetPath = getPathnameForState(tab, blog, category, service);
      if (window.location.pathname !== targetPath) {
        if (options?.replace) {
          window.history.replaceState({ tab, blogSlug: blog?.slug, categorySlug: category?.slug, service }, '', targetPath);
        } else {
          window.history.pushState({ tab, blogSlug: blog?.slug, categorySlug: category?.slug, service }, '', targetPath);
        }
      }

      // Track Google Ads / Analytics PageView for this Asset URL
      trackGoogleAdsPageView(targetPath);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [selectedBlog, selectedCategory, selectedServiceDetail]);

  // Dynamically update document title, meta descriptions, canonical URLs, and OpenGraph tags
  useEffect(() => {
    const seoConfig = getSEOForView(
      activeTab,
      selectedBlog,
      selectedCategory,
      selectedServiceDetail
    );
    updateSEO(seoConfig);

    // Track on initial load / view changes
    if (typeof window !== 'undefined') {
      const currentPath = getPathnameForState(activeTab, selectedBlog, selectedCategory, selectedServiceDetail);
      trackGoogleAdsPageView(currentPath, seoConfig.title);
    }
  }, [activeTab, selectedBlog, selectedCategory, selectedServiceDetail]);

  // Handle browser Back / Forward history navigation
  useEffect(() => {
    const handlePopState = () => {
      if (typeof window === 'undefined') return;
      const resolved = resolveRouteFromPathname(window.location.pathname, blogs, categories);
      setActiveTab(resolved.tab);
      setSelectedBlog(resolved.blog);
      setSelectedCategory(resolved.category);
      setSelectedServiceDetail(resolved.serviceName);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [blogs, categories]);

  const handleTabChange = (tab: ActiveTab) => {
    navigateTo(tab, { blog: null, category: null, service: null });
  };

  const handleSelectBlog = (blog: BlogPost) => {
    navigateTo('blog-detail', { blog, category: null, service: null });
  };

  const handleSelectCategory = (category: Category) => {
    navigateTo('category-detail', { blog: null, category, service: null });
  };

  const handleSelectServiceDetail = (service: string) => {
    navigateTo('service-detail', { blog: null, category: null, service });
  };

  const handleAddCategory = (newCategory: Category) => {
    setCategories((prev) => {
      if (prev.some((c) => c.slug === newCategory.slug)) return prev;
      return [...prev, newCategory];
    });
  };

  const handleAddBlog = async (newBlog: BlogPost) => {
    setBlogs((prev) => [newBlog, ...prev.filter((b) => b.id !== newBlog.id)]);
    try {
      await fetch('/api/blogs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newBlog)
      });
    } catch (err) {
      console.warn('Could not persist new blog to server API:', err);
    }
  };

  const handleUpdateBlog = async (updatedBlog: BlogPost) => {
    setBlogs((prev) => prev.map((b) => (b.id === updatedBlog.id ? updatedBlog : b)));
    if (selectedBlog && (selectedBlog.id === updatedBlog.id || selectedBlog.slug === updatedBlog.slug)) {
      setSelectedBlog(updatedBlog);
    }
    try {
      await fetch(`/api/blogs/${encodeURIComponent(updatedBlog.id)}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedBlog)
      });
    } catch (err) {
      console.warn('Could not update blog on server API:', err);
    }
  };

  const handleDeleteBlog = async (blogId: string) => {
    setBlogs((prev) => prev.filter((b) => b.id !== blogId));
    try {
      await fetch(`/api/blogs/${encodeURIComponent(blogId)}`, {
        method: 'DELETE'
      });
    } catch (err) {
      console.warn('Could not delete blog on server API:', err);
    }
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

    // Send backend subscription request to record inbox message & send email alert
    fetch('/api/subscribe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: email.trim(), source })
    })
      .then((res) => res.json())
      .then((data) => {
        if (data && data.messageData) {
          try {
            const stored = localStorage.getItem('contact_messages');
            const msgs = stored ? JSON.parse(stored) : [];
            msgs.unshift(data.messageData);
            localStorage.setItem('contact_messages', JSON.stringify(msgs));
            window.dispatchEvent(new Event('contact_messages_updated'));
          } catch (e) {
            console.warn('LocalStorage subscription sync notice:', e);
          }
        }
      })
      .catch((err) => {
        console.warn('Backend subscribe notice:', err);
      });

    return {
      added: true,
      isDuplicate: false,
      subscriberId: uniqueId,
      message: 'Thank you for subscribing! Your email has been registered for weekly spiritual updates and recorded in Doctor Baba Mukisa\'s inbox.'
    };
  };

  const handleDeleteSubscriber = (subscriberId: string) => {
    setSubscribers((prev) => prev.filter((s) => s.id !== subscriberId));
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
    <WhatsAppProvider>
      <EmailProvider>
        <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-amber-500 selection:text-slate-950">
          
          {/* Navbar Header */}
          <Navbar
            activeTab={activeTab}
            setActiveTab={handleTabChange}
            onSelectServiceDetail={handleSelectServiceDetail}
          />

      {/* Main App Content Viewport */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-20 md:pb-12">
        {activeTab === 'home' && (
          <HomeView
            onNavigate={(tab) => handleTabChange(tab)}
            onSelectBlog={handleSelectBlog}
            onSelectCategory={handleSelectCategory}
            onSelectServiceDetail={handleSelectServiceDetail}
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
            onNavigateHome={() => handleTabChange('home')}
            onSelectBlog={handleSelectBlog}
            onSelectCategory={handleSelectCategory}
            onAddComment={handleAddComment}
          />
        )}

        {activeTab === 'services' && (
          <ServicesView
            categories={categories}
            onSelectCategory={handleSelectCategory}
            onSelectServiceDetail={handleSelectServiceDetail}
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
            onNavigateHome={() => handleTabChange('home')}
            onSelectBlog={handleSelectBlog}
            onSelectCategory={handleSelectCategory}
          />
        )}

        {activeTab === 'service-detail' && selectedServiceDetail && (
          <ServiceDetailView
            serviceName={selectedServiceDetail}
            onContact={() => handleTabChange('contact')}
            onBack={() => handleTabChange('services')}
            onNavigateHome={() => handleTabChange('home')}
            onNavigateServices={() => handleTabChange('services')}
          />
        )}

        {activeTab === 'videos' && (
          <VideosView onSelectServiceDetail={handleSelectServiceDetail} />
        )}

        {activeTab === 'gallery' && (
          <GalleryView onSelectServiceDetail={handleSelectServiceDetail} />
        )}

        {activeTab === 'about' && (
          <AboutView 
            onContact={() => handleTabChange('contact')} 
            onSelectServiceDetail={handleSelectServiceDetail}
          />
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
      <Footer 
        setActiveTab={handleTabChange} 
        onSelectServiceDetail={handleSelectServiceDetail}
        onSubscribe={(email) => handleAddSubscriber(email, 'Website Newsletter')} 
      />

      {/* Mobile Bottom Navigation Bar */}
      <MobileBottomNav activeTab={activeTab} setActiveTab={handleTabChange} />

      {/* Floating Desktop WhatsApp Button */}
      <FloatingWhatsApp />

      {/* Interactive WhatsApp Message Customizer Modal */}
      <WhatsAppModal />

      {/* Interactive Email Service Provider Customizer Modal */}
      <EmailModal />

    </div>
    </EmailProvider>
    </WhatsAppProvider>
  );
}
