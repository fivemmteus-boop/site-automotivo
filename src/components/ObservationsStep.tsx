import React from 'react';
import { MessageSquare, Sparkles, ArrowLeft, ArrowRight } from 'lucide-react';
import { BookingData } from '../types';

interface ObservationsStepProps {
  bookingData: BookingData;
  onChange: (updates: Partial<BookingData>) => void;
  onNext: () => void;
  onPrev: () => void;
}

const COMMON_SUGGESTIONS = [
  'Remover manchas dos bancos',
  'Tenho riscos na pintura',
  'Quero fazer uma avaliação',
  'Odor interno forte / pet',
  'Limpeza de motor',
  'Faróis amarelados',
  'Carro para venda (preparação)'
];

export const ObservationsStep: React.FC<ObservationsStepProps> = ({
  bookingData,
  onChange,
  onNext,
  onPrev,
}) => {
  const handleAddSuggestion = (text: string) => {
    const current = bookingData.observations.trim();
    if (!current) {
      onChange({ observations: text });
    } else if (!current.includes(text)) {
      onChange({ observations: `${current}, ${text.toLowerCase()}` });
    }
  };

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div className="text-center space-y-2">
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-100 tracking-tight">
          Observações sobre o Veículo
        </h2>
        <p className="text-slate-400 text-sm sm:text-base">
          Tem algum detalhe específico que devemos prestar atenção especial?
        </p>
      </div>

      <div className="bg-slate-900/60 border border-slate-800 p-6 sm:p-8 rounded-2xl space-y-5 shadow-xl">
        <div className="space-y-2">
          <label className="block text-sm font-bold text-slate-200 flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-amber-400" />
            Alguma observação sobre o veículo?
          </label>
          <p className="text-xs text-slate-400">
            Campo opcional, mas muito útil para nossa equipe já separar os produtos e equipamentos certos.
          </p>

          <textarea
            rows={5}
            value={bookingData.observations}
            onChange={(e) => onChange({ observations: e.target.value })}
            placeholder="Ex.: Preciso remover manchas dos bancos, tenho riscos na pintura, quero fazer uma avaliação..."
            className="w-full p-4 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/30 text-sm resize-y leading-relaxed"
          />
        </div>

        {/* Quick Suggestion Chips */}
        <div className="space-y-2 pt-2 border-t border-slate-800/80">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wide flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" /> Toque para adicionar rapidamente:
          </span>
          <div className="flex flex-wrap gap-2">
            {COMMON_SUGGESTIONS.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => handleAddSuggestion(item)}
                className="px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 hover:border-amber-400/50 hover:text-amber-300 text-slate-300 text-xs transition-colors cursor-pointer"
              >
                + {item}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Navigation footer */}
      <div className="flex items-center justify-between pt-2">
        <button
          type="button"
          onClick={onPrev}
          className="flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-sm tracking-wide text-slate-300 hover:text-white bg-slate-900 border border-slate-800 hover:border-slate-700 transition-all cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Voltar</span>
        </button>

        <button
          type="button"
          onClick={onNext}
          className="flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm tracking-wide uppercase transition-all duration-200 shadow-lg bg-amber-400 hover:bg-amber-300 text-slate-950 shadow-amber-500/20 hover:shadow-amber-500/30 cursor-pointer active:scale-[0.99]"
        >
          <span>Conferir Resumo</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
