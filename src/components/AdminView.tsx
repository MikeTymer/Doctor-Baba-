import React, { useState, useEffect } from 'react';
import { BlogPost, Category, BlogComment, Subscriber, ContactMessage } from '../types';
import { 
  Lock, 
  User, 
  Key, 
  LogOut, 
  PlusCircle, 
  Trash2, 
  FileText, 
  FolderKanban, 
  MessageSquare, 
  Eye, 
  CheckCircle2, 
  AlertCircle, 
  Search, 
  BarChart2, 
  ShieldCheck, 
  ShieldAlert,
  Mail, 
  Calendar, 
  ArrowLeft,
  Users,
  Copy,
  Download,
  Check,
  Settings,
  Send,
  Sparkles,
  Globe,
  MapPin,
  ExternalLink,
  Smartphone,
  Laptop,
  Tablet,
  AlertTriangle,
  Cpu,
  Wifi,
  Clock,
  Filter
} from 'lucide-react';

interface AdminViewProps {
  blogs: BlogPost[];
  categories: Category[];
  comments: BlogComment[];
  subscribers: Subscriber[];
  onAddBlog: (blog: BlogPost) => void;
  onDeleteBlog: (blogId: string) => void;
  onDeleteComment?: (commentId: string) => void;
  onAddSubscriber?: (email: string) => { added: boolean; isDuplicate: boolean; message: string; subscriberId?: string } | void;
  onDeleteSubscriber?: (subscriberId: string) => void;
  onBackToSite: () => void;
}

const INITIAL_MESSAGES: ContactMessage[] = [
  {
    id: 'msg-1',
    name: 'Samuel Mukasa',
    email: 'samuel.m@example.com',
    phone: '+256701234567',
    service: 'Love & Marriage Spells',
    message: 'Doctor Baba, I need urgent spiritual consultation regarding my broken marriage. Please guide me.',
    date: '2026-08-06 14:22',
    status: 'New',
    location: {
      city: 'Kampala',
      region: 'Central Region',
      country: 'Uganda',
      countryCode: 'UG',
      ip: '102.218.44.12',
      isp: 'MTN Uganda Mobile Broadband',
      timezone: 'Africa/Kampala',
      latitude: 0.3136,
      longitude: 32.5811,
      googleMapsUrl: 'https://www.google.com/maps?q=0.3136,32.5811'
    },
    deviceInfo: {
      browser: 'Google Chrome 127.0',
      os: 'Android OS (Android 14)',
      deviceType: 'Mobile',
      userAgent: 'Mozilla/5.0 (Linux; Android 14; SM-S918B) Chrome/127.0.0.0 Mobile',
      screenResolution: '1080x2340',
      language: 'en-UG',
      timezone: 'Africa/Kampala'
    },
    securityInfo: {
      isVpnOrProxy: false,
      vpnReason: 'Direct Connection: Client device timezone (Africa/Kampala) matches residential ISP IP location (Kampala, Uganda).',
      ipType: 'Residential / Cellular'
    }
  },
  {
    id: 'msg-2',
    name: 'Grace Akello',
    email: 'grace.a@example.com',
    phone: '+254712345678',
    service: 'Financial & Wealth Recovery',
    message: 'I am requesting a remote business blessing ritual for my hardware shop in Mombasa.',
    date: '2026-08-05 09:15',
    status: 'Responded',
    location: {
      city: 'Frankfurt',
      region: 'Hesse',
      country: 'Germany',
      countryCode: 'DE',
      ip: '185.220.101.45',
      isp: 'M247 Ltd Datacenter / NordVPN Proxy',
      timezone: 'Europe/Berlin',
      latitude: 50.1109,
      longitude: 8.6821,
      googleMapsUrl: 'https://www.google.com/maps?q=50.1109,8.6821'
    },
    deviceInfo: {
      browser: 'Apple Safari 17.5',
      os: 'iOS (Apple iPhone 15 Pro)',
      deviceType: 'Mobile',
      userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_5 like Mac OS X) AppleWebKit/605.1.15 Mobile/15E148',
      screenResolution: '1170x2532',
      language: 'en-KE',
      timezone: 'Africa/Nairobi'
    },
    securityInfo: {
      isVpnOrProxy: true,
      vpnReason: 'VPN / Proxy Detected: Device local timezone (Africa/Nairobi) mismatches IP timezone (Europe/Berlin) & Datacenter ASN (M247 Ltd).',
      ipType: 'VPN / Proxy / Datacenter'
    }
  },
  {
    id: 'msg-3',
    name: 'Patrick Kigozi',
    email: 'patrick.k@example.com',
    phone: '+256755889900',
    service: 'Court Cases & Legal Help',
    message: 'I have a land court case on August 20th in Kampala. I need spiritual meditation assistance.',
    date: '2026-08-04 18:40',
    status: 'Pending',
    location: {
      city: 'London',
      region: 'Greater London',
      country: 'United Kingdom',
      countryCode: 'GB',
      ip: '82.165.198.110',
      isp: 'ExpressVPN / DigitalOcean Tunnel',
      timezone: 'Europe/London',
      latitude: 51.5074,
      longitude: -0.1278,
      googleMapsUrl: 'https://www.google.com/maps?q=51.5074,-0.1278'
    },
    deviceInfo: {
      browser: 'Microsoft Edge 126.0',
      os: 'Windows 11 Pro',
      deviceType: 'Desktop',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Edg/126.0.0.0',
      screenResolution: '1920x1080',
      language: 'en-GB',
      timezone: 'Africa/Kampala'
    },
    securityInfo: {
      isVpnOrProxy: true,
      vpnReason: 'VPN / Proxy Detected: Device timezone (Africa/Kampala) mismatches IP location (Europe/London) & ExpressVPN Exit Node.',
      ipType: 'VPN / Proxy / Datacenter'
    }
  }
];

