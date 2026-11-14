import { useEffect, useRef, useState, type MouseEvent } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Play, X, ZoomIn, ZoomOut } from 'lucide-react';
import type { TattooWork } from '../data/tattooData';

interface LightboxModalProps {
  work: TattooWork | null;
  currentIndex: number;
  totalWorks: number;
  onClose: () => void;
  onPrevWork: () => void;
  onNextWork: () => void;
  onQuoteSimilar: (work: TattooWork) => void;
}

export function LightboxModal({
  work,
  currentIndex,
  totalWorks,
  onClose,
  onPrevWork,
  onNextWork,
  onQuoteSimilar,
}: LightboxModalProps) {
  const [mediaIdx, setMediaIdx] = useState(0);
  const [showVideo, setShowVideo] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomOrigin, setZoomOrigin] = useState({ x: 50, y: 50 });
  const [imgLoaded, setImgLoaded] = useState(false);
  const [imgErrored, setImgErrored] = useState(false);

  const shouldReduceMotion = useReducedMotion();
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  const activePhoto = work ? work.gallery[mediaIdx] || work.image : '';

  useEffect(() => {
    setMediaIdx(0);
    setShowVideo(false);
    setIsZoomed(false);
    setZoomOrigin({ x: 50, y: 50 });
  }, [work?.id]);

  useEffect(() => {
    setImgLoaded(false);
    setImgErrored(false);
    setIsZoomed(false);
  }, [activePhoto]);

  useEffect(() => {
    if (!work) return;

    // Preload remaining gallery photos of current work for instant switching
    work.gallery.forEach((src) => {
      const preload = new Image();
      preload.src = src;
    });
  }, [work]);

  useEffect(() => {
    if (!work) return;

    previousFocusRef.current = document.activeElement as HTMLElement | null;
    const focusTimer = window.setTimeout(() => {
      closeButtonRef.current?.focus();
    }, 20);

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (isZoomed) {
          setIsZoomed(false);
        } else {
          onClose();
        }
      } else if (e.key === 'ArrowLeft') {
        onPrevWork();
      } else if (e.key === 'ArrowRight') {
        onNextWork();
      } else if ((e.key === 'z' || e.key === 'Z' || e.key === '+') && !showVideo && !imgErrored) {
        setIsZoomed((prev) => !prev);
      }
    };

    document.addEventListener('keydown', handleKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      window.clearTimeout(focusTimer);
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = prevOverflow;
      previousFocusRef.current?.focus?.();
    };
  }, [work, isZoomed, showVideo, imgErrored, onClose, onPrevWork, onNextWork]);

  const handleImageMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!isZoomed) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.min(100, Math.max(0, ((e.clientX - rect.left) / rect.width) * 100));
    const y = Math.min(100, Math.max(0, ((e.clientY - rect.top) / rect.height) * 100));
    setZoomOrigin({ x, y });
  };

  const handleToggleZoom = (e: MouseEvent<HTMLDivElement>) => {
    if (showVideo || imgErrored) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.min(100, Math.max(0, ((e.clientX - rect.left) / rect.width) * 100));
    const y = Math.min(100, Math.max(0, ((e.clientY - rect.top) / rect.height) * 100));
    setZoomOrigin({ x, y });
    setIsZoomed((prev) => !prev);
  };

  return (
    <AnimatePresence>
      {work && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={`Vista en alta resolución: ${work.title}`}
          initial={shouldReduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={shouldReduceMotion ? undefined : { opacity: 0 }}
          transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-3 sm:p-6 lg:p-8 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.98, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={shouldReduceMotion ? undefined : { opacity: 0, scale: 0.98, y: 8 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="relative flex max-h-[94vh] w-full max-w-6xl flex-col overflow-hidden bg-[#0A0A0C] lg:grid lg:grid-cols-12"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top-right action controls */}
            <div className="absolute top-4 right-4 z-20 flex items-center gap-2">
              {!showVideo && !imgErrored && (
                <button
                  type="button"
                  onClick={() => setIsZoomed((prev) => !prev)}
                  aria-label={isZoomed ? 'Alejar imagen' : 'Ampliar imagen en alta resolución'}
                  aria-pressed={isZoomed}
                  className={`inline-flex h-10 items-center gap-2 px-3 text-xs font-medium transition-colors focus-visible:outline-2 focus-visible:outline-[#F7C600] ${
                    isZoomed
                      ? 'bg-[#F7C600] text-black'
                      : 'bg-black/80 text-zinc-200 hover:text-[#F7C600]'
                  }`}
                >
                  {isZoomed ? (
                    <ZoomOut className="h-4 w-4" aria-hidden="true" />
                  ) : (
                    <ZoomIn className="h-4 w-4" aria-hidden="true" />
                  )}
                  <span className="hidden sm:inline">{isZoomed ? '1x' : 'Zoom 2x'}</span>
                </button>
              )}

              <button
                ref={closeButtonRef}
                type="button"
                onClick={onClose}
                aria-label="Cerrar visor"
                className="inline-flex h-10 w-10 items-center justify-center bg-black/80 text-zinc-200 transition-colors hover:text-[#F7C600] focus-visible:outline-2 focus-visible:outline-[#F7C600]"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* High-Resolution Media Viewport */}
            <div className="relative flex flex-col justify-between bg-[#050505] lg:col-span-8">
              <div
                onClick={handleToggleZoom}
                onMouseMove={handleImageMouseMove}
                className={`relative flex aspect-square sm:aspect-[4/3] lg:h-[78vh] lg:aspect-auto w-full items-center justify-center overflow-hidden bg-black ${
                  !showVideo && !imgErrored
                    ? isZoomed
                      ? 'cursor-zoom-out'
                      : 'cursor-zoom-in'
                    : ''
                }`}
              >
                {showVideo && work.video ? (
                  <video
                    src={work.video}
                    controls
                    autoPlay
                    loop
                    playsInline
                    onClick={(e) => e.stopPropagation()}
                    className="h-full w-full object-contain"
                  />
                ) : imgErrored ? (
                  <div className="flex h-full w-full flex-col items-center justify-center bg-[#0C0C0F] p-8 text-center">
                    <p className="font-display text-base font-semibold text-zinc-200">
                      {work.title}
                    </p>
                    <p className="mt-2 text-xs text-zinc-500">
                      No se pudo cargar la imagen en alta resolución.
                    </p>
                  </div>
                ) : (
                  <>
                    {!imgLoaded && (
                      <div
                        aria-hidden="true"
                        className="absolute inset-0 flex items-center justify-center bg-[#08080A]"
                      >
                        <span className="font-mono text-xs text-zinc-500">Cargando alta resolución...</span>
                      </div>
                    )}
                    <img
                      key={activePhoto}
                      src={activePhoto}
                      alt={work.alt}
                      decoding="async"
                      referrerPolicy="no-referrer"
                      onLoad={() => setImgLoaded(true)}
                      onError={() => {
                        setImgLoaded(true);
                        setImgErrored(true);
                      }}
                      style={
                        isZoomed
                          ? {
                              transform: 'scale(2)',
                              transformOrigin: `${zoomOrigin.x}% ${zoomOrigin.y}%`,
                            }
                          : undefined
                      }
                      className={`h-full w-full select-none object-contain transition-transform duration-150 ease-out ${
                        imgLoaded ? 'opacity-100' : 'opacity-0'
                      }`}
                    />
                  </>
                )}

                {/* Work prev / next arrows */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onPrevWork();
                  }}
                  aria-label="Trabajo anterior"
                  className="absolute left-3 top-1/2 -translate-y-1/2 inline-flex h-11 w-11 items-center justify-center bg-black/75 text-zinc-200 transition-colors hover:text-[#F7C600] focus-visible:outline-2 focus-visible:outline-[#F7C600]"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onNextWork();
                  }}
                  aria-label="Siguiente trabajo"
                  className="absolute right-3 top-1/2 -translate-y-1/2 inline-flex h-11 w-11 items-center justify-center bg-black/75 text-zinc-200 transition-colors hover:text-[#F7C600] focus-visible:outline-2 focus-visible:outline-[#F7C600]"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>

              {/* Multi-photo thumbnails / Video toggle */}
              {(work.gallery.length > 1 || work.video) && (
                <div className="flex items-center justify-between gap-4 bg-[#0A0A0C] px-5 py-3.5">
                  <div className="flex items-center gap-2.5 overflow-x-auto">
                    {work.gallery.map((src, idx) => (
                      <button
                        key={src}
                        type="button"
                        aria-label={`Ver foto ${idx + 1} de ${work.gallery.length}`}
                        onClick={() => {
                          setShowVideo(false);
                          setIsZoomed(false);
                          setMediaIdx(idx);
                        }}
                        className={`relative h-12 w-12 shrink-0 overflow-hidden transition-opacity focus-visible:outline-2 focus-visible:outline-[#F7C600] ${
                          !showVideo && mediaIdx === idx
                            ? 'ring-2 ring-[#F7C600] opacity-100'
                            : 'opacity-50 hover:opacity-90'
                        }`}
                      >
                        <img
                          src={src}
                          alt={`${work.title} — vista ${idx + 1}`}
                          referrerPolicy="no-referrer"
                          className="h-full w-full object-cover"
                        />
                      </button>
                    ))}
                    {work.video && (
                      <button
                        type="button"
                        onClick={() => {
                          setIsZoomed(false);
                          setShowVideo(true);
                        }}
                        className={`inline-flex h-12 shrink-0 items-center gap-1.5 px-4 text-xs font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-[#F7C600] ${
                          showVideo
                            ? 'bg-[#F7C600] text-black'
                            : 'bg-zinc-900 text-zinc-300 hover:text-white'
                        }`}
                      >
                        <Play className="h-3.5 w-3.5" aria-hidden="true" />
                        <span>Video</span>
                      </button>
                    )}
                  </div>

                  {!showVideo && work.gallery.length > 1 && (
                    <span className="hidden font-mono text-xs tabular-nums text-zinc-500 sm:inline whitespace-nowrap shrink-0">
                      Foto {mediaIdx + 1} / {work.gallery.length}
                    </span>
                  )}
                </div>
              )}
            </div>

            {/* Editorial Details Panel */}
            <div className="flex flex-col justify-between overflow-y-auto p-6 sm:p-8 lg:col-span-4">
              <div>
                <div className="flex items-center gap-2 font-mono text-xs tabular-nums text-zinc-500">
                  <span>
                    {currentIndex + 1} / {totalWorks}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span>{work.year}</span>
                </div>

                <h3 className="mt-3 font-display text-2xl font-bold tracking-tight text-white [text-wrap:balance]">
                  {work.title}
                </h3>

                <p className="mt-3 text-sm leading-relaxed text-zinc-400">{work.alt}</p>

                <div className="mt-8 space-y-4 border-t border-zinc-900 pt-6 text-sm">
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
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
