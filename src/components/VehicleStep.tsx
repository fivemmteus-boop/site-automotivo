import React, { useState } from 'react';
import { User, Phone, Car, Palette, Hash, ArrowLeft, ArrowRight, AlertCircle } from 'lucide-react';
import { BookingData } from '../types';
import { COMMON_COLORS } from '../data/servicesData';
import { formatPhoneNumber, formatPlate } from '../utils/formatters';

interface VehicleStepProps {
  bookingData: BookingData;
  onChange: (updates: Partial<BookingData>) => void;
  onNext: () => void;
  onPrev: () => void;
}

export const VehicleStep: React.FC<VehicleStepProps> = ({
  bookingData,
  onChange,
  onNext,
  onPrev,
}) => {
  const [showErrors, setShowErrors] = useState(false);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value);
    onChange({ clientWhatsapp: formatted });
  };

  const handlePlateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPlate(e.target.value);
    onChange({ vehiclePlate: formatted });
  };

  const isNameValid = bookingData.clientName.trim().length >= 2;
  const isPhoneValid = bookingData.clientWhatsapp.replace(/\D/g, '').length >= 10;
  const isModelValid = bookingData.vehicleModel.trim().length >= 2;
  const isColorValid = bookingData.vehicleColor.trim().length >= 2;

  const isValid = isNameValid && isPhoneValid && isModelValid && isColorValid;

  const handleContinue = (e: React.FormEvent) => {
    e.preventDefault();
    if (isValid) {
      onNext();
    } else {
      setShowErrors(true);
    }
  };

  return (
    <form onSubmit={handleContinue} className="space-y-6 max-w-2xl mx-auto">
      <div className="text-center space-y-2">
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-100 tracking-tight">
          Dados do Cliente e Veículo
        </h2>
        <p className="text-slate-400 text-sm sm:text-base">
          Informe seus dados de contato e os detalhes do veículo para prepararmos o atendimento.
        </p>
      </div>

      <div className="bg-slate-900/60 border border-slate-800 p-6 sm:p-8 rounded-2xl space-y-6 shadow-xl">
        {/* Cliente Section */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-amber-400 uppercase tracking-wider flex items-center gap-2 pb-2 border-b border-slate-800">
            <User className="w-4 h-4" /> Informações de Contato
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Nome */}
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wide">
                Nome completo <span className="text-amber-400">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                  <User className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  value={bookingData.clientName}
                  onChange={(e) => onChange({ clientName: e.target.value })}
                  placeholder="Ex.: Matheus Henrique"
                  className={`w-full pl-10 pr-4 py-3 rounded-xl bg-slate-950 border text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-400/40 text-sm ${
                    showErrors && !isNameValid ? 'border-red-500/80 bg-red-950/10' : 'border-slate-800 focus:border-amber-400'
                  }`}
                />
              </div>
              {showErrors && !isNameValid && (
                <p className="text-xs text-red-400 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" /> Por favor, digite seu nome.
                </p>
              )}
            </div>

            {/* WhatsApp */}
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wide">
                Seu WhatsApp <span className="text-amber-400">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                  <Phone className="w-4 h-4" />
                </div>
                <input
                  type="tel"
                  value={bookingData.clientWhatsapp}
                  onChange={handlePhoneChange}
                  placeholder="(31) 98765-4321"
                  maxLength={15}
                  className={`w-full pl-10 pr-4 py-3 rounded-xl bg-slate-950 border text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-400/40 text-sm font-mono ${
                    showErrors && !isPhoneValid ? 'border-red-500/80 bg-red-950/10' : 'border-slate-800 focus:border-amber-400'
                  }`}
                />
              </div>
              {showErrors && !isPhoneValid && (
                <p className="text-xs text-red-400 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" /> Informe um WhatsApp com DDD válido.
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Veículo Section */}
        <div className="space-y-4 pt-2">
          <h3 className="text-sm font-bold text-amber-400 uppercase tracking-wider flex items-center gap-2 pb-2 border-b border-slate-800">
            <Car className="w-4 h-4" /> Detalhes do Veículo
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Modelo do Veículo */}
            <div className="space-y-1.5 sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wide">
                Modelo do veículo <span className="text-amber-400">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                  <Car className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  value={bookingData.vehicleModel}
                  onChange={(e) => onChange({ vehicleModel: e.target.value })}
                  placeholder="Ex.: Toyota Corolla Cross, Honda Civic G10, Jeep Compass..."
                  className={`w-full pl-10 pr-4 py-3 rounded-xl bg-slate-950 border text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-400/40 text-sm ${
                    showErrors && !isModelValid ? 'border-red-500/80 bg-red-950/10' : 'border-slate-800 focus:border-amber-400'
                  }`}
                />
              </div>
              {showErrors && !isModelValid && (
                <p className="text-xs text-red-400 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" /> Informe o modelo do seu carro.
                </p>
              )}
            </div>

            {/* Cor do Veículo */}
            <div className="space-y-2 sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wide">
                Cor do veículo <span className="text-amber-400">*</span>
              </label>

              {/* Quick color chips */}
              <div className="flex flex-wrap gap-2 mb-2">
                {COMMON_COLORS.map((color) => {
                  const isSelected = bookingData.vehicleColor.toLowerCase() === color.toLowerCase();
                  return (
                    <button
                      key={color}
                      type="button"
                      onClick={() => onChange({ vehicleColor: color })}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                        isSelected
                          ? 'bg-amber-400 border-amber-400 text-slate-950 font-semibold shadow-md'
                          : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700 hover:text-white'
                      }`}
                    >
                      {color}
                    </button>
                  );
                })}
              </div>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                  <Palette className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  value={bookingData.vehicleColor}
                  onChange={(e) => onChange({ vehicleColor: e.target.value })}
                  placeholder="Ou digite a cor exata (ex.: Cinza Chumbo, Azul Marinho, Branco Pérola...)"
                  className={`w-full pl-10 pr-4 py-3 rounded-xl bg-slate-950 border text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-400/40 text-sm ${
                    showErrors && !isColorValid ? 'border-red-500/80 bg-red-950/10' : 'border-slate-800 focus:border-amber-400'
                  }`}
                />
              </div>
              {showErrors && !isColorValid && (
                <p className="text-xs text-red-400 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" /> Informe a cor do veículo.
                </p>
              )}
            </div>

            {/* Placa do Veículo (Opcional) */}
            <div className="space-y-1.5 sm:col-span-2">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wide">
                  Placa do veículo
                </label>
                <span className="text-xs text-slate-500 italic">Opcional</span>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                  <Hash className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  value={bookingData.vehiclePlate}
                  onChange={handlePlateChange}
                  placeholder="Ex.: ABC-1234 ou BRA2E19"
                  maxLength={8}
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-950 border border-slate-800 focus:border-amber-400 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-400/40 text-sm font-mono tracking-wider uppercase"
                />
              </div>
              <p className="text-[11px] text-slate-500">
                A placa ajuda a nossa equipe a identificar rapidamente seu histórico e agilizar a entrada na oficina.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation buttons */}
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
          type="submit"
          className="flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm tracking-wide uppercase transition-all duration-200 shadow-lg bg-amber-400 hover:bg-amber-300 text-slate-950 shadow-amber-500/20 hover:shadow-amber-500/30 cursor-pointer active:scale-[0.99]"
        >
          <span>Escolher Data & Horário</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </form>
  );
};
