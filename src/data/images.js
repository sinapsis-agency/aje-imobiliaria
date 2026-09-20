// Manifesto central de imagens do site — sistema local + reserva.
//
// COMO FUNCIONA: cada imagem tenta carregar primeiro o arquivo LOCAL
// (dentro de /public/images/...). Se esse arquivo ainda não existir, o site
// mostra automaticamente uma foto de banco gratuito como reserva — assim o
// site nunca fica com um buraco em branco.
//
// PARA TROCAR POR UMA FOTO REAL: salve a foto com o MESMO NOME de arquivo,
// na mesma pasta (ex: /public/images/cidades/natal.jpg). Ao atualizar a
// página, a foto real aparece sozinha — nenhuma mudança de código.

export const CITY_PHOTOS = {
  Natal: {
    src: '/images/cidades/natal.jpg',
    fallback: 'https://images.unsplash.com/photo-1515898034510-821b204966e4?w=800&q=80',
  },
  'João Pessoa': {
    src: '/images/cidades/joao-pessoa.jpg',
    fallback: 'https://images.unsplash.com/photo-1732217164523-d147e04babaf?w=800&q=80',
  },
  'Praia da Pipa': {
    src: '/images/cidades/praia-da-pipa.jpg',
    fallback: 'https://images.unsplash.com/photo-1518156677180-95a2893f3e9f?w=800&q=80',
  },
  Sibaúma: {
    src: '/images/cidades/sibauma.jpg',
    fallback: 'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=800&q=80',
  },
  'Baía Formosa': {
    src: '/images/cidades/baia-formosa.jpg',
    fallback: 'https://images.unsplash.com/photo-1519046904884-53103b34b206?w=800&q=80',
  },
  'Barra do Cunhaú': {
    src: '/images/cidades/barra-do-cunhau.jpg',
    fallback: 'https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?w=800&q=80',
  },
  Redinha: {
    src: '/images/cidades/redinha.jpg',
    fallback: 'https://images.unsplash.com/photo-1499346030926-9a72daac6c63?w=800&q=80',
  },
  'Tibau do Sul': {
    src: '/images/cidades/tibau-do-sul.jpg',
    fallback: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80',
  },
};

export const TEAM_PHOTOS = {
  eva: {
    src: '/images/equipe/eva.jpg',
    fallback: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80',
    alt: 'Eva, corretora de imóveis — Ajé Imobiliária, Praia da Pipa',
  },
  joao: {
    src: '/images/equipe/joao.jpg',
    fallback: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80',
    alt: 'João, logística em terreno — Ajé Imobiliária',
  },
  ideaSinapsis: {
    src: '/images/equipe/idea-sinapsis.jpg',
    fallback: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&q=80',
    alt: 'Idea Sinapsis, design e marketing — Ajé Imobiliária',
  },
  advogado: {
    src: '/images/equipe/advogado.jpg',
    fallback: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?w=400&q=80',
    alt: 'Dr. Daniel Magnus, advogado especialista em Direito Imobiliário — OAB/RN 18.256',
  },
  sergioGarcia: {
    src: '/images/equipe/sergio-garcia.jpg',
    fallback: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80',
    alt: 'Sergio Garcia, corretor de imóveis e perito judicial em avaliação — Ajé Imobiliária',
  },
  topografo: {
    src: '/images/equipe/topografo.jpg',
    fallback: 'https://images.unsplash.com/photo-1615109398623-88346a601842?w=400&q=80',
    alt: 'Topógrafo — Ajé Imobiliária',
  },
};

export const SERVICE_PHOTOS = {
  venda: { src: '/images/servicos/venda.jpg', fallback: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80', alt: 'Venda de imóveis no litoral do Nordeste — Ajé Imobiliária' },
  aluguel: { src: '/images/servicos/aluguel.jpg', fallback: 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=1200&q=80', alt: 'Aluguel de temporada, mensal e anual — Ajé Imobiliária' },
  terrenos: { src: '/images/servicos/terrenos.jpg', fallback: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1200&q=80', alt: 'Terrenos à venda com medição topográfica — Ajé Imobiliária' },
  gestao: { src: '/images/servicos/gestao.jpg', fallback: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80', alt: 'Gestão de propriedades para investidores — Ajé Imobiliária' },
  assessoria: { src: '/images/servicos/assessoria-internacional.jpg', fallback: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1200&q=80', alt: 'Assessoria para investidores estrangeiros — Ajé Imobiliária' },
  advogado: { src: '/images/servicos/advogado.jpg', fallback: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1200&q=80', alt: 'Suporte jurídico completo — Ajé Imobiliária' },
};

export const STEP_PHOTOS = {
  primeiroContato: { src: '/images/como-funciona/01-primeiro-contato.jpg', fallback: 'https://images.unsplash.com/photo-1516387938699-a93567ec168e?w=800&q=80', alt: 'Primeiro contato com a Ajé Imobiliária' },
  selecaoVisita: { src: '/images/como-funciona/02-selecao-visita.jpg', fallback: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80', alt: 'Seleção e visita a imóveis no litoral do Nordeste' },
  topografia: { src: '/images/como-funciona/03-topografia.jpg', fallback: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80', alt: 'Medição topográfica e verificação de documentação' },
  advogado: { src: '/images/como-funciona/04-advogado.jpg', fallback: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&q=80', alt: 'Elaboração de contrato pelo advogado responsável' },
  assinatura: { src: '/images/como-funciona/05-assinatura.jpg', fallback: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80', alt: 'Assinatura e transferência do imóvel' },
};

export const VENDA_ANUNCIE_PHOTO = {
  src: '/images/venda-anuncie/casa-luxo-praia.jpg',
  fallback: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=1400&q=85',
  alt: 'Casa de alto padrão à beira-mar em Praia da Pipa — anuncie seu imóvel com a Ajé Imobiliária',
};

export const QUEM_SOMOS_PHOTOS = {
  pipaAntiga: {
    src: '/images/quem-somos/pipa-antiga.jpg',
    fallback: 'https://images.unsplash.com/photo-1518156677180-95a2893f3e9f?w=1600&q=70&sat=-100',
  },
  pipaAtual: {
    src: '/images/quem-somos/pipa-atual.jpg',
    fallback: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1600&q=85',
  },
};
