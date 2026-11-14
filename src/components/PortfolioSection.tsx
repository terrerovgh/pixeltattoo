import { useMemo, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import {
  ARTIST_INFO,
  PORTFOLIO_FILTERS,
  TATTOO_WORKS,
  type TattooStyleId,
  type TattooWork,
} from '../data/tattooData';
import { LightboxModal } from './LightboxModal';

interface PortfolioSectionProps {
  onSelectReference: (work: TattooWork) => void;
}

function TattooCardImage({ src, alt, title }: { src: string; alt: string; title: string }) {
  const [errored, setErrored] = useState(false);

  if (errored) {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center bg-[#0E0E11] p-6 text-center">
        <p className="font-display text-sm font-medium text-zinc-300">{title}</p>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      referrerPolicy="no-referrer"
      onError={() => setErrored(true)}
      className="h-full w-full object-cover object-center transition-transform duration-300 ease-out group-hover:scale-[1.02]"
    />
  );
}

export function PortfolioSection({ onSelectReference }: PortfolioSectionProps) {
  const [activeFilter, setActiveFilter] = useState<TattooStyleId>('all');
  const [selectedWorkId, setSelectedWorkId] = useState<string | null>(null);
  const shouldReduceMotion = useReducedMotion();

  const filteredWorks = useMemo(() => {
    if (activeFilter === 'all') return TATTOO_WORKS;
    return TATTOO_WORKS.filter((w) => w.style === activeFilter);
  }, [activeFilter]);

  const selectedIndex = useMemo(
    () => filteredWorks.findIndex((w) => w.id === selectedWorkId),
    [filteredWorks, selectedWorkId]
  );

  const activeWork = selectedIndex >= 0 ? filteredWorks[selectedIndex] : null;

  const handlePrevWork = () => {
    if (selectedIndex < 0 || filteredWorks.length === 0) return;
    const prevIdx = (selectedIndex - 1 + filteredWorks.length) % filteredWorks.length;
    setSelectedWorkId(filteredWorks[prevIdx].id);
  };

  const handleNextWork = () => {
    if (selectedIndex < 0 || filteredWorks.length === 0) return;
    const nextIdx = (selectedIndex + 1) % filteredWorks.length;
    setSelectedWorkId(filteredWorks[nextIdx].id);
  };

  const handleQuoteSimilar = (work: TattooWork) => {
    setSelectedWorkId(null);
    onSelectReference(work);
    const bookingEl = document.getElementById('turnos');
    if (bookingEl) {
      bookingEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="portfolio" className="bg-[#050505] py-24 sm:py-32">
      <motion.div
        initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
        className="mx-auto max-w-7xl px-6 lg:px-10"
      >
        {/* Clean Header & Filter Bar */}
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h2 className="font-display text-3xl font-bold tracking-tight text-white sm:text-4xl [text-wrap:balance]">
              Trabajos seleccionados
            </h2>
          </div>

          <div
            role="tablist"
            aria-label="Filtrar tatuajes por estilo"
            className="flex flex-wrap items-center gap-2"
          >
            {PORTFOLIO_FILTERS.map((filter) => {
              const isActive = activeFilter === filter.id;
              return (
                <button
                  key={filter.id}
                  role="tab"
                  aria-selected={isActive}
                  type="button"
                  onClick={() => setActiveFilter(filter.id)}
                  className={`min-h-[40px] px-4 py-2 text-xs sm:text-sm font-medium transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-[#F7C600] ${
                    isActive
                      ? 'bg-[#F7C600] text-black font-semibold'
                      : 'bg-[#0E0E11] text-zinc-400 hover:text-white'
                  }`}
                >
                  {filter.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Pure Photography Grid with Subtle Hover Title */}
        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:auto-rows-[360px]">
          {filteredWorks.map((work, idx) => {
            const isFeatured = activeFilter === 'all' && idx === 0;

            return (
              <button
                key={work.id}
                type="button"
                onClick={() => setSelectedWorkId(work.id)}
                className={`group relative flex flex-col justify-end overflow-hidden bg-[#0E0E11] text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F7C600] ${
                  isFeatured
                    ? 'aspect-[4/5] sm:col-span-2 lg:row-span-2 lg:aspect-auto'
                    : 'aspect-[4/5] lg:aspect-auto'
                }`}
              >
                <div className="absolute inset-0">
                  <TattooCardImage src={work.image} alt={work.alt} title={work.title} />
                </div>

                {/* Subtle hover scrim and title only */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100"
                />

                <div className="relative z-10 mt-auto p-6 opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100">
                  <h3 className="font-display text-lg font-semibold tracking-tight text-white">
                    {work.title}
                  </h3>
                </div>
              </button>
            );
          })}
        </div>

        <div className="mt-12 flex justify-end">
          <a
            href={ARTIST_INFO.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-zinc-400 transition-colors hover:text-[#F7C600]"
          >
            Ver archivo completo en {ARTIST_INFO.handle}
          </a>
        </div>
      </motion.div>

      <LightboxModal
        work={activeWork}
        onClose={() => setSelectedWorkId(null)}
        onPrevWork={handlePrevWork}
        onNextWork={handleNextWork}
        onQuoteSimilar={handleQuoteSimilar}
      />
    </section>
  );
}
