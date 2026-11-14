import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
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
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4 sm:p-8 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative flex max-h-[92vh] w-full max-w-5xl flex-col overflow-hidden bg-[#0A0A0C] lg:grid lg:grid-cols-12"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Cerrar visor"
          className="absolute top-4 right-4 z-20 inline-flex h-10 w-10 items-center justify-center bg-black/75 text-zinc-300 transition-colors hover:text-[#F7C600] focus-visible:outline-2 focus-visible:outline-[#F7C600]"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Media Viewport */}
        <div className="relative flex flex-col justify-between bg-[#050505] lg:col-span-8">
          <div className="relative flex aspect-square sm:aspect-[4/3] lg:h-[76vh] lg:aspect-auto w-full items-center justify-center overflow-hidden bg-black">
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
              className="absolute left-3 top-1/2 -translate-y-1/2 inline-flex h-10 w-10 items-center justify-center bg-black/70 text-zinc-200 transition-colors hover:text-[#F7C600]"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={onNextWork}
              aria-label="Siguiente trabajo"
              className="absolute right-3 top-1/2 -translate-y-1/2 inline-flex h-10 w-10 items-center justify-center bg-black/70 text-zinc-200 transition-colors hover:text-[#F7C600]"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>

          {/* Multi-photo thumbnails / Video toggle */}
          {(work.gallery.length > 1 || work.video) && (
            <div className="flex items-center gap-2.5 overflow-x-auto bg-[#0A0A0C] px-5 py-3.5">
              {work.gallery.map((src, idx) => (
                <button
                  key={src}
                  type="button"
                  onClick={() => {
                    setShowVideo(false);
                    setMediaIdx(idx);
                  }}
                  className={`relative h-12 w-12 shrink-0 overflow-hidden transition-opacity ${
                    !showVideo && mediaIdx === idx
                      ? 'ring-2 ring-[#F7C600] opacity-100'
                      : 'opacity-50 hover:opacity-90'
                  }`}
                >
                  <img
                    src={src}
                    alt={work.title}
                    referrerPolicy="no-referrer"
                    className="h-full w-full object-cover"
                  />
                </button>
              ))}
              {work.video && (
                <button
                  type="button"
                  onClick={() => setShowVideo(true)}
                  className={`inline-flex h-12 shrink-0 items-center px-4 text-xs font-semibold transition-colors ${
                    showVideo
                      ? 'bg-[#F7C600] text-black'
                      : 'bg-zinc-900 text-zinc-300 hover:text-white'
                  }`}
                >
                  Video
                </button>
              )}
            </div>
          )}
        </div>

        {/* Minimal Details Panel */}
        <div className="flex flex-col justify-between p-6 sm:p-8 lg:col-span-4">
          <div>
            <h3 className="font-display text-2xl font-bold tracking-tight text-white [text-wrap:balance]">
              {work.title}
            </h3>

            <div className="mt-6 space-y-4 text-sm">
              <div>
                <p className="text-xs text-zinc-500">Estilo</p>
                <p className="mt-0.5 text-zinc-200">{work.styleLabel}</p>
              </div>
              <div>
                <p className="text-xs text-zinc-500">Zona</p>
                <p className="mt-0.5 text-zinc-200">{work.placement}</p>
              </div>
            </div>
          </div>

          <div className="mt-10 flex flex-col gap-3">
            <button
              type="button"
              onClick={() => onQuoteSimilar(work)}
              className="pixel-btn inline-flex min-h-[46px] w-full items-center justify-center bg-[#F7C600] px-5 py-3 text-sm font-semibold text-black hover:text-black focus-visible:outline-2 focus-visible:outline-[#F7C600]"
            >
              <span>Cotizar idea similar</span>
            </button>

            <a
              href={work.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[44px] w-full items-center justify-center bg-zinc-900 px-4 py-2.5 text-sm font-medium text-zinc-300 transition-colors hover:bg-zinc-800 hover:text-white"
            >
              Ver en Instagram
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
