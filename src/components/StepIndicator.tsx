import React from 'react';
import { Check, Wrench, Car, Calendar, MessageSquare, ClipboardCheck } from 'lucide-react';
import { BookingStep } from '../types';

interface StepIndicatorProps {
  currentStep: BookingStep;
  onSelectStep: (step: BookingStep) => void;
  maxAccessibleStep: BookingStep;
}

export const StepIndicator: React.FC<StepIndicatorProps> = ({
  currentStep,
  onSelectStep,
  maxAccessibleStep
}) => {
  if (currentStep === 6) {
    return null; // Don't show step bar on success screen
  }

  const steps = [
    { id: 1 as BookingStep, label: 'Serviço', icon: Wrench },
    { id: 2 as BookingStep, label: 'Veículo', icon: Car },
    { id: 3 as BookingStep, label: 'Data & Hora', icon: Calendar },
    { id: 4 as BookingStep, label: 'Observações', icon: MessageSquare },
    { id: 5 as BookingStep, label: 'Resumo', icon: ClipboardCheck },
  ];

  return (
    <div className="w-full max-w-4xl mx-auto mb-8 px-2">
      {/* Mobile step label */}
      <div className="flex sm:hidden items-center justify-between mb-3 text-sm">
        <span className="text-amber-400 font-semibold uppercase tracking-wider text-xs">
          Etapa {currentStep} de 5
        </span>
        <span className="text-slate-300 font-medium">
          {steps.find((s) => s.id === currentStep)?.label}
        </span>
      </div>

      {/* Stepper bar */}
      <div className="relative flex items-center justify-between">
        {/* Progress connecting line */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-[2px] bg-slate-800 -z-0" />
        <div
          className="absolute left-0 top-1/2 -translate-y-1/2 h-[2px] bg-gradient-to-r from-amber-500 to-amber-400 -z-0 transition-all duration-300 ease-out"
          style={{
            width: `${((Math.min(currentStep, 5) - 1) / (steps.length - 1)) * 100}%`
          }}
        />

        {steps.map((step) => {
          const isCompleted = step.id < currentStep;
          const isCurrent = step.id === currentStep;
          const isClickable = step.id <= maxAccessibleStep;
          const Icon = step.icon;

          return (
            <button
              key={step.id}
              type="button"
              disabled={!isClickable}
              onClick={() => isClickable && onSelectStep(step.id)}
              className={`group flex flex-col items-center relative z-10 transition-all focus:outline-none ${
                isClickable ? 'cursor-pointer' : 'cursor-not-allowed opacity-60'
              }`}
            >
              <div
                className={`w-9 h-9 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center font-bold text-xs sm:text-sm transition-all duration-200 border ${
                  isCompleted
                    ? 'bg-amber-500 border-amber-400 text-slate-950 shadow-md shadow-amber-500/30'
                    : isCurrent
                    ? 'bg-slate-900 border-amber-400 text-amber-400 ring-4 ring-amber-500/20 shadow-lg'
                    : 'bg-slate-900 border-slate-700 text-slate-400'
                }`}
              >
                {isCompleted ? (
                  <Check className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.5]" />
                ) : (
                  <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                )}
              </div>

              <span
                className={`hidden sm:block text-xs font-semibold mt-2 tracking-wide transition-colors ${
                  isCurrent
                    ? 'text-amber-400'
                    : isCompleted
                    ? 'text-slate-200'
                    : 'text-slate-400'
                }`}
              >
                {step.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
