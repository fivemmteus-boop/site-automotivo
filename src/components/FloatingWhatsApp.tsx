import React, { useState } from 'react';
import { MessageCircle } from 'lucide-react';
import { OFFICIAL_WHATSAPP_NUMBER } from '../data/servicesData';

export const FloatingWhatsApp: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);

  const message = 'Olá! Gostaria de saber mais sobre os serviços da Puro Brilho Detail Car.';
  const whatsappUrl = `https://api.whatsapp.com/send?phone=${OFFICIAL_WHATSAPP_NUMBER}&text=${encodeURIComponent(message)}`;

  return (
    <div className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-40 flex items-center gap-3">
      {/* Tooltip visible on hover / focus */}
      <div
        className={`hidden sm:flex items-center bg-slate-900/95 border border-emerald-500/40 text-emerald-400 text-xs font-semibold px-3 py-2 rounded-xl shadow-xl transition-all duration-200 pointer-events-none ${
          isHovered
            ? 'opacity-100 translate-x-0'
            : 'opacity-0 translate-x-2'
        }`}
      >
        <span>Fale conosco pelo WhatsApp</span>
      </div>

      {/* Floating button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        title="Fale conosco pelo WhatsApp"
        aria-label="Fale conosco pelo WhatsApp"
        className="group relative flex items-center justify-center w-14 h-14 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-2xl shadow-emerald-500/40 hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer"
      >
        {/* Pulsing beacon */}
        <span className="absolute -top-0.5 -right-0.5 flex h-3.5 w-3.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-80" />
          <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-400 ring-2 ring-slate-950" />
        </span>

        <MessageCircle className="w-7 h-7 fill-current stroke-none" />
      </a>
    </div>
  );
};
