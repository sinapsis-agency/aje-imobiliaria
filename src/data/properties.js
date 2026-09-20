// Imóveis reais — primeira leva (Ajé Imobiliária).
//
// FOTOS: cada foto tenta carregar primeiro o arquivo local em
// /public/images/imoveis/<nome>.jpg. Se ainda não existir, mostra uma
// imagem de reserva neutra da própria Ajé (_placeholder.jpg) — sem
// depender de bancos externos, já que estas são fotos reais.
//
// Ordem pensada para não misturar escalas muito diferentes logo de cara:
// terrenos e vendas de maior valor primeiro, aluguéis de temporada depois.
//
// city: deve corresponder exatamente a um valor de AREAS (src/data/areas.js).
// priceValue: número em BRL (null quando ainda não há preço definido).
const PLACEHOLDER = '/images/imoveis/_placeholder.jpg';

export const PROPERTIES = [
  {
    id: 'terreno-praia-do-amor-pipa',
    title: 'Terreno com vista panorâmica — Praia do Amor',
    city: 'Praia da Pipa',
    type: 'Terreno',
    area: '3.126 m² (perímetro de 243 m)',
    priceValue: 1700000,
    priceLabel: 'R$ 1.700.000',
    description:
      'Um dos terrenos mais espetaculares de Pipa: vista panorâmica em uma das áreas mais valorizadas da região.',
    photos: Array.from({ length: 5 }, (_, i) => ({
      src: `/images/imoveis/terreno-praia-do-amor-pipa-${i + 1}.jpg`,
      fallback: PLACEHOLDER,
    })),
  },
  {
    id: 'cobertura-tirol-natal',
    title: 'Cobertura duplex no Tirol',
    city: 'Natal',
    type: 'Venda',
    area: 'Cobertura duplex · consulte metragem',
    priceValue: null,
    priceLabel: 'Sob consulta',
    description:
      'Cobertura duplex ampla no Tirol, colada ao Hospital São Lucas — perto de tudo, em uma das áreas mais bem localizadas de Natal: clínicas, escolas, mercados, shoppings e teatros a poucos minutos.',
    photos: Array.from({ length: 22 }, (_, i) => ({
      src: `/images/imoveis/cobertura-tirol-natal-${i + 1}.jpg`,
      fallback: PLACEHOLDER,
    })),
  },
  {
    id: 'triplex-condominio-fechado-pipa',
    title: 'Triplex em condomínio fechado',
    city: 'Praia da Pipa',
    type: 'Venda',
    area: 'Triplex · consulte metragem',
    priceValue: 800000,
    priceLabel: 'R$ 800.000',
    description:
      'Triplex completo em condomínio fechado, com suíte, quarto para hóspedes, espaço gourmet com capacidade para 10 pessoas, hidromassagem na cobertura e ar-condicionado em todos os ambientes principais.',
    photos: Array.from({ length: 4 }, (_, i) => ({
      src: `/images/imoveis/triplex-condominio-fechado-pipa-${i + 1}.jpg`,
      fallback: PLACEHOLDER,
    })),
  },
  {
    id: 'terreno-praia-das-minas-falesias-pipa',
    title: 'Terreno para desmembramento — Praia das Minas',
    city: 'Praia da Pipa',
    type: 'Terreno',
    area: 'A partir de 300 m² (área total 49.515 m², perímetro 518 m)',
    priceValue: null,
    priceLabel: 'Sob consulta',
    description:
      'Grande área nas falésias de Praia das Minas, com possibilidade de desmembramento em lotes a partir de 300 m².',
    photos: Array.from({ length: 5 }, (_, i) => ({
      src: `/images/imoveis/terreno-praia-das-minas-falesias-pipa-${i + 1}.jpg`,
      fallback: PLACEHOLDER,
    })),
  },
  {
    id: 'terreno-pipa-boulevard',
    title: 'Terreno no Pipa Boulevard',
    city: 'Praia da Pipa',
    type: 'Terreno',
    area: '300 m² (12x25 m)',
    priceValue: 75000,
    priceLabel: 'R$ 75.000 (repasse)',
    description:
      'Terreno plano em condomínio planejado e em crescimento, a poucos minutos da Praia da Pipa. Valor de repasse — o comprador assume as parcelas restantes (85x R$ 1.027).',
    photos: Array.from({ length: 4 }, (_, i) => ({
      src: `/images/imoveis/terreno-pipa-boulevard-${i + 1}.jpg`,
      fallback: PLACEHOLDER,
    })),
  },
  {
    id: 'terreno-rua-condor-pipa',
    title: 'Terreno na Rua Condor',
    city: 'Praia da Pipa',
    type: 'Terreno',
    area: '282 m²',
    priceValue: 240000,
    priceLabel: 'R$ 240.000',
    description: 'Terreno bem localizado na Rua Condor, pronto para construir.',
    photos: Array.from({ length: 2 }, (_, i) => ({
      src: `/images/imoveis/terreno-rua-condor-pipa-${i + 1}.jpg`,
      fallback: PLACEHOLDER,
    })),
  },
  {
    id: 'terreno-rua-cancela-pipa',
    title: 'Terreno na Travessa Rua da Cancela',
    city: 'Praia da Pipa',
    type: 'Terreno',
    area: '372,6 m²',
    priceValue: 223560,
    priceLabel: 'R$ 600/m² (R$ 223.560 total)',
    description: 'Terreno com escritura pública na Travessa Rua da Cancela.',
    photos: Array.from({ length: 2 }, (_, i) => ({
      src: `/images/imoveis/terreno-rua-cancela-pipa-${i + 1}.jpg`,
      fallback: PLACEHOLDER,
    })),
  },
  {
    id: 'casa-centro-pipa-temporada',
    title: 'Casa no Centro de Pipa',
    city: 'Praia da Pipa',
    type: 'Aluguel',
    rentalPeriod: 'Temporada',
    area: '2 quartos · 1 banheiro',
    priceValue: null,
    priceLabel: 'Consulte disponibilidade',
    description:
      'Casa charmosa no coração de Pipa, disponível para temporada (diária, pacote ou mensal) — inclusive para o Réveillon.',
    photos: Array.from({ length: 8 }, (_, i) => ({
      src: `/images/imoveis/casa-centro-pipa-temporada-${i + 1}.jpg`,
      fallback: PLACEHOLDER,
    })),
  },
  {
    id: 'pousada-pedra-dagua-pipa',
    title: "Pousada Pedra D'Água",
    city: 'Praia da Pipa',
    type: 'Aluguel',
    rentalPeriod: 'Diária',
    area: 'Diárias e pacotes',
    priceValue: null,
    priceLabel: 'Consulte diárias e pacotes',
    description: 'Pousada no coração de Praia da Pipa, com diárias e pacotes disponíveis.',
    photos: Array.from({ length: 6 }, (_, i) => ({
      src: `/images/imoveis/pousada-pedra-dagua-pipa-${i + 1}.jpg`,
      fallback: PLACEHOLDER,
    })),
  },
  {
    id: 'aluguel-rua-cancela-pipa',
    title: 'Casa na Rua da Cancela',
    city: 'Praia da Pipa',
    type: 'Aluguel',
    rentalPeriod: 'Anual',
    area: '2 suítes + 1 quarto · banheiro social',
    priceValue: 3000,
    priceLabel: 'R$ 3.000/mês + caução',
    description:
      'Casa cercada de natureza, com duas suítes, área gourmet e estacionamento — aluguel anual na Travessa Rua da Cancela.',
    photos: Array.from({ length: 5 }, (_, i) => ({
      src: `/images/imoveis/aluguel-rua-cancela-pipa-${i + 1}.jpg`,
      fallback: PLACEHOLDER,
    })),
  },
];
