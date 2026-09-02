import { ActiveTab, BlogPost, Category } from '../types';
import { SERVICE_DESCRIPTIONS, REGIONAL_SEO_CONTENT } from '../data/serviceDetails';

export const BASE_URL = 'https://doctorbabamukisa.com';

/**
 * Converts a string into a URL-friendly slug
 */
export function slugify(text: string): string {
  if (!text) return '';
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/&/g, '-and-')
    .replace(/[\s\W-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Map of known canonical service names to standard URL slugs
 */
const KNOWN_SERVICE_NAMES: string[] = [
  'Marriage & Family Harmony',
  'Relationship Reconciliation',
  'Relationship Guidance',
  'Relationship Commitment & Trust',
  'Mindfulness & Emotional Balance',
  'Spiritual Protection & Shielding',
  'Prosperity Alignment',
  'Traditional Herbal Heritage',
  'Spiritual Cleansing',
  'Ancestral Guidance',
  'Traditional Healer',
  'Protection Artifacts',
  'Spiritual Rituals',
  'LGBTQ+ Relationship Harmony',
  'Emotional Healing & Reconciliation',
  ...Object.keys(SERVICE_DESCRIPTIONS),
  ...Object.keys(REGIONAL_SEO_CONTENT)
];

// Remove duplicates
const UNIQUE_SERVICE_NAMES = Array.from(new Set(KNOWN_SERVICE_NAMES));

/**
 * Given a URL slug or service name, finds the canonical Service Title
 */
export function findServiceNameFromSlug(slugOrName: string): string {
  if (!slugOrName) return 'Relationship Reconciliation';
  const cleanInput = decodeURIComponent(slugOrName).trim();
  
  // Exact match
  if (UNIQUE_SERVICE_NAMES.includes(cleanInput)) {
    return cleanInput;
  }

  const targetSlug = slugify(cleanInput);

  // Match against slugified unique service names
  const exactSlugMatch = UNIQUE_SERVICE_NAMES.find(
    (name) => slugify(name) === targetSlug
  );
  if (exactSlugMatch) return exactSlugMatch;

  // Normalized matching (e.g. without 'and')
  const simplifiedTarget = targetSlug.replace(/-and-/g, '-');
  const relaxedMatch = UNIQUE_SERVICE_NAMES.find((name) => {
    const s = slugify(name).replace(/-and-/g, '-');
    return s === simplifiedTarget;
  });
  if (relaxedMatch) return relaxedMatch;

  // Partial or fuzzy match
  const partialMatch = UNIQUE_SERVICE_NAMES.find((name) => {
    const s = slugify(name);
    return targetSlug.includes(s) || s.includes(targetSlug);
  });
  if (partialMatch) return partialMatch;

  return cleanInput;
}

/**
 * Returns the clean pathname for a given navigation state
 */
export function getPathnameForState(
  tab: ActiveTab,
  blog?: BlogPost | null,
  category?: Category | null,
  service?: string | null
): string {
  switch (tab) {
    case 'home':
      return '/';
    case 'about':
      return '/about';
    case 'services':
      return '/services';
    case 'blog':
      return '/blog';
    case 'blog-detail':
      if (blog) {
        return `/blog/${blog.slug || slugify(blog.name)}`;
      }
      return '/blog';
    case 'category-detail':
      if (category) {
        return `/category/${category.slug || slugify(category.name)}`;
      }
      return '/services';
    case 'service-detail':
      if (service) {
        return `/services/${slugify(service)}`;
      }
      return '/services';
    case 'contact':
      return '/contact';
    case 'gallery':
      return '/gallery';
    case 'videos':
      return '/videos';
    case 'admin':
      return '/admin';
    default:
      return '/';
  }
}

export interface ResolvedRoute {
  tab: ActiveTab;
  blogSlug?: string;
  categorySlug?: string;
  serviceName?: string;
}

/**
 * Parses browser pathname into an active tab and entity identifiers
 */
export function resolveRouteFromPathname(
  pathname: string,
  blogs: BlogPost[],
  categories: Category[]
): {
  tab: ActiveTab;
  blog: BlogPost | null;
  category: Category | null;
  serviceName: string | null;
} {
  const cleanPath = (pathname || '/').trim().toLowerCase();

  // Root or Home
  if (cleanPath === '/' || cleanPath === '/home') {
    return { tab: 'home', blog: null, category: null, serviceName: null };
  }

  // Admin
  if (cleanPath === '/admin' || cleanPath.startsWith('/admin/')) {
    return { tab: 'admin', blog: null, category: null, serviceName: null };
  }

  // About
  if (cleanPath === '/about' || cleanPath === '/about-us') {
    return { tab: 'about', blog: null, category: null, serviceName: null };
  }

  // Contact / Book consultation
  if (
    cleanPath === '/contact' ||
    cleanPath === '/contact-us' ||
    cleanPath === '/book-consultation' ||
    cleanPath === '/consultation'
  ) {
    return { tab: 'contact', blog: null, category: null, serviceName: null };
  }

  // Gallery
  if (cleanPath === '/gallery' || cleanPath === '/photos' || cleanPath === '/sanctuary-gallery') {
    return { tab: 'gallery', blog: null, category: null, serviceName: null };
  }

  // Videos
  if (cleanPath === '/videos' || cleanPath === '/temple-videos') {
    return { tab: 'videos', blog: null, category: null, serviceName: null };
  }

  // Blog list or specific article
  if (
    cleanPath === '/blog' ||
    cleanPath === '/blogs' ||
    cleanPath === '/articles'
  ) {
    return { tab: 'blog', blog: null, category: null, serviceName: null };
  }

  if (
    cleanPath.startsWith('/blog/') ||
    cleanPath.startsWith('/article/') ||
    cleanPath.startsWith('/articles/')
  ) {
    const slug = cleanPath.split('/')[2];
    if (slug) {
      const foundBlog = blogs.find(
        (b) => b.slug === slug || slugify(b.name) === slug || b.id === slug
      );
      if (foundBlog) {
        return { tab: 'blog-detail', blog: foundBlog, category: null, serviceName: null };
      }
    }
    return { tab: 'blog', blog: null, category: null, serviceName: null };
  }

  // Category
  if (
    cleanPath.startsWith('/category/') ||
    cleanPath.startsWith('/categories/')
  ) {
    const slug = cleanPath.split('/')[2];
    if (slug) {
      const foundCategory = categories.find(
        (c) => c.slug === slug || slugify(c.name) === slug || c.id === slug
      );
      if (foundCategory) {
        return { tab: 'category-detail', blog: null, category: foundCategory, serviceName: null };
      }
    }
    return { tab: 'services', blog: null, category: null, serviceName: null };
  }

  // Services list or specific service detail
  if (cleanPath === '/services' || cleanPath === '/services-offered') {
    return { tab: 'services', blog: null, category: null, serviceName: null };
  }

  if (
    cleanPath.startsWith('/services/') ||
    cleanPath.startsWith('/service/')
  ) {
    const slug = cleanPath.split('/')[2];
    if (slug) {
      const serviceName = findServiceNameFromSlug(slug);
      return { tab: 'service-detail', blog: null, category: null, serviceName };
    }
    return { tab: 'services', blog: null, category: null, serviceName: null };
  }

  // Fallback / default
  return { tab: 'home', blog: null, category: null, serviceName: null };
}

/**
 * Dispatches Google Ads and Google Analytics PageView tracking for the active URL
 */
export function trackGoogleAdsPageView(urlPath: string, title?: string) {
  if (typeof window === 'undefined') return;
  const fullUrl = `${BASE_URL}${urlPath.startsWith('/') ? urlPath : `/${urlPath}`}`;
  const docTitle = title || document.title;

  try {
    if (typeof (window as any).gtag === 'function') {
      (window as any).gtag('config', 'AW-18381371410', {
        page_path: urlPath,
        page_title: docTitle,
        page_location: fullUrl
      });
      (window as any).gtag('event', 'page_view', {
        page_path: urlPath,
        page_title: docTitle,
        page_location: fullUrl
      });
    }
  } catch (err) {
    // Non-blocking tracking notice
  }
}
