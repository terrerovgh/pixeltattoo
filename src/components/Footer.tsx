import { motion, useReducedMotion } from 'framer-motion';
import { ARTIST_INFO } from '../data/tattooData';

export function Footer() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <footer className="bg-[#050505] py-16 text-sm text-zinc-500">
      <motion.div
        initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        className="mx-auto max-w-7xl px-6 lg:px-10"
      >
        <div className="flex flex-col justify-between gap-8 sm:flex-row sm:items-end">
          <div>
            <p className="font-display text-base font-bold tracking-tight text-white">
              {ARTIST_INFO.brand}
            </p>
            <p className="mt-2 text-xs text-zinc-400">
              {ARTIST_INFO.artistName} en {ARTIST_INFO.studioName}
            </p>
            <p className="mt-1 text-xs text-zinc-500">
              {ARTIST_INFO.address}, {ARTIST_INFO.neighborhood}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-xs text-zinc-400">
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
      </motion.div>
    </footer>
  );
}
