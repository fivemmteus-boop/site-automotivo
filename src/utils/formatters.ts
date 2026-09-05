import { BookingData } from '../types';
import { OFFICIAL_WHATSAPP_NUMBER } from '../data/servicesData';

/**
 * Formats a Brazilian phone number mask (XX) 9XXXX-XXXX
 */
export function formatPhoneNumber(val: string): string {
  const digits = val.replace(/\D/g, '').slice(0, 11);
  if (digits.length <= 2) return digits;
  if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  if (digits.length <= 10) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
  }
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7, 11)}`;
}

/**
 * Formats Brazilian license plate (traditional ABC-1234 or Mercosul ABC1D23)
 */
export function formatPlate(val: string): string {
  const clean = val.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 7);
  if (clean.length > 3) {
    // If it's old format (3 letters + 4 numbers), add hyphen if wanted, or leave clean uppercase
    return `${clean.slice(0, 3)}-${clean.slice(3)}`;
  }
  return clean;
}

/**
 * Formats YYYY-MM-DD into readable date with day of the week in Portuguese
 */
export function formatDatePortuguese(dateStr: string): string {
  if (!dateStr) return '';
  const [year, month, day] = dateStr.split('-').map(Number);
  if (!year || !month || !day) return dateStr;
  
  const dateObj = new Date(year, month - 1, day, 12, 0, 0);
  
  const daysOfWeek = [
    'Domingo',
    'Segunda-feira',
    'Terça-feira',
    'Quarta-feira',
    'Quinta-feira',
    'Sexta-feira',
    'Sábado'
  ];

  const months = [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro'
  ];

  const dayOfWeek = daysOfWeek[dateObj.getDay()];
  const monthName = months[dateObj.getMonth()];
  const formattedPadDay = String(day).padStart(2, '0');
  const formattedPadMonth = String(month).padStart(2, '0');

  return `${formattedPadDay}/${formattedPadMonth}/${year} (${dayOfWeek})`;
}

/**
 * Generates the official WhatsApp message according to the exact template requested:
 * 
 * Olá, Puro Brilho Detail Car! 👋
 * 
 * Gostaria de realizar um agendamento.
 * 
 * 📋 *DADOS DO AGENDAMENTO*
 * 
 * 👤 Nome: [NOME]
 * 
 * 🚗 Veículo: [MODELO]
 * 🎨 Cor: [COR]
 * 🔖 Placa: [PLACA]
 * 
 * ✨ Serviço escolhido:
 * [SERVIÇO]
 * 
 * 📅 Data:
 * [DATA]
 * 
 * ⏰ Horário:
 * [HORÁRIO]
 * 
 * 📝 Observações:
 * [OBSERVAÇÕES]
 * 
 * Gostaria de confirmar a disponibilidade desse horário.
 * 
 * Obrigado!
 */
export function generateWhatsAppMessage(booking: BookingData): string {
  const formattedDate = formatDatePortuguese(booking.selectedDate);
  const placa = booking.vehiclePlate.trim() ? booking.vehiclePlate.trim() : 'Não informada';
  const observacoes = booking.observations.trim() ? booking.observations.trim() : 'Nenhuma observação adicional';
  
  let servicoFinal = booking.service;
  if (booking.servicePrice && booking.servicePrice !== 'Sob Avaliação') {
    servicoFinal += ` (${booking.servicePrice}*)`;
  }
  if (booking.service.includes('Outro serviço') && booking.customServiceDetails?.trim()) {
    servicoFinal = `${booking.service} (${booking.customServiceDetails.trim()})`;
  }

  return `Olá, Puro Brilho Detail Car! 👋

Gostaria de realizar um agendamento.

📋 *DADOS DO AGENDAMENTO*

👤 Nome: ${booking.clientName.trim()}
📱 WhatsApp do cliente: ${booking.clientWhatsapp.trim()}

🚗 Veículo: ${booking.vehicleModel.trim()}
🎨 Cor: ${booking.vehicleColor.trim()}
🔖 Placa: ${placa}

✨ Serviço escolhido:
${servicoFinal}
*(Valores do catálogo sujeitos a confirmação após avaliação do veículo)*

📅 Data:
${formattedDate}

⏰ Horário:
${booking.selectedTime}

📝 Observações:
${observacoes}

Gostaria de confirmar a disponibilidade desse horário e a avaliação do veículo.

Obrigado!`;
}

/**
 * Generates WhatsApp URL
 */
export function generateWhatsAppUrl(booking: BookingData): string {
  const message = generateWhatsAppMessage(booking);
  return `https://api.whatsapp.com/send?phone=${OFFICIAL_WHATSAPP_NUMBER}&text=${encodeURIComponent(message)}`;
}

/**
 * Helper to open WhatsApp link safely on both mobile and desktop
 */
export function openWhatsApp(url: string): void {
  const win = window.open(url, '_blank', 'noopener,noreferrer');
  if (!win || win.closed || typeof win.closed === 'undefined') {
    // Fallback if popup blocker intercepted
    window.location.href = url;
  }
}
