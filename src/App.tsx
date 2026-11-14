import { useState } from 'react';
import type { TattooWork } from './data/tattooData';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { PortfolioSection } from './components/PortfolioSection';
import { ArtistStudioSection } from './components/ArtistStudioSection';
import { BookingSection } from './components/BookingSection';
import { Footer } from './components/Footer';

export function App() {
  const [selectedReference, setSelectedReference] = useState<TattooWork | null>(null);

  return (
    <div className="min-h-screen bg-[#050505] text-zinc-100">
      <Navbar />
      <main>
        <HeroSection />
        <PortfolioSection onSelectReference={setSelectedReference} />
        <ArtistStudioSection />
        <BookingSection
          selectedReference={selectedReference}
          onClearReference={() => setSelectedReference(null)}
        />
      </main>
      <Footer />
    </div>
  );
}
export default App;
