export type TattooStyleId = 'all' | 'realism' | 'futbol' | 'color' | 'proceso';

export interface TattooWork {
  id: string;
  index: string;
  title: string;
  style: Exclude<TattooStyleId, 'all'>;
  styleLabel: string;
  placement: string;
  duration: string;
  healedStatus: string;
  year: string;
  image: string;
  gallery: string[];
  video?: string;
  alt: string;
  description: string;
  instagramUrl: string;
  featured?: boolean;
}

export interface StudioSlot {
  id: string;
  dayLabel: string;
  dateLabel: string;
  shift: 'Mañana' | 'Tarde';
  timeRange: string;
  recommendedFor: string;
  status: 'Disponible' | 'Último cupo' | 'Reservado';
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
  hours: 'Lun a Sáb · 11:00 a 19:30',
  portraitImage: './assets/aistudio/screenshot-2026-11-13_21-58-54-brave-browser_e5cfcf6f.png',
  studioActionImage: './assets/instagram/DGlK4-POnHr.jpg',
};

export const HERO_CYCLE_ITEMS = [
  {
    caption: 'Realismo en negro y grises · Retratos y anatomía',
    tag: 'MONTEVIDEO · URUGUAY',
  },
  {
    caption: 'Pasión aurinegra · Escudos bordados 3D y 1891',
    tag: 'TEMPEL TATTOO STUDIO',
  },
  {
    caption: 'Full color, coberturas y resultados 100% curados',
    tag: 'RONDEAU 1394 ESQ. COLONIA',
  },
  {
    caption: 'Diseño a medida adaptado al flujo natural del cuerpo',
    tag: '@PIXELTATTOO2024',
  },
];

export const PORTFOLIO_FILTERS: { id: TattooStyleId; label: string }[] = [
  { id: 'all', label: 'Todos' },
  { id: 'realism', label: 'Realismo B&G' },
  { id: 'futbol', label: 'Pasión Aurinegra' },
  { id: 'color', label: 'Color & Covers' },
  { id: 'proceso', label: 'Estudio & Reels' },
];