export const AdminView: React.FC<AdminViewProps> = ({
  blogs,
  categories,
  comments,
  subscribers,
  onAddBlog,
  onDeleteBlog,
  onDeleteComment,
  onAddSubscriber,
  onDeleteSubscriber,
  onBackToSite
}) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
    return sessionStorage.getItem('admin_logged_in') === 'true';
  });

  const [storedPassword, setStoredPassword] = useState<string>(() => {
    return localStorage.getItem('admin_custom_password') || 'spiritual2026';
  });

  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [loginError, setLoginError] = useState('');

  const [activeAdminTab, setActiveAdminTab] = useState<'overview' | 'blogs' | 'new-blog' | 'comments' | 'messages' | 'subscribers' | 'security'>('overview');
  const [messages, setMessages] = useState<ContactMessage[]>(INITIAL_MESSAGES);
  const [localComments, setLocalComments] = useState<BlogComment[]>(comments);
  const [searchQuery, setSearchQuery] = useState('');
  const [inquirySearch, setInquirySearch] = useState('');
  const [vpnFilter, setVpnFilter] = useState<'all' | 'vpn' | 'direct'>('all');

  // Password Change State
  const [currentPassInput, setCurrentPassInput] = useState('');
  const [newPassInput, setNewPassInput] = useState('');
  const [confirmPassInput, setConfirmPassInput] = useState('');
  const [passChangeError, setPassChangeError] = useState('');
  const [passChangeSuccess, setPassChangeSuccess] = useState('');

  // Subscriber Management State
  const [subscriberSearch, setSubscriberSearch] = useState('');
  const [newSubEmail, setNewSubEmail] = useState('');
  const [subSuccessMsg, setSubSuccessMsg] = useState('');
  const [copiedEmailsMsg, setCopiedEmailsMsg] = useState(false);

  // New Blog Form state
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('Doctor Baba Mukisa');
  const [categorySlug, setCategorySlug] = useState(categories[0]?.slug || 'love-and-marriage-spells');
  const [miniDescription, setMiniDescription] = useState('');
  const [description, setDescription] = useState('');
  const [featureImage, setFeatureImage] = useState('https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=800&q=80');
  const [heading1, setHeading1] = useState('');
  const [body1, setBody1] = useState('');
  const [heading2, setHeading2] = useState('');
  const [body2, setBody2] = useState('');
  const [formSuccess, setFormSuccess] = useState('');

  useEffect(() => {
    setLocalComments(comments);
  }, [comments]);

  useEffect(() => {
    const fetchInquiries = async () => {
      try {
        const res = await fetch('/api/inquiries');
        if (res.ok) {
          const data = await res.json();
          if (data.success && Array.isArray(data.messages) && data.messages.length > 0) {
            setMessages(data.messages);
          }
        }
      } catch (err) {
        console.warn('Could not fetch remote inquiries:', err);
      }
    };

    fetchInquiries();
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const inputUser = emailInput.trim().toLowerCase();
    const inputPass = passwordInput.trim();

    // Strict authentication against single authorized admin username and stored password
    const isValidUsername = inputUser === 'admin@doctorbabamukisa.com' || inputUser === 'admin';
    const isValidPassword = inputPass === storedPassword;

    if (isValidUsername && isValidPassword) {
      setIsLoggedIn(true);
      sessionStorage.setItem('admin_logged_in', 'true');
      setLoginError('');
    } else {
      setLoginError('Invalid Username or Password. Please enter authorized credentials.');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    sessionStorage.removeItem('admin_logged_in');
  };

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    setPassChangeError('');
    setPassChangeSuccess('');

    if (currentPassInput.trim() !== storedPassword) {
      setPassChangeError('Current password entered is incorrect.');
      return;
    }

    if (newPassInput.trim().length < 6) {
      setPassChangeError('New password must be at least 6 characters long.');
      return;
    }

    if (newPassInput.trim() !== confirmPassInput.trim()) {
      setPassChangeError('New password and confirmation password do not match.');
      return;
    }

    const updated = newPassInput.trim();
    localStorage.setItem('admin_custom_password', updated);
    setStoredPassword(updated);
    setPassChangeSuccess('Admin password updated successfully! Future logins will require this new password.');
    setCurrentPassInput('');
    setNewPassInput('');
    setConfirmPassInput('');
  };

  const handleCreateBlog = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description || !miniDescription) {
      alert('Please fill in the blog title, mini description, and full description.');
      return;
    }

    const selectedCatObj = categories.find((c) => c.slug === categorySlug);
    const categoryName = selectedCatObj ? selectedCatObj.name : 'General';

    const contentSections = [];
    if (heading1 && body1) {
      contentSections.push({ heading: heading1, body: body1 });
    }
    if (heading2 && body2) {
      contentSections.push({ heading: heading2, body: body2 });
    }

    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

    const newBlogObj: BlogPost = {
      id: `blog-${Date.now()}`,
      name: title,
      slug,
      author: author || 'Doctor Baba Mukisa',
      views: 100,
      description,
      mini_description: miniDescription,
      content_sections: contentSections.length > 0 ? contentSections : undefined,
      post_date: new Date().toISOString().split('T')[0],
      feature_image: featureImage || 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=800&q=80',
      category_slug: categorySlug,
      category_name: categoryName
    };

    onAddBlog(newBlogObj);
    setFormSuccess('New spiritual blog post published successfully!');
    
    // Reset form
    setTitle('');
    setMiniDescription('');
    setDescription('');
    setHeading1('');
    setBody1('');
    setHeading2('');
    setBody2('');

    setTimeout(() => {
      setFormSuccess('');
      setActiveAdminTab('blogs');
    }, 1500);
  };

  const handleAddManualSubscriber = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSubEmail || !newSubEmail.includes('@')) return;
    if (onAddSubscriber) {
      const res = onAddSubscriber(newSubEmail.trim());
      if (res) {
        setSubSuccessMsg(res.message);
      } else {
        setSubSuccessMsg(`Successfully registered ${newSubEmail} for marketing updates.`);
      }
    } else {
      setSubSuccessMsg(`Successfully registered ${newSubEmail} for marketing updates.`);
    }
    setNewSubEmail('');
    setTimeout(() => setSubSuccessMsg(''), 5000);
  };

  const handleCopyEmails = () => {
    const allEmails = subscribers.map((s) => s.email).join(', ');
    navigator.clipboard.writeText(allEmails);
    setCopiedEmailsMsg(true);
    setTimeout(() => setCopiedEmailsMsg(false), 3000);
  };

  const handleExportCSV = () => {
    const csvRows = ['ID,Email Address,Subscribed Date,Status,Source'];
    subscribers.forEach((s) => {
      csvRows.push(`"${s.id}","${s.email}","${s.subscribed_date}","${s.status}","${s.source || 'Website'}"`);
    });
    const csvContent = 'data:text/csv;charset=utf-8,' + csvRows.join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `doctor_baba_mukisa_subscribers_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleRemoveComment = (commentId: string) => {
    setLocalComments((prev) => prev.filter((c) => c.id !== commentId));
    if (onDeleteComment) {
      onDeleteComment(commentId);
    }
  };

  const handleToggleMessageStatus = (id: string) => {
    setMessages((prev) =>
      prev.map((msg) => {
        if (msg.id === id) {
          const nextStatus: ContactMessage['status'] =
            msg.status === 'New' ? 'Responded' : msg.status === 'Responded' ? 'Pending' : 'New';
          return { ...msg, status: nextStatus };
        }
        return msg;
      })
    );
  };

  const filteredMessages = messages.filter((m) => {
    if (vpnFilter === 'vpn' && !m.securityInfo?.isVpnOrProxy) return false;
    if (vpnFilter === 'direct' && m.securityInfo?.isVpnOrProxy) return false;

    if (!inquirySearch.trim()) return true;
    const query = inquirySearch.toLowerCase();
    return (
      m.name.toLowerCase().includes(query) ||
      m.email.toLowerCase().includes(query) ||
      m.phone.toLowerCase().includes(query) ||
      (m.service && m.service.toLowerCase().includes(query)) ||
      (m.location?.city && m.location.city.toLowerCase().includes(query)) ||
      (m.location?.country && m.location.country.toLowerCase().includes(query)) ||
      (m.location?.ip && m.location.ip.toLowerCase().includes(query)) ||
      (m.deviceInfo?.browser && m.deviceInfo.browser.toLowerCase().includes(query)) ||
      (m.deviceInfo?.os && m.deviceInfo.os.toLowerCase().includes(query))
    );
  });

  const filteredBlogs = blogs.filter(
    (b) =>
      b.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.category_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredSubscribers = subscribers.filter(
    (s) =>
      s.email.toLowerCase().includes(subscriberSearch.toLowerCase()) ||
      (s.source && s.source.toLowerCase().includes(subscriberSearch.toLowerCase()))
  );

  const totalViews = blogs.reduce((acc, b) => acc + b.views, 0);

  // LOGIN SCREEN
  if (!isLoggedIn) {
    return (
      <div className="admin-container max-w-lg mx-auto my-8 p-6 sm:p-8 bg-slate-900 border-2 border-amber-600/80 rounded-3xl shadow-2xl space-y-6">
        <div className="text-center space-y-2">
          <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-amber-500 via-amber-700 to-slate-950 p-1 flex items-center justify-center shadow-lg shadow-amber-900/50">
            <div className="w-full h-full bg-slate-950 rounded-full flex items-center justify-center">
              <ShieldCheck className="w-8 h-8 text-amber-400" />
            </div>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold font-serif text-amber-100">
            Temple Admin Portal
          </h1>
          <p className="text-xs text-amber-300/80">
            Doctor Baba Mukisa Spiritual Temple &amp; Content Management
          </p>
        </div>

        {/* Secure Portal Access Banner */}
        <div className="bg-slate-950 border border-amber-800/50 rounded-2xl p-4 text-xs text-amber-200/90 flex items-center gap-3">
          <Lock className="w-5 h-5 text-amber-500 shrink-0" />
          <p className="text-slate-300">
            Authorized administrator access required. Enter your admin username and password to log in.
          </p>
        </div>

        {loginError && (
          <div className="bg-rose-950/80 border border-rose-500 text-rose-200 p-3 rounded-xl text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
            <span>{loginError}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-amber-200 flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-amber-500" /> Username or Email
            </label>
            <input
              type="text"
              required
              value={emailInput}
              onChange={(e) => setEmailInput(e.target.value)}
              placeholder="admin@doctorbabamukisa.com"
              className="admin-input w-full bg-slate-950 border border-amber-900/60 focus:border-amber-500 rounded-xl px-3.5 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none transition-colors"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-amber-200 flex items-center gap-1.5">
              <Key className="w-3.5 h-3.5 text-amber-500" /> Password
            </label>
            <input
              type="password"
              required
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
              placeholder="••••••••••••"
              className="admin-input w-full bg-slate-950 border border-amber-900/60 focus:border-amber-500 rounded-xl px-3.5 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none transition-colors"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-slate-950 font-bold py-3 rounded-xl shadow-lg shadow-amber-900/40 transition-all flex items-center justify-center gap-2 text-sm"
          >
            <Lock className="w-4 h-4" /> Sign In to Admin Panel
          </button>
        </form>

        <div className="pt-2 text-center">
          <button
            onClick={onBackToSite}
            className="text-xs text-amber-400 hover:underline inline-flex items-center gap-1"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Return to Main Website
          </button>
        </div>
      </div>
    );
  }

  // LOGGED IN ADMIN DASHBOARD
  return (
    <div className="admin-container space-y-8 my-4">
      {/* Top Banner Header */}
      <div className="bg-slate-900 border-2 border-amber-600/70 rounded-2xl p-6 shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="bg-amber-500 text-slate-950 text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full tracking-wider">
              Authenticated Admin
            </span>
            <span className="text-xs text-amber-300/80">Doctor Baba Mukisa Temple</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold font-serif text-amber-100 mt-1">
            Admin Facilities Platform
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onBackToSite}
            className="bg-slate-950 hover:bg-slate-800 text-amber-300 border border-amber-700/50 px-3.5 py-2 rounded-xl text-xs font-semibold transition-colors flex items-center gap-1.5"
          >
            <ArrowLeft className="w-4 h-4" /> View Site
          </button>

          <button
            onClick={handleLogout}
            className="bg-rose-950/80 hover:bg-rose-900 text-rose-200 border border-rose-700/50 px-3.5 py-2 rounded-xl text-xs font-semibold transition-colors flex items-center gap-1.5"
          >
            <LogOut className="w-4 h-4" /> Logout
          </button>
        </div>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        <div className="bg-slate-900 border border-amber-900/50 rounded-2xl p-3.5 shadow-md space-y-1">
          <div className="flex items-center justify-between text-amber-400">
            <span className="text-[10px] font-semibold uppercase">Articles</span>
            <FileText className="w-3.5 h-3.5" />
          </div>
          <p className="text-xl font-bold text-slate-100">{blogs.length}</p>
        </div>

        <div className="bg-slate-900 border border-amber-900/50 rounded-2xl p-3.5 shadow-md space-y-1">
          <div className="flex items-center justify-between text-amber-400">
            <span className="text-[10px] font-semibold uppercase">Categories</span>
            <FolderKanban className="w-3.5 h-3.5" />
          </div>
          <p className="text-xl font-bold text-slate-100">{categories.length}</p>
        </div>

        <div className="bg-slate-900 border border-amber-900/50 rounded-2xl p-3.5 shadow-md space-y-1">
          <div className="flex items-center justify-between text-amber-400">
            <span className="text-[10px] font-semibold uppercase">Total Views</span>
            <Eye className="w-3.5 h-3.5" />
          </div>
          <p className="text-xl font-bold text-slate-100">{totalViews.toLocaleString()}</p>
        </div>

        <div className="bg-slate-900 border border-amber-900/50 rounded-2xl p-3.5 shadow-md space-y-1">
          <div className="flex items-center justify-between text-amber-400">
            <span className="text-[10px] font-semibold uppercase">Inquiries</span>
            <Mail className="w-3.5 h-3.5" />
          </div>
          <p className="text-xl font-bold text-slate-100">{messages.length}</p>
        </div>

        <div className="bg-slate-900 border border-amber-900/50 rounded-2xl p-3.5 shadow-md space-y-1 col-span-2 sm:col-span-1">
          <div className="flex items-center justify-between text-amber-400">
            <span className="text-[10px] font-semibold uppercase">Subscribers</span>
            <Users className="w-3.5 h-3.5" />
          </div>
          <p className="text-xl font-bold text-emerald-400">{subscribers.length}</p>
        </div>
      </div>

      {/* Admin Navigation Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-amber-900/50 pb-2">
        <button
          onClick={() => setActiveAdminTab('overview')}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
            activeAdminTab === 'overview'
              ? 'bg-amber-600 text-slate-950 shadow-md'
              : 'bg-slate-900 text-amber-200/80 hover:bg-amber-950/60'
          }`}
        >
          <BarChart2 className="w-4 h-4" /> Overview
        </button>

        <button
          onClick={() => setActiveAdminTab('blogs')}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
            activeAdminTab === 'blogs'
              ? 'bg-amber-600 text-slate-950 shadow-md'
              : 'bg-slate-900 text-amber-200/80 hover:bg-amber-950/60'
          }`}
        >
          <FileText className="w-4 h-4" /> Posts ({blogs.length})
        </button>

        <button
          onClick={() => setActiveAdminTab('new-blog')}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
            activeAdminTab === 'new-blog'
              ? 'bg-amber-600 text-slate-950 shadow-md'
              : 'bg-slate-900 text-amber-200/80 hover:bg-amber-950/60'
          }`}
        >
          <PlusCircle className="w-4 h-4" /> Publish Post
        </button>

        <button
          onClick={() => setActiveAdminTab('comments')}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
            activeAdminTab === 'comments'
              ? 'bg-amber-600 text-slate-950 shadow-md'
              : 'bg-slate-900 text-amber-200/80 hover:bg-amber-950/60'
          }`}
        >
          <MessageSquare className="w-4 h-4" /> Comments ({localComments.length})
        </button>

        <button
          onClick={() => setActiveAdminTab('messages')}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
            activeAdminTab === 'messages'
              ? 'bg-amber-600 text-slate-950 shadow-md'
              : 'bg-slate-900 text-amber-200/80 hover:bg-amber-950/60'
          }`}
        >
          <Mail className="w-4 h-4" /> Inquiries ({messages.length})
        </button>

        <button
          onClick={() => setActiveAdminTab('subscribers')}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
            activeAdminTab === 'subscribers'
              ? 'bg-amber-600 text-slate-950 shadow-md'
              : 'bg-slate-900 text-emerald-400 hover:bg-amber-950/60'
          }`}
        >
          <Users className="w-4 h-4" /> Subscribers ({subscribers.length})
        </button>

        <button
          onClick={() => setActiveAdminTab('security')}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
            activeAdminTab === 'security'
              ? 'bg-amber-600 text-slate-950 shadow-md'
              : 'bg-slate-900 text-amber-200/80 hover:bg-amber-950/60'
          }`}
        >
          <Settings className="w-4 h-4" /> Password &amp; Security
        </button>
      </div>

      {/* TAB CONTENT: OVERVIEW */}
      {activeAdminTab === 'overview' && (
        <div className="space-y-6">
          <div className="bg-slate-900 border border-amber-900/50 rounded-2xl p-6 shadow-xl space-y-4">
            <h2 className="text-xl font-bold font-serif text-amber-200 border-b border-amber-900/40 pb-2">
              Temple Content &amp; Subscriber Summary
            </h2>
            <p className="text-xs text-slate-300 leading-relaxed">
              Welcome to Doctor Baba Mukisa's Admin Facilities Control Panel. From here you can add new spiritual articles, manage email newsletter subscribers for marketing campaigns, change your admin credentials, review consultation inquiries, and moderate blog comments in real-time.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="bg-slate-950 border border-amber-900/40 rounded-xl p-4 space-y-2">
                <h3 className="text-sm font-bold text-amber-400 flex items-center gap-1.5">
                  <FileText className="w-4 h-4" /> Recent Articles Published
                </h3>
                <ul className="space-y-1.5 text-xs text-slate-300">
                  {blogs.slice(0, 4).map((b) => (
                    <li key={b.id} className="flex items-center justify-between border-b border-amber-900/20 pb-1">
                      <span className="truncate max-w-[220px] sm:max-w-xs">{b.name}</span>
                      <span className="text-[10px] text-amber-400/80 shrink-0">{b.post_date}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-slate-950 border border-amber-900/40 rounded-xl p-4 space-y-2">
                <h3 className="text-sm font-bold text-emerald-400 flex items-center gap-1.5">
                  <Users className="w-4 h-4" /> Latest Registered Subscribers
                </h3>
                <ul className="space-y-1.5 text-xs text-slate-300">
                  {subscribers.slice(0, 4).map((s) => (
                    <li key={s.id} className="flex items-center justify-between border-b border-amber-900/20 pb-1">
                      <span className="truncate max-w-[180px] font-semibold text-slate-200">{s.email}</span>
                      <span className="text-[10px] bg-emerald-950 text-emerald-300 border border-emerald-800/40 px-2 py-0.5 rounded-full shrink-0">
                        {s.subscribed_date}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB CONTENT: MANAGE SUBSCRIBERS & MARKETING */}
      {activeAdminTab === 'subscribers' && (
        <div className="bg-slate-900 border border-amber-900/50 rounded-2xl p-6 shadow-xl space-y-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-amber-900/40 pb-4">
            <div>
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs uppercase tracking-wider mb-1">
                <Send className="w-4 h-4" />
                <span>Marketing &amp; Customer Tracking</span>
              </div>
              <h2 className="text-xl font-bold font-serif text-amber-100">
                Registered Email Subscribers ({subscribers.length})
              </h2>
              <p className="text-xs text-amber-300/80">
                All client emails captured from the "Subscribe Today!" element for email updates and weekly horoscopes.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
              <button
                onClick={handleCopyEmails}
                className="bg-amber-600 hover:bg-amber-500 text-slate-950 font-bold px-3.5 py-2 rounded-xl text-xs flex items-center gap-1.5 transition-all shadow"
              >
                {copiedEmailsMsg ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                {copiedEmailsMsg ? 'Emails Copied!' : 'Copy All Emails'}
              </button>

              <button
                onClick={handleExportCSV}
                className="bg-emerald-700 hover:bg-emerald-600 text-white font-bold px-3.5 py-2 rounded-xl text-xs flex items-center gap-1.5 transition-all shadow"
              >
                <Download className="w-4 h-4" /> Export CSV List
              </button>
            </div>
          </div>

          {/* Quick Manual Add Form */}
          <div className="bg-slate-950 border border-amber-900/40 rounded-2xl p-4 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
              <PlusCircle className="w-4 h-4" /> Add Manual Subscriber
            </h3>
            {subSuccessMsg && (
              <div className="bg-emerald-950/90 border border-emerald-500 text-emerald-200 p-2.5 rounded-xl text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{subSuccessMsg}</span>
              </div>
            )}
            <form onSubmit={handleAddManualSubscriber} className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                required
                value={newSubEmail}
                onChange={(e) => setNewSubEmail(e.target.value)}
                placeholder="client.email@example.com"
                className="admin-input flex-1 bg-slate-900 border border-amber-900/60 focus:border-amber-500 rounded-xl px-3.5 py-2 text-xs text-slate-100 placeholder-slate-500 focus:outline-none"
              />
              <button
                type="submit"
                className="bg-amber-600 hover:bg-amber-500 text-slate-950 font-bold px-5 py-2 rounded-xl text-xs flex items-center justify-center gap-1.5 transition-colors"
              >
                Register Subscriber
              </button>
            </form>
          </div>

          {/* Search Filter */}
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-amber-500" />
            <input
              type="text"
              value={subscriberSearch}
              onChange={(e) => setSubscriberSearch(e.target.value)}
              placeholder="Search subscribers by email address or source..."
              className="admin-input w-full bg-slate-950 border border-amber-900/60 focus:border-amber-500 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-100 placeholder-slate-500 focus:outline-none"
            />
          </div>

          {/* Subscribers Table / Cards */}
          <div className="space-y-3">
            {filteredSubscribers.length === 0 ? (
              <p className="text-xs text-slate-400 text-center py-6">No matching subscribers found.</p>
            ) : (
              filteredSubscribers.map((s) => (
                <div
                  key={s.id}
                  className="bg-slate-950 border border-amber-900/40 rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 hover:border-amber-600/50 transition-colors"
                >
                  <div className="space-y-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-slate-100 truncate">{s.email}</span>
                      <span className="text-[10px] bg-emerald-950 text-emerald-300 border border-emerald-800/40 px-2 py-0.5 rounded-full font-bold">
                        {s.status}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-[11px] text-slate-400">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-amber-500" /> Subscribed: {s.subscribed_date}
                      </span>
                      <span className="flex items-center gap-1 text-amber-400">
                        <Sparkles className="w-3 h-3" /> Source: {s.source || 'Subscribe Today Form'}
                      </span>
                    </div>
                  </div>

                  {onDeleteSubscriber && (
                    <button
                      onClick={() => {
                        if (confirm(`Remove ${s.email} from subscriber list?`)) {
                          onDeleteSubscriber(s.id);
                        }
                      }}
                      className="bg-rose-950/70 hover:bg-rose-900 text-rose-300 border border-rose-800/50 px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 shrink-0 transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" /> Remove
                    </button>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* TAB CONTENT: CHANGE PASSWORD & SECURITY */}
      {activeAdminTab === 'security' && (
        <div className="bg-slate-900 border border-amber-900/50 rounded-2xl p-6 shadow-xl space-y-6 max-w-xl mx-auto">
          <div>
            <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase tracking-wider mb-1">
              <Lock className="w-4 h-4 text-amber-500" />
              <span>Admin Credentials</span>
            </div>
            <h2 className="text-xl font-bold font-serif text-amber-100">
              Change Admin Password
            </h2>
            <p className="text-xs text-amber-300/80">
              Update your security password for accessing Doctor Baba Mukisa's Admin Facilities.
            </p>
          </div>

          {passChangeSuccess && (
            <div className="bg-emerald-950/90 border border-emerald-500 text-emerald-200 p-3 rounded-xl text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{passChangeSuccess}</span>
            </div>
          )}

          {passChangeError && (
            <div className="bg-rose-950/90 border border-rose-500 text-rose-200 p-3 rounded-xl text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
              <span>{passChangeError}</span>
            </div>
          )}

          <form onSubmit={handleChangePassword} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-amber-200 flex items-center gap-1.5">
                <Key className="w-3.5 h-3.5 text-amber-500" /> Current Password *
              </label>
              <input
                type="password"
                required
                value={currentPassInput}
                onChange={(e) => setCurrentPassInput(e.target.value)}
                placeholder="Enter current password"
                className="admin-input w-full bg-slate-950 border border-amber-900/60 focus:border-amber-500 rounded-xl px-3.5 py-2.5 text-xs text-slate-100 focus:outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-amber-200 flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-amber-500" /> New Password *
              </label>
              <input
                type="password"
                required
                value={newPassInput}
                onChange={(e) => setNewPassInput(e.target.value)}
                placeholder="Enter new password (min. 6 characters)"
                className="admin-input w-full bg-slate-950 border border-amber-900/60 focus:border-amber-500 rounded-xl px-3.5 py-2.5 text-xs text-slate-100 focus:outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-amber-200 flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-amber-500" /> Confirm New Password *
              </label>
              <input
                type="password"
                required
                value={confirmPassInput}
                onChange={(e) => setConfirmPassInput(e.target.value)}
                placeholder="Re-enter new password"
                className="admin-input w-full bg-slate-950 border border-amber-900/60 focus:border-amber-500 rounded-xl px-3.5 py-2.5 text-xs text-slate-100 focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-slate-950 font-bold py-3 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 text-xs uppercase tracking-wider"
            >
              <Lock className="w-4 h-4" /> Update Admin Password
            </button>
          </form>
        </div>
      )}

      {/* TAB CONTENT: MANAGE BLOGS */}
      {activeAdminTab === 'blogs' && (
        <div className="bg-slate-900 border border-amber-900/50 rounded-2xl p-6 shadow-xl space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-amber-900/40 pb-4">
            <div>
              <h2 className="text-xl font-bold font-serif text-amber-100">
                Manage Published Spiritual Articles
              </h2>
              <p className="text-xs text-amber-300/80">
                View, filter, or remove blog posts directly from the website.
              </p>
            </div>

            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-amber-500" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search articles..."
                className="admin-input w-full bg-slate-950 border border-amber-900/60 focus:border-amber-500 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-100 placeholder-slate-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="space-y-4">
            {filteredBlogs.length === 0 ? (
              <p className="text-xs text-slate-400 text-center py-6">No matching articles found.</p>
            ) : (
              filteredBlogs.map((b) => (
                <div
                  key={b.id}
                  className="bg-slate-950 border border-amber-900/40 rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:border-amber-600/50 transition-colors"
                >
                  <div className="flex items-start gap-3 min-w-0">
                    <img
                      src={b.feature_image}
                      alt={b.name}
                      className="w-16 h-16 rounded-lg object-cover border border-amber-900/40 shrink-0"
                    />
                    <div className="min-w-0 space-y-1">
                      <span className="text-[10px] uppercase tracking-wider font-bold text-amber-500">
                        {b.category_name}
                      </span>
                      <h3 className="text-sm font-bold text-slate-100 truncate">{b.name}</h3>
                      <div className="flex items-center gap-3 text-[11px] text-slate-400">
                        <span className="flex items-center gap-1">
                          <User className="w-3 h-3 text-amber-500" /> {b.author}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3 text-amber-500" /> {b.post_date}
                        </span>
                        <span className="flex items-center gap-1">
                          <Eye className="w-3 h-3 text-amber-500" /> {b.views} views
                        </span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      if (confirm(`Are you sure you want to delete "${b.name}"?`)) {
                        onDeleteBlog(b.id);
                      }
                    }}
                    className="bg-rose-950/70 hover:bg-rose-900 text-rose-300 border border-rose-800/50 px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 shrink-0 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" /> Delete
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* TAB CONTENT: PUBLISH NEW BLOG */}
      {activeAdminTab === 'new-blog' && (
        <div className="bg-slate-900 border border-amber-900/50 rounded-2xl p-6 shadow-xl space-y-6">
          <div>
            <h2 className="text-xl font-bold font-serif text-amber-100">
              Publish New Spiritual Article
            </h2>
            <p className="text-xs text-amber-300/80">
              Fill in the article details to publish a new blog post to the Doctor Baba Mukisa website.
            </p>
          </div>

          {formSuccess && (
            <div className="bg-emerald-950/80 border border-emerald-500 text-emerald-200 p-3 rounded-xl text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{formSuccess}</span>
            </div>
          )}

          <form onSubmit={handleCreateBlog} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5 sm:col-span-2">
                <label className="text-xs font-semibold text-amber-200">Article Title *</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Powerful Court Meditation Rituals for Fast Justice"
                  className="admin-input w-full bg-slate-950 border border-amber-900/60 focus:border-amber-500 rounded-xl px-3.5 py-2 text-xs text-slate-100 placeholder-slate-500 focus:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-amber-200">Category *</label>
                <select
                  value={categorySlug}
                  onChange={(e) => setCategorySlug(e.target.value)}
                  className="admin-input w-full bg-slate-950 border border-amber-900/60 focus:border-amber-500 rounded-xl px-3.5 py-2 text-xs text-slate-100 focus:outline-none"
                >
                  {categories.map((c) => (
                    <option key={c.id} value={c.slug} className="bg-slate-950 text-slate-100">
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-amber-200">Author Name</label>
                <input
                  type="text"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  placeholder="Doctor Baba Mukisa"
                  className="admin-input w-full bg-slate-950 border border-amber-900/60 focus:border-amber-500 rounded-xl px-3.5 py-2 text-xs text-slate-100 placeholder-slate-500 focus:outline-none"
                />
              </div>

              <div className="space-y-1.5 sm:col-span-2">
                <label className="text-xs font-semibold text-amber-200">Feature Image URL</label>
                <input
                  type="url"
                  value={featureImage}
                  onChange={(e) => setFeatureImage(e.target.value)}
                  placeholder="https://images.unsplash.com/..."
                  className="admin-input w-full bg-slate-950 border border-amber-900/60 focus:border-amber-500 rounded-xl px-3.5 py-2 text-xs text-slate-100 placeholder-slate-500 focus:outline-none"
                />
              </div>

              <div className="space-y-1.5 sm:col-span-2">
                <label className="text-xs font-semibold text-amber-200">Mini Description (Card Preview) *</label>
                <textarea
                  rows={2}
                  required
                  value={miniDescription}
                  onChange={(e) => setMiniDescription(e.target.value)}
                  placeholder="Short 1-2 sentence preview for cards..."
                  className="admin-input w-full bg-slate-950 border border-amber-900/60 focus:border-amber-500 rounded-xl px-3.5 py-2 text-xs text-slate-100 placeholder-slate-500 focus:outline-none"
                />
              </div>

              <div className="space-y-1.5 sm:col-span-2">
                <label className="text-xs font-semibold text-amber-200">Main Overview Paragraph *</label>
                <textarea
                  rows={4}
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Full introduction text..."
                  className="admin-input w-full bg-slate-950 border border-amber-900/60 focus:border-amber-500 rounded-xl px-3.5 py-2 text-xs text-slate-100 placeholder-slate-500 focus:outline-none"
                />
              </div>

              <div className="space-y-1.5 sm:col-span-2 border-t border-amber-900/40 pt-3">
                <span className="text-xs font-bold text-amber-400">Content Section 1 (Optional)</span>
                <input
                  type="text"
                  value={heading1}
                  onChange={(e) => setHeading1(e.target.value)}
                  placeholder="Heading 1 (e.g. Understanding Spiritual Root Causes)"
                  className="admin-input w-full bg-slate-950 border border-amber-900/60 focus:border-amber-500 rounded-xl px-3.5 py-2 text-xs text-slate-100 mb-2 focus:outline-none"
                />
                <textarea
                  rows={3}
                  value={body1}
                  onChange={(e) => setBody1(e.target.value)}
                  placeholder="Body content for Section 1..."
                  className="admin-input w-full bg-slate-950 border border-amber-900/60 focus:border-amber-500 rounded-xl px-3.5 py-2 text-xs text-slate-100 focus:outline-none"
                />
              </div>

              <div className="space-y-1.5 sm:col-span-2 border-t border-amber-900/40 pt-3">
                <span className="text-xs font-bold text-amber-400">Content Section 2 (Optional)</span>
                <input
                  type="text"
                  value={heading2}
                  onChange={(e) => setHeading2(e.target.value)}
                  placeholder="Heading 2 (e.g. Traditional Ritual Steps & Wisdom)"
                  className="admin-input w-full bg-slate-950 border border-amber-900/60 focus:border-amber-500 rounded-xl px-3.5 py-2 text-xs text-slate-100 mb-2 focus:outline-none"
                />
                <textarea
                  rows={3}
                  value={body2}
                  onChange={(e) => setBody2(e.target.value)}
                  placeholder="Body content for Section 2..."
                  className="admin-input w-full bg-slate-950 border border-amber-900/60 focus:border-amber-500 rounded-xl px-3.5 py-2 text-xs text-slate-100 focus:outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-slate-950 font-bold py-3 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 text-xs uppercase tracking-wider"
            >
              <PlusCircle className="w-4 h-4" /> Publish Spiritual Article
            </button>
          </form>
        </div>
      )}

      {/* TAB CONTENT: COMMENTS */}
      {activeAdminTab === 'comments' && (
        <div className="bg-slate-900 border border-amber-900/50 rounded-2xl p-6 shadow-xl space-y-6">
          <div>
            <h2 className="text-xl font-bold font-serif text-amber-100">
              Manage User Comments
            </h2>
            <p className="text-xs text-amber-300/80">
              Moderate and manage user testimonials and comments left under blog articles.
            </p>
          </div>

          <div className="space-y-3">
            {localComments.length === 0 ? (
              <p className="text-xs text-slate-400 text-center py-6">No comments to display.</p>
            ) : (
              localComments.map((c) => (
                <div
                  key={c.id}
                  className="bg-slate-950 border border-amber-900/40 rounded-xl p-4 flex flex-col sm:flex-row items-start justify-between gap-3"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-xs font-bold text-amber-400">
                      <User className="w-3.5 h-3.5" /> {c.author_name}
                      <span className="text-[10px] text-slate-400 font-normal">({c.comment_date})</span>
                    </div>
                    <p className="text-xs text-slate-200 italic">"{c.description}"</p>
                  </div>

                  <button
                    onClick={() => handleRemoveComment(c.id)}
                    className="bg-rose-950/70 hover:bg-rose-900 text-rose-300 border border-rose-800/50 px-3 py-1 rounded-lg text-xs font-semibold flex items-center gap-1 shrink-0"
                  >
                    <Trash2 className="w-3.5 h-3.5" /> Remove
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* TAB CONTENT: MESSAGES */}
      {activeAdminTab === 'messages' && (
        <div className="bg-slate-900 border border-amber-900/50 rounded-2xl p-6 shadow-xl space-y-6">
          <div>
            <h2 className="text-xl font-bold font-serif text-amber-100">
              Client Consultation Inquiries Inbox
            </h2>
            <p className="text-xs text-amber-300/80">
              Review and update status on direct client consultation requests submitted through the temple site.
            </p>
          </div>

          <div className="space-y-4">
            {messages.map((m) => (
              <div
                key={m.id}
                className="bg-slate-950 border border-amber-900/40 rounded-2xl p-5 space-y-3"
              >
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-amber-900/30 pb-2">
                  <div>
                    <h3 className="text-sm font-bold text-slate-100">{m.name}</h3>
                    <p className="text-xs text-amber-400">Service: {m.service}</p>
                  </div>

                  <button
                    onClick={() => handleToggleMessageStatus(m.id)}
                    className={`text-xs px-3 py-1 rounded-full font-bold border transition-colors ${
                      m.status === 'New'
                        ? 'bg-amber-950 text-amber-300 border-amber-600'
                        : m.status === 'Responded'
                        ? 'bg-emerald-950 text-emerald-300 border-emerald-600'
                        : 'bg-slate-800 text-slate-300 border-slate-600'
                    }`}
                  >
                    Status: {m.status} (Click to change)
                  </button>
                </div>

                <p className="text-xs text-slate-200 leading-relaxed bg-slate-900/60 p-3 rounded-xl border border-amber-900/20">
                  {m.message}
                </p>

                <div className="flex flex-wrap items-center gap-4 text-xs text-amber-300/80">
                  <span>Phone: <a href={`tel:${m.phone}`} className="hover:underline text-slate-200">{m.phone}</a></span>
                  <span>Email: <a href={`mailto:${m.email}`} className="hover:underline text-slate-200">{m.email}</a></span>
                  <span>Date: {m.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
