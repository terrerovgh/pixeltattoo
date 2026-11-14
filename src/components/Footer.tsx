import { ARTIST_INFO } from '../data/tattooData';

export function Footer() {
  return (
    <footer className="border-t border-zinc-800/90 bg-[#050505] py-12 text-sm text-zinc-400">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-12">
          <div className="md:col-span-5">
            <div className="inline-flex items-center gap-2.5 font-display text-lg font-extrabold tracking-tight text-white">
              <span className="grid grid-cols-2 gap-0.5" aria-hidden="true">
                <span className="h-1.5 w-1.5 bg-[#F7C600]" />
                <span className="h-1.5 w-1.5 bg-[#F7C600]/40" />
                <span className="h-1.5 w-1.5 bg-[#F7C600]/40" />
                <span className="h-1.5 w-1.5 bg-[#F7C600]" />
              </span>
              <span>{ARTIST_INFO.brand}</span>
            </div>
            <p className="mt-3 max-w-sm text-xs leading-relaxed text-zinc-400">
              {ARTIST_INFO.artistName} — Realismo en negro y grises, color, coberturas y pasión aurinegra en Montevideo, Uruguay.
            </p>
          </div>

          <div className="md:col-span-4 space-y-1.5 text-xs">
            <p className="font-semibold text-zinc-200">{ARTIST_INFO.studioName}</p>
            <p>{ARTIST_INFO.address}</p>
            <p>
              {ARTIST_INFO.neighborhood}, {ARTIST_INFO.country}
            </p>
            <p className="font-mono tabular-nums text-zinc-300 pt-1">
              WhatsApp: {ARTIST_INFO.whatsappDisplay} · Estudio: {ARTIST_INFO.studioWhatsappDisplay}
            </p>
          </div>

          <div className="md:col-span-3 flex flex-col items-start md:items-end gap-2 text-xs">
            <a
              href="#portfolio"
              className="hover:text-[#F7C600] transition-colors"
            >
              Portfolio
            </a>
            <a
              href="#artista"
              className="hover:text-[#F7C600] transition-colors"
            >
              El Artista
            </a>
            <a
              href="#turnos"
              className="hover:text-[#F7C600] transition-colors"
            >
              Agenda y Turnos
            </a>
            <a
              href={ARTIST_INFO.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-[#F7C600] hover:underline"
            >
              {ARTIST_INFO.handle}
            </a>
          </div>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-zinc-900 pt-6 text-xs text-zinc-500">
          <p>© {new Date().getFullYear()} {ARTIST_INFO.brand} · Montevideo, Uruguay</p>
          <p>{ARTIST_INFO.studioName} ({ARTIST_INFO.studioHandle})</p>
        </div>
      </div>
    </footer>
  );
}
