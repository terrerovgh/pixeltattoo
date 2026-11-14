import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { ARTIST_INFO } from '../data/tattooData';

const NAV_ITEMS = [
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'El Artista', href: '#artista' },
  { label: 'Estudio', href: '#estudio' },
  { label: 'Turnos', href: '#turnos' },
];

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-zinc-800/90 bg-[#050505]/92 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-8 px-4 sm:px-6 lg:px-8">
        {/* Zone 1: Single-line brand wordmark */}
        <a
          href="#inicio"
          className="inline-flex items-center gap-2.5 font-display text-lg font-extrabold tracking-tight text-white whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#F7C600]"
        >
          <span
            aria-hidden="true"
            className="grid grid-cols-2 gap-0.5 shrink-0"
          >
            <span className="h-1.5 w-1.5 bg-[#F7C600]" />
            <span className="h-1.5 w-1.5 bg-[#F7C600]/40" />
            <span className="h-1.5 w-1.5 bg-[#F7C600]/40" />
            <span className="h-1.5 w-1.5 bg-[#F7C600]" />
          </span>
          <span>{ARTIST_INFO.brand}</span>
        </a>

        {/* Zone 2: 4 single-line navigation links */}
        <nav
          aria-label="Navegación principal"
          className="hidden md:flex items-center gap-7 text-sm font-medium text-zinc-300"
        >
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="pixel-underline py-1 transition-colors hover:text-white whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#F7C600]"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: Single primary action + mobile menu button */}
        <div className="flex items-center gap-3 shrink-0">
          <a
            href="#turnos"
            className="pixel-btn hidden sm:inline-flex h-10 items-center justify-center bg-[#F7C600] px-4 text-xs font-bold uppercase tracking-wider text-black hover:text-black whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F7C600]"
          >
            <span>Reservar turno</span>
          </a>

          <button
            type="button"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-expanded={menuOpen}
            aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
            className="inline-flex h-11 w-11 items-center justify-center border border-zinc-800 text-zinc-200 hover:border-[#F7C600] hover:text-[#F7C600] md:hidden focus-visible:outline-2 focus-visible:outline-[#F7C600]"
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {menuOpen && (
        <div className="border-t border-zinc-800 bg-[#050505] px-4 py-5 md:hidden">
          <nav aria-label="Menú móvil" className="flex flex-col gap-3">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="flex min-h-[44px] items-center justify-between border-b border-zinc-900 py-2 text-base font-medium text-zinc-200 hover:text-[#F7C600]"
              >
                <span>{item.label}</span>
                <span aria-hidden="true" className="h-1.5 w-1.5 bg-[#F7C600]" />
              </a>
            ))}
            <a
              href="#turnos"
              onClick={() => setMenuOpen(false)}
              className="mt-2 inline-flex min-h-[44px] items-center justify-center bg-[#F7C600] px-5 py-3 text-sm font-bold uppercase tracking-wider text-black"
            >
              Reservar turno
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
