import React from 'react';
import { Sparkles, MessageCircle, Phone, Clock, MapPin } from 'lucide-react';
import { OFFICIAL_WHATSAPP_DISPLAY, OFFICIAL_WHATSAPP_NUMBER } from '../data/servicesData';

export const Header: React.FC = () => {
  return (
    <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur-md sticky top-0 z-30">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
        {/* Brand identity */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br from-amber-400 via-amber-500 to-amber-600 p-[2px] shadow-lg shadow-amber-500/20 flex items-center justify-center">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-amber-400" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-extrabold text-base sm:text-xl tracking-wider text-slate-50 uppercase">
                Puro Brilho
              </h1>
              <span className="text-xs font-semibold px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20 uppercase tracking-wider">
                Detail Car
              </span>
            </div>
            <p className="text-xs text-slate-400 hidden sm:block">
              Estética Automotiva & Detalhamento de Alta Performance
            </p>
          </div>
        </div>

        {/* Quick contact badge */}
        <div className="flex items-center gap-3 text-xs sm:text-sm">
          <a
            href={`https://wa.me/${OFFICIAL_WHATSAPP_NUMBER}?text=Ol%C3%A1!%20Gostaria%20de%20saber%20mais%20sobre%20os%20servi%C3%A7os%20da%20Puro%20Brilho%20Detail%20Car.`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-900/40 hover:border-emerald-400/50 transition-all font-medium"
            title="Fale conosco pelo WhatsApp"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <MessageCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-400" />
            <span className="tracking-wide">{OFFICIAL_WHATSAPP_DISPLAY}</span>
          </a>
        </div>
      </div>
    </header>
  );
};
