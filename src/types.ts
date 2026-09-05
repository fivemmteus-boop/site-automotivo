export interface ServiceItem {
  id: string;
  name: string;
  shortDesc: string;
  fullDesc: string;
  priceDisplay: string;
  priceType?: 'fixed' | 'startingAt' | 'custom';
  estimatedDuration: string;
  warranty?: string;
  bonus?: string;
  itemsIncluded?: string[];
  iconName: string;
  tag?: string;
  category?: 'destaques' | 'manutencao' | 'interior' | 'pintura' | 'especiais';
  isCustom?: boolean;
}

export interface BookingData {
  service: string;
  servicePrice?: string;
  customServiceDetails?: string;
  clientName: string;
  clientWhatsapp: string;
  vehicleModel: string;
  vehicleColor: string;
  vehiclePlate: string;
  selectedDate: string; // YYYY-MM-DD
  selectedTime: string; // HH:MM
  observations: string;
}

export type BookingStep = 1 | 2 | 3 | 4 | 5 | 6;
