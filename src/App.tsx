import { useCallback, useEffect, useState } from 'react';
import {
  BOOKING_PLACEMENT_OPTIONS,
  BOOKING_STYLE_OPTIONS,
  mapFilterToBookingStyle,
  type TattooPreferenceState,
  type TattooStyleId,
  type TattooWork,
} from './data/tattooData';
import { SEO_ROUTES, normalizeSeoPath, type SeoRoutePath } from './data/seoRoutes';
import { SeoSync } from './components/SeoSync';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { SpecialtyHero } from './components/SpecialtyHero';
import { PortfolioSection } from './components/PortfolioSection';
import { ArtistStudioSection } from './components/ArtistStudioSection';
import { BookingSection } from './components/BookingSection';
import { Footer } from './components/Footer';
import { WhatsAppFab } from './components/WhatsAppFab';

function resolvePlacementFromWork(work: TattooWork): string {
  const zone = work.placement.toLowerCase();
  if (zone.includes('espalda')) return 'Espalda o pecho';
  if (zone.includes('pierna') || zone.includes('pantorrilla')) return 'Pierna o pantorrilla';
  if (zone.includes('antebrazo')) return 'Antebrazo';
  return 'Brazo o manga';
}

export function App() {
  const [currentPath, setCurrentPath] = useState<SeoRoutePath>(() =>
    typeof window !== 'undefined' ? normalizeSeoPath(window.location.pathname) : '/'
  );

  const initialRoute = SEO_ROUTES[currentPath] ?? SEO_ROUTES['/'];

  const [preference, setPreference] = useState<TattooPreferenceState>(() => ({
    clientName: '',
    styleChoice: initialRoute.bookingStyleDefault || BOOKING_STYLE_OPTIONS[0],
    placement: BOOKING_PLACEMENT_OPTIONS[0],
    sizeCm: 18,
    ideaNotes: '',
    reference: null,
  }));

  useEffect(() => {
    const syncRoute = () => {
      const nextPath = normalizeSeoPath(window.location.pathname);
      setCurrentPath(nextPath);
      const nextRoute = SEO_ROUTES[nextPath] ?? SEO_ROUTES['/'];
      if (nextRoute.bookingStyleDefault) {
        setPreference((prev) =>
          prev.reference ? prev : { ...prev, styleChoice: nextRoute.bookingStyleDefault }
        );
      }
    };

    window.addEventListener('popstate', syncRoute);
    window.addEventListener('pixeltattoo:routechange', syncRoute);
    return () => {
      window.removeEventListener('popstate', syncRoute);
      window.removeEventListener('pixeltattoo:routechange', syncRoute);
    };
  }, []);

  const handleUpdatePreference = useCallback((patch: Partial<TattooPreferenceState>) => {
    setPreference((prev) => ({ ...prev, ...patch }));
  }, []);

  const handleSelectReference = useCallback((work: TattooWork) => {
    const mappedStyle = mapFilterToBookingStyle(work.style);
    setPreference((prev) => ({
      ...prev,
      reference: work,
      styleChoice: mappedStyle ?? prev.styleChoice,
      placement: resolvePlacementFromWork(work),
    }));
  }, []);

  const handleFilterChange = useCallback((styleId: TattooStyleId) => {
    const mappedStyle = mapFilterToBookingStyle(styleId);
    if (!mappedStyle) return;
    setPreference((prev) => ({
      ...prev,
      styleChoice: mappedStyle,
    }));
  }, []);

  const handleClearReference = useCallback(() => {
    setPreference((prev) => ({ ...prev, reference: null }));
  }, []);

  const activeRoute = SEO_ROUTES[currentPath] ?? SEO_ROUTES['/'];

  return (
    <div className="min-h-screen bg-[#050505] text-zinc-100">
      <SeoSync route={activeRoute} />
      <Navbar currentPath={currentPath} />
      <main>
        {currentPath === '/' ? <HeroSection /> : <SpecialtyHero route={activeRoute} />}
        <PortfolioSection
          activeRoute={activeRoute}
          onSelectReference={handleSelectReference}
          onFilterChange={handleFilterChange}
        />
        <ArtistStudioSection />
        <BookingSection
          preference={preference}
          onUpdatePreference={handleUpdatePreference}
          onClearReference={handleClearReference}
        />
      </main>
      <Footer />
      <WhatsAppFab preference={preference} />
    </div>
  );
}
export default App;
