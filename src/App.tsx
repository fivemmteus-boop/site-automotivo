import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { StepIndicator } from './components/StepIndicator';
import { ServiceStep } from './components/ServiceStep';
import { VehicleStep } from './components/VehicleStep';
import { DateTimeStep } from './components/DateTimeStep';
import { ObservationsStep } from './components/ObservationsStep';
import { SummaryStep } from './components/SummaryStep';
import { SuccessStep } from './components/SuccessStep';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { BookingData, BookingStep } from './types';
import { DEFAULT_HOURS, DEFAULT_SERVICES } from './data/servicesData';
import { Shield, Sparkles, Award } from 'lucide-react';

const INITIAL_BOOKING: BookingData = {
  service: DEFAULT_SERVICES[0].name,
  servicePrice: DEFAULT_SERVICES[0].priceDisplay,
  customServiceDetails: '',
  clientName: '',
  clientWhatsapp: '',
  vehicleModel: '',
  vehicleColor: '',
  vehiclePlate: '',
  selectedDate: '',
  selectedTime: '',
  observations: '',
};

export default function App() {
  const [currentStep, setCurrentStep] = useState<BookingStep>(1);
  const [maxAccessibleStep, setMaxAccessibleStep] = useState<BookingStep>(1);
  const [bookingData, setBookingData] = useState<BookingData>(INITIAL_BOOKING);

  // Manage available hours with localStorage persistence for admin customization
  const [availableHours, setAvailableHours] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('puro_brilho_available_hours');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {
      // Fallback
    }
    return DEFAULT_HOURS;
  });

  const handleUpdateHours = (hours: string[]) => {
    setAvailableHours(hours);
    try {
      localStorage.setItem('puro_brilho_available_hours', JSON.stringify(hours));
    } catch (e) {
      console.error('Error saving hours to localStorage', e);
    }
  };

  const handleUpdateBooking = (updates: Partial<BookingData>) => {
    setBookingData((prev) => ({ ...prev, ...updates }));
  };

  const goToStep = (step: BookingStep) => {
    setCurrentStep(step);
    if (step > maxAccessibleStep) {
      setMaxAccessibleStep(step);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNext = () => {
    const nextStep = (currentStep + 1) as BookingStep;
    goToStep(nextStep);
  };

  const handlePrev = () => {
    const prevStep = Math.max(1, currentStep - 1) as BookingStep;
    setCurrentStep(prevStep);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleReset = () => {
    setBookingData(INITIAL_BOOKING);
    setCurrentStep(1);
    setMaxAccessibleStep(1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-amber-500 selection:text-slate-950">
      {/* Header with brand and direct WhatsApp link */}
      <Header />

      {/* Main content container */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-10">
        {/* Visual Step Indicator */}
        <StepIndicator
          currentStep={currentStep}
          onSelectStep={goToStep}
          maxAccessibleStep={maxAccessibleStep}
        />

        {/* Step Views */}
        <div className="mt-2">
          {currentStep === 1 && (
            <ServiceStep
              bookingData={bookingData}
              onChange={handleUpdateBooking}
              onNext={handleNext}
            />
          )}

          {currentStep === 2 && (
            <VehicleStep
              bookingData={bookingData}
              onChange={handleUpdateBooking}
              onNext={handleNext}
              onPrev={handlePrev}
            />
          )}

          {currentStep === 3 && (
            <DateTimeStep
              bookingData={bookingData}
              onChange={handleUpdateBooking}
              onNext={handleNext}
              onPrev={handlePrev}
              availableHours={availableHours}
              onUpdateHours={handleUpdateHours}
            />
          )}

          {currentStep === 4 && (
            <ObservationsStep
              bookingData={bookingData}
              onChange={handleUpdateBooking}
              onNext={handleNext}
              onPrev={handlePrev}
            />
          )}

          {currentStep === 5 && (
            <SummaryStep
              bookingData={bookingData}
              onPrev={handlePrev}
              onJumpToStep={goToStep}
              onConfirmed={() => goToStep(6)}
            />
          )}

          {currentStep === 6 && (
            <SuccessStep
              bookingData={bookingData}
              onReset={handleReset}
            />
          )}
        </div>

        {/* Footer trust badges (visible on pre-confirmation steps) */}
        {currentStep !== 6 && (
          <div className="mt-14 pt-8 border-t border-slate-900 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
            <div className="flex flex-col items-center space-y-1.5 p-3 rounded-xl bg-slate-900/30">
              <Sparkles className="w-5 h-5 text-amber-400" />
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
                Produtos Premium
              </h4>
              <p className="text-[11px] text-slate-400">
                Insumos importados de alta qualidade com pH equilibrado.
              </p>
            </div>

            <div className="flex flex-col items-center space-y-1.5 p-3 rounded-xl bg-slate-900/30">
              <Shield className="w-5 h-5 text-amber-400" />
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
                Cuidado & Segurança
              </h4>
              <p className="text-[11px] text-slate-400">
                Técnicas especializadas para preservar a originalidade do seu carro.
              </p>
            </div>

            <div className="flex flex-col items-center space-y-1.5 p-3 rounded-xl bg-slate-900/30">
              <Award className="w-5 h-5 text-amber-400" />
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
                Confirmação WhatsApp
              </h4>
              <p className="text-[11px] text-slate-400">
                Agendamento rápido com atendimento humanizado direto pelo WhatsApp.
              </p>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 py-6 text-center text-xs text-slate-500 bg-slate-950">
        <div className="max-w-5xl mx-auto px-4 space-y-1">
          <p className="font-semibold text-slate-400">
            Puro Brilho Detail Car — Estética Automotiva de Precisão
          </p>
          <p>
            WhatsApp Oficial: <span className="text-slate-300 font-mono">+55 31 8560-7376</span> • Ipatinga / MG
          </p>
          <p className="text-[11px] text-slate-500">
            Rua Mário de Andrade, 202, Cidade Nobre - Ipatinga/MG • Instagram: @puro.brilho
          </p>
          <p className="text-[10px] text-slate-600 pt-1">
            © {new Date().getFullYear()} Puro Brilho Detail Car. Todos os direitos reservados.
          </p>
        </div>
      </footer>

      {/* Persistent floating WhatsApp button on all views */}
      <FloatingWhatsApp />
    </div>
  );
}
