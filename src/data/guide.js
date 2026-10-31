// "Descubra Pipa" — a seção de conteúdo (blog) do site.
//
// COMO PUBLICAR UM ARTIGO NOVO
// 1. Copie um item de POSTS (o artigo-modelo abaixo) e preencha.
// 2. Troque `published: false` por `published: true`.
// 3. Rode `npm run sitemap`, faça o push — a página, o sitemap e o link no
//    rodapé aparecem sozinhos. Enquanto NENHUM artigo estiver publicado, a
//    seção inteira fica invisível (sem página vazia no Google).
//
// IDIOMAS: pt é o principal. en e es são opcionais, por artigo: só geram
// página (e hreflang) nos idiomas em que você escreveu o conteúdo.
//
// CORPO (`body`): lista de blocos, na ordem em que aparecem:
//   { type: 'h2', text: '...' }       subtítulo
//   { type: 'p', text: '...' }        parágrafo
//   { type: 'list', items: ['...'] }  lista com marcadores
//   { type: 'tip', text: '...' }      destaque (dica / aviso importante)
//
// FATOS: escreva só o que foi confirmado (pessoas locais, fonte oficial).
// Se não tem certeza, deixe de fora.
//
// FOTOS: coloque em public/images/guia/<nome>.jpg e use em `image`.
// `related`: ids de imóveis (de properties.js) que combinam com o tema —
// aparecem no fim do artigo e levam o leitor às fichas.

export const GUIDE = {
  slugs: { pt: 'descubra-pipa', en: 'discover-pipa', es: 'descubre-pipa' },
  name: { pt: 'Descubra Pipa', en: 'Discover Pipa', es: 'Descubre Pipa' },
  metaTitle: {
    pt: 'Descubra Pipa — Praias, Dicas e Informações | Ajé Imobiliária',
    en: 'Discover Pipa Beach — Beaches, Tips and Local Info | Ajé Imobiliária',
    es: 'Descubre Pipa — Playas, Consejos e Información Local | Ajé Imobiliária',
  },
  metaDescription: {
    pt: 'Praias, passeios, dicas e informações de quem vive em Pipa há 35 anos. Conteúdo local da Ajé Imobiliária.',
    en: 'Beaches, activities, tips and local information from people who have lived in Pipa Beach for 35 years. By Ajé Imobiliária.',
    es: 'Playas, paseos, consejos e información local de quienes viven en Pipa hace 35 años. Por Ajé Imobiliária.',
  },
  h1: {
    pt: 'Descubra Pipa',
    en: 'Discover Pipa',
    es: 'Descubre Pipa',
  },
  intro: {
    pt: 'Praias, passeios e informações úteis de quem conhece Pipa por dentro há 35 anos.',
    en: 'Beaches, activities and useful information from people who have known Pipa from the inside for 35 years.',
    es: 'Playas, paseos e información útil de quienes conocen Pipa por dentro hace 35 años.',
  },
};

export const POSTS = [
  // ---- ARTIGO-MODELO (rascunho: não aparece no site até published: true) ----
  {
    id: 'modelo-praia',
    published: false,
    date: '2026-10-22',
    image: null, // ex: '/images/guia/praia-do-amor.jpg'
    imageAlt: { pt: '', en: '', es: '' },
    related: [], // ex: ['terreno-praia-do-amor-pipa']
    slugs: { pt: 'modelo-de-artigo', en: 'article-template', es: 'modelo-de-articulo' },
    pt: {
      title: '[MODELO] Título do artigo em português',
      description: 'Resumo de 1 ou 2 frases (até ~155 caracteres) que aparece no Google.',
      body: [
        { type: 'p', text: 'Parágrafo de abertura: responda de cara o que a pessoa veio procurar.' },
        { type: 'h2', text: 'Subtítulo' },
        { type: 'p', text: 'Texto com informação confirmada.' },
        { type: 'list', items: ['Primeiro ponto', 'Segundo ponto'] },
        { type: 'tip', text: 'Dica ou aviso importante.' },
      ],
    },
  },
];

export const LANGS = ['pt', 'en', 'es'];

// Rascunhos só aparecem no ambiente de desenvolvimento (npm run dev),
// para você poder ver o artigo antes de publicar. No site real: só publicados.
const showDrafts = () => Boolean(import.meta.env?.DEV);
export const visiblePosts = () => POSTS.filter((p) => p.published || showDrafts());

export const postHasLang = (post, lang) => Boolean(post[lang]?.title);
export const postLangs = (post) => LANGS.filter((l) => postHasLang(post, l));

export function getGuideUrl(lang, siteUrl) {
  const slug = GUIDE.slugs[lang];
  return `${siteUrl}/${lang === 'pt' ? '' : `${lang}/`}${slug}`;
}

export function getPostPath(post, lang) {
  const prefix = lang === 'pt' ? '' : `/${lang}`;
  return `${prefix}/${GUIDE.slugs[lang]}/${post.slugs[lang]}`;
}

export function getPostUrl(post, lang, siteUrl) {
  return `${siteUrl}${getPostPath(post, lang)}`;
}

export const guideHasPosts = (lang) => visiblePosts().some((p) => postHasLang(p, lang));
