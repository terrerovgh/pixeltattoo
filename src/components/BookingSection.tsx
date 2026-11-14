import { useEffect, useMemo, useState } from 'react';
import { Calendar, Check, Copy, MessageCircle, Sparkles, X } from 'lucide-react';
import { ARTIST_INFO, STUDIO_SCHEDULE, type StudioSlot, type TattooWork } from '../data/tattooData';

interface BookingSectionProps {
  selectedReference: TattooWork | null;
  onClearReference: () => void;
}

const STYLE_OPTIONS = [
  'Realismo Negro y Grises',
  'Pasión Aurinegra / Fútbol',
  'Full Color',
  'Cobertura (Cover-Up)',
  'Escudo Bordado 3D',
];

const PLACEMENT_OPTIONS = [
  'Antebrazo',
  'Brazo / Manga',
  'Pierna / Pantorrilla',
  'Espalda / Pecho',
  'Otra zona',
];

export function BookingSection({ selectedReference, onClearReference }: BookingSectionProps) {
  const firstAvailable = useMemo(
    () => STUDIO_SCHEDULE.find((s) => s.status !== 'Reservado')?.id || STUDIO_SCHEDULE[0].id,
    []
  );

  const [shiftFilter, setShiftFilter] = useState<'Todos' | 'Mañana' | 'Tarde'>('Todos');
  const [selectedSlotId, setSelectedSlotId] = useState<string>(firstAvailable);
  const [clientName, setClientName] = useState('');
  const [styleChoice, setStyleChoice] = useState(STYLE_OPTIONS[0]);
  const [placement, setPlacement] = useState(PLACEMENT_OPTIONS[0]);
  const [sizeCm, setSizeCm] = useState(18);
  const [ideaNotes, setIdeaNotes] = useState('');
  const [copied, setCopied] = useState(false);
  const [sentNotice, setSentNotice] = useState(false);

  // Sync style & placement when user clicks "Cotizar pieza similar" from Lightbox
  useEffect(() => {
    if (!selectedReference) return;
    if (selectedReference.style === 'realism') setStyleChoice('Realismo Negro y Grises');
    else if (selectedReference.style === 'futbol') setStyleChoice('Pasión Aurinegra / Fútbol');
    else if (selectedReference.style === 'color') setStyleChoice('Full Color');

    if (selectedReference.placement.toLowerCase().includes('espalda')) setPlacement('Espalda / Pecho');
    else if (selectedReference.placement.toLowerCase().includes('pierna') || selectedReference.placement.toLowerCase().includes('pantorrilla')) {
      setPlacement('Pierna / Pantorrilla');
    } else if (selectedReference.placement.toLowerCase().includes('antebrazo')) {
      setPlacement('Antebrazo');
    } else {
      setPlacement('Brazo / Manga');
    }
  }, [selectedReference]);

  const visibleSlots = useMemo(() => {
    if (shiftFilter === 'Todos') return STUDIO_SCHEDULE;
    return STUDIO_SCHEDULE.filter((slot) => slot.shift === shiftFilter);
  }, [shiftFilter]);

  const selectedSlot: StudioSlot | undefined = useMemo(
    () => STUDIO_SCHEDULE.find((s) => s.id === selectedSlotId),
    [selectedSlotId]
  );

  const whatsappMessage = useMemo(() => {
    const lines = [
      `Hola Tony! Te escribo desde la web de Pixel Tattoo.`,
      clientName.trim() ? `Nombre: ${clientName.trim()}` : null,
      `Estilo: ${styleChoice}`,
      `Zona: ${placement} (${sizeCm} cm aprox.)`,
      selectedSlot
        ? `Turno preferido: ${selectedSlot.dayLabel} · ${selectedSlot.shift} (${selectedSlot.timeRange})`
        : null,
      selectedReference
        ? `Referencia del portfolio: Pieza ${selectedReference.index} - ${selectedReference.title}`
        : null,
      ideaNotes.trim() ? `Idea / detalles: ${ideaNotes.trim()}` : null,
    ].filter(Boolean);

    return lines.join('\n');
  }, [clientName, styleChoice, placement, sizeCm, selectedSlot, selectedReference, ideaNotes]);

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
    <section id="turnos" className="bg-[#050505] py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="max-w-3xl">
          <div className="flex items-center gap-2.5 text-xs font-medium uppercase tracking-widest text-[#F7C600]">
            <span className="inline-block h-2 w-2 bg-[#F7C600]" aria-hidden="true" />
            <span>Agenda & Turnos Montevideo</span>
          </div>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl [text-wrap:balance]">
            Elegí un bloque disponible y cotizá directo por WhatsApp.
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-zinc-400 sm:text-base">
            Seleccioná el día y horario tentativo en Tempel Tattoo Studio ({ARTIST_INFO.address}) y armá tu consulta con zona y tamaño aproximado.
          </p>
        </div>

        {/* Main 2-column grid: Visual Schedule (Left) + WhatsApp Configurator (Right) */}
        <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-start">
          {/* Left: Visual Availability Calendar */}
          <div className="border border-zinc-800 bg-[#0A0A0A] p-5 sm:p-6 lg:col-span-6">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-zinc-800 pb-4">
              <div className="flex items-center gap-2.5">
                <Calendar className="h-4 w-4 text-[#F7C600]" aria-hidden="true" />
                <h3 className="font-display text-lg font-bold text-white">
                  Disponibilidad próxima
                </h3>
              </div>

              {/* Shift Filter */}
              <div className="flex items-center gap-1 bg-[#121215] p-1 border border-zinc-800">
                {(['Todos', 'Mañana', 'Tarde'] as const).map((shift) => (
                  <button
                    key={shift}
                    type="button"
                    onClick={() => setShiftFilter(shift)}
                    className={`min-h-[34px] px-3 text-xs font-semibold transition-colors whitespace-nowrap shrink-0 ${
                      shiftFilter === shift
                        ? 'bg-[#F7C600] text-black'
                        : 'text-zinc-400 hover:text-white'
                    }`}
                  >
                    {shift}
                  </button>
                ))}
              </div>
            </div>

            {/* Slots Grid */}
            <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {visibleSlots.map((slot) => {
                const isReserved = slot.status === 'Reservado';
                const isSelected = selectedSlotId === slot.id;

                return (
                  <button
                    key={slot.id}
                    type="button"
                    disabled={isReserved}
                    onClick={() => setSelectedSlotId(slot.id)}
                    aria-pressed={isSelected}
                    className={`relative flex flex-col justify-between border p-4 text-left transition-colors focus-visible:outline-2 focus-visible:outline-[#F7C600] ${
                      isReserved
                        ? 'cursor-not-allowed border-zinc-900 bg-[#0D0D0F] opacity-55'
                        : isSelected
                          ? 'border-[#F7C600] bg-[#161510]'
                          : 'border-zinc-800 bg-[#121215] hover:border-zinc-600'
                    }`}
                  >
                    {/* Selected pixel corner marker */}
                    {isSelected && (
                      <span
                        aria-hidden="true"
                        className="absolute top-0 right-0 h-2.5 w-2.5 bg-[#F7C600]"
                      />
                    )}

                    <div className="flex items-center justify-between gap-2">
                      <span className="font-display text-sm font-bold text-white">
                        {slot.dayLabel}
                      </span>
                      <span
                        className={`font-mono text-[11px] font-semibold ${
                          slot.status === 'Disponible'
                            ? 'text-[#F7C600]'
                            : slot.status === 'Último cupo'
                              ? 'text-amber-300'
                              : 'text-zinc-500'
                        }`}
                      >
                        {slot.status}
                      </span>
                    </div>

                    <div className="mt-2 font-mono text-xs tabular-nums text-zinc-300">
                      {slot.shift} · {slot.timeRange}
                    </div>

                    <p className="mt-2 text-xs text-zinc-400">
                      Ideal: {slot.recommendedFor}
                    </p>
                  </button>
                );
              })}
            </div>

            {/* Explicit Legend */}
            <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-zinc-800/80 pt-4 text-xs text-zinc-400">
              <span className="inline-flex items-center gap-2">
                <span className="h-2.5 w-2.5 bg-[#F7C600]" aria-hidden="true" />
                <span>Seleccionado / Disponible</span>
              </span>
              <span className="inline-flex items-center gap-2">
                <span className="h-2.5 w-2.5 bg-amber-300/70" aria-hidden="true" />
                <span>Último cupo</span>
              </span>
              <span className="inline-flex items-center gap-2">
                <span className="h-2.5 w-2.5 bg-zinc-700" aria-hidden="true" />
                <span>Reservado</span>
              </span>
            </div>
          </div>

          {/* Right: Guided Quote & WhatsApp Builder */}
          <div className="border border-zinc-800 bg-[#121215] p-5 sm:p-7 lg:col-span-6">
            {selectedReference && (
              <div className="mb-5 flex items-center justify-between gap-3 border border-[#F7C600]/60 bg-[#F7C600]/10 px-4 py-3 text-xs sm:text-sm">
                <div className="flex items-center gap-2 text-zinc-100">
                  <Sparkles className="h-4 w-4 shrink-0 text-[#F7C600]" aria-hidden="true" />
                  <span>
                    Referencia: <strong className="text-[#F7C600]">{selectedReference.title}</strong>
                  </span>
                </div>
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

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label htmlFor="client-name" className="block text-xs font-semibold uppercase tracking-wider text-zinc-300">
                  Tu nombre
                </label>
                <input
                  id="client-name"
                  type="text"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  placeholder="Ej. Matías Rodríguez"
                  className="mt-2 h-11 w-full border border-zinc-700 bg-[#0A0A0A] px-3.5 text-sm text-white placeholder:text-zinc-500 focus:border-[#F7C600] focus:outline-none"
                />
              </div>

              <div>
                <label htmlFor="tattoo-style" className="block text-xs font-semibold uppercase tracking-wider text-zinc-300">
                  Estilo
                </label>
                <select
                  id="tattoo-style"
                  value={styleChoice}
                  onChange={(e) => setStyleChoice(e.target.value)}
                  className="mt-2 h-11 w-full border border-zinc-700 bg-[#0A0A0A] px-3 text-sm text-white focus:border-[#F7C600] focus:outline-none"
                >
                  {STYLE_OPTIONS.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="tattoo-zone" className="block text-xs font-semibold uppercase tracking-wider text-zinc-300">
                  Zona del cuerpo
                </label>
                <select
                  id="tattoo-zone"
                  value={placement}
                  onChange={(e) => setPlacement(e.target.value)}
                  className="mt-2 h-11 w-full border border-zinc-700 bg-[#0A0A0A] px-3 text-sm text-white focus:border-[#F7C600] focus:outline-none"
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
                  <label htmlFor="tattoo-size" className="text-xs font-semibold uppercase tracking-wider text-zinc-300">
                    Tamaño aproximado
                  </label>
                  <span className="font-mono text-sm font-bold tabular-nums text-[#F7C600]">
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
                <div className="mt-1 flex justify-between font-mono text-[11px] tabular-nums text-zinc-500">
                  <span>5 cm (puntual)</span>
                  <span>20 cm (medio brazo)</span>
                  <span>45 cm (espalda/manga)</span>
                </div>
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="tattoo-idea" className="block text-xs font-semibold uppercase tracking-wider text-zinc-300">
                  Contame tu idea o si es cobertura
                </label>
                <textarea
                  id="tattoo-idea"
                  rows={3}
                  value={ideaNotes}
                  onChange={(e) => setIdeaNotes(e.target.value)}
                  placeholder="Ej. Retrato en negro y grises en el antebrazo externo, tengo fotos de referencia para mandar por chat."
                  className="mt-2 w-full border border-zinc-700 bg-[#0A0A0A] p-3.5 text-sm text-white placeholder:text-zinc-500 focus:border-[#F7C600] focus:outline-none"
                />
              </div>
            </div>

            {/* Live formatted WhatsApp preview */}
            <div className="mt-6 border border-zinc-800 bg-[#070708] p-4">
              <div className="flex items-center justify-between gap-2 text-xs text-zinc-400">
                <span>Mensaje preparado para WhatsApp</span>
                <span className="font-mono tabular-nums text-zinc-300">
                  {ARTIST_INFO.whatsappDisplay}
                </span>
              </div>
              <pre className="mt-2 whitespace-pre-wrap font-mono text-xs leading-relaxed text-zinc-300">
                {whatsappMessage}
              </pre>
            </div>

            {/* Actions */}
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setSentNotice(true)}
                className="pixel-btn inline-flex min-h-[48px] flex-1 items-center justify-center gap-2 bg-[#F7C600] px-5 py-3 text-sm font-bold text-black hover:text-black focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F7C600]"
              >
                <MessageCircle className="h-4 w-4" aria-hidden="true" />
                <span>Enviar consulta por WhatsApp</span>
              </a>

              <button
                type="button"
                onClick={handleCopy}
                className="inline-flex min-h-[48px] items-center justify-center gap-2 border border-zinc-700 px-4 py-3 text-sm font-semibold text-zinc-200 transition-colors hover:border-[#F7C600] hover:text-[#F7C600]"
              >
                {copied ? (
                  <>
                    <Check className="h-4 w-4 text-[#F7C600]" aria-hidden="true" />
                    <span className="text-[#F7C600]">Copiado</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4" aria-hidden="true" />
                    <span>Copiar texto</span>
                  </>
                )}
              </button>
            </div>

            {sentNotice && (
              <p className="mt-3 text-xs text-zinc-300">
                Se abrió WhatsApp con tu consulta lista. Si no tenés la app instalada, podés copiar el texto y enviarlo al{' '}
                <span className="font-mono text-[#F7C600]">{ARTIST_INFO.whatsappDisplay}</span>.
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
