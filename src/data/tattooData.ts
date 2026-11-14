export type TattooStyleId = 'all' | 'realism' | 'futbol' | 'color' | 'proceso';

export interface TattooWork {
  id: string;
  title: string;
  style: Exclude<TattooStyleId, 'all'>;
  styleLabel: string;
  placement: string;
  year: string;
  image: string;
  gallery: string[];
  video?: string;
  alt: string;
  instagramUrl: string;
  featured?: boolean;
}

export interface FaqItem {
  q: string;
  a: string;
}

export const ARTIST_INFO = {
  brand: 'PIXEL TATTOO',
  artistName: 'Antonio «Tony» Otero',
  handle: '@pixeltattoo2024',
  instagramUrl: 'https://www.instagram.com/pixeltattoo2024/',
  studioName: 'Tempel Tattoo Studio',
  studioHandle: '@tempeltattoostudio',
  address: 'Rondeau 1394 esq. Colonia',
  neighborhood: 'Centro, Montevideo',
  country: 'Uruguay',
  whatsappDisplay: '099 721 897',
  whatsappNumber: '59899721897',
  whatsappUrl: 'https://wa.me/59899721897',
  studioWhatsappDisplay: '099 809 455',
  hours: 'Lunes a Sábado de 11:00 a 19:30',
  portraitImage: './assets/aistudio/screenshot-2026-11-13_21-58-54-brave-browser_e5cfcf6f.png',
  studioActionImage: './assets/instagram/DGlK4-POnHr.jpg',
};

export const PORTFOLIO_FILTERS: { id: TattooStyleId; label: string }[] = [
  { id: 'all', label: 'Todos' },
  { id: 'realism', label: 'Realismo' },
  { id: 'futbol', label: 'Pasión Aurinegra' },
  { id: 'color', label: 'Color y Coberturas' },
  { id: 'proceso', label: 'Estudio' },
];

