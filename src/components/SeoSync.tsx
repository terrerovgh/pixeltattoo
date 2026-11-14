import { useEffect } from 'react';
import { getCanonicalUrl, type SeoRouteConfig } from '../data/seoRoutes';

interface SeoSyncProps {
  route: SeoRouteConfig;
}

export function SeoSync({ route }: SeoSyncProps) {
  useEffect(() => {
    const canonicalUrl = getCanonicalUrl(route.path);

    document.title = route.title;

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

    upsertMeta('name', 'description', route.description);
    upsertMeta('property', 'og:url', canonicalUrl);
    upsertMeta('property', 'og:title', route.title);
    upsertMeta('property', 'og:description', route.description);
    upsertMeta('property', 'og:image', route.ogImage);
    upsertMeta('property', 'og:image:secure_url', route.ogImage);
    upsertMeta('property', 'og:image:alt', route.ogImageAlt);
    upsertMeta('name', 'twitter:title', route.title);
    upsertMeta('name', 'twitter:description', route.description);
    upsertMeta('name', 'twitter:image', route.ogImage);
  }, [route]);

  return null;
}
