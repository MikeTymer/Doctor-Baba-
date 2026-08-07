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

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  date: string;
}

export interface Subscriber {
  id: string;
  email: string;
  subscribed_date: string;
  status: 'Active' | 'Unsubscribed';
  source?: string;
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
