// "Marés em Pipa" — página informativa sobre a maré (evergreen, muito buscada).
//
// COMO PUBLICAR
// 1. Preencha todos os trechos marcados com [PREENCHER ...] abaixo
//    (só com o que for confirmado por pessoas locais — se não tem certeza,
//    apague a frase).
// 2. Confira o link da tábua oficial (`officialUrl`).
// 3. Troque `published: false` por `published: true`, rode `npm run sitemap`
//    e faça o push.
//
// SEGURANÇA: enquanto existir qualquer "[PREENCHER" no texto, a página NÃO
// aparece no site real (nem no rodapé, nem no sitemap) — só no `npm run dev`,
// para você poder ver e revisar.
//
// IDIOMAS: pt é o principal. en e es são opcionais: só geram página (e
// hreflang) quando você adiciona o bloco `en` / `es` com o mesmo formato.
//
// CORPO (`body`): blocos na ordem em que aparecem —
//   { type: 'h2', text }  { type: 'p', text }  { type: 'list', items }  { type: 'tip', text }
//
// TÁBUA AO VIVO (fase 2): quando houver uma fonte de dados com licença
// confirmada, ela entra num bloco novo da página, acima do texto. Até lá, a
// página aponta para a tábua oficial da Marinha (Porto de Natal).

export const MARES = {
  published: false,
  slugs: { pt: 'mares-em-pipa', en: 'tides-in-pipa', es: 'mareas-en-pipa' },
  name: { pt: 'Marés em Pipa', en: 'Tides in Pipa', es: 'Mareas en Pipa' },
  // Página da Marinha do Brasil (Centro de Hidrografia) com as tábuas de maré.
  // CONFIRMAR o endereço exato do PDF do ano antes de publicar.
  officialUrl: 'https://www.marinha.mil.br/chm',

  pt: {
    metaTitle: 'Marés em Pipa — Horários e Dicas para Cada Praia | Ajé Imobiliária',
    description:
      'Como ler a maré em Pipa: quando ir às piscinas naturais e caminhar entre as praias, com a tábua oficial da Marinha e dicas de quem vive aqui.',
    h1: 'Marés em Pipa',
    intro:
      'Em Pipa, a maré decide o passeio: há praias que só se caminham com maré baixa e piscinas naturais que só aparecem em certos horários. Aqui você entende como ler a tábua e o que esperar de cada lugar.',
    body: [
      { type: 'h2', text: 'Como ler a tábua de marés' },
      {
        type: 'p',
        text: '[PREENCHER: explique em 2 ou 3 frases o que são maré alta e maré baixa, e como achar o horário na tábua oficial.]',
      },
      { type: 'h2', text: 'Que maré é melhor para cada lugar' },
      {
        type: 'list',
        items: [
          '[PREENCHER: Piscinas naturais — qual maré e quanto tempo antes/depois do pico]',
          '[PREENCHER: Caminhada entre praias (ex.: Praia do Amor) — qual maré]',
          '[PREENCHER: Banho de mar tranquilo — qual maré]',
          '[PREENCHER: Outro lugar que dependa da maré]',
        ],
      },
      {
        type: 'tip',
        text: '[PREENCHER: dica de segurança de quem vive em Pipa — por exemplo, o que fazer para não ficar preso com a maré subindo.]',
      },
      { type: 'h2', text: 'A maré em Pipa é igual à de Natal?' },
      {
        type: 'p',
        text: '[PREENCHER: o que a gente local observa de diferença de horário entre Pipa e a tábua do Porto de Natal. Se não houver certeza, escreva que pode variar alguns minutos.]',
      },
    ],
  },
};

// ---- helpers ----
const showDrafts = () => Boolean(import.meta.env?.DEV);
const hasPlaceholders = () => JSON.stringify(MARES).includes('[PREENCHER');

export const LANGS = ['pt', 'en', 'es'];
export const maresHasLang = (lang) => Boolean(MARES[lang]?.h1);
export const maresLangs = () => LANGS.filter(maresHasLang);

// Visível no site real só quando publicada E sem nenhum "[PREENCHER" sobrando.
export const maresIsLive = () => MARES.published && !hasPlaceholders();
export const maresVisible = (lang) => maresHasLang(lang) && (maresIsLive() || showDrafts());

export const getMaresPath = (lang) => `${lang === 'pt' ? '' : `/${lang}`}/${MARES.slugs[lang]}`;
export const getMaresUrl = (lang, siteUrl) => `${siteUrl}${getMaresPath(lang)}`;
