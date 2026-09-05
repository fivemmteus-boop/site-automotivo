import React from 'react';
import { 
  CheckCircle2, 
  MessageCircle, 
  ArrowLeft, 
  User, 
  Car, 
  Calendar, 
  Clock, 
  MessageSquare, 
  Sparkles,
  AlertTriangle,
  Edit3
} from 'lucide-react';
import { BookingData, BookingStep } from '../types';
import { formatDatePortuguese, generateWhatsAppUrl, openWhatsApp } from '../utils/formatters';
import { OFFICIAL_WHATSAPP_DISPLAY } from '../data/servicesData';

interface SummaryStepProps {
  bookingData: BookingData;
  onPrev: () => void;
  onJumpToStep: (step: BookingStep) => void;
  onConfirmed: () => void;
}

export const SummaryStep: React.FC<SummaryStepProps> = ({
  bookingData,
  onPrev,
  onJumpToStep,
  onConfirmed,
}) => {
  const formattedDate = formatDatePortuguese(bookingData.selectedDate);
  const placa = bookingData.vehiclePlate.trim() ? bookingData.vehiclePlate.trim() : 'Não informada';
  const observacoes = bookingData.observations.trim()
    ? bookingData.observations.trim()
    : 'Nenhuma observação informada';

  let servicoFinal = bookingData.service;
  if (bookingData.service.includes('Outro serviço') && bookingData.customServiceDetails?.trim()) {
    servicoFinal = `${bookingData.service} (${bookingData.customServiceDetails.trim()})`;
  }

  const handleConfirmAndSend = () => {
    const url = generateWhatsAppUrl(bookingData);
    openWhatsApp(url);
    onConfirmed();
  };

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div className="text-center space-y-2">
        <span className="inline-block text-xs font-bold text-amber-400 uppercase tracking-widest px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/20">
          Último Passo
        </span>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-100 tracking-tight uppercase">
          CONFIRA SEU AGENDAMENTO
        </h2>
        <p className="text-slate-400 text-sm sm:text-base">
          Verifique todos os dados antes de prosseguir com o envio para nossa equipe.
        </p>
      </div>

      {/* Main summary card */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl divide-y divide-slate-800">
        {/* Serviço */}
        <div className="p-5 sm:p-6 flex items-start justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-amber-400/10 border border-amber-400/30 text-amber-400 flex items-center justify-center flex-shrink-0 mt-0.5">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-semibold uppercase text-slate-400 tracking-wider">
                Serviço escolhido
              </span>
              <h3 className="text-lg font-bold text-slate-100 mt-0.5">
                {servicoFinal}
              </h3>
              {bookingData.servicePrice && (
                <div className="mt-1 flex items-center gap-2 flex-wrap">
                  <span className="text-xs font-bold text-amber-400 bg-amber-400/10 px-2.5 py-0.5 rounded-full border border-amber-400/20">
                    Valor de referência: {bookingData.servicePrice}
                  </span>
                  <span className="text-[11px] text-slate-400 italic">
                    *Definido com exatidão após avaliação do veículo
                  </span>
                </div>
              )}
            </div>
          </div>
          <button
            type="button"
            onClick={() => onJumpToStep(1)}
            className="text-xs text-slate-400 hover:text-amber-400 flex items-center gap-1 transition-colors p-1"
            title="Alterar serviço"
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Alterar</span>
          </button>
        </div>

        {/* Cliente */}
        <div className="p-5 sm:p-6 flex items-start justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-slate-800 text-slate-200 flex items-center justify-center flex-shrink-0 mt-0.5">
              <User className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <span className="text-xs font-semibold uppercase text-slate-400 tracking-wider">
                Cliente
              </span>
              <p className="text-base font-bold text-slate-100 mt-0.5">
                {bookingData.clientName}
              </p>
              <p className="text-xs text-slate-400 font-mono mt-0.5">
                WhatsApp: {bookingData.clientWhatsapp}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => onJumpToStep(2)}
            className="text-xs text-slate-400 hover:text-amber-400 flex items-center gap-1 transition-colors p-1"
            title="Alterar dados do cliente"
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Alterar</span>
          </button>
        </div>

        {/* Veículo */}
        <div className="p-5 sm:p-6 flex items-start justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-slate-800 text-slate-200 flex items-center justify-center flex-shrink-0 mt-0.5">
              <Car className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <span className="text-xs font-semibold uppercase text-slate-400 tracking-wider">
                Veículo
              </span>
              <p className="text-base font-bold text-slate-100 mt-0.5">
                {bookingData.vehicleModel} — <span className="text-amber-400 font-medium">{bookingData.vehicleColor}</span>
              </p>
              {bookingData.vehiclePlate && (
                <p className="text-xs text-slate-400 font-mono mt-0.5">
                  Placa: <span className="text-slate-200 font-semibold">{bookingData.vehiclePlate}</span>
                </p>
              )}
            </div>
          </div>
          <button
            type="button"
            onClick={() => onJumpToStep(2)}
            className="text-xs text-slate-400 hover:text-amber-400 flex items-center gap-1 transition-colors p-1"
            title="Alterar veículo"
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Alterar</span>
          </button>
        </div>

        {/* Data & Horário */}
        <div className="p-5 sm:p-6 flex items-start justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-slate-800 text-slate-200 flex items-center justify-center flex-shrink-0 mt-0.5">
              <Calendar className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <span className="text-xs font-semibold uppercase text-slate-400 tracking-wider">
                Data & Horário
              </span>
              <p className="text-base font-bold text-slate-100 mt-0.5">
                {formattedDate}
              </p>
              <div className="flex items-center gap-1.5 text-xs text-amber-400 font-mono font-bold mt-1">
                <Clock className="w-3.5 h-3.5" />
                <span>Horário pretendido: {bookingData.selectedTime}</span>
              </div>
            </div>
          </div>
          <button
            type="button"
            onClick={() => onJumpToStep(3)}
            className="text-xs text-slate-400 hover:text-amber-400 flex items-center gap-1 transition-colors p-1"
            title="Alterar data ou horário"
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Alterar</span>
          </button>
        </div>

        {/* Observações */}
        <div className="p-5 sm:p-6 flex items-start justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-slate-800 text-slate-200 flex items-center justify-center flex-shrink-0 mt-0.5">
              <MessageSquare className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <span className="text-xs font-semibold uppercase text-slate-400 tracking-wider">
                Observações
              </span>
              <p className="text-sm text-slate-300 mt-1 leading-relaxed italic bg-slate-950/60 p-3 rounded-xl border border-slate-800">
                "{observacoes}"
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => onJumpToStep(4)}
            className="text-xs text-slate-400 hover:text-amber-400 flex items-center gap-1 transition-colors p-1"
            title="Alterar observações"
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Alterar</span>
          </button>
        </div>
      </div>

      {/* Regra Fundamental: SOLICITAÇÃO DE AGENDAMENTO E AVALIAÇÃO DE VALORES */}
      <div className="p-4 sm:p-5 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-start gap-3.5 shadow-lg">
        <AlertTriangle className="w-6 h-6 text-amber-400 flex-shrink-0 mt-0.5" />
        <div className="space-y-1">
          <h4 className="text-sm font-bold text-amber-300 uppercase tracking-wide">
            SOLICITAÇÃO DE AGENDAMENTO & AVALIAÇÃO
          </h4>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Ao clicar no botão abaixo, sua solicitação será gerada e enviada via WhatsApp para{' '}
            <strong className="text-amber-400 font-semibold">{OFFICIAL_WHATSAPP_DISPLAY}</strong>.
          </p>
          <p className="text-xs sm:text-sm text-amber-200/90 font-medium pt-1">
            📌 <strong>Confirmação de Horário e Orçamento:</strong> Os valores do catálogo são referenciais. A confirmação do horário e o valor definitivo são definidos após a avaliação do seu veículo pela nossa equipe pelo WhatsApp.
          </p>
        </div>
      </div>

      {/* Primary Action Button */}
      <div className="space-y-3 pt-2">
        <button
          type="button"
          onClick={handleConfirmAndSend}
          className="w-full py-4 px-6 rounded-2xl font-extrabold text-base sm:text-lg tracking-wide uppercase transition-all duration-200 shadow-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 flex items-center justify-center gap-3 cursor-pointer shadow-emerald-500/25 active:scale-[0.99]"
        >
          <MessageCircle className="w-6 h-6 fill-current" />
          <span>CONFIRMAR E ENVIAR PELO WHATSAPP</span>
        </button>

        <div className="flex items-center justify-between text-xs text-slate-400 px-1">
          <button
            type="button"
            onClick={onPrev}
            className="flex items-center gap-1 hover:text-white transition-colors cursor-pointer py-1"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Voltar e revisar</span>
          </button>
          <span className="text-slate-500">
            Abre o WhatsApp pronto para envio
          </span>
        </div>
      </div>
    </div>
  );
};
