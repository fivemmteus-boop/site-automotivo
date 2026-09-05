import React, { useState, useMemo } from 'react';
import { 
  Sparkles, 
  ShieldCheck, 
  Flame, 
  Shield, 
  Armchair, 
  Award, 
  HelpCircle, 
  Check, 
  ArrowRight,
  Clock,
  AlertCircle,
  ChevronDown,
  ChevronUp,
  Search,
  CheckCircle2,
  Gift,
  Info
} from 'lucide-react';
import { ServiceItem, BookingData } from '../types';
import { DEFAULT_SERVICES, PRICE_DISCLAIMER_TEXT } from '../data/servicesData';

interface ServiceStepProps {
  bookingData: BookingData;
  onChange: (updates: Partial<BookingData>) => void;
  onNext: () => void;
}

const getServiceIcon = (iconName: string) => {
  switch (iconName) {
    case 'Sparkles':
      return Sparkles;
    case 'ShieldCheck':
      return ShieldCheck;
    case 'Flame':
      return Flame;
    case 'Shield':
      return Shield;
    case 'Armchair':
      return Armchair;
    case 'Award':
      return Award;
    case 'CheckCircle2':
      return CheckCircle2;
    default:
      return HelpCircle;
  }
};

type CategoryFilter = 'all' | 'destaques' | 'manutencao' | 'interior' | 'pintura' | 'especiais';

