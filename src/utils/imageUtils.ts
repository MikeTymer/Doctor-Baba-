import React from 'react';

export const DEFAULT_FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=1200&q=80';

/**
 * Normalizes any image URL (Unsplash web links, Google Drive, Dropbox, direct URLs)
 * into a valid direct CDN image source link.
 */
export function normalizeImageUrl(rawUrl?: string): string {
  if (!rawUrl || typeof rawUrl !== 'string') {
    return DEFAULT_FALLBACK_IMAGE;
  }

  const trimmed = rawUrl.trim();
  if (!trimmed) {
    return DEFAULT_FALLBACK_IMAGE;
  }

  // 1. Unsplash Web Page URLs (e.g. https://unsplash.com/photos/woman-in-red-and-gold-dress-ZDMms8xjS6Y or https://unsplash.com/photos/ZDMms8xjS6Y)
  if (trimmed.includes('unsplash.com/photos/') || trimmed.includes('unsplash.com/fotos/')) {
    try {
      // Strip query parameters and trailing slashes
      const cleanUrl = trimmed.split('?')[0].split('#')[0].replace(/\/+$/, '');
      const segments = cleanUrl.split('/');
      const lastSegment = segments[segments.length - 1] || '';

      let photoId = '';
      if (lastSegment.includes('-')) {
        const parts = lastSegment.split('-');
        const lastPart = parts[parts.length - 1];
        
        // Check if last part is alphanumeric ID (e.g., ZDMms8xjS6Y)
        if (/^[a-zA-Z0-9_-]{5,}$/.test(lastPart)) {
          photoId = lastPart;
        } else if (parts.length >= 2) {
          // Check if last two parts form numeric ID like 1545232979-fbfd42e0188d
          const secondToLast = parts[parts.length - 2];
          if (/^\d+$/.test(secondToLast) && /^[a-f0-9]+$/i.test(lastPart)) {
            photoId = `${secondToLast}-${lastPart}`;
          }
        }
      } else if (/^[a-zA-Z0-9_-]{5,}$/.test(lastSegment)) {
        photoId = lastSegment;
      }

      if (photoId) {
        return `https://images.unsplash.com/photo-${photoId}?auto=format&fit=crop&w=1200&q=80`;
      }
    } catch (err) {
      console.warn('Error parsing Unsplash webpage URL:', err);
    }
  }

  // 2. Direct Unsplash CDN Image URLs (e.g. https://images.unsplash.com/photo-1545232979-fbfd42e0188d)
  if (trimmed.includes('images.unsplash.com/') || trimmed.includes('plus.unsplash.com/')) {
    if (!trimmed.includes('?')) {
      return `${trimmed}?auto=format&fit=crop&w=1200&q=80`;
    }
    return trimmed;
  }

  // 3. Google Drive file share links (e.g. https://drive.google.com/file/d/FILE_ID/view)
  if (trimmed.includes('drive.google.com/file/d/')) {
    const match = trimmed.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
    if (match && match[1]) {
      return `https://lh3.googleusercontent.com/d/${match[1]}`;
    }
  }

  // 4. Dropbox share links (e.g. https://www.dropbox.com/s/ID/image.jpg?dl=0)
  if (trimmed.includes('dropbox.com/s/')) {
    return trimmed.replace('www.dropbox.com', 'dl.dropboxusercontent.com').replace('?dl=0', '');
  }

  return trimmed;
}

/**
 * Error boundary handler for <img> elements that replaces broken sources with fallback image.
 */
export function handleImageError(
  e: React.SyntheticEvent<HTMLImageElement, Event>,
  fallbackUrl: string = DEFAULT_FALLBACK_IMAGE
) {
  const target = e.currentTarget;
  if (target.src !== fallbackUrl) {
    target.onerror = null; // Prevent loop
    target.src = fallbackUrl;
  }
}
