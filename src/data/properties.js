// Imóveis de exemplo.
//
// FOTOS: cada foto tenta carregar primeiro o arquivo local em
// /public/images/imoveis/<nome>.jpg. Se ainda não existir, mostra uma foto
// de banco gratuito como reserva. Para trocar por foto real, salve o
// arquivo com o mesmo nome na mesma pasta — nenhuma mudança de código.
//
// city: deve corresponder exatamente a um valor de AREAS (src/data/areas.js).
// priceValue: número em BRL, usado para o filtro por faixa de preço.
export const PROPERTIES = [
  {
    id: 'terreno-praia-das-minas',
    title: 'Terreno Praia das Minas',
    city: 'Praia da Pipa',
    type: 'Terreno',
    area: '450 m²',
    priceValue: 380000,
    priceLabel: 'R$ 380.000',
    photos: [
      { src: '/images/imoveis/terreno-praia-das-minas-1.jpg', fallback: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1200&q=80' },
      { src: '/images/imoveis/terreno-praia-das-minas-2.jpg', fallback: 'https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?w=1200&q=80' },
    ],
  },
  {
    id: 'terreno-praia-do-amor',
    title: 'Terreno Praia do Amor',
    city: 'Praia da Pipa',
    type: 'Terreno',
    area: '600 m²',
    priceValue: 520000,
    priceLabel: 'R$ 520.000',
    photos: [
      { src: '/images/imoveis/terreno-praia-do-amor-1.jpg', fallback: 'https://images.unsplash.com/photo-1499346030926-9a72daac6c63?w=1200&q=80' },
      { src: '/images/imoveis/terreno-praia-do-amor-2.jpg', fallback: 'https://images.unsplash.com/photo-1519046904884-53103b34b206?w=1200&q=80' },
    ],
  },
  {
    id: 'terreno-falesias-sibauma',
    title: 'Terreno Final das Pedrinhas — Falésias de Sibaúma',
    city: 'Sibaúma',
    type: 'Terreno',
    area: '800 m²',
    priceValue: 650000,
    priceLabel: 'R$ 650.000',
    photos: [
      { src: '/images/imoveis/terreno-falesias-sibauma-1.jpg', fallback: 'https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?w=1200&q=80' },
      { src: '/images/imoveis/terreno-falesias-sibauma-2.jpg', fallback: 'https://images.unsplash.com/photo-1518156677180-95a2893f3e9f?w=1200&q=80' },
    ],
  },
  {
    id: 'casa-pipa-vista-mar',
    title: 'Casa com vista para o mar',
    city: 'Praia da Pipa',
    type: 'Venda',
    area: '320 m²',
    priceValue: 1450000,
    priceLabel: 'R$ 1.450.000',
    photos: [
      { src: '/images/imoveis/casa-pipa-vista-mar-1.jpg', fallback: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80' },
      { src: '/images/imoveis/casa-pipa-vista-mar-2.jpg', fallback: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80' },
      { src: '/images/imoveis/casa-pipa-vista-mar-3.jpg', fallback: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80' },
    ],
  },
  {
    id: 'villa-tibau-minimalista',
    title: 'Villa minimalista à beira-mar',
    city: 'Tibau do Sul',
    type: 'Venda',
    area: '280 m²',
    priceValue: 1180000,
    priceLabel: 'R$ 1.180.000',
    photos: [
      { src: '/images/imoveis/villa-tibau-minimalista-1.jpg', fallback: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=1200&q=80' },
      { src: '/images/imoveis/villa-tibau-minimalista-2.jpg', fallback: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200&q=80' },
      { src: '/images/imoveis/villa-tibau-minimalista-3.jpg', fallback: 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=1200&q=80' },
    ],
  },
  {
    id: 'apartamento-natal-praia',
    title: 'Apartamento à beira-mar',
    city: 'Natal',
    type: 'Venda',
    area: '95 m²',
    priceValue: 690000,
    priceLabel: 'R$ 690.000',
    photos: [
      { src: '/images/imoveis/apartamento-natal-praia-1.jpg', fallback: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&q=80' },
      { src: '/images/imoveis/apartamento-natal-praia-2.jpg', fallback: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&q=80' },
    ],
  },
  {
    id: 'casa-temporada-joao-pessoa',
    title: 'Casa para temporada',
    city: 'João Pessoa',
    type: 'Aluguel',
    rentalPeriod: 'Diária',
    area: '210 m²',
    priceValue: 890,
    priceLabel: 'R$ 890 / diária',
    photos: [
      { src: '/images/imoveis/casa-temporada-joao-pessoa-1.jpg', fallback: 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=1200&q=80' },
      { src: '/images/imoveis/casa-temporada-joao-pessoa-2.jpg', fallback: 'https://images.unsplash.com/photo-1523217582562-09d0def993a6?w=1200&q=80' },
    ],
  },
  {
    id: 'bangalo-baia-formosa',
    title: 'Bangalô com jardim tropical',
    city: 'Baía Formosa',
    type: 'Aluguel',
    rentalPeriod: 'Anual',
    area: '140 m²',
    priceValue: 3200,
    priceLabel: 'R$ 3.200 / mês',
    photos: [
      { src: '/images/imoveis/bangalo-baia-formosa-1.jpg', fallback: 'https://images.unsplash.com/photo-1521401830884-6c03c1c87ebb?w=1200&q=80' },
      { src: '/images/imoveis/bangalo-baia-formosa-2.jpg', fallback: 'https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=1200&q=80' },
    ],
  },
  {
    id: 'terreno-barra-do-cunhau',
    title: 'Terreno próximo ao rio',
    city: 'Barra do Cunhaú',
    type: 'Terreno',
    area: '1.000 m²',
    priceValue: 310000,
    priceLabel: 'R$ 310.000',
    photos: [
      { src: '/images/imoveis/terreno-barra-do-cunhau-1.jpg', fallback: 'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=1200&q=80' },
      { src: '/images/imoveis/terreno-barra-do-cunhau-2.jpg', fallback: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1200&q=80' },
    ],
  },
];