export const TATTOO_WORKS: TattooWork[] = [
  {
    id: 'w-tigre',
    index: '01',
    title: 'Tigre Realista en Espalda Completa',
    style: 'realism',
    styleLabel: 'Realismo B&G',
    placement: 'Espalda completa',
    duration: 'Proyecto integral · Varias sesiones',
    healedStatus: 'Tatuado en Montevideo',
    year: '2026',
    image: './assets/instagram/profile_tony.jpg',
    gallery: ['./assets/instagram/profile_tony.jpg'],
    alt: 'Tatuaje de espalda completa con rostro realista de tigre en negro y grises y ojos ámbar',
    description:
      'Composición monumental adaptada a la musculatura dorsal: pelaje trabajado pelo a pelo en negro y grises con foco cromático sutil en la mirada ámbar.',
    instagramUrl: 'https://www.instagram.com/pixeltattoo2024/',
    featured: true,
  },
  {
    id: 'w-fe',
    index: '02',
    title: 'Fe, Fuerza y Sacrificio',
    style: 'realism',
    styleLabel: 'Realismo B&G',
    placement: 'Pierna / Pantorrilla',
    duration: '1 sesión extensa · B&G',
    healedStatus: 'Con reel en estudio',
    year: '2025',
    image: './assets/instagram/DFqivTeJDF-.jpg',
    gallery: ['./assets/instagram/DFqivTeJDF-.jpg'],
    video: './assets/instagram/DFqivTeJDF-.mp4',
    alt: 'Tatuaje realista en negro y grises de rostro de Cristo con corona de espinas y escena del calvario',
    description:
      'Simbolismo religioso y realismo escultórico integrados verticalmente sobre la pantorrilla con haces de luz y profundidad en negro y grises.',
    instagramUrl: 'https://www.instagram.com/p/DFqivTeJDF-/',
    featured: true,
  },
  {
    id: 'w-amsterdam',
    index: '03',
    title: 'Peñarol · Barra Ámsterdam 1891',
    style: 'futbol',
    styleLabel: 'Pasión Aurinegra',
    placement: 'Pierna / Pantorrilla',
    duration: 'Sesión integral · Realismo & Color',
    healedStatus: 'Tatuado en Montevideo',
    year: '2025',
    image: './assets/instagram/DLm0C6xOAw0_c0.jpg',
    gallery: [
      './assets/instagram/DLm0C6xOAw0_c0.jpg',
      './assets/instagram/DLm0C6xOAw0_c1.jpg',
      './assets/instagram/DLm0C6xOAw0_c13.jpg',
    ],
    alt: 'Tatuaje con tribuna Barra Ámsterdam, escudo de Peñarol de once estrellas, Copa Libertadores y año 1891',
    description:
      'Tribuna Ámsterdam, escudo de once estrellas, Copa Libertadores en negro y grises y el año fundacional 1891 en composición envolvente sin cortes bruscos.',
    instagramUrl: 'https://www.instagram.com/p/DLm0C6xOAw0/',
    featured: true,
  },
  {
    id: 'w-kenshin',
    index: '04',
    title: 'Kenshin Himura · Full Color',
    style: 'color',
    styleLabel: 'Color & Covers',
    placement: 'Antebrazo',
    duration: '1 sesión extensa · Color sólido',
    healedStatus: 'Tatuado en Tempel Studio',
    year: '2026',
    image: './assets/instagram/DNdRIv0tQN_.jpg',
    gallery: ['./assets/instagram/DNdRIv0tQN_.jpg'],
    alt: 'Tatuaje a todo color de Kenshin Himura en antebrazo con contraste rojo carmesí y azul profundo',
    description:
      'Saturación cromática limpia con contraste cálido/frío entre el kimono carmesí, el fondo azul profundo y los destellos de katana.',
    instagramUrl: 'https://www.instagram.com/pixeltattoo2024/',
  },
  {
    id: 'w-anubis',
    index: '05',
    title: 'Anubis & Pirámides de Egipto',
    style: 'realism',
    styleLabel: 'Realismo B&G',
    placement: 'Antebrazo',
    duration: '1 sesión · Realismo B&G',
    healedStatus: 'Tatuado en Montevideo',
    year: '2025',
    image: './assets/instagram/DEZuyQyJEFx_c0.jpg',
    gallery: [
      './assets/instagram/DEZuyQyJEFx_c0.jpg',
      './assets/instagram/DEZuyQyJEFx_c1.jpg',
    ],
    alt: 'Tatuaje realista de Anubis y pirámides egipcias con Ojo de Horus en antebrazo',
    description:
      'Deidad egipcia de alto contraste conectada con las pirámides y el Ojo de Horus siguiendo el eje natural del antebrazo.',
    instagramUrl: 'https://www.instagram.com/p/DEZuyQyJEFx/',
  },
  {
    id: 'w-sol-1891',
    index: '06',
    title: 'Sol y Escudo Aurinegro 1891',
    style: 'futbol',
    styleLabel: 'Pasión Aurinegra',
    placement: 'Antebrazo',
    duration: '1 sesión · Color & Sombras',
    healedStatus: 'Tatuado en Montevideo',
    year: '2025',
    image: './assets/instagram/DDEtHUUOvkq_c0.jpg',
    gallery: [
      './assets/instagram/DDEtHUUOvkq_c0.jpg',
      './assets/instagram/DDEtHUUOvkq_c1.jpg',
      './assets/instagram/DDEtHUUOvkq_c2.jpg',
    ],
    alt: 'Tatuaje en brazo con sol uruguayo, bandera ondeante en negro y amarillo, escudo de Peñarol y número 1891',
    description:
      'Sol charrúa sobre pabellón ondeante en negro y oro coronando el escudo tradicional de once estrellas y el 1891.',
    instagramUrl: 'https://www.instagram.com/p/DDEtHUUOvkq/',
  },
  {
    id: 'w-leon-cover',
    index: '07',
    title: 'Renovación León Aurinegro',
    style: 'color',
    styleLabel: 'Color & Covers',
    placement: 'Pantorrilla',
    duration: 'Cobertura & Reconstrucción',
    healedStatus: 'Cover-up completado',
    year: '2025',
    image: './assets/instagram/DF-tlaeJ0EE_c0.jpg',
    gallery: [
      './assets/instagram/DF-tlaeJ0EE_c0.jpg',
      './assets/instagram/DF-tlaeJ0EE_c1.jpg',
      './assets/instagram/DF-tlaeJ0EE_c3.jpg',
    ],
    alt: 'Tatuaje renovado de león realista con camiseta aurinegra cubriendo una pieza anterior',
    description:
      'Rescate y reconstrucción total de un tatuaje previo, redefiniendo volumen de melena, expresión y contraste completo.',
    instagramUrl: 'https://www.instagram.com/p/DF-tlaeJ0EE/',
  },
  {
    id: 'w-paloma',
    index: '08',
    title: 'Paloma en Vuelo & Ojo',
    style: 'realism',
    styleLabel: 'Realismo B&G',
    placement: 'Antebrazo',
    duration: '1 sesión · Sombras suaves',
    healedStatus: 'Tatuado en Tempel Studio',
    year: '2025',
    image: './assets/instagram/DNQKTL_tw8k_c0.jpg',
    gallery: [
      './assets/instagram/DNQKTL_tw8k_c0.jpg',
      './assets/instagram/DNQKTL_tw8k_c1.jpg',
      './assets/instagram/DNQKTL_tw8k_c2.jpg',
    ],
    alt: 'Tatuaje realista en negro y grises de paloma en vuelo rodeada de rayos y ojo en el antebrazo',
    description:
      'Composición en negro y grises con textura detallada en plumaje y transición limpia de luz hacia el ojo inferior.',
    instagramUrl: 'https://www.instagram.com/p/DNQKTL_tw8k/',
  },
  {
    id: 'w-retrato-color',
    index: '09',
    title: 'Retrato Hiperrealista en Color',
    style: 'color',
    styleLabel: 'Color & Covers',
    placement: 'Antebrazo',
    duration: 'Sesión extensa · Color',
    healedStatus: 'Tatuado en Montevideo',
    year: '2025',
    image: './assets/instagram/DDriyFCJNwb_c0.jpg',
    gallery: [
      './assets/instagram/DDriyFCJNwb_c0.jpg',
      './assets/instagram/DDriyFCJNwb_c1.jpg',
      './assets/instagram/DDriyFCJNwb_c7.jpg',
    ],
    alt: 'Tatuaje retrato a color de hombre con lentes y barba trabajado en antebrazo',
    description:
      'Microtextura en barba, transparencia real en cristales y gradación cálida de tonos de piel sin saturación artificial.',
    instagramUrl: 'https://www.instagram.com/p/DDriyFCJNwb/',
  },
  {
    id: 'w-suarez',
    index: '10',
    title: 'Suárez #9 · Homenaje en Color',
    style: 'futbol',
    styleLabel: 'Pasión Fútbol',
    placement: 'Pierna / Pantorrilla',
    duration: 'Sesión extensa · Color narrativo',
    healedStatus: 'Tatuado en Montevideo',
    year: '2025',
    image: './assets/instagram/DJUP2Ftu50I.jpg',
    gallery: ['./assets/instagram/DJUP2Ftu50I.jpg'],
    alt: 'Tatuaje en pierna a color con festejo de Luis Suárez camiseta 9 frente a la tribuna del estadio',
    description:
      'Festejo clásico frente a la tribuna colmada: captura de pliegues en camiseta, tipografía de dorsal y perspectiva de cancha.',
    instagramUrl: 'https://www.instagram.com/pixeltattoo2024/',
  },
  {
    id: 'w-estudio',
    index: '11',
    title: 'Sesión en Tempel Tattoo Studio',
    style: 'proceso',
    styleLabel: 'Estudio & Reels',
    placement: 'Centro · Rondeau 1394',
    duration: 'Cabina privada',
    healedStatus: 'Proceso real',
    year: '2026',
    image: './assets/instagram/DGlK4-POnHr.jpg',
    gallery: ['./assets/instagram/DGlK4-POnHr.jpg'],
    video: './assets/instagram/DaTftZYTqkm.mp4',
    alt: 'Antonio Tony Otero tatuando en su estación privada dentro de Tempel Tattoo Studio en Montevideo',
    description:
      'Estación equipada con cartuchos descartables, iluminación neutra CRI 95 y diseño digital sobre tablet junto al cliente antes de pasar el stencil.',
    instagramUrl: 'https://www.instagram.com/pixeltattoo2024/',
  },
];

