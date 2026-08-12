export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  views: number;
  featured_image: string;
}

export interface BlogComment {
  id: string;
  blog_id: string;
  author_name: string;
  comment_date: string;
  description: string;
}

export interface BlogPost {
  id: string;
  name: string;
  slug: string;
  author: string;
  views: number;
  description: string;
  mini_description: string;
  content_sections?: {
    heading: string;
    body: string;
  }[];
  post_date: string;
  feature_image: string;
  category_slug: string;
  category_name: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  image: string;
  category: string;
}

export interface ClientLocation {
  city?: string;
  region?: string;
  country?: string;
  countryCode?: string;
  ip?: string;
  isp?: string;
  timezone?: string;
  latitude?: number;
  longitude?: number;
  googleMapsUrl?: string;
}

export interface ClientDeviceInfo {
  browser?: string;
  os?: string;
  deviceType?: 'Mobile' | 'Tablet' | 'Desktop' | string;
  userAgent?: string;
  screenResolution?: string;
  language?: string;
  timezone?: string;
}

export interface ClientSecurityInfo {
  isVpnOrProxy: boolean;
  vpnReason: string;
  ipType: 'Residential / Cellular' | 'VPN / Proxy / Datacenter' | string;
  trustScore?: number;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone: string;
  service?: string;
  message: string;
  date: string;
  status?: 'New' | 'Responded' | 'Pending';
  location?: ClientLocation;
  deviceInfo?: ClientDeviceInfo;
  securityInfo?: ClientSecurityInfo;
}

export interface Subscriber {
  id: string;
  email: string;
  subscribed_date: string;
  status: 'Active' | 'Unsubscribed';
  source?: string;
}

export interface AdminAuditLog {
  id: string;
  timestamp: string;
  action: 
    | 'LOGIN_SUCCESS' 
    | 'LOGIN_FAILED' 
    | 'LOGOUT' 
    | 'PASSWORD_CHANGE' 
    | 'CREATE_BLOG' 
    | 'UPDATE_BLOG' 
    | 'DELETE_BLOG' 
    | 'DELETE_COMMENT' 
    | 'ADD_SUBSCRIBER' 
    | 'DELETE_SUBSCRIBER' 
    | 'EMAIL_REPLY' 
    | 'DELETE_MESSAGE'
    | 'CLEAR_LOGS';
  status: 'SUCCESS' | 'FAILED' | 'WARNING' | 'INFO';
  userOrEmail: string;
  ipAddress?: string;
  location?: string;
  deviceInfo?: string;
  details: string;
}

export type ActiveTab = 
  | 'home' 
  | 'blog' 
  | 'blog-detail' 
  | 'services' 
  | 'category-detail' 
  | 'videos' 
  | 'gallery' 
  | 'about' 
  | 'contact'
  | 'admin';
