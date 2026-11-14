import type { TattooStyleId } from './tattooData';

export const SITE_ORIGIN = 'https://tonypixeltattoo.com';

export type SeoRoutePath =
  | '/'
  | '/tatuajes-realismo-montevideo'
  | '/tatuajes-penarol-uruguay'
  | '/tatuajes-color-cover-up-montevideo'
  | '/estudio-tempel-centro-montevideo';

export interface SeoRouteConfig {
  path: SeoRoutePath;
  slugLabel: string;
  title: string;
  description: string;
  h1: string;
  kicker: string;
  lead: string;
  localDetails: string;
  portfolioFilter: TattooStyleId;
  bookingStyleDefault: string;
  ogImage: string;
  ogImageAlt: string;
  ctaLabel: string;
}

export const SEO_ROUTES: Record<SeoRoutePath, SeoRouteConfig> = {
  '/': {
    path: '/',
    slugLabel: 'Inicio',
    title: 'Pixel Tattoo Montevideo | Tatuajes Realismo, Color y Peñarol',
    description:
      'Tatuajes en Centro, Montevideo con Tony Otero. Realismo negro y grises, full color, covers y Peñarol en Tempel Tattoo Studio. Agendá turno por WhatsApp.',
    h1: 'Pixel Tattoo por Antonio «Tony» Otero en Tempel Tattoo Studio, Montevideo',
    kicker: 'Centro, Montevideo · Uruguay',
    lead: 'Realismo en negro y grises, color y pasión aurinegra diseñados sobre tu anatomía en Montevideo.',
    localDetails:
      'Atención con cita previa en Rondeau 1394 esq. Colonia, Centro, Montevideo, a pasos de 18 de Julio.',
    portfolioFilter: 'all',
    bookingStyleDefault: 'Realismo en negro y grises',
    ogImage: `${SITE_ORIGIN}/assets/instagram/profile_tony.jpg`,
    ogImageAlt: 'Tatuaje de tigre realista en espalda completa por Pixel Tattoo en Montevideo, Uruguay',
    ctaLabel: 'Ver trabajos',
  },
  '/tatuajes-realismo-montevideo': {
    path: '/tatuajes-realismo-montevideo',
    slugLabel: 'Realismo Montevideo',
    title: 'Tatuajes Realismo Montevideo | Negro y Grises — Pixel Tattoo',
    description:
      'Tatuajes de realismo en negro y grises, retratos y piezas anatómicas en Centro, Montevideo. Trabajos de Tony Otero en Tempel Tattoo Studio. Consultá por WhatsApp.',
    h1: 'Tatuajes de realismo en negro y grises en Montevideo',
    kicker: 'Realismo y Black & Grey · Centro, Montevideo',
    lead: 'Retratos, fauna y composiciones de gran escala con sombreado progresivo, luz natural y contraste pensado para envejecer limpio sobre la piel.',
    localDetails:
      'Diseñamos cada pieza directamente sobre la musculatura de brazo, pierna o espalda en nuestro estudio de Rondeau 1394 esq. Colonia, Montevideo.',
    portfolioFilter: 'realism',
    bookingStyleDefault: 'Realismo en negro y grises',
    ogImage: `${SITE_ORIGIN}/assets/instagram/DFqivTeJDF-.jpg`,
    ogImageAlt: 'Tatuaje realista en negro y grises realizado en Montevideo por Tony Otero',
    ctaLabel: 'Cotizar pieza realista',
  },
  '/tatuajes-penarol-uruguay': {
    path: '/tatuajes-penarol-uruguay',
    slugLabel: 'Tatuajes Peñarol',
    title: 'Tatuajes de Peñarol Uruguay | Escudos y Tribuna — Pixel Tattoo',
    description:
      'Tatuajes de Peñarol, Barra Ámsterdam 1891, escudos y fútbol uruguayo en Montevideo. Piezas personalizadas en negro y color por Tony Otero en Rondeau 1394.',
    h1: 'Tatuajes de Peñarol y fútbol uruguayo en Montevideo',
    kicker: 'Pasión Aurinegra · Montevideo, Uruguay',
    lead: 'Escudos de once estrellas, Barra Ámsterdam, Copa Libertadores, fechas históricas de 1891 y homenajes futboleros con negro sólido y amarillo intenso.',
    localDetails:
      'Trabajamos composiciones únicas para hinchas de todo Montevideo y el interior del Uruguay en Tempel Tattoo Studio.',
    portfolioFilter: 'futbol',
    bookingStyleDefault: 'Pasión Aurinegra',
    ogImage: `${SITE_ORIGIN}/assets/instagram/DLm0C6xOAw0_c0.jpg`,
    ogImageAlt: 'Tatuaje de Peñarol Barra Ámsterdam 1891 y Copa Libertadores en Montevideo',
    ctaLabel: 'Cotizar tatuaje aurinegro',
  },
  '/tatuajes-color-cover-up-montevideo': {
    path: '/tatuajes-color-cover-up-montevideo',
    slugLabel: 'Color y Cover-Up',
    title: 'Tatuajes Full Color y Cover-Up Montevideo | Pixel Tattoo',
    description:
      'Especialista en cover-up y tatuajes full color en Centro, Montevideo. Tapamos tatuajes viejos con diseño limpio y contraste real. Agendá consulta con Tony Otero.',
    h1: 'Coberturas (cover-up) y tatuajes full color en Montevideo',
    kicker: 'Full Color & Cover-Up · Centro, Montevideo',
    lead: 'Saturación de pigmento duradera, anime, retratos en color y renovación estratégica de tatuajes antiguos sin manchas ni parches oscuros.',
    localDetails:
      'Evaluamos tu tatuaje previo por foto o en consulta presencial en Centro, Montevideo para planificar una cobertura definitiva.',
    portfolioFilter: 'color',
    bookingStyleDefault: 'Cobertura',
    ogImage: `${SITE_ORIGIN}/assets/instagram/DNdRIv0tQN_.jpg`,
    ogImageAlt: 'Tatuaje full color y cobertura profesional en Montevideo por Pixel Tattoo',
    ctaLabel: 'Evaluar cobertura o color',
  },
  '/estudio-tempel-centro-montevideo': {
    path: '/estudio-tempel-centro-montevideo',
    slugLabel: 'Estudio Centro MVD',
    title: 'Tempel Tattoo Studio Montevideo | Rondeau 1394 — Pixel Tattoo',
    description:
      'Visitá a Tony Otero en Tempel Tattoo Studio, Rondeau 1394 esq. Colonia, Centro, Montevideo. Lunes a sábado de 11:00 a 19:30 con cita previa por WhatsApp.',
    h1: 'Tempel Tattoo Studio en Centro, Montevideo',
    kicker: 'Rondeau 1394 esq. Colonia · Montevideo',
    lead: 'Estación privada de tatuaje con higiene clínica certificada, diseño anatómico previo a la sesión y atención personalizada de lunes a sábado.',
    localDetails:
      'Ubicado en el Centro de Montevideo con locomoción directa desde Cordón, Ciudad Vieja, Tres Cruces, Pocitos, Prado y Malvín.',
    portfolioFilter: 'proceso',
    bookingStyleDefault: 'Realismo en negro y grises',
    ogImage: `${SITE_ORIGIN}/assets/instagram/DGlK4-POnHr.jpg`,
    ogImageAlt: 'Tony Otero tatuando en Tempel Tattoo Studio en Centro, Montevideo',
    ctaLabel: 'Agendar visita al estudio',
  },
};

