import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, ExternalLink, Film, Image as ImageIcon, MessageSquarePlus, X } from 'lucide-react';
import type { TattooWork } from '../data/tattooData';

interface LightboxModalProps {
  work: TattooWork | null;
  onClose: () => void;
  onPrevWork: () => void;
  onNextWork: () => void;
  onQuoteSimilar: (work: TattooWork) => void;
}

export function LightboxModal({
  work,
  onClose,
  onPrevWork,
  onNextWork,
  onQuoteSimilar,
}: LightboxModalProps) {
  const [mediaIdx, setMediaIdx] = useState(0);
  const [showVideo, setShowVideo] = useState(false);

  useEffect(() => {
    setMediaIdx(0);
    setShowVideo(false);
  }, [work?.id]);

  useEffect(() => {
    if (!work) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrevWork();
      if (e.key === 'ArrowRight') onNextWork();
    };
    document.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [work, onClose, onPrevWork, onNextWork]);

  if (!work) return null;

  const activePhoto = work.gallery[mediaIdx] || work.image;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={work.title}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/92 p-3 sm:p-6 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative flex max-h-[92vh] w-full max-w-6xl flex-col overflow-hidden border border-zinc-800 bg-[#0A0A0A] lg:grid lg:grid-cols-12"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Cerrar visor"
          className="absolute top-3 right-3 z-20 inline-flex h-11 w-11 items-center justify-center border border-zinc-700 bg-black/85 text-white transition-colors hover:border-[#F7C600] hover:text-[#F7C600] focus-visible:outline-2 focus-visible:outline-[#F7C600]"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Media Viewport */}
        <div className="relative flex flex-col justify-between bg-[#050505] lg:col-span-7">
          <div className="relative flex aspect-[4/4] sm:aspect-[4/3] lg:h-[72vh] lg:aspect-auto w-full items-center justify-center overflow-hidden bg-black">
            {showVideo && work.video ? (
              <video
                src={work.video}
                controls
                autoPlay
                loop
                playsInline
                className="h-full w-full object-contain"
              />
            ) : (
              <img
                src={activePhoto}
                alt={work.alt}
                referrerPolicy="no-referrer"
                className="h-full w-full object-contain"
              />
            )}

            {/* Work prev / next arrows */}
            <button
              type="button"
              onClick={onPrevWork}
              aria-label="Trabajo anterior"
              className="absolute left-3 top-1/2 -translate-y-1/2 inline-flex h-11 w-11 items-center justify-center border border-zinc-700 bg-black/75 text-white hover:border-[#F7C600] hover:text-[#F7C600]"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={onNextWork}
              aria-label="Siguiente trabajo"
              className="absolute right-3 top-1/2 -translate-y-1/2 inline-flex h-11 w-11 items-center justify-center border border-zinc-700 bg-black/75 text-white hover:border-[#F7C600] hover:text-[#F7C600]"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>

          {/* Multi-photo thumbnails / Video toggle */}
          {(work.gallery.length > 1 || work.video) && (
            <div className="flex items-center gap-2 overflow-x-auto border-t border-zinc-800 bg-[#0A0A0A] px-4 py-3">
              {work.gallery.map((src, idx) => (
                <button
                  key={src}
                  type="button"
                  onClick={() => {
                    setShowVideo(false);
                    setMediaIdx(idx);
                  }}
                  className={`relative h-14 w-14 shrink-0 overflow-hidden border transition-colors ${
                    !showVideo && mediaIdx === idx
                      ? 'border-[#F7C600]'
                      : 'border-zinc-800 opacity-65 hover:opacity-100'
                  }`}
                >
                  <img
                    src={src}
                    alt={`${work.title} vista ${idx + 1}`}
                    referrerPolicy="no-referrer"
                    className="h-full w-full object-cover"
                  />
                </button>
              ))}
              {work.video && (
                <button
                  type="button"
                  onClick={() => setShowVideo(true)}
                  className={`inline-flex h-14 shrink-0 items-center gap-2 border px-3 text-xs font-semibold transition-colors ${
                    showVideo
                      ? 'border-[#F7C600] bg-[#F7C600] text-black'
                      : 'border-zinc-700 bg-zinc-900 text-zinc-200 hover:border-[#F7C600]'
                  }`}
                >
                  <Film className="h-4 w-4" />
                  <span>Ver Reel</span>
                </button>
              )}
              {work.video && !showVideo && (
                <span className="ml-auto hidden sm:inline-flex items-center gap-1.5 text-xs text-zinc-400">
                  <ImageIcon className="h-3.5 w-3.5" />
                  <span>{work.gallery.length} foto{work.gallery.length > 1 ? 's' : ''}</span>
                </span>
              )}
            </div>
          )}
        </div>

        {/* Details Panel */}
        <div className="flex flex-col justify-between overflow-y-auto border-t border-zinc-800 p-6 sm:p-8 lg:col-span-5 lg:border-t-0 lg:border-l">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs tabular-nums text-[#F7C600]">
              <span>PIEZA {work.index}</span>
              <span aria-hidden="true" className="text-zinc-600">·</span>
              <span className="text-zinc-400">{work.year}</span>
            </div>

            <h3 className="mt-2 font-display text-2xl font-bold tracking-tight text-white sm:text-3xl [text-wrap:balance]">
              {work.title}
            </h3>

            <p className="mt-3 text-sm leading-relaxed text-zinc-300 sm:text-base">
              {work.description}
            </p>

            <dl className="mt-6 divide-y divide-zinc-800/80 border-y border-zinc-800/80 text-sm">
              <div className="flex items-center justify-between py-3">
                <dt className="text-zinc-400">Estilo</dt>
                <dd className="font-medium text-white">{work.styleLabel}</dd>
              </div>
              <div className="flex items-center justify-between py-3">
                <dt className="text-zinc-400">Zona anatómica</dt>
                <dd className="font-medium text-white">{work.placement}</dd>
              </div>
              <div className="flex items-center justify-between py-3">
                <dt className="text-zinc-400">Sesión</dt>
                <dd className="font-medium text-zinc-200">{work.duration}</dd>
              </div>
              <div className="flex items-center justify-between py-3">
                <dt className="text-zinc-400">Estado</dt>
                <dd className="font-medium text-[#F7C600]">{work.healedStatus}</dd>
              </div>
            </dl>
          </div>

          <div className="mt-8 flex flex-col gap-3">
            <button
              type="button"
              onClick={() => onQuoteSimilar(work)}
              className="pixel-btn inline-flex min-h-[48px] w-full items-center justify-center gap-2 bg-[#F7C600] px-5 py-3 text-sm font-bold text-black hover:text-black focus-visible:outline-2 focus-visible:outline-[#F7C600]"
            >
              <MessageSquarePlus className="h-4 w-4" />
              <span>Cotizar pieza similar</span>
            </button>

            <a
              href={work.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[44px] w-full items-center justify-center gap-2 border border-zinc-700 px-4 py-2.5 text-sm font-medium text-zinc-200 transition-colors hover:border-[#F7C600] hover:text-[#F7C600]"
            >
              <span>Ver publicación en Instagram</span>
              <ExternalLink className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
