import { ServiceItem } from '../types';

export const OFFICIAL_WHATSAPP_NUMBER = '553185607376';
export const OFFICIAL_WHATSAPP_DISPLAY = '+55 31 8560-7376';
export const OFFICIAL_ADDRESS = 'Rua Mário de Andrade, 202, Cidade Nobre - Ipatinga / MG';
export const OFFICIAL_INSTAGRAM = '@puro.brilho';

export const PRICE_DISCLAIMER_TEXT = 
  'Importante: Os valores apresentados no catálogo são valores base/referenciais ("a partir de"). O orçamento final e exato é definido após uma avaliação presencial ou detalhada do estado de conservação, tamanho e necessidades específicas do seu veículo pela equipe da Puro Brilho.';

export const DEFAULT_SERVICES: ServiceItem[] = [
  {
    id: 'limpeza-manutencao',
    name: 'Limpeza de Manutenção',
    priceDisplay: 'A partir de R$ 250,00',
    priceType: 'startingAt',
    estimatedDuration: '3 horas',
    shortDesc: 'Limpeza interna e externa técnica para manutenção do brilho e proteção.',
    fullDesc: 'Limpeza interna, condicionamento de plásticos e borrachas, lavagem externa, cera líquida, lavação da pintura, rodas e caixas de roda, secagem, aspiração, vidros e pneu pretinho.',
    iconName: 'Sparkles',
    tag: 'Mais Solicitado',
    category: 'manutencao',
    itemsIncluded: [
      'Limpeza Interna e Aspiração',
      'Condicionamento de plásticos e borrachas',
      'Lavagem externa técnica e lavação de pintura',
      'Lavação das rodas e caixas de roda',
      'Secagem especializada e cera líquida',
      'Limpeza dos vidros e pneu pretinho'
    ]
  },
  {
    id: 'servico-manutencao-cliente',
    name: 'Serviço de Manutenção (Cliente da Casa)',
    priceDisplay: 'R$ 200,00',
    priceType: 'fixed',
    estimatedDuration: '3 horas',
    shortDesc: 'Condição exclusiva para clientes fidelizados manterem o veículo impecável.',
    fullDesc: 'Cuidados periódicos de limpeza interna, condicionamento, lavagem externa, cera líquida, rodas, caixas de roda, vidros e acabamento.',
    iconName: 'CheckCircle2',
    tag: 'Exclusivo Fidelidade',
    category: 'manutencao',
    itemsIncluded: [
      'Limpeza Interna com aspiração minuciosa',
      'Condicionamento de plásticos e borrachas',
      'Lavagem externa e pintura',
      'Rodas e caixas de roda',
      'Aplicação de cera líquida e secagem',
      'Vidros e pneu pretinho'
    ]
  },
  {
    id: 'limpeza-preventiva',
    name: 'Limpeza Preventiva',
    priceDisplay: 'A partir de R$ 550,00',
    priceType: 'startingAt',
    estimatedDuration: '8 horas',
    warranty: '7 dias de garantia',
    shortDesc: 'Limpeza germicida profunda, técnica de pintura, vidros e cera em pasta.',
    fullDesc: 'Limpeza interna germicida (elimina poeira, leves sujeiras e bactérias), condicionamento de plásticos (até 3 meses), lavagem técnica detalhada da pintura/emblemas/grade, descontaminação de vidros contra chuva ácida, forro de teto, bancos e estepe.',
    iconName: 'ShieldCheck',
    tag: 'Limpeza Profunda',
    category: 'manutencao',
    itemsIncluded: [
      'Limpeza interna germicida (elimina poeira e bactérias)',
      'Condicionamento de plásticos e borrachas (protege até 3 meses)',
      'Lavagem técnica da pintura, emblemas e cantinhos',
      'Descontaminação de vidros removendo chuva ácida',
      'Limpeza detalhada dos bancos e forro de teto',
      'Aspiração completa do porta-malas e higienização do estepe',
      'Aplicação de cera em pasta e pneu pretinho'
    ]
  },
  {
    id: 'polimento-tecnico-cristalizacao',
    name: 'Polimento Técnico + Cristalização',
    priceDisplay: 'A partir de R$ 850,00',
    priceType: 'startingAt',
    estimatedDuration: '8 horas',
    warranty: '2 meses de garantia',
    shortDesc: 'Correção de riscos leves, marcas superficiais e aplicação de cristalização.',
    fullDesc: 'Lavagem técnica, descontaminação da pintura, correção através de polimento técnico, remoção de riscos leves e hologramas, realce máximo do brilho e profundidade, proteção sintética com cristalização por até 6 meses.',
    iconName: 'Flame',
    tag: 'Espelhamento da Pintura',
    category: 'pintura',
    itemsIncluded: [
      'Lavagem técnica e descontaminação de pintura',
      'Correção da pintura com polimento técnico',
      'Remoção de micro-riscos leves e marcas de redemoinho (swirls)',
      'Realce intenso do brilho e profundidade da cor',
      'Aplicação de cristalização (proteção sintética até 6 meses)',
      'Resistência reforçada contra sol, chuva e contaminantes'
    ]
  },
  {
    id: 'full-detail',
    name: 'Full Detail (Detalhamento Completo)',
    priceDisplay: 'R$ 2.500,00',
    priceType: 'fixed',
    estimatedDuration: '3 dias',
    warranty: '6 meses de garantia',
    bonus: 'BRINDE: 1 lavagem de manutenção',
    shortDesc: 'A experiência máxima de restauração estética completa: do chassi ao teto.',
    fullDesc: 'Tratamento detalhado da pintura, rodas, vidros + proteção, plásticos, interior, forro de teto, bancos, couro, motor + verniz, chassi + lubrificação, polimento técnico, proteção 1 ano + selante sintético, aromatizante e brinde exclusivo.',
    iconName: 'Award',
    tag: 'Pacote VIP Completo',
    category: 'destaques',
    itemsIncluded: [
      'Polimento técnico + correção de pintura completa',
      'Proteção de 1 ano + selante sintético de alta durabilidade',
      'Tratamento detalhado de rodas, caixas e vidros com proteção',
      'Tratamento completo de interior, forro de teto e bancos (couro/tecido)',
      'Tratamento técnico do motor + verniz protetor',
      'Tratamento e detalhamento do chassi + lubrificação',
      'Revitalização total de plásticos e borrachas',
      'Aromatização exclusiva + BRINDE: 1 Lavagem de Manutenção'
    ]
  },
  {
    id: 'vitrificacao',
    name: 'Vitrificação Cerâmica',
    priceDisplay: 'A partir de R$ 2.500,00',
    priceType: 'startingAt',
    estimatedDuration: '4 dias',
    warranty: '12 meses de garantia',
    shortDesc: 'Revestimento nano cerâmico com ultra repelência e durabilidade de até 3 anos.',
    fullDesc: 'Lavagem técnica, descontaminação da pintura, correção da pintura através do polimento, remoção de riscos leves e aplicação de revestimento nano cerâmico para proteção extrema contra raios UV, chuva ácida e contaminantes.',
    iconName: 'Shield',
    tag: 'Proteção até 3 Anos',
    category: 'pintura',
    itemsIncluded: [
      'Lavagem técnica especializada e descontaminação',
      'Correção rigorosa da pintura com polimento técnico',
      'Aplicação de revestimento nano cerâmico vitrificador',
      'Proteção da pintura por até 3 anos',
      'Alto nível de brilho vidrificado e profundidade de cor',
      'Super repelência a líquidos e sujeiras'
    ]
  },
  {
    id: 'selagem-pintura',
    name: 'Selagem de Pintura',
    priceDisplay: 'A partir de R$ 1.200,00',
    priceType: 'startingAt',
    estimatedDuration: '1 dia',
    warranty: '3 meses de garantia',
    shortDesc: 'Proteção intermediária com selante nobre por até 6 meses.',
    fullDesc: 'Limpeza interna germicida, condicionamento de plásticos, lavagem técnica completa, descontaminação da pintura, correção de leves imperfeições, aplicação da selagem da pintura e realce do brilho.',
    iconName: 'Sparkles',
    tag: 'Proteção & Brilho',
    category: 'pintura',
    itemsIncluded: [
      'Limpeza interna germicida e condicionamento',
      'Lavagem técnica completa e descontaminação de pintura',
      'Correção de pequenas imperfeições',
      'Aplicação de selagem de pintura com duração de até 6 meses',
      'Realce imediato de brilho e reflexos nítidos'
    ]
  },
  {
    id: 'tratamento-interno',
    name: 'Tratamento Interno Completo',
    priceDisplay: 'A partir de R$ 997,00',
    priceType: 'startingAt',
    estimatedDuration: '2 dias',
    warranty: '30 dias de garantia',
    shortDesc: 'Higienização total, esterilização de odores e revitalização dos acabamentos.',
    fullDesc: 'Limpeza profunda para eliminar sujeira incrustada, aspiração completa do interior, esterilização para eliminação de odores, higienização de superfícies internas, proteção de plásticos, borrachas, couros/tecidos e lavagem técnica.',
    iconName: 'Armchair',
    tag: 'Cabine Nova',
    category: 'interior',
    itemsIncluded: [
      'Limpeza profunda para eliminar sujeira incrustada',
      'Aspiração completa de todos os compartimentos',
      'Esterilização para neutralização e eliminação de odores',
      'Higienização de superfícies internas, consoles e painéis',
      'Proteção e nutrição de couros, tecidos, plásticos e borrachas',
      'Lavagem técnica inclusa'
    ]
  },
  {
    id: 'tratamento-bancos-couro',
    name: 'Tratamento Bancos + Hidratação do Couro',
    priceDisplay: 'A partir de R$ 450,00',
    priceType: 'startingAt',
    estimatedDuration: '3 horas',
    warranty: '30 dias de garantia',
    shortDesc: 'Nutrição profunda, toque macio e prevenção contra ressecamento e trincas.',
    fullDesc: 'Limpeza profunda para remoção de sujeira incrustada, higienização completa do couro, massageamento das fibras, aplicação de condicionador específico com proteção e restauração do aspecto original.',
    iconName: 'Armchair',
    tag: 'Nutrição do Couro',
    category: 'interior',
    itemsIncluded: [
      'Limpeza profunda para remoção de oleosidade e sujeira',
      'Higienização completa da superfície de couro',
      'Massagem de penetração com hidratante nobre',
      'Prevenção ativa contra ressecamento, rachaduras e desgaste',
      'Restauração do toque macio e acabamento acetinado fosco original'
    ]
  },
  {
    id: 'higienizacao-bancos-tecido',
    name: 'Higienização dos Bancos (Tecido)',
    priceDisplay: 'A partir de R$ 450,00',
    priceType: 'startingAt',
    estimatedDuration: '1 dia',
    warranty: '30 dias de garantia',
    shortDesc: 'Lavagem a quente/extração, remoção de manchas e combate a ácaros e bactérias.',
    fullDesc: 'Lavagem a seco ou por extração, limpeza profunda para remoção de sujeira incrustada, higienização a vapor, eliminação de fungos e bactérias, neutralização de odores e secagem controlada.',
    iconName: 'Armchair',
    tag: 'Bancos Limpos & Higienizados',
    category: 'interior',
    itemsIncluded: [
      'Lavagem por extração profunda de sujeiras encrostadas',
      'Higienização bactericida a vapor',
      'Eliminação de ácaros, fungos e odores desagradáveis',
      'Secagem controlada sem agredir as fibras do tecido',
      'Revitalização da cor e textura original'
    ]
  },
  {
    id: 'higienizacao-ar-condicionado',
    name: 'Higienização Ar Condicionado + Oxi Sanitização',
    priceDisplay: 'R$ 200,00',
    priceType: 'fixed',
    estimatedDuration: '3 horas',
    warranty: '30 dias de garantia',
    shortDesc: 'Ar puro na cabine: limpeza dos dutos, troca de filtro e ozônio desinfetante.',
    fullDesc: 'Limpeza completa do sistema de ar condicionado, dutos de ventilação, caixa evaporadora, troca do filtro da cabine, aplicação de ozônio, eliminação de ácaros/fungos/microrganismos e neutralização de mofo.',
    iconName: 'ShieldCheck',
    tag: 'Saúde Respiratória',
    category: 'interior',
    itemsIncluded: [
      'Limpeza completa do sistema e dutos de ventilação',
      'Higienização da caixa evaporadora',
      'Troca do filtro de cabine (filtro do ar condicionado)',
      'Oxi-sanitização com gerador de Ozônio medicinal',
      'Neutralização definitiva de odores e prevenção de alergias'
    ]
  },
  {
    id: 'higienizacao-forro-teto',
    name: 'Tratamento + Higienização do Forro de Teto',
    priceDisplay: 'R$ 150,00',
    priceType: 'fixed',
    estimatedDuration: '2 horas',
    warranty: '30 dias de garantia',
    shortDesc: 'Limpeza técnica cuidadosa a vapor sem risco de descolamento do tecido.',
    fullDesc: 'Limpeza do tecido, higienização para eliminar sujeira incrustada e bactérias, acabamento em vapor, aspiração técnica, eliminação de ácaros e revitalização do aspecto original.',
    iconName: 'Sparkles',
    tag: 'Renovação do Teto',
    category: 'interior',
    itemsIncluded: [
      'Limpeza do tecido com técnica anti-descolamento',
      'Higienização e acabamento a vapor',
      'Aspiração técnica suave',
      'Eliminação de fungos e bactérias',
      'Revitalização da tonalidade original'
    ]
  },
  {
    id: 'tratamento-motor',
    name: 'Tratamento do Motor',
    priceDisplay: 'A partir de R$ 450,00',
    priceType: 'startingAt',
    estimatedDuration: '3 horas',
    warranty: '2 meses de garantia',
    shortDesc: 'Limpeza técnica segura, desengraxe e proteção de partes elétricas com verniz.',
    fullDesc: 'Lavagem técnica do motor, limpeza detalhada de componentes, desengraxe seguro, proteção rigorosa de partes elétricas e sensíveis, aplicação de protetor específico contra oxidação e ressecamento.',
    iconName: 'Flame',
    tag: 'Cofre do Motor Novo',
    category: 'especiais',
    itemsIncluded: [
      'Lavagem técnica e desengraxe sem danificar chicotes',
      'Proteção prévia de módulos e sensores elétricos',
      'Aplicação de verniz protetor térmico específico',
      'Prevenção contra oxidação, corrosão e ressecamento de mangueiras',
      'Acabamento estético impecável do cofre'
    ]
  },
  {
    id: 'tratamento-chassi',
    name: 'Tratamento do Chassi',
    priceDisplay: 'A partir de R$ 300,00',
    priceType: 'startingAt',
    estimatedDuration: '3 horas',
    warranty: '30 dias de garantia',
    shortDesc: 'Limpeza profunda da parte inferior, remoção de barro/graxa e lubrificação.',
    fullDesc: 'Limpeza técnica e detalhamento do chassi, lubrificação, limpeza profunda da parte de baixo do veículo, remoção de barro, graxa, óleo, sal, poeira e resíduos de asfalto, secagem e prevenção de ferrugem/oxidação.',
    iconName: 'Shield',
    tag: 'Proteção da Estrutura',
    category: 'especiais',
    itemsIncluded: [
      'Limpeza técnica profunda da parte de baixo do veículo',
      'Remoção de crostas de barro, graxa, óleo e resíduos de asfalto',
      'Detalhamento e secagem',
      'Lubrificação técnica dos pontos articulados',
      'Aplicação de camada protetora antiferrugem e antioxidante'
    ]
  },
  {
    id: 'tratamento-vidros',
    name: 'Tratamento dos Vidros',
    priceDisplay: 'A partir de R$ 300,00',
    priceType: 'startingAt',
    estimatedDuration: '4 horas',
    warranty: '3 meses de garantia',
    shortDesc: 'Remoção de chuva ácida, polimento e cristalização com até 1 ano de proteção.',
    fullDesc: 'Limpeza técnica dos vidros, descontaminação profunda, remoção de manchas e chuva ácida, polimento leve, aplicação de proteção com até 1 ano de durabilidade, máxima visibilidade em dias de chuva.',
    iconName: 'Sparkles',
    tag: 'Visibilidade & Segurança',
    category: 'especiais',
    itemsIncluded: [
      'Descontaminação profunda e polimento dos vidros',
      'Remoção total de manchas de água e chuva ácida',
      'Aplicação de selante repelente com até 1 ano de proteção',
      'Efeito hidrofóbico: a água escorre na velocidade sem precisar de palhetas',
      'Facilidade extrema de limpeza posterior'
    ]
  },
  {
    id: 'outro-servico',
    name: 'Outro serviço / Quero saber qual serviço é ideal',
    priceDisplay: 'Sob Avaliação',
    priceType: 'custom',
    estimatedDuration: 'Sob consulta',
    shortDesc: 'Dúvidas sobre o tratamento ideal ou serviços personalizados para seu veículo.',
    fullDesc: 'Nossa equipe técnica fará uma avaliação minuciosa do seu veículo presencialmente ou por fotos/vídeos para indicar a solução perfeita e o orçamento sob medida.',
    iconName: 'HelpCircle',
    tag: 'Consultoria Personalizada',
    category: 'destaques',
    isCustom: true,
    itemsIncluded: [
      'Diagnóstico minucioso das condições da pintura e interior',
      'Esclarecimento de dúvidas sobre riscos, manchas e proteção',
      'Recomendação do melhor custo-benefício para suas necessidades',
      'Orçamento personalizado sem compromisso'
    ]
  }
];

export const DEFAULT_HOURS: string[] = [
  '08:00',
  '09:00',
  '10:00',
  '11:00',
  '13:00',
  '14:00',
  '15:00',
  '16:00',
  '17:00'
];

export const COMMON_COLORS = [
  'Preto',
  'Branco',
  'Prata',
  'Cinza',
  'Vermelho',
  'Azul',
  'Bordô / Vinho',
  'Outra cor'
];
