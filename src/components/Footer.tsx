import type { MouseEvent } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ARTIST_INFO } from '../data/tattooData';
import {
  MONTEVIDEO_AREAS,
  SPECIALTY_LINKS,
  navigateToSeoRoute,
  type SeoRoutePath,
} from '../data/seoRoutes';

export function Footer() {
  const shouldReduceMotion = useReducedMotion();

  const handleRouteClick = (e: MouseEvent<HTMLAnchorElement>, path: SeoRoutePath) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    e.preventDefault();
    navigateToSeoRoute(path);
  };

  return (
    <footer className="border-t border-zinc-900 bg-[#050505] py-16 text-sm text-zinc-500">
      <motion.div
        initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        className="mx-auto max-w-7xl px-6 lg:px-10"
      >
        <div className="flex flex-col justify-between gap-10 lg:flex-row lg:items-end">
          <div>
            <a
              href="/"
              onClick={(e) => handleRouteClick(e, '/')}
              className="font-display text-base font-bold tracking-tight text-white hover:text-[#F7C600] transition-colors"
            >
              {ARTIST_INFO.brand}
            </a>
            <p className="mt-2 text-xs text-zinc-400">
              {ARTIST_INFO.artistName} en {ARTIST_INFO.studioName}
            </p>
            <p className="mt-1 text-xs text-zinc-500">
              {ARTIST_INFO.address}, {ARTIST_INFO.neighborhood}, {ARTIST_INFO.country} · WhatsApp{' '}
              <span className="font-mono tabular-nums text-zinc-400">
                {ARTIST_INFO.whatsappDisplay}
              </span>
            </p>
            <p className="mt-2 text-xs text-zinc-600">
              Zonas cercanas: {MONTEVIDEO_AREAS.join(' · ')}
            </p>
          </div>

          <div className="flex flex-col gap-4 lg:items-end">
            <nav aria-label="Especialidades en Montevideo" className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-zinc-400">
              {SPECIALTY_LINKS.map((item) => (
                <a
                  key={item.path}
                  href={item.path}
                  onClick={(e) => handleRouteClick(e, item.path)}
                  className="transition-colors hover:text-[#F7C600]"
                >
                  {item.slugLabel}
                </a>
              ))}
            </nav>

            <div className="flex flex-wrap items-center gap-6 text-xs text-zinc-500">
              <a href="#portfolio" className="transition-colors hover:text-white">
                Portfolio
              </a>
              <a href="#artista" className="transition-colors hover:text-white">
                El Artista
              </a>
              <a href="#turnos" className="transition-colors hover:text-white">
                Turnos
              </a>
              <a
                href={ARTIST_INFO.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#F7C600] hover:underline"
              >
                {ARTIST_INFO.handle}
              </a>
            </div>
          </div>
        </div>
      </motion.div>
    </footer>
  );
}
