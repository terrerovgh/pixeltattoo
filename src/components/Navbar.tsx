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
    <header className="sticky top-0 z-40 bg-[#050505]/85 backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-8 px-6 lg:px-10">
        {/* Zone 1: Single-line brand wordmark */}
        <a
          href="#inicio"
          className="font-display text-lg font-bold tracking-tight text-white whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#F7C600]"
        >
          {ARTIST_INFO.brand}
        </a>

        {/* Zone 2: 4 single-line navigation links */}
        <nav
          aria-label="Navegación principal"
          className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-400"
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
            className="pixel-btn hidden sm:inline-flex h-10 items-center justify-center bg-[#F7C600] px-5 text-xs font-semibold tracking-wide text-black hover:text-black whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F7C600]"
          >
            <span>Reservar turno</span>
          </a>

          <button
            type="button"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-expanded={menuOpen}
            aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
            className="inline-flex h-11 w-11 items-center justify-center text-zinc-300 hover:text-[#F7C600] md:hidden focus-visible:outline-2 focus-visible:outline-[#F7C600]"
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {menuOpen && (
        <div className="bg-[#050505] px-6 pb-8 pt-2 md:hidden">
          <nav aria-label="Menú móvil" className="flex flex-col gap-2">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="flex min-h-[44px] items-center py-2 text-base font-medium text-zinc-300 hover:text-[#F7C600]"
              >
                {item.label}
              </a>
            ))}
            <a
              href="#turnos"
              onClick={() => setMenuOpen(false)}
              className="mt-4 inline-flex min-h-[44px] items-center justify-center bg-[#F7C600] px-5 py-3 text-sm font-semibold text-black"
            >
              Reservar turno
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
