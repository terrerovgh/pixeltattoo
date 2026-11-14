import { useState } from 'react';
import { ChevronDown, Clock, MapPin, Phone, ShieldCheck } from 'lucide-react';
import { ARTIST_INFO, FAQ_ITEMS } from '../data/tattooData';

export function ArtistStudioSection() {
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(0);

  return (
    <section id="artista" className="border-b border-zinc-800/90 bg-[#0A0A0A] py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Two-column editorial split */}
        <div className="grid grid-cols-1 items-stretch gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Portrait & studio frame */}
          <div className="flex flex-col gap-4 lg:col-span-5">
            <div className="relative flex-1 overflow-hidden border border-zinc-800 bg-[#121215] min-h-[360px]">
              <img
                src={ARTIST_INFO.portraitImage}
                alt="Antonio Tony Otero tatuando en Tempel Tattoo Studio"
                loading="lazy"
                referrerPolicy="no-referrer"
                className="h-full w-full object-cover object-[center_20%]"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/45 to-transparent p-5">
                <p className="font-mono text-xs tabular-nums text-[#F7C600]">
                  {ARTIST_INFO.handle}
                </p>
                <p className="mt-0.5 font-display text-lg font-bold text-white">
                  {ARTIST_INFO.artistName}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-12 gap-4 border border-zinc-800 bg-[#121215] p-3">
              <div className="col-span-5 overflow-hidden border border-zinc-800 aspect-[4/3]">
                <img
                  src={ARTIST_INFO.studioActionImage}
                  alt="Estación de trabajo privada de Pixel Tattoo en Tempel Tattoo Studio"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="col-span-7 flex flex-col justify-center">
                <p className="font-display text-sm font-semibold text-white">
                  Sesiones privadas por agenda
                </p>
                <p className="mt-1 text-xs leading-relaxed text-zinc-400">
                  Preparación de stencil sobre tablet y ajuste directo sobre la anatomía antes de tatuar.
                </p>
              </div>
            </div>
          </div>

          {/* Bio, Technique & Studio Specs */}
          <div id="estudio" className="flex flex-col justify-between lg:col-span-7">
            <div>
              <div className="flex items-center gap-2.5 text-xs font-medium uppercase tracking-widest text-[#F7C600]">
                <span className="inline-block h-2 w-2 bg-[#F7C600]" aria-hidden="true" />
                <span>El Artista & Estudio</span>
              </div>

              <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl [text-wrap:balance]">
                Tatuajes pensados para envejecer con definición y carácter.
              </h2>

              <div className="mt-6 space-y-4 text-sm leading-relaxed text-zinc-300 sm:text-base">
                <p>
                  Soy <strong className="font-semibold text-white">Antonio «Tony» Otero</strong> (Pixel Tattoo). Trabajo desde Montevideo especializado en <strong className="font-semibold text-white">realismo en negro y grises</strong>, retratos cinematográficos, piezas a todo color, coberturas y tatuajes de fútbol con nivel quirúrgico —desde escudos efecto parche bordado hilo por hilo hasta composiciones de espalda completa.
                </p>
                <p>
                  Cada tatuaje se diseña respetando el flujo natural de tu cuerpo para evitar el efecto parche suelto. Lo más importante para mí no es solo cómo se ve el tatuaje recién terminado, sino cómo queda <strong className="font-semibold text-white">curado al 100% meses o años después</strong>.
                </p>
              </div>

              {/* Tempel Tattoo Studio Box */}
              <div className="mt-8 border border-zinc-800 bg-[#121215] p-6">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-zinc-800 pb-4">
                  <div>
                    <p className="font-mono text-xs text-[#F7C600]">{ARTIST_INFO.studioHandle}</p>
                    <h3 className="mt-1 font-display text-xl font-bold text-white">
                      {ARTIST_INFO.studioName}
                    </h3>
                  </div>
                  <span className="font-mono text-xs text-zinc-400">
                    Centro · Montevideo
                  </span>
                </div>

                <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 text-sm">
                  <div className="flex items-start gap-3">
                    <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#F7C600]" aria-hidden="true" />
                    <div>
                      <p className="font-medium text-white">{ARTIST_INFO.address}</p>
                      <p className="text-xs text-zinc-400">
                        {ARTIST_INFO.neighborhood}, {ARTIST_INFO.country} · Acceso directo desde Cordón, Ciudad Vieja y Pocitos
                      </p>
                      <a
                        href="https://maps.google.com/?q=Rondeau+1394,+Montevideo,+Uruguay"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-1 inline-block font-mono text-[11px] text-[#F7C600] hover:underline"
                      >
                        Ver en Google Maps
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Clock className="mt-0.5 h-4 w-4 shrink-0 text-[#F7C600]" aria-hidden="true" />
                    <div>
                      <p className="font-medium text-white">{ARTIST_INFO.hours}</p>
                      <p className="text-xs text-zinc-400">Atención con cita previa</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-[#F7C600]" aria-hidden="true" />
                    <div>
                      <p className="font-medium text-white">Higiene hospitalaria</p>
                      <p className="text-xs text-zinc-400">
                        Cartuchos descartables e iluminación CRI 95
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Phone className="mt-0.5 h-4 w-4 shrink-0 text-[#F7C600]" aria-hidden="true" />
                    <div>
                      <p className="font-medium font-mono tabular-nums text-white">
                        {ARTIST_INFO.whatsappDisplay}
                      </p>
                      <p className="text-xs text-zinc-400">
                        Estudio: <span className="font-mono tabular-nums">{ARTIST_INFO.studioWhatsappDisplay}</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* FAQ Accordion */}
            <div className="mt-10">
              <h3 className="font-display text-lg font-bold text-white">
                Preguntas frecuentes antes de tatuarte
              </h3>
              <div className="mt-4 divide-y divide-zinc-800 border-y border-zinc-800">
                {FAQ_ITEMS.map((item, idx) => {
                  const isOpen = openFaqIdx === idx;
                  return (
                    <div key={item.q}>
                      <button
                        type="button"
                        aria-expanded={isOpen}
                        onClick={() => setOpenFaqIdx(isOpen ? null : idx)}
                        className="flex min-h-[52px] w-full items-center justify-between gap-4 py-3.5 text-left text-sm font-semibold text-zinc-100 transition-colors hover:text-[#F7C600] focus-visible:outline-2 focus-visible:outline-[#F7C600]"
                      >
                        <span>{item.q}</span>
                        <ChevronDown
                          className={`h-4 w-4 shrink-0 text-[#F7C600] transition-transform duration-200 ${
                            isOpen ? 'rotate-180' : ''
                          }`}
                          aria-hidden="true"
                        />
                      </button>
                      {isOpen && (
                        <div className="pb-4 pr-6 text-sm leading-relaxed text-zinc-400">
                          {item.a}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