export const STUDIO_SCHEDULE: StudioSlot[] = [
  {
    id: 'slot-1',
    dayLabel: 'Lun 16 Nov',
    dateLabel: '16/11',
    shift: 'Mañana',
    timeRange: '11:00 – 14:30',
    recommendedFor: 'Retrato / Pieza Media',
    status: 'Disponible',
  },
  {
    id: 'slot-2',
    dayLabel: 'Lun 16 Nov',
    dateLabel: '16/11',
    shift: 'Tarde',
    timeRange: '15:30 – 19:30',
    recommendedFor: 'Sesión Extensa',
    status: 'Reservado',
  },
  {
    id: 'slot-3',
    dayLabel: 'Mié 18 Nov',
    dateLabel: '18/11',
    shift: 'Mañana',
    timeRange: '11:00 – 14:30',
    recommendedFor: 'Escudo / Microrealismo',
    status: 'Disponible',
  },
  {
    id: 'slot-4',
    dayLabel: 'Mié 18 Nov',
    dateLabel: '18/11',
    shift: 'Tarde',
    timeRange: '15:30 – 19:30',
    recommendedFor: 'Manga / Cover-Up',
    status: 'Último cupo',
  },
  {
    id: 'slot-5',
    dayLabel: 'Vie 20 Nov',
    dateLabel: '20/11',
    shift: 'Mañana',
    timeRange: '11:00 – 14:30',
    recommendedFor: 'Realismo B&G',
    status: 'Reservado',
  },
  {
    id: 'slot-6',
    dayLabel: 'Vie 20 Nov',
    dateLabel: '20/11',
    shift: 'Tarde',
    timeRange: '15:30 – 19:30',
    recommendedFor: 'Color / Fútbol',
    status: 'Disponible',
  },
  {
    id: 'slot-7',
    dayLabel: 'Sáb 21 Nov',
    dateLabel: '21/11',
    shift: 'Mañana',
    timeRange: '11:00 – 14:30',
    recommendedFor: 'Sesión Media',
    status: 'Último cupo',
  },
  {
    id: 'slot-8',
    dayLabel: 'Sáb 21 Nov',
    dateLabel: '21/11',
    shift: 'Tarde',
    timeRange: '15:30 – 19:30',
    recommendedFor: 'Jornada Completa',
    status: 'Disponible',
  },
];

