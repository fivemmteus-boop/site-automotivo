import React, { useState } from 'react';
import { X, Plus, RotateCcw, Clock, Trash2 } from 'lucide-react';
import { DEFAULT_HOURS } from '../data/servicesData';

interface AdminSlotsModalProps {
  isOpen: boolean;
  onClose: () => void;
  availableHours: string[];
  onUpdateHours: (hours: string[]) => void;
}

export const AdminSlotsModal: React.FC<AdminSlotsModalProps> = ({
  isOpen,
  onClose,
  availableHours,
  onUpdateHours,
}) => {
  const [newTime, setNewTime] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleAddSlot = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = newTime.trim();
    if (!clean) return;

    // Check HH:MM format
    const match = clean.match(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/);
    if (!match) {
      setError('Formato inválido. Use HH:MM (ex.: 08:30 ou 14:00)');
      return;
    }

    // Format to 2-digit hour
    const [h, m] = clean.split(':');
    const formatted = `${h.padStart(2, '0')}:${m}`;

    if (availableHours.includes(formatted)) {
      setError('Esse horário já está na lista.');
      return;
    }

    const updated = [...availableHours, formatted].sort();
    onUpdateHours(updated);
    setNewTime('');
    setError('');
  };

  const handleRemoveSlot = (slotToRemove: string) => {
    const updated = availableHours.filter((s) => s !== slotToRemove);
    onUpdateHours(updated);
  };

  const handleResetDefaults = () => {
    if (window.confirm('Deseja restaurar os horários padrão da oficina?')) {
      onUpdateHours([...DEFAULT_HOURS]);
      setError('');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
      <div className="bg-slate-900 border border-slate-700 w-full max-w-md rounded-2xl p-6 shadow-2xl space-y-5">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2 text-slate-100 font-bold text-lg">
            <Clock className="w-5 h-5 text-amber-400" />
            <h3>Configurar Horários de Atendimento</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-xs text-slate-400 leading-relaxed">
          Gerencie os horários exibidos aos clientes para agendamento. As alterações são salvas automaticamente no sistema.
        </p>

        {/* Add slot form */}
        <form onSubmit={handleAddSlot} className="space-y-2">
          <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wide">
            Adicionar Novo Horário
          </label>
          <div className="flex gap-2">
            <input
              type="time"
              value={newTime}
              onChange={(e) => {
                setNewTime(e.target.value);
                setError('');
              }}
              placeholder="09:30"
              className="flex-1 px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-slate-100 text-sm focus:outline-none focus:border-amber-400"
            />
            <button
              type="submit"
              className="px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-sm flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              Adicionar
            </button>
          </div>
          {error && <p className="text-xs text-red-400">{error}</p>}
        </form>

        {/* Current slots list */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wide">
              Horários Ativos ({availableHours.length})
            </span>
            <button
              type="button"
              onClick={handleResetDefaults}
              className="text-xs text-slate-400 hover:text-amber-400 flex items-center gap-1 transition-colors"
            >
              <RotateCcw className="w-3 h-3" /> Restaurar Padrão
            </button>
          </div>

          <div className="grid grid-cols-3 gap-2 max-h-52 overflow-y-auto pr-1">
            {availableHours.map((slot) => (
              <div
                key={slot}
                className="flex items-center justify-between px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-xs font-mono font-medium text-slate-200"
              >
                <span>{slot}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveSlot(slot)}
                  title="Remover horário"
                  className="text-slate-500 hover:text-red-400 transition-colors p-0.5"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-slate-800 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-semibold transition-colors"
          >
            Concluir
          </button>
        </div>
      </div>
    </div>
  );
};