export const SPECIALTY_LINKS: SeoRouteConfig[] = [
  SEO_ROUTES['/tatuajes-realismo-montevideo'],
  SEO_ROUTES['/tatuajes-penarol-uruguay'],
  SEO_ROUTES['/tatuajes-color-cover-up-montevideo'],
  SEO_ROUTES['/estudio-tempel-centro-montevideo'],
];

export const MONTEVIDEO_AREAS = [
  'Centro',
  'Cordón',
  'Ciudad Vieja',
  'Tres Cruces',
  'Parque Rodó',
  'Pocitos',
  'Punta Carretas',
  'Prado',
  'Malvín',
];

export function normalizeSeoPath(pathname: string): SeoRoutePath {
  const cleaned = pathname.replace(/\.html$/i, '').replace(/\/+$/, '') || '/';
  if (cleaned in SEO_ROUTES) {
    return cleaned as SeoRoutePath;
  }
  return '/';
}

export function getCanonicalUrl(path: SeoRoutePath): string {
  return path === '/' ? `${SITE_ORIGIN}/` : `${SITE_ORIGIN}${path}`;
}

export function navigateToSeoRoute(path: SeoRoutePath, scrollToTop = true): void {
  const current = normalizeSeoPath(window.location.pathname);
  if (current !== path) {
    window.history.pushState({ seoPath: path }, '', path);
    window.dispatchEvent(new CustomEvent('pixeltattoo:routechange', { detail: path }));
  }
  if (scrollToTop) {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