export const FAQ_ITEMS: FaqItem[] = [
  {
    q: '¿Dónde queda el estudio y cómo se coordina una cita?',
    a: 'Trabajo en Tempel Tattoo Studio (@tempeltattoostudio), en Rondeau 1394 esquina Colonia, Centro, Montevideo. Elegí un bloque tentativo en la agenda o escribí directo por WhatsApp al 099 721 897 con tu idea, zona del cuerpo y tamaño en centímetros.',
  },
  {
    q: '¿Cómo se diseña cada tatuaje para evitar el "efecto parche"?',
    a: 'Cada proyecto se adapta sobre la anatomía real del brazo, pierna o espalda antes de pasar el stencil. Buscamos que las sombras, direcciones de luz y bordes acompañen el movimiento natural del músculo.',
  },
  {
    q: '¿Hacés coberturas (cover-ups) o arreglos de tatuajes viejos?',
    a: 'Sí. En coberturas analizamos primero la saturación, color y cicatriz del tatuaje previo (mediante foto con luz natural o consulta presencial) para diseñar una pieza nueva con contraste real.',
  },
  {
    q: '¿Los turnos requieren seña previa?',
    a: 'Sí, una vez acordados fecha, tamaño y presupuesto estimado por WhatsApp, el bloqueo del turno se confirma con seña descontable del valor total de la sesión.',
  },
  {
    q: '¿Qué cuidados posteriores recomendás y hacés control de curado?',
    a: 'Entregamos guía completa de lavado, parche dermal e hidratación. Además podés pasar por el estudio al mes para revisar la cicatrización y asegurar negros parejos y definición intacta.',
  },
];
