import { useEffect, useState } from 'react';
import type { TattooWork } from './data/tattooData';
import { SEO_ROUTES, normalizeSeoPath, type SeoRoutePath } from './data/seoRoutes';
import { SeoSync } from './components/SeoSync';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { SpecialtyHero } from './components/SpecialtyHero';
import { PortfolioSection } from './components/PortfolioSection';
import { ArtistStudioSection } from './components/ArtistStudioSection';
import { BookingSection } from './components/BookingSection';
import { Footer } from './components/Footer';

export function App() {
  const [selectedReference, setSelectedReference] = useState<TattooWork | null>(null);
  const [currentPath, setCurrentPath] = useState<SeoRoutePath>(() =>
    typeof window !== 'undefined' ? normalizeSeoPath(window.location.pathname) : '/'
  );

  useEffect(() => {
    const syncRoute = () => {
      setCurrentPath(normalizeSeoPath(window.location.pathname));
    };

    window.addEventListener('popstate', syncRoute);
    window.addEventListener('pixeltattoo:routechange', syncRoute);
    return () => {
      window.removeEventListener('popstate', syncRoute);
      window.removeEventListener('pixeltattoo:routechange', syncRoute);
    };
  }, []);

  const activeRoute = SEO_ROUTES[currentPath] ?? SEO_ROUTES['/'];

  return (
    <div className="min-h-screen bg-[#050505] text-zinc-100">
      <SeoSync route={activeRoute} />
      <Navbar currentPath={currentPath} />
      <main>
        {currentPath === '/' ? <HeroSection /> : <SpecialtyHero route={activeRoute} />}
        <PortfolioSection activeRoute={activeRoute} onSelectReference={setSelectedReference} />
        <ArtistStudioSection />
        <BookingSection
          defaultStyle={activeRoute.bookingStyleDefault}
          selectedReference={selectedReference}
          onClearReference={() => setSelectedReference(null)}
        />
      </main>
      <Footer />
    </div>
  );
}
export default App;
