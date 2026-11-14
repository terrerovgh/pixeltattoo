import { useMemo, useState } from 'react';
import { ArrowUpRight, Film, Layers } from 'lucide-react';
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
      <div className="flex h-full w-full flex-col items-center justify-center bg-zinc-900 p-6 text-center">
        <span className="mb-2 h-2 w-2 bg-[#F7C600]" aria-hidden="true" />
        <p className="font-display text-sm font-semibold text-zinc-200">{title}</p>
        <p className="mt-1 text-xs text-zinc-500">Imagen de archivo</p>
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
      className="h-full w-full object-cover object-center transition-transform duration-300 ease-out group-hover:scale-[1.03]"
    />
  );
}

export function PortfolioSection({ onSelectReference }: PortfolioSectionProps) {
  const [activeFilter, setActiveFilter] = useState<TattooStyleId>('all');
  const [selectedWorkId, setSelectedWorkId] = useState<string | null>(null);

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
    <section id="portfolio" className="border-b border-zinc-800/90 bg-[#050505] py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Heading & Filter Row */}
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="flex items-center gap-2.5 text-xs font-medium uppercase tracking-widest text-[#F7C600]">
              <span className="inline-block h-2 w-2 bg-[#F7C600]" aria-hidden="true" />
              <span>Portfolio Curado</span>
            </div>
            <h2 className="mt-3 max-w-2xl font-display text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl [text-wrap:balance]">
              Obras reales sobre piel, sin filtros ni parches.
            </h2>
          </div>

          <a
            href={ARTIST_INFO.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-zinc-300 transition-colors hover:text-[#F7C600] whitespace-nowrap shrink-0"
          >
            <span>Archivo completo en {ARTIST_INFO.handle}</span>
            <ArrowUpRight className="h-4 w-4 text-[#F7C600]" />
          </a>
        </div>

        {/* Interactive Style Segmented Filter Bar */}
        <div
          role="tablist"
          aria-label="Filtrar tatuajes por estilo"
          className="mt-10 flex flex-wrap items-center gap-2 border-y border-zinc-800/90 py-3"
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
                className={`min-h-[40px] px-4 py-2 text-xs sm:text-sm font-semibold transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-[#F7C600] ${
                  isActive
                    ? 'bg-[#F7C600] text-black'
                    : 'bg-[#121215] text-zinc-300 border border-zinc-800 hover:border-zinc-600 hover:text-white'
                }`}
              >
                {filter.label}
              </button>
            );
          })}
          <span className="ml-auto font-mono text-xs tabular-nums text-zinc-400">
            {filteredWorks.length} {filteredWorks.length === 1 ? 'pieza' : 'piezas'}
          </span>
        </div>

        {/* Media-First Asymmetric Bento Grid */}
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:auto-rows-[320px]">
          {filteredWorks.map((work, idx) => {
            const isFeatured = activeFilter === 'all' && idx === 0;
            const isTall = activeFilter === 'all' && (idx === 1 || idx === 2);

            return (
              <button
                key={work.id}
                type="button"
                onClick={() => setSelectedWorkId(work.id)}
                className={`group relative flex flex-col justify-end overflow-hidden border border-zinc-800 bg-[#121215] text-left transition-colors hover:border-[#F7C600] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F7C600] ${
                  isFeatured
                    ? 'aspect-[4/5] sm:col-span-2 lg:row-span-2 lg:aspect-auto'
                    : isTall
                      ? 'aspect-[4/5] lg:row-span-1 lg:aspect-auto'
                      : 'aspect-[4/5] lg:aspect-auto'
                }`}
              >
                <div className="absolute inset-0">
                  <TattooCardImage src={work.image} alt={work.alt} title={work.title} />
                </div>

                {/* Measured contrast scrim */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/92 via-black/35 to-transparent transition-opacity duration-200 group-hover:from-black/95"
                />

                {/* Top corner subtle pixel marker + media count */}
                <div className="relative z-10 flex w-full items-start justify-between p-4 sm:p-5">
                  <span className="font-mono text-xs font-semibold tabular-nums text-[#F7C600]">
                    {work.index}
                  </span>
                  <div className="flex items-center gap-3 text-xs font-medium text-zinc-200">
                    {work.gallery.length > 1 && (
                      <span className="inline-flex items-center gap-1 bg-black/70 px-2 py-1 backdrop-blur-xs">
                        <Layers className="h-3.5 w-3.5 text-[#F7C600]" />
                        <span className="font-mono tabular-nums">{work.gallery.length}</span>
                      </span>
                    )}
                    {work.video && (
                      <span className="inline-flex items-center gap-1 bg-black/70 px-2 py-1 backdrop-blur-xs">
                        <Film className="h-3.5 w-3.5 text-[#F7C600]" />
                        <span>Reel</span>
                      </span>
                    )}
                  </div>
                </div>

                {/* Clean bottom title & unboxed typographic metadata */}
                <div className="relative z-10 mt-auto p-4 sm:p-5">
                  <h3 className="font-display text-lg font-bold tracking-tight text-white sm:text-xl group-hover:text-[#F7C600] transition-colors">
                    {work.title}
                  </h3>
                  <div className="mt-1.5 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-zinc-300">
                    <span>{work.styleLabel}</span>
                    <span aria-hidden="true" className="text-zinc-500">·</span>
                    <span>{work.placement}</span>
                    <span aria-hidden="true" className="text-zinc-500">·</span>
                    <span className="text-zinc-400">{work.healedStatus}</span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

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