export const ServiceStep: React.FC<ServiceStepProps> = ({
  bookingData,
  onChange,
  onNext,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [expandedDetails, setExpandedDetails] = useState<Record<string, boolean>>({});

  const selectedServiceName = bookingData.service;

  const toggleDetails = (serviceId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setExpandedDetails((prev) => ({
      ...prev,
      [serviceId]: !prev[serviceId],
    }));
  };

  const handleSelectService = (service: ServiceItem) => {
    onChange({ 
      service: service.name,
      servicePrice: service.priceDisplay 
    });
  };

  const filteredServices = useMemo(() => {
    return DEFAULT_SERVICES.filter((svc) => {
      // Category filter
      if (selectedCategory !== 'all') {
        if (selectedCategory === 'destaques') {
          if (svc.category !== 'destaques' && svc.id !== 'limpeza-manutencao') {
            return false;
          }
        } else if (svc.category !== selectedCategory) {
          return false;
        }
      }

      // Search filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = svc.name.toLowerCase().includes(q);
        const matchesShort = svc.shortDesc.toLowerCase().includes(q);
        const matchesFull = svc.fullDesc.toLowerCase().includes(q);
        const matchesPrice = svc.priceDisplay.toLowerCase().includes(q);
        const matchesItems = svc.itemsIncluded?.some(item => item.toLowerCase().includes(q));
        return matchesName || matchesShort || matchesFull || matchesPrice || matchesItems;
      }

      return true;
    });
  }, [selectedCategory, searchQuery]);

  const isCustomSelected = selectedServiceName.includes('Outro serviço');

  return (
    <div className="space-y-6">
      {/* Title & subtitle */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span className="inline-block text-xs font-bold text-amber-400 uppercase tracking-widest px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/20">
          Catálogo Oficial de Preços
        </span>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-100 tracking-tight">
          Escolha o Serviço para o seu Carro
        </h2>
        <p className="text-slate-400 text-sm sm:text-base">
          Consulte nossa tabela de tratamentos com prazos, garantias e valores de referência.
        </p>
      </div>

      {/* AVISO OBRIGATÓRIO DE PREÇOS (AVALIAÇÃO DO VEÍCULO) */}
      <div 
        id="price-evaluation-disclaimer"
        className="p-4 sm:p-5 rounded-2xl bg-amber-500/10 border-2 border-amber-400/40 text-left shadow-lg shadow-amber-500/5 relative overflow-hidden"
      >
        <div className="flex items-start gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-amber-400/20 border border-amber-400/40 text-amber-400 flex items-center justify-center flex-shrink-0 mt-0.5">
            <AlertCircle className="w-5 h-5" />
          </div>
          <div className="space-y-1.5">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="text-sm sm:text-base font-extrabold text-amber-300 uppercase tracking-wide">
                Aviso Importante sobre os Valores
              </h3>
              <span className="text-[11px] font-semibold bg-amber-400/20 text-amber-300 px-2 py-0.5 rounded-full border border-amber-400/30">
                Tabela Referencial
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-normal">
              {PRICE_DISCLAIMER_TEXT}
            </p>
            <p className="text-[11px] sm:text-xs text-amber-300/90 font-medium">
              💡 <em>Fique tranquilo: no WhatsApp nossa equipe avalia as fotos ou agenda uma visita técnica sem compromisso!</em>
            </p>
          </div>
        </div>
      </div>

      {/* Search and Category Filters */}
      <div className="space-y-3">
        {/* Search bar */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar serviço (ex: polimento, bancos, ar condicionado, chassi, vitrificação...)"
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-400 text-sm"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-200"
            >
              Limpar
            </button>
          )}
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
          <button
            type="button"
            onClick={() => setSelectedCategory('all')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
              selectedCategory === 'all'
                ? 'bg-amber-400 text-slate-950 shadow-md shadow-amber-400/20 font-bold'
                : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
            }`}
          >
            Todos ({DEFAULT_SERVICES.length})
          </button>
          <button
            type="button"
            onClick={() => setSelectedCategory('destaques')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
              selectedCategory === 'destaques'
                ? 'bg-amber-400 text-slate-950 shadow-md shadow-amber-400/20 font-bold'
                : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
            }`}
          >
            ⭐ Destaques & Pacotes
          </button>
          <button
            type="button"
            onClick={() => setSelectedCategory('manutencao')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
              selectedCategory === 'manutencao'
                ? 'bg-amber-400 text-slate-950 shadow-md shadow-amber-400/20 font-bold'
                : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
            }`}
          >
            🧼 Lavagem & Manutenção
          </button>
          <button
            type="button"
            onClick={() => setSelectedCategory('interior')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
              selectedCategory === 'interior'
                ? 'bg-amber-400 text-slate-950 shadow-md shadow-amber-400/20 font-bold'
                : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
            }`}
          >
            🛋️ Interior & Estofados
          </button>
          <button
            type="button"
            onClick={() => setSelectedCategory('pintura')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
              selectedCategory === 'pintura'
                ? 'bg-amber-400 text-slate-950 shadow-md shadow-amber-400/20 font-bold'
                : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
            }`}
          >
            ✨ Polimento & Proteção
          </button>
          <button
            type="button"
            onClick={() => setSelectedCategory('especiais')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
              selectedCategory === 'especiais'
                ? 'bg-amber-400 text-slate-950 shadow-md shadow-amber-400/20 font-bold'
                : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
            }`}
          >
            🔧 Especiais (Motor/Chassi/Vidros)
          </button>
        </div>
      </div>

      {/* Services Grid */}
      {filteredServices.length === 0 ? (
        <div className="text-center py-10 bg-slate-900/40 rounded-2xl border border-slate-800 space-y-2">
          <p className="text-slate-300 font-medium">Nenhum serviço encontrado com esse termo.</p>
          <button
            type="button"
            onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }}
            className="text-xs text-amber-400 underline font-semibold cursor-pointer"
          >
            Ver todos os serviços do catálogo
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredServices.map((service: ServiceItem) => {
            const isSelected = selectedServiceName === service.name;
            const Icon = getServiceIcon(service.iconName);
            const isExpanded = !!expandedDetails[service.id];

            return (
              <div
                key={service.id}
                id={`service-card-${service.id}`}
                onClick={() => handleSelectService(service)}
                className={`group relative p-5 rounded-2xl border transition-all duration-200 cursor-pointer text-left flex flex-col justify-between ${
                  isSelected
                    ? 'bg-gradient-to-b from-amber-500/15 via-slate-900 to-slate-950 border-amber-400 ring-2 ring-amber-400/40 shadow-xl shadow-amber-500/10'
                    : 'bg-slate-900/70 hover:bg-slate-900/95 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div>
                  {/* Top Bar: Icon, Title & Select Checkbox */}
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-start gap-3">
                      <div
                        className={`w-11 h-11 rounded-xl flex items-center justify-center transition-colors flex-shrink-0 ${
                          isSelected
                            ? 'bg-amber-400 text-slate-950 font-bold shadow-md shadow-amber-400/30'
                            : 'bg-slate-800 text-amber-400 group-hover:bg-slate-700'
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="font-bold text-base sm:text-lg text-slate-100 group-hover:text-amber-400 transition-colors">
                            {service.name}
                          </h3>
                        </div>
                        {service.tag && (
                          <span className="inline-block text-[11px] font-bold text-amber-400 tracking-wide uppercase mt-0.5">
                            {service.tag}
                          </span>
                        )}
                      </div>
                    </div>

                    <div
                      className={`w-6 h-6 rounded-full border flex items-center justify-center flex-shrink-0 transition-all ${
                        isSelected
                          ? 'bg-amber-400 border-amber-400 text-slate-950'
                          : 'border-slate-700 group-hover:border-slate-500'
                      }`}
                    >
                      {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                    </div>
                  </div>

                  {/* Pricing Badge Block */}
                  <div className="my-3 p-3 rounded-xl bg-slate-950/70 border border-slate-800/80 flex items-center justify-between gap-2">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
                        Valor Referencial
                      </span>
                      <span className="text-base sm:text-lg font-extrabold text-amber-400 tracking-tight">
                        {service.priceDisplay}
                      </span>
                    </div>

                    <div className="text-right">
                      <span className="text-[10px] uppercase font-bold text-slate-500 block tracking-wider">
                        Prazo Estimado
                      </span>
                      <span className="text-xs sm:text-sm font-semibold text-slate-200 flex items-center justify-end gap-1">
                        <Clock className="w-3.5 h-3.5 text-amber-400/80" />
                        {service.estimatedDuration}
                      </span>
                    </div>
                  </div>

                  {/* Warranty & Bonus Tags */}
                  {(service.warranty || service.bonus) && (
                    <div className="flex flex-wrap gap-2 mb-3">
                      {service.warranty && (
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-300 bg-emerald-950/50 border border-emerald-500/30 px-2 py-0.5 rounded-md">
                          <ShieldCheck className="w-3 h-3 text-emerald-400" />
                          {service.warranty}
                        </span>
                      )}
                      {service.bonus && (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-300 bg-amber-950/40 border border-amber-500/30 px-2 py-0.5 rounded-md">
                          <Gift className="w-3 h-3 text-amber-400" />
                          {service.bonus}
                        </span>
                      )}
                    </div>
                  )}

                  {/* Short Description */}
                  <p className="text-xs sm:text-sm text-slate-300 mb-2 font-normal leading-relaxed">
                    {service.shortDesc}
                  </p>

                  {/* Expandable items included */}
                  {service.itemsIncluded && service.itemsIncluded.length > 0 && (
                    <div className="mt-2">
                      <button
                        type="button"
                        onClick={(e) => toggleDetails(service.id, e)}
                        className="text-xs font-semibold text-amber-400/90 hover:text-amber-300 flex items-center gap-1 py-1 transition-colors"
                      >
                        {isExpanded ? (
                          <>
                            <ChevronUp className="w-3.5 h-3.5" />
                            <span>Ocultar detalhes do serviço</span>
                          </>
                        ) : (
                          <>
                            <ChevronDown className="w-3.5 h-3.5" />
                            <span>Ver itens inclusos ({service.itemsIncluded.length} etapas)</span>
                          </>
                        )}
                      </button>

                      {isExpanded && (
                        <div className="mt-2 p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5 animate-in fade-in">
                          <p className="text-[11px] font-bold uppercase text-slate-400 tracking-wider mb-1">
                            O que está incluso neste tratamento:
                          </p>
                          <ul className="space-y-1 text-xs text-slate-300">
                            {service.itemsIncluded.map((item, idx) => (
                              <li key={idx} className="flex items-start gap-2">
                                <Check className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Card footer with selection callout */}
                <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
                  <span className="text-[11px] text-slate-500 italic">
                    *Valor final após avaliação técnica
                  </span>
                  <span className="text-amber-400 font-bold text-xs group-hover:translate-x-0.5 transition-transform flex items-center gap-1">
                    {isSelected ? '✓ Selecionado' : 'Selecionar Serviço →'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* If "Outro serviço" selected, provide optional specification */}
      {isCustomSelected && (
        <div className="p-4 rounded-xl bg-slate-900 border border-amber-400/40 space-y-2 animate-in fade-in shadow-lg">
          <label className="block text-sm font-semibold text-slate-200">
            Conte-nos brevemente o que você procura ou qual é a sua dúvida para nossa avaliação:
          </label>
          <input
            type="text"
            value={bookingData.customServiceDetails || ''}
            onChange={(e) => onChange({ customServiceDetails: e.target.value })}
            placeholder="Ex.: Gostaria de tirar riscos na porta direita, ou saber se o banco de tecido tem salvação..."
            className="w-full px-4 py-2.5 rounded-lg bg-slate-950 border border-slate-700 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-400 text-sm"
          />
        </div>
      )}

      {/* Selected service sticky/summary bar */}
      <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3 text-left w-full sm:w-auto">
          <div className="w-10 h-10 rounded-xl bg-amber-400/20 text-amber-400 flex items-center justify-center flex-shrink-0">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] uppercase font-bold text-slate-400 block tracking-wider">
              Serviço Selecionado
            </span>
            <div className="flex items-center gap-2 flex-wrap">
              <strong className="text-slate-100 text-sm sm:text-base">
                {selectedServiceName || 'Nenhum serviço selecionado'}
              </strong>
              {bookingData.servicePrice && (
                <span className="text-xs font-bold text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded-full border border-amber-400/20">
                  {bookingData.servicePrice}
                </span>
              )}
            </div>
          </div>
        </div>

        <button
          type="button"
          disabled={!selectedServiceName}
          onClick={onNext}
          className={`w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm tracking-wide uppercase transition-all duration-200 shadow-lg ${
            selectedServiceName
              ? 'bg-amber-400 hover:bg-amber-300 text-slate-950 shadow-amber-500/20 hover:shadow-amber-500/30 cursor-pointer active:scale-[0.99]'
              : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700/50'
          }`}
        >
          <span>Continuar para Dados do Veículo</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
