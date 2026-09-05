import React, { useState } from 'react';
import { 
  Calendar as CalendarIcon, 
  Clock, 
  ChevronLeft, 
  ChevronRight, 
  Check, 
  ArrowLeft, 
  ArrowRight,
  Settings,
  AlertCircle,
  Info
} from 'lucide-react';
import { BookingData } from '../types';
import { formatDatePortuguese } from '../utils/formatters';
import { AdminSlotsModal } from './AdminSlotsModal';

interface DateTimeStepProps {
  bookingData: BookingData;
  onChange: (updates: Partial<BookingData>) => void;
  onNext: () => void;
  onPrev: () => void;
  availableHours: string[];
  onUpdateHours: (hours: string[]) => void;
}

export const DateTimeStep: React.FC<DateTimeStepProps> = ({
  bookingData,
  onChange,
  onNext,
  onPrev,
  availableHours,
  onUpdateHours,
}) => {
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const [validationError, setValidationError] = useState('');

  // Current date boundary (today normalized to midnight)
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Calendar navigation state: default to selected date's month or current month
  const initialDate = bookingData.selectedDate ? new Date(bookingData.selectedDate + 'T12:00:00') : new Date();
  const [viewYear, setViewYear] = useState(initialDate.getFullYear());
  const [viewMonth, setViewMonth] = useState(initialDate.getMonth()); // 0-indexed

  // Month names in Portuguese
  const monthNames = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ];

  const daysOfWeek = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

  // Calculate calendar grid days
  const firstDayOfMonth = new Date(viewYear, viewMonth, 1).getDay();
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();

  const handlePrevMonth = () => {
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear(viewYear - 1);
    } else {
      setViewMonth(viewMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear(viewYear + 1);
    } else {
      setViewMonth(viewMonth + 1);
    }
  };

  const isDateDisabled = (day: number) => {
    const candidateDate = new Date(viewYear, viewMonth, day);
    candidateDate.setHours(0, 0, 0, 0);
    // Cannot select prior to today
    if (candidateDate < today) return true;
    return false;
  };

  const handleSelectDay = (day: number) => {
    if (isDateDisabled(day)) return;
    const yyyy = viewYear;
    const mm = String(viewMonth + 1).padStart(2, '0');
    const dd = String(day).padStart(2, '0');
    const dateStr = `${yyyy}-${mm}-${dd}`;
    onChange({ selectedDate: dateStr });
    setValidationError('');
  };

  const handleSelectHour = (hour: string) => {
    onChange({ selectedTime: hour });
    setValidationError('');
  };

  const handleContinue = () => {
    if (!bookingData.selectedDate) {
      setValidationError('Por favor, selecione uma data no calendário.');
      return;
    }
    if (!bookingData.selectedTime) {
      setValidationError('Por favor, escolha um dos horários disponíveis.');
      return;
    }
    onNext();
  };

  // Check if calendar view is at or before current month to disable previous button
  const canGoPrevMonth = viewYear > today.getFullYear() || (viewYear === today.getFullYear() && viewMonth > today.getMonth());

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <div className="text-center space-y-2">
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-100 tracking-tight">
          Escolha Data e Horário
        </h2>
        <p className="text-slate-400 text-sm sm:text-base">
          Selecione o dia do atendimento e em seguida o horário de sua preferência.
        </p>
      </div>

      {validationError && (
        <div className="p-3.5 rounded-xl bg-red-950/40 border border-red-500/50 text-red-300 text-sm flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
          <span>{validationError}</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* ETAPA 3 — CALENDÁRIO VISUAL MODERNO (7 cols) */}
        <div className="lg:col-span-7 bg-slate-900/60 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xl space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <CalendarIcon className="w-5 h-5 text-amber-400" />
              <span className="font-bold text-slate-100 text-base sm:text-lg">
                {monthNames[viewMonth]} <span className="text-slate-400 font-normal">{viewYear}</span>
              </span>
            </div>

            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={handlePrevMonth}
                disabled={!canGoPrevMonth}
                className={`p-1.5 rounded-lg border border-slate-800 transition-colors ${
                  canGoPrevMonth
                    ? 'hover:bg-slate-800 text-slate-200 cursor-pointer'
                    : 'text-slate-600 opacity-40 cursor-not-allowed'
                }`}
                title="Mês anterior"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={handleNextMonth}
                className="p-1.5 rounded-lg border border-slate-800 hover:bg-slate-800 text-slate-200 transition-colors cursor-pointer"
                title="Próximo mês"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Weekday headers */}
          <div className="grid grid-cols-7 text-center text-xs font-semibold text-slate-400 py-1 uppercase tracking-wider">
            {daysOfWeek.map((day, idx) => (
              <div key={day} className={idx === 0 ? 'text-amber-400/70' : ''}>
                {day}
              </div>
            ))}
          </div>

          {/* Days grid */}
          <div className="grid grid-cols-7 gap-1.5 sm:gap-2">
            {/* Empty slots for month starting offset */}
            {Array.from({ length: firstDayOfMonth }).map((_, i) => (
              <div key={`empty-${i}`} className="h-9 sm:h-11" />
            ))}

            {/* Month days */}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1;
              const yyyy = viewYear;
              const mm = String(viewMonth + 1).padStart(2, '0');
              const dd = String(day).padStart(2, '0');
              const dayStr = `${yyyy}-${mm}-${dd}`;
              
              const isSelected = bookingData.selectedDate === dayStr;
              const disabled = isDateDisabled(day);
              const isToday = 
                today.getFullYear() === yyyy &&
                today.getMonth() === viewMonth &&
                today.getDate() === day;

              const isSunday = new Date(viewYear, viewMonth, day).getDay() === 0;

              return (
                <button
                  key={day}
                  type="button"
                  disabled={disabled}
                  onClick={() => handleSelectDay(day)}
                  className={`h-9 sm:h-11 rounded-xl font-medium text-xs sm:text-sm flex flex-col items-center justify-center relative transition-all duration-150 ${
                    isSelected
                      ? 'bg-amber-400 text-slate-950 font-bold shadow-lg shadow-amber-500/25 ring-2 ring-amber-300'
                      : disabled
                      ? 'text-slate-600 bg-slate-950/40 cursor-not-allowed line-through opacity-40'
                      : 'text-slate-200 bg-slate-950/80 hover:bg-slate-800 border border-slate-800/80 hover:border-slate-700 cursor-pointer'
                  }`}
                >
                  <span>{day}</span>
                  {isToday && !isSelected && (
                    <span className="w-1 h-1 rounded-full bg-amber-400 absolute bottom-1" />
                  )}
                  {isSunday && !disabled && (
                    <span className="text-[9px] text-amber-500/80 font-normal leading-none -mt-0.5">
                      Plantão
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          <div className="pt-2 text-[11px] text-slate-400 flex flex-wrap items-center justify-between gap-2 border-t border-slate-800/60">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-amber-400" /> Hoje
            </span>
            <span className="text-slate-500">
              * Datas anteriores ao dia atual estão bloqueadas.
            </span>
          </div>
        </div>

        {/* ETAPA 4 — ESCOLHER HORÁRIO (5 cols) */}
        <div className="lg:col-span-5 bg-slate-900/60 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xl flex flex-col justify-between space-y-4">
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-amber-400" />
                <h3 className="font-bold text-slate-100 text-base">Horários Disponíveis</h3>
              </div>

              {/* Button to open Admin/Manager slots configuration */}
              <button
                type="button"
                onClick={() => setIsAdminModalOpen(true)}
                className="text-[11px] text-slate-400 hover:text-amber-400 flex items-center gap-1 p-1 hover:bg-slate-800 rounded transition-colors"
                title="Editar horários disponíveis (Administrador)"
              >
                <Settings className="w-3.5 h-3.5" />
                <span>Editar</span>
              </button>
            </div>

            {/* Date display confirmation */}
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 flex items-start gap-2">
              <Info className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
              <div>
                {bookingData.selectedDate ? (
                  <div>
                    <span className="text-slate-400">Data selecionada:</span>{' '}
                    <strong className="text-amber-400 block font-semibold text-xs sm:text-sm">
                      {formatDatePortuguese(bookingData.selectedDate)}
                    </strong>
                  </div>
                ) : (
                  <span className="text-slate-400">
                    Selecione uma data no calendário ao lado para ver os horários.
                  </span>
                )}
              </div>
            </div>

            {/* Time slots grid */}
            <div className="space-y-2">
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wide">
                Selecione o horário desejado:
              </label>

              {availableHours.length === 0 ? (
                <div className="text-center py-6 text-slate-400 text-xs">
                  Nenhum horário configurado no momento.
                </div>
              ) : (
                <div className="grid grid-cols-3 gap-2.5">
                  {availableHours.map((slot) => {
                    const isSelected = bookingData.selectedTime === slot;

                    return (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => handleSelectHour(slot)}
                        className={`py-2.5 px-2 rounded-xl text-xs sm:text-sm font-mono font-semibold transition-all duration-150 flex items-center justify-center gap-1.5 border ${
                          isSelected
                            ? 'bg-amber-400 text-slate-950 border-amber-400 shadow-md shadow-amber-500/20 ring-2 ring-amber-300'
                            : 'bg-slate-950 hover:bg-slate-800 text-slate-200 border-slate-800 hover:border-slate-700 cursor-pointer'
                        }`}
                      >
                        {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                        <span>{slot}</span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          <div className="pt-2 text-[11px] text-slate-400 bg-amber-500/5 p-3 rounded-xl border border-amber-500/10">
            <p className="leading-relaxed">
              ⚠️ <strong>Atenção:</strong> O horário selecionado será conferido e confirmado pela nossa equipe via WhatsApp.
            </p>
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
          onClick={handleContinue}
          className="flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm tracking-wide uppercase transition-all duration-200 shadow-lg bg-amber-400 hover:bg-amber-300 text-slate-950 shadow-amber-500/20 hover:shadow-amber-500/30 cursor-pointer active:scale-[0.99]"
        >
          <span>Avançar para Observações</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Admin slots configuration modal */}
      <AdminSlotsModal
        isOpen={isAdminModalOpen}
        onClose={() => setIsAdminModalOpen(false)}
        availableHours={availableHours}
        onUpdateHours={onUpdateHours}
      />
    </div>
  );
};
