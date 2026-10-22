// Dados de contato e configuração geral do site.
// Centralizado aqui para não haver números/textos duplicados espalhados
// pelos componentes.

export const WHATSAPP_NUMBER = '5584994766720'; // formato internacional, sem símbolos
export const WHATSAPP_DISPLAY = '+55 84 99476-6720';

export const whatsappLink = (message = 'Olá! Gostaria de saber mais sobre um imóvel.') =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

export const SITE = {
  name: 'Ajé Imobiliária',
  tagline: 'Nordeste, Brasil',
  creci: '7119-RN',
  domain: 'www.ajeimobiliaria.com',
};

// Redes sociais da Ajé (mesmo usuário nas duas).
export const SOCIAL = {
  instagram: 'https://www.instagram.com/ajeimobiliaria',
  tiktok: 'https://www.tiktok.com/@ajeimobiliaria',
};

// Google Analytics 4. Deixe vazio até criar a conta; quando tiver o ID
// ("G-XXXXXXXXXX", em Admin > Fluxos de dados), cole aqui e publique —
// nenhum script do Google é carregado enquanto estiver vazio.
export const GA_MEASUREMENT_ID = 'G-ZWTG9SCYBT';
