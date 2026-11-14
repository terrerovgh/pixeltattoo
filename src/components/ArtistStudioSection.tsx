import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { ARTIST_INFO, FAQ_ITEMS } from '../data/tattooData';

export function ArtistStudioSection() {
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(null);
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="artista" className="bg-[#050505] py-24 sm:py-32">
      <motion.div
        initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
        className="mx-auto max-w-7xl px-6 lg:px-10"
      >
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Clean Portrait Column */}
          <div className="lg:col-span-5">
            <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#0E0E11]">
              <img
                src={ARTIST_INFO.portraitImage}
                alt="Antonio Tony Otero tatuando en Tempel Tattoo Studio"
                loading="lazy"
                referrerPolicy="no-referrer"
                className="h-full w-full object-cover object-[center_20%]"
              />
            </div>
          </div>

          {/* Clean Editorial Bio & Studio Column */}
          <div id="estudio" className="flex flex-col justify-between lg:col-span-7">
            <div>
              <h2 className="font-display text-3xl font-bold tracking-tight text-white sm:text-4xl [text-wrap:balance]">
                {ARTIST_INFO.artistName}
              </h2>

              <div className="mt-6 space-y-4 text-base leading-relaxed text-zinc-300">
                <p>
                  Tatuador en Montevideo especializado en realismo en negro y grises, retratos, piezas a todo color, coberturas y tatuajes de fútbol trabajados con detalle sobre la piel.
                </p>
                <p>
                  Cada proyecto se diseña respetando la forma natural del cuerpo para lograr composiciones integradas que mantengan su contraste y definición con el paso de los años.
                </p>
              </div>

              {/* Minimal Studio Details without boxed borders or separators */}
              <div className="mt-12 grid grid-cols-1 gap-8 bg-[#0C0C0F] p-8 sm:grid-cols-2">
                <div>
                  <p className="text-xs font-medium text-zinc-500">Estudio</p>
                  <p className="mt-1 font-display text-lg font-semibold text-white">
                    {ARTIST_INFO.studioName}
                  </p>
                  <p className="mt-1 text-sm text-zinc-400">
                    {ARTIST_INFO.address}, {ARTIST_INFO.neighborhood}
                  </p>
                  <a
                    href="https://maps.google.com/?q=Rondeau+1394,+Montevideo,+Uruguay"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-block text-xs font-medium text-[#F7C600] hover:underline"
                  >
                    Ver ubicación en Google Maps
                  </a>
                </div>

                <div className="space-y-4">
                  <div>
                    <p className="text-xs font-medium text-zinc-500">Horario</p>
                    <p className="mt-1 text-sm text-zinc-200">{ARTIST_INFO.hours}</p>
                    <p className="text-xs text-zinc-500">Atención con cita previa</p>
                  </div>

                  <div>
                    <p className="text-xs font-medium text-zinc-500">Contacto directo</p>
                    <p className="mt-1 font-mono text-sm tabular-nums text-zinc-200">
                      {ARTIST_INFO.whatsappDisplay}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Minimal FAQ Accordion without heavy borders */}
            <div className="mt-14">
              <h3 className="font-display text-lg font-semibold text-white">
                Preguntas frecuentes
              </h3>
              <div className="mt-6 space-y-2">
                {FAQ_ITEMS.map((item, idx) => {
                  const isOpen = openFaqIdx === idx;
                  return (
                    <div key={item.q} className="bg-[#0C0C0F] px-6 py-4">
                      <button
                        type="button"
                        aria-expanded={isOpen}
                        onClick={() => setOpenFaqIdx(isOpen ? null : idx)}
                        className="flex w-full items-center justify-between gap-4 text-left text-sm font-medium text-zinc-200 transition-colors hover:text-[#F7C600] focus-visible:outline-2 focus-visible:outline-[#F7C600]"
                      >
                        <span>{item.q}</span>
                        <ChevronDown
                          className={`h-4 w-4 shrink-0 text-zinc-400 transition-transform duration-200 ${
                            isOpen ? 'rotate-180 text-[#F7C600]' : ''
                          }`}
                          aria-hidden="true"
                        />
                      </button>
                      {isOpen && (
                        <p className="mt-3 pr-6 text-sm leading-relaxed text-zinc-400">
                          {item.a}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
