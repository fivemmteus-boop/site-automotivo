import React from 'react';
import { 
  CheckCircle2, 
  MessageCircle, 
  ArrowLeft, 
  ExternalLink, 
  Clock, 
  Car, 
  Calendar, 
  Sparkles,
  RotateCcw
} from 'lucide-react';
import { BookingData } from '../types';
import { formatDatePortuguese, generateWhatsAppUrl, openWhatsApp } from '../utils/formatters';
import { OFFICIAL_WHATSAPP_DISPLAY } from '../data/servicesData';

interface SuccessStepProps {
  bookingData: BookingData;
  onReset: () => void;
}

export const SuccessStep: React.FC<SuccessStepProps> = ({
  bookingData,
  onReset,
}) => {
  const handleReopenWhatsApp = () => {
    const url = generateWhatsAppUrl(bookingData);
    openWhatsApp(url);
  };

  return (
    <div className="max-w-xl mx-auto space-y-6 text-center animate-in fade-in zoom-in-95 duration-300">
      {/* Icon badge */}
      <div className="inline-flex p-4 rounded-3xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 shadow-2xl shadow-emerald-500/20">
        <CheckCircle2 className="w-16 h-16 stroke-[1.8]" />
      </div>

      <div className="space-y-3">
        <h2 className="text-3xl sm:text-4xl font-black text-slate-100 uppercase tracking-tight">
          AGENDAMENTO PREPARADO!
        </h2>
        <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-lg mx-auto">
          Seu pedido foi preparado e encaminhado para o WhatsApp da{' '}
          <strong className="text-amber-400 font-bold">Puro Brilho Detail Car</strong>. Agora é só enviar a mensagem para confirmar seu horário.
        </p>
      </div>

      {/* Confirmation alert */}
      <div className="p-4 rounded-2xl bg-slate-900/90 border border-amber-500/30 text-left space-y-2">
        <div className="flex items-center gap-2 text-amber-400 font-bold text-sm uppercase tracking-wide">
          <Clock className="w-4 h-4" />
          <span>Confirmação em Andamento</span>
        </div>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-medium">
          ⚠️ <strong>Importante:</strong> Esta é uma solicitação de agendamento.{' '}
          <span className="text-amber-300 font-semibold underline decoration-amber-500/50">
            Seu horário será confirmado pela nossa equipe pelo WhatsApp.
          </span>
        </p>
      </div>

      {/* Quick summary of what was booked */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4 sm:p-5 text-left text-xs space-y-2.5">
        <div className="text-xs uppercase font-bold text-slate-400 tracking-wider pb-1 border-b border-slate-800">
          Resumo da sua solicitação
        </div>
        <div className="grid grid-cols-2 gap-3 pt-1">
          <div>
            <span className="text-slate-500 block">Cliente:</span>
            <span className="font-semibold text-slate-200">{bookingData.clientName}</span>
          </div>
          <div>
            <span className="text-slate-500 block">Veículo:</span>
            <span className="font-semibold text-slate-200">
              {bookingData.vehicleModel} ({bookingData.vehicleColor})
            </span>
          </div>
          <div>
            <span className="text-slate-500 block">Serviço:</span>
            <span className="font-semibold text-amber-400 block">{bookingData.service}</span>
            {bookingData.servicePrice && (
              <span className="text-[11px] text-slate-400 block">
                Ref.: {bookingData.servicePrice}
              </span>
            )}
          </div>
          <div>
            <span className="text-slate-500 block">Data e Horário:</span>
            <span className="font-semibold text-slate-200">
              {formatDatePortuguese(bookingData.selectedDate).split(' ')[0]} às {bookingData.selectedTime}
            </span>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="space-y-3 pt-2">
        <button
          type="button"
          onClick={handleReopenWhatsApp}
          className="w-full py-3.5 px-6 rounded-xl font-bold text-sm text-emerald-400 bg-emerald-950/40 border border-emerald-500/40 hover:bg-emerald-900/40 flex items-center justify-center gap-2 transition-all cursor-pointer"
        >
          <MessageCircle className="w-4 h-4" />
          <span>A conversa não abriu? Clique para abrir o WhatsApp</span>
          <ExternalLink className="w-3.5 h-3.5 opacity-70" />
        </button>

        <button
          type="button"
          onClick={onReset}
          className="w-full py-4 px-6 rounded-xl font-extrabold text-sm uppercase tracking-wider bg-amber-400 hover:bg-amber-300 text-slate-950 shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 transition-all cursor-pointer active:scale-[0.99]"
        >
          <RotateCcw className="w-4 h-4" />
          <span>VOLTAR PARA O SITE</span>
        </button>
      </div>

      <p className="text-xs text-slate-500 pt-2">
        Atendimento oficial Puro Brilho: {OFFICIAL_WHATSAPP_DISPLAY}
      </p>
    </div>
  );
};
