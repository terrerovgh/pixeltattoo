import type { MouseEvent } from 'react';
import {
  SPECIALTY_LINKS,
  navigateToSeoRoute,
  type SeoRouteConfig,
  type SeoRoutePath,
} from '../data/seoRoutes';
import { ARTIST_INFO } from '../data/tattooData';

interface SpecialtyHeroProps {
  route: SeoRouteConfig;
}

export function SpecialtyHero({ route }: SpecialtyHeroProps) {
  const handleRouteClick = (e: MouseEvent<HTMLAnchorElement>, path: SeoRoutePath) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    e.preventDefault();
    navigateToSeoRoute(path);
  };

  return (
    <section className="bg-[#050505] pt-14 pb-12 sm:pt-20 sm:pb-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        {/* Clean unboxed breadcrumb */}
        <nav aria-label="Ruta de navegación" className="flex items-center gap-2 text-xs text-zinc-500">
          <a
            href="/"
            onClick={(e) => handleRouteClick(e, '/')}
            className="transition-colors hover:text-[#F7C600]"
          >
            Inicio
          </a>
          <span aria-hidden="true">/</span>
          <span className="text-zinc-300">{route.slugLabel}</span>
        </nav>

        <div className="mt-8 grid grid-cols-1 items-end gap-10 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <p className="text-xs font-medium text-[#F7C600]">{route.kicker}</p>
            <h1 className="mt-3 font-display text-3xl font-bold tracking-tight text-white sm:text-5xl [text-wrap:balance]">
              {route.h1}
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-zinc-300 sm:text-lg">
              {route.lead}
            </p>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-zinc-400">
              {route.localDetails}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 lg:col-span-4 lg:justify-end">
            <a
              href="#turnos"
              className="pixel-btn inline-flex min-h-[46px] items-center justify-center bg-[#F7C600] px-6 py-3 text-sm font-semibold text-black hover:text-black whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F7C600]"
            >
              <span>{route.ctaLabel}</span>
            </a>

            <a
              href={ARTIST_INFO.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[46px] items-center justify-center bg-[#0E0E11] px-5 py-3 text-sm font-medium text-zinc-200 transition-colors hover:bg-zinc-800 hover:text-white whitespace-nowrap shrink-0"
            >
              WhatsApp {ARTIST_INFO.whatsappDisplay}
            </a>
          </div>
        </div>

        {/* Crawlable specialty cross-links without pills */}
        <div className="mt-12 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-zinc-900 pt-6 text-xs text-zinc-400">
          <a
            href="/"
            onClick={(e) => handleRouteClick(e, '/')}
            className="transition-colors hover:text-white"
          >
            Todos los estilos
          </a>
          {SPECIALTY_LINKS.map((item) => {
            const isCurrent = item.path === route.path;
            return (
              <span key={item.path} className="inline-flex items-center gap-5">
                <span aria-hidden="true" className="text-zinc-700">
                  ·
                </span>
                <a
                  href={item.path}
                  onClick={(e) => handleRouteClick(e, item.path)}
                  aria-current={isCurrent ? 'page' : undefined}
                  className={`transition-colors ${
                    isCurrent ? 'font-semibold text-[#F7C600]' : 'hover:text-white'
                  }`}
                >
                  {item.slugLabel}
                </a>
              </span>
            );
          })}
        </div>
      </div>
    </section>
  );
}
