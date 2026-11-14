import { useEffect, useMemo, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Check, X } from 'lucide-react';
import { ARTIST_INFO, type TattooWork } from '../data/tattooData';

interface BookingSectionProps {
  defaultStyle: string;
  selectedReference: TattooWork | null;
  onClearReference: () => void;
}

const STYLE_OPTIONS = [
  'Realismo en negro y grises',
  'Pasión Aurinegra',
  'Color',
  'Cobertura',
  'Escudo bordado',
];

const PLACEMENT_OPTIONS = [
  'Antebrazo',
  'Brazo o manga',
  'Pierna o pantorrilla',
  'Espalda o pecho',
  'Otra zona',
];

export function BookingSection({
  defaultStyle,
  selectedReference,
  onClearReference,
}: BookingSectionProps) {
  const [clientName, setClientName] = useState('');
  const [styleChoice, setStyleChoice] = useState(defaultStyle || STYLE_OPTIONS[0]);
  const [placement, setPlacement] = useState(PLACEMENT_OPTIONS[0]);
  const [sizeCm, setSizeCm] = useState(18);
  const [ideaNotes, setIdeaNotes] = useState('');
  const [copied, setCopied] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (!selectedReference && defaultStyle && STYLE_OPTIONS.includes(defaultStyle)) {
      setStyleChoice(defaultStyle);
    }
  }, [defaultStyle, selectedReference]);

  useEffect(() => {
    if (!selectedReference) return;
    if (selectedReference.style === 'realism') setStyleChoice('Realismo en negro y grises');
    else if (selectedReference.style === 'futbol') setStyleChoice('Pasión Aurinegra');
    else if (selectedReference.style === 'color') setStyleChoice('Color');

    const zone = selectedReference.placement.toLowerCase();
    if (zone.includes('espalda')) setPlacement('Espalda o pecho');
    else if (zone.includes('pierna') || zone.includes('pantorrilla')) {
      setPlacement('Pierna o pantorrilla');
    } else if (zone.includes('antebrazo')) {
      setPlacement('Antebrazo');
    } else {
      setPlacement('Brazo o manga');
    }
  }, [selectedReference]);

  const whatsappMessage = useMemo(() => {
    const lines = [
      'Hola Tony! Te escribo desde la web de Pixel Tattoo.',
      clientName.trim() ? `Nombre: ${clientName.trim()}` : null,
      `Estilo: ${styleChoice}`,
      `Zona: ${placement} (${sizeCm} cm aprox.)`,
      selectedReference ? `Referencia del portfolio: ${selectedReference.title}` : null,
      ideaNotes.trim() ? `Idea: ${ideaNotes.trim()}` : null,
    ].filter(Boolean);

    return lines.join('\n');
  }, [clientName, styleChoice, placement, sizeCm, selectedReference, ideaNotes]);

  const whatsappHref = useMemo(() => {
    return `${ARTIST_INFO.whatsappUrl}?text=${encodeURIComponent(whatsappMessage)}`;
  }, [whatsappMessage]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(whatsappMessage);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      setCopied(false);
    }
  };

  return (
    <section id="turnos" className="bg-[#050505] py-24 sm:py-32">
      <motion.div
        initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
        className="mx-auto max-w-3xl px-6 lg:px-10"
      >
        <div>
          <h2 className="font-display text-3xl font-bold tracking-tight text-white sm:text-4xl [text-wrap:balance]">
            Reservar turno
          </h2>
          <p className="mt-3 text-base leading-relaxed text-zinc-400">
            Completá los datos básicos de tu idea para abrir la conversación directa por WhatsApp.
          </p>
        </div>

        <div className="mt-10 bg-[#0C0C0F] p-6 sm:p-10">
          {selectedReference && (
            <div className="mb-8 flex items-center justify-between gap-4 bg-[#141418] px-4 py-3 text-sm">
              <span className="text-zinc-200">
                Referencia seleccionada: <strong className="font-semibold text-[#F7C600]">{selectedReference.title}</strong>
              </span>
              <button
                type="button"
                onClick={onClearReference}
                aria-label="Quitar referencia"
                className="inline-flex h-8 w-8 items-center justify-center text-zinc-400 hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          )}

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label htmlFor="client-name" className="block text-xs font-medium text-zinc-400">
                Nombre
              </label>
              <input
                id="client-name"
                type="text"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                placeholder="Tu nombre"
                className="mt-2 h-12 w-full bg-[#050505] px-4 text-sm text-white placeholder:text-zinc-600 focus:outline-1 focus:outline-[#F7C600]"
              />
            </div>

            <div>
              <label htmlFor="tattoo-style" className="block text-xs font-medium text-zinc-400">
                Estilo
              </label>
              <select
                id="tattoo-style"
                value={styleChoice}
                onChange={(e) => setStyleChoice(e.target.value)}
                className="mt-2 h-12 w-full bg-[#050505] px-4 text-sm text-white focus:outline-1 focus:outline-[#F7C600]"
              >
                {STYLE_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="tattoo-zone" className="block text-xs font-medium text-zinc-400">
                Zona del cuerpo
              </label>
              <select
                id="tattoo-zone"
                value={placement}
                onChange={(e) => setPlacement(e.target.value)}
                className="mt-2 h-12 w-full bg-[#050505] px-4 text-sm text-white focus:outline-1 focus:outline-[#F7C600]"
              >
                {PLACEMENT_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>

            <div className="sm:col-span-2">
              <div className="flex items-center justify-between">
                <label htmlFor="tattoo-size" className="text-xs font-medium text-zinc-400">
                  Tamaño aproximado
                </label>
                <span className="font-mono text-sm font-semibold tabular-nums text-[#F7C600]">
                  {sizeCm} cm
                </span>
              </div>
              <input
                id="tattoo-size"
                type="range"
                min={5}
                max={45}
                step={1}
                value={sizeCm}
                onChange={(e) => setSizeCm(Number(e.target.value))}
                className="mt-3 w-full accent-[#F7C600] cursor-pointer"
              />
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="tattoo-idea" className="block text-xs font-medium text-zinc-400">
                Detalles de tu idea
              </label>
              <textarea
                id="tattoo-idea"
                rows={3}
                value={ideaNotes}
                onChange={(e) => setIdeaNotes(e.target.value)}
                placeholder="Contame brevemente qué te gustaría tatuarte o si es una cobertura"
                className="mt-2 w-full bg-[#050505] p-4 text-sm text-white placeholder:text-zinc-600 focus:outline-1 focus:outline-[#F7C600]"
              />
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="pixel-btn inline-flex min-h-[48px] flex-1 items-center justify-center bg-[#F7C600] px-6 py-3 text-sm font-semibold text-black hover:text-black focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F7C600]"
            >
              <span>Enviar por WhatsApp</span>
            </a>

            <button
              type="button"
              onClick={handleCopy}
              className="inline-flex min-h-[48px] items-center justify-center gap-2 bg-[#141418] px-5 py-3 text-sm font-medium text-zinc-300 transition-colors hover:text-white"
            >
              {copied ? (
                <>
                  <Check className="h-4 w-4 text-[#F7C600]" aria-hidden="true" />
                  <span className="text-[#F7C600]">Copiado</span>
                </>
              ) : (
                <span>Copiar consulta</span>
              )}
            </button>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
