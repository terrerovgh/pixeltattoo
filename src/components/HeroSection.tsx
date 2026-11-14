import { ArrowDownRight, MessageCircle } from 'lucide-react';
import { ARTIST_INFO } from '../data/tattooData';
import { HeroPixelCanvas } from './HeroPixelCanvas';

const STUDIO_HIGHLIGHTS = [
  { label: 'Realismo B&G', detail: 'Retratos, mitología y mangas' },
  { label: 'Resultados curados', detail: 'Control real al mes y al año' },
  { label: 'Diseño anatómico', detail: 'Flujo muscular sin efecto parche' },
  { label: 'Centro, Montevideo', detail: 'Rondeau 1394 esq. Colonia' },
];

export function HeroSection() {
  return (
    <section
      id="inicio"
      className="relative flex min-h-[calc(100svh-64px)] flex-col justify-between overflow-hidden border-b border-zinc-800/90 bg-[#050505]"
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
        className="pointer-events-none absolute inset-0 h-full w-full object-cover object-center opacity-55 contrast-110 saturate-75"
      >
        <source src="./assets/instagram/DaTftZYTqkm.mp4" type="video/mp4" />
        <source src="./assets/instagram/DFqivTeJDF-.mp4" type="video/mp4" />
      </video>

      {/* Measured contrast scrim */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#050505]/90 via-[#050505]/65 to-[#050505]"
      />

      {/* Main Hero Content */}
      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col justify-between px-4 pt-6 pb-8 sm:px-6 sm:pt-10 lg:px-8 lg:pb-10">
        {/* Studio top metadata line */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-800/75 pb-4 text-xs sm:text-sm text-zinc-300">
          <p className="font-medium">
            {ARTIST_INFO.artistName}
            <span aria-hidden="true" className="mx-2 text-zinc-600">·</span>
            <span className="text-zinc-400">{ARTIST_INFO.studioName}</span>
            <span aria-hidden="true" className="mx-2 text-zinc-600 hidden sm:inline">·</span>
            <span className="hidden sm:inline text-zinc-400">
              {ARTIST_INFO.address}, {ARTIST_INFO.neighborhood}
            </span>
          </p>
          <a
            href={ARTIST_INFO.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-xs tabular-nums text-[#F7C600] hover:underline focus-visible:outline-2 focus-visible:outline-[#F7C600]"
          >
            {ARTIST_INFO.handle}
          </a>
        </div>

        {/* Preserved Interactive Pixel Canvas Focal Anchor */}
        <div className="my-auto py-6 sm:py-10">
          <h1 className="sr-only">
            PIXEL TATTOO — {ARTIST_INFO.artistName} en {ARTIST_INFO.studioName}, Montevideo
          </h1>
          <HeroPixelCanvas />
        </div>

        {/* Editorial lead + primary actions */}
        <div className="grid grid-cols-1 items-end gap-6 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="max-w-2xl font-display text-xl font-medium leading-snug tracking-tight text-zinc-100 sm:text-2xl [text-wrap:balance]">
              Realismo en negro y grises, color de alto contraste y pasión aurinegra diseñados sobre tu anatomía.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 lg:col-span-5 lg:justify-end">
            <a
              href="#portfolio"
              className="pixel-btn inline-flex min-h-[44px] items-center justify-center gap-2 bg-[#F7C600] px-5 py-2.5 text-sm font-bold text-black hover:text-black whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F7C600]"
            >
              <span>Ver trabajos</span>
              <ArrowDownRight className="h-4 w-4" aria-hidden="true" />
            </a>

            <a
              href={ARTIST_INFO.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[44px] items-center justify-center gap-2 border border-zinc-700 bg-[#0A0A0A]/85 px-5 py-2.5 text-sm font-semibold text-zinc-100 transition-colors hover:border-[#F7C600] hover:text-[#F7C600] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-[#F7C600]"
            >
              <MessageCircle className="h-4 w-4 text-[#F7C600]" aria-hidden="true" />
              <span className="font-mono text-xs sm:text-sm tabular-nums">
                WhatsApp {ARTIST_INFO.whatsappDisplay}
              </span>
            </a>
          </div>
        </div>
      </div>

      {/* Full-width Studio Specialties Strip below Hero */}
      <div className="relative z-10 border-t border-zinc-800/90 bg-[#0A0A0A]/90">
        <div className="mx-auto grid max-w-7xl grid-cols-2 divide-x divide-y divide-zinc-800/80 sm:divide-y-0 lg:grid-cols-4">
          {STUDIO_HIGHLIGHTS.map((item, idx) => (
            <div key={item.label} className="px-4 py-4 sm:px-6">
              <div className="flex items-center gap-2">
                <span className="font-mono text-[11px] tabular-nums text-[#F7C600]">
                  0{idx + 1}
                </span>
                <p className="font-display text-sm font-semibold text-white">
                  {item.label}
                </p>
              </div>
              <p className="mt-1 text-xs text-zinc-400">{item.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
