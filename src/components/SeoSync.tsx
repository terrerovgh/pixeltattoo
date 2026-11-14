import { useEffect } from 'react';

export function SeoSync() {
  useEffect(() => {
    const canonicalUrl = window.location.origin + window.location.pathname;
    const absoluteOgImage = `${window.location.origin}/assets/instagram/profile_tony.jpg`;

    let canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = canonicalUrl;

    const upsertMeta = (attr: 'property' | 'name', key: string, content: string) => {
      let tag = document.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute(attr, key);
        document.head.appendChild(tag);
      }
      tag.content = content;
    };

    upsertMeta('property', 'og:url', canonicalUrl);
    upsertMeta('property', 'og:image', absoluteOgImage);
    upsertMeta('name', 'twitter:image', absoluteOgImage);
  }, []);

  return null;
}