export const TATTOO_WORKS: TattooWork[] = [
  {
    id: 'w-tigre',
    title: 'Tigre en Espalda Completa',
    style: 'realism',
    styleLabel: 'Realismo en negro y grises',
    placement: 'Espalda completa',
    year: '2026',
    image: './assets/instagram/profile_tony.jpg',
    gallery: ['./assets/instagram/profile_tony.jpg'],
    alt: 'Tatuaje de espalda completa con rostro realista de tigre en negro y grises y ojos ámbar',
    instagramUrl: 'https://www.instagram.com/pixeltattoo2024/',
    featured: true,
  },
  {
    id: 'w-fe',
    title: 'Fe, Fuerza y Sacrificio',
    style: 'realism',
    styleLabel: 'Realismo en negro y grises',
    placement: 'Pantorrilla',
    year: '2025',
    image: './assets/instagram/DFqivTeJDF-.jpg',
    gallery: ['./assets/instagram/DFqivTeJDF-.jpg'],
    video: './assets/instagram/DFqivTeJDF-.mp4',
    alt: 'Tatuaje realista en negro y grises de rostro de Cristo con corona de espinas y escena del calvario',
    instagramUrl: 'https://www.instagram.com/p/DFqivTeJDF-/',
    featured: true,
  },
  {
    id: 'w-amsterdam',
    title: 'Peñarol Barra Ámsterdam 1891',
    style: 'futbol',
    styleLabel: 'Pasión Aurinegra',
    placement: 'Pantorrilla',
    year: '2025',
    image: './assets/instagram/DLm0C6xOAw0_c0.jpg',
    gallery: [
      './assets/instagram/DLm0C6xOAw0_c0.jpg',
      './assets/instagram/DLm0C6xOAw0_c1.jpg',
      './assets/instagram/DLm0C6xOAw0_c13.jpg',
    ],
    alt: 'Tatuaje con tribuna Barra Ámsterdam, escudo de Peñarol de once estrellas, Copa Libertadores y año 1891',
    instagramUrl: 'https://www.instagram.com/p/DLm0C6xOAw0/',
    featured: true,
  },
  {
    id: 'w-kenshin',
    title: 'Kenshin Himura',
    style: 'color',
    styleLabel: 'Color y Coberturas',
    placement: 'Antebrazo',
    year: '2026',
    image: './assets/instagram/DNdRIv0tQN_.jpg',
    gallery: ['./assets/instagram/DNdRIv0tQN_.jpg'],
    alt: 'Tatuaje a todo color de Kenshin Himura en antebrazo con contraste rojo carmesí y azul profundo',
    instagramUrl: 'https://www.instagram.com/pixeltattoo2024/',
  },
  {
    id: 'w-anubis',
    title: 'Anubis y Pirámides',
    style: 'realism',
    styleLabel: 'Realismo en negro y grises',
    placement: 'Antebrazo',
    year: '2025',
    image: './assets/instagram/DEZuyQyJEFx_c0.jpg',
    gallery: [
      './assets/instagram/DEZuyQyJEFx_c0.jpg',
      './assets/instagram/DEZuyQyJEFx_c1.jpg',
    ],
    alt: 'Tatuaje realista de Anubis y pirámides egipcias con Ojo de Horus en antebrazo',
    instagramUrl: 'https://www.instagram.com/p/DEZuyQyJEFx/',
  },
  {
    id: 'w-sol-1891',
    title: 'Sol y Escudo Aurinegro 1891',
    style: 'futbol',
    styleLabel: 'Pasión Aurinegra',
    placement: 'Antebrazo',
    year: '2025',
    image: './assets/instagram/DDEtHUUOvkq_c0.jpg',
    gallery: [
      './assets/instagram/DDEtHUUOvkq_c0.jpg',
      './assets/instagram/DDEtHUUOvkq_c1.jpg',
      './assets/instagram/DDEtHUUOvkq_c2.jpg',
    ],
    alt: 'Tatuaje en brazo con sol uruguayo, bandera ondeante en negro y amarillo, escudo de Peñarol y número 1891',
    instagramUrl: 'https://www.instagram.com/p/DDEtHUUOvkq/',
  },
  {
    id: 'w-leon-cover',
    title: 'León Aurinegro Cobertura',
    style: 'color',
    styleLabel: 'Color y Coberturas',
    placement: 'Pantorrilla',
    year: '2025',
    image: './assets/instagram/DF-tlaeJ0EE_c0.jpg',
    gallery: [
      './assets/instagram/DF-tlaeJ0EE_c0.jpg',
      './assets/instagram/DF-tlaeJ0EE_c1.jpg',
      './assets/instagram/DF-tlaeJ0EE_c3.jpg',
    ],
    alt: 'Tatuaje renovado de león realista con camiseta aurinegra cubriendo una pieza anterior',
    instagramUrl: 'https://www.instagram.com/p/DF-tlaeJ0EE/',
  },
  {
    id: 'w-paloma',
    title: 'Paloma en Vuelo',
    style: 'realism',
    styleLabel: 'Realismo en negro y grises',
    placement: 'Antebrazo',
    year: '2025',
    image: './assets/instagram/DNQKTL_tw8k_c0.jpg',
    gallery: [
      './assets/instagram/DNQKTL_tw8k_c0.jpg',
      './assets/instagram/DNQKTL_tw8k_c1.jpg',
      './assets/instagram/DNQKTL_tw8k_c2.jpg',
    ],
    alt: 'Tatuaje realista en negro y grises de paloma en vuelo rodeada de rayos y ojo en el antebrazo',
    instagramUrl: 'https://www.instagram.com/p/DNQKTL_tw8k/',
  },
  {
    id: 'w-retrato-color',
    title: 'Retrato en Color',
    style: 'color',
    styleLabel: 'Color y Coberturas',
    placement: 'Antebrazo',
    year: '2025',
    image: './assets/instagram/DDriyFCJNwb_c0.jpg',
    gallery: [
      './assets/instagram/DDriyFCJNwb_c0.jpg',
      './assets/instagram/DDriyFCJNwb_c1.jpg',
      './assets/instagram/DDriyFCJNwb_c7.jpg',
    ],
    alt: 'Tatuaje retrato a color de hombre con lentes y barba trabajado en antebrazo',
    instagramUrl: 'https://www.instagram.com/p/DDriyFCJNwb/',
  },
  {
    id: 'w-suarez',
    title: 'Homenaje Luis Suárez',
    style: 'futbol',
    styleLabel: 'Pasión Aurinegra',
    placement: 'Pantorrilla',
    year: '2025',
    image: './assets/instagram/DJUP2Ftu50I.jpg',
    gallery: ['./assets/instagram/DJUP2Ftu50I.jpg'],
    alt: 'Tatuaje en pierna a color con festejo de Luis Suárez camiseta 9 frente a la tribuna del estadio',
    instagramUrl: 'https://www.instagram.com/pixeltattoo2024/',
  },
  {
    id: 'w-estudio',
    title: 'Sesión en Tempel Tattoo Studio',
    style: 'proceso',
    styleLabel: 'Estudio',
    placement: 'Montevideo',
    year: '2026',
    image: './assets/instagram/DGlK4-POnHr.jpg',
    gallery: ['./assets/instagram/DGlK4-POnHr.jpg'],
    video: './assets/instagram/DaTftZYTqkm.mp4',
    alt: 'Antonio Tony Otero tatuando en su estación privada dentro de Tempel Tattoo Studio en Montevideo',
    instagramUrl: 'https://www.instagram.com/pixeltattoo2024/',
  },
];

export const FAQ_ITEMS: FaqItem[] = [
  {
    q: '¿Dónde queda el estudio y cómo se coordina una cita?',
    a: 'Trabajo en Tempel Tattoo Studio, en Rondeau 1394 esquina Colonia, Centro, Montevideo. Podés escribir directo por WhatsApp al 099 721 897 con tu idea, zona del cuerpo y tamaño aproximado en centímetros.',
  },
  {
    q: '¿Cómo se adapta cada diseño al cuerpo?',
    a: 'Cada proyecto se ajusta sobre la anatomía real del brazo, pierna o espalda antes de aplicar el stencil para que las sombras y la composición acompañen el movimiento natural del músculo.',
  },
  {
    q: '¿Realizás coberturas o renovación de tatuajes previos?',
    a: 'Sí. Primero evaluamos la saturación y el estado del tatuaje anterior mediante una foto con buena luz natural o en una consulta breve en el estudio para diseñar una pieza con contraste limpio.',
  },
  {
    q: '¿Cómo se confirma la reserva del turno?',
    a: 'Una vez acordados el diseño, la sesión y el presupuesto por WhatsApp, la fecha queda reservada mediante una seña que se descuenta del valor total.',
  },
];
