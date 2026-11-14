import { motion, useReducedMotion } from 'framer-motion';
import { ARTIST_INFO } from '../data/tattooData';
import { HeroPixelCanvas } from './HeroPixelCanvas';

export function HeroSection() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="inicio"
      className="relative flex min-h-[calc(100svh-80px)] flex-col justify-between overflow-hidden bg-[#050505]"
    >
      {/* Background studio tattoo reel */}
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster="./assets/instagram/DFqivTeJDF-.jpg"
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full object-cover object-center opacity-45 contrast-110 saturate-75"
      >
        <source src="./assets/instagram/DaTftZYTqkm.mp4" type="video/mp4" />
        <source src="./assets/instagram/DFqivTeJDF-.mp4" type="video/mp4" />
      </video>

      {/* Measured contrast scrim */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#050505]/90 via-[#050505]/60 to-[#050505]"
      />

      {/* Main Hero Content */}
      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col justify-between px-6 py-12 lg:px-10 lg:py-16">
        <div />

        {/* Interactive Pixel Canvas Focal Anchor */}
        <div className="my-auto py-8 sm:py-12">
          <h1 className="sr-only">
            {ARTIST_INFO.brand} por {ARTIST_INFO.artistName} en {ARTIST_INFO.studioName}, Montevideo
          </h1>
          <HeroPixelCanvas />
        </div>

        {/* Clean brief statement and primary actions */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-end"
        >
          <p className="max-w-xl font-display text-xl font-normal leading-relaxed tracking-tight text-zinc-200 sm:text-2xl [text-wrap:balance]">
            Realismo en negro y grises, color y pasión aurinegra diseñados sobre tu anatomía en Montevideo.
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <a
              href="#portfolio"
              className="pixel-btn inline-flex min-h-[46px] items-center justify-center bg-[#F7C600] px-6 py-3 text-sm font-semibold text-black hover:text-black whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F7C600]"
            >
              <span>Ver trabajos</span>
            </a>

            <a
              href={ARTIST_INFO.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[46px] items-center justify-center bg-zinc-900/80 px-6 py-3 text-sm font-medium text-zinc-200 transition-colors hover:bg-zinc-800 hover:text-white whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-[#F7C600]"
            >
              <span>WhatsApp {ARTIST_INFO.whatsappDisplay}</span>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
