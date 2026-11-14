import { motion, useReducedMotion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import { buildWhatsAppHref, type TattooPreferenceState } from '../data/tattooData';

interface WhatsAppFabProps {
  preference: TattooPreferenceState;
}

export function WhatsAppFab({ preference }: WhatsAppFabProps) {
  const shouldReduceMotion = useReducedMotion();
  const href = buildWhatsAppHref(preference);

  const activeSummary = preference.reference
    ? `${preference.styleChoice} · ${preference.reference.title}`
    : preference.styleChoice;

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Consultar por WhatsApp sobre ${activeSummary}`}
      title={`Enviar consulta por WhatsApp (${activeSummary})`}
      initial={shouldReduceMotion ? false : { opacity: 0, y: 18, scale: 0.94 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.45, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className="pixel-btn fixed right-5 bottom-5 z-40 inline-flex h-12 items-center gap-2.5 bg-[#F7C600] px-4 text-xs font-semibold tracking-wide text-black shadow-lg shadow-black/50 hover:text-black focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F7C600] sm:right-7 sm:bottom-7 sm:px-5"
    >
      <MessageCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
      <span className="whitespace-nowrap shrink-0">WhatsApp</span>
      <span className="hidden max-w-[190px] truncate font-normal text-black/75 md:inline">
        · {preference.styleChoice}
      </span>
    </motion.a>
  );
}
