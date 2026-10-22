// Roda depois do `vite build` (ver "build" no package.json). Para cada rota
// do site, copia dist/index.html para dist/<rota>/index.html trocando só as
// tags do <head> (título, descrição, canonical, Open Graph, Twitter,
// hreflang) pelos valores certos DAQUELA página.
//
// Por quê: o site é uma SPA e esses valores só eram escritos por JavaScript.
// O Google executa JavaScript e entende, mas WhatsApp, Facebook e Instagram
// NÃO — liam o HTML cru e mostravam sempre o título/foto da home. Com este
// script o HTML cru já vem certo. O app continua funcionando igual: ao
// carregar, o React reescreve as mesmas tags com os mesmos valores.
//
// Só usa Node (sem navegador), então roda sem problema no build da Vercel.
// A Vercel serve arquivos estáticos antes do "rewrite" para a SPA, por isso
// dist/<rota>/index.html é entregue direto, sem mudar vercel.json.
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { PROPERTIES, getPropertySlug } from '../src/data/properties.js';
import { CATEGORIES } from '../src/data/categories.js';
import { INVEST_PAGE } from '../src/data/investPage.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const DIST = path.join(ROOT, 'dist');
const PUBLIC = path.join(ROOT, 'public');
const SITE_URL = 'https://www.ajeimobiliaria.com';
const LOGO = `${SITE_URL}/images/aje-logo.png`;
const LANGS = ['pt', 'en', 'es'];
const OG_LOCALE = { pt: 'pt_BR', en: 'en_US', es: 'es_ES' };
const HREFLANG = { pt: 'pt-BR', en: 'en', es: 'es' };

const template = fs.readFileSync(path.join(DIST, 'index.html'), 'utf8');

const esc = (s) =>
  String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const urlFor = (lang, slug = '') => {
  const prefix = lang === 'pt' ? '' : `/${lang}`;
  if (!slug) return lang === 'pt' ? `${SITE_URL}/` : `${SITE_URL}${prefix}`;
  return `${SITE_URL}${prefix}/${slug}`;
};

function setMeta(html, attr, name, content) {
  const re = new RegExp(`<meta\\s+${attr}="${name}"[\\s\\S]*?/>`);
  const tag = `<meta ${attr}="${name}" content="${esc(content)}" />`;
  if (!re.test(html)) throw new Error(`tag não encontrada no template: ${name}`);
  return html.replace(re, tag);
}

function buildPage(lang, { url, title, description, image, alternates }) {
  let html = template;
  html = html.replace(/<html lang="[^"]*"/, `<html lang="${lang === 'pt' ? 'pt-BR' : lang}"`);
  html = html.replace(/<title>[\s\S]*?<\/title>/, `<title>${esc(title)}</title>`);
  html = setMeta(html, 'name', 'description', description);
  html = html.replace(/<link rel="canonical"[^>]*\/>/, `<link rel="canonical" href="${esc(url)}" />`);
  html = setMeta(html, 'property', 'og:title', title);
  html = setMeta(html, 'property', 'og:description', description);
  html = setMeta(html, 'property', 'og:url', url);
  html = setMeta(html, 'property', 'og:image', image);
  html = setMeta(html, 'property', 'og:locale', OG_LOCALE[lang]);
  html = setMeta(html, 'name', 'twitter:title', title);
  html = setMeta(html, 'name', 'twitter:description', description);
  const hreflangs = alternates
    .map(({ hreflang, href }) => `    <link rel="alternate" hreflang="${hreflang}" href="${esc(href)}" />`)
    .join('\n');
  html = html.replace('</head>', `${hreflangs}\n  </head>`);
  return html;
}

function alternatesFor(slugs) {
  // slugs: { pt, en, es } (valor '' = home)
  return [
    ...LANGS.map((l) => ({ hreflang: HREFLANG[l], href: urlFor(l, slugs[l]) })),
    { hreflang: 'x-default', href: urlFor('pt', slugs.pt) },
  ];
}

let count = 0;
function write(lang, slug, page) {
  const dir = lang === 'pt' ? DIST : path.join(DIST, lang);
  const target = slug ? path.join(dir, slug) : dir;
  fs.mkdirSync(target, { recursive: true });
  fs.writeFileSync(path.join(target, 'index.html'), buildPage(lang, page));
  count += 1;
}

// ---- Home ----
const HOME = {
  pt: {
    title: 'Ajé Imobiliária | Imóveis em Pipa, RN e Litoral do Nordeste',
    description:
      'Imobiliária boutique em Pipa, Tibau do Sul, Natal e João Pessoa. Venda, aluguel e terrenos com apoio jurídico completo. 35 anos de experiência local.',
  },
  en: {
    title: 'Ajé Imobiliária | Real Estate in Pipa Beach, Natal & Northeast Brazil',
    description:
      'Boutique real estate agency in Pipa Beach, Tibau do Sul, Natal and João Pessoa, Brazil. Land, houses and rentals with full legal support — 35 years of local experience, trusted by foreign buyers.',
  },
  es: {
    title: 'Ajé Imobiliária | Inmuebles en Pipa Beach, Natal y Noreste de Brasil',
    description:
      'Inmobiliaria boutique en Pipa Beach, Tibau do Sul, Natal y João Pessoa, Brasil. Terrenos, casas y alquileres con apoyo jurídico completo — 35 años de experiencia local, de confianza para compradores extranjeros.',
  },
};
const homeSlugs = { pt: '', en: '', es: '' };
for (const lang of LANGS) {
  write(lang, '', { url: urlFor(lang), ...HOME[lang], image: LOGO, alternates: alternatesFor(homeSlugs) });
}

// ---- Quem somos ----
const SOMOS = {
  pt: { title: 'Quem Somos | Ajé Imobiliária — 35 anos em Pipa', description: 'Conheça a Ajé Imobiliária: 35 anos de experiência em Pipa, equipe local e apoio jurídico completo para quem compra, vende ou aluga no litoral do Nordeste.' },
  en: { title: 'About Us | Ajé Imobiliária — 35 Years in Pipa Beach', description: 'Meet Ajé Imobiliária: 35 years of local experience in Pipa Beach, a local team and full legal support for buying, selling or renting on Brazil\'s northeast coast.' },
  es: { title: 'Quiénes Somos | Ajé Imobiliária — 35 años en Pipa', description: 'Conoce Ajé Imobiliária: 35 años de experiencia en Pipa, equipo local y apoyo jurídico completo para comprar, vender o alquilar en el litoral del noreste de Brasil.' },
};
const somosSlugs = { pt: 'somos', en: 'somos', es: 'somos' };
for (const lang of LANGS) {
  write(lang, 'somos', { url: urlFor(lang, 'somos'), ...SOMOS[lang], image: LOGO, alternates: alternatesFor(somosSlugs) });
}

// ---- Categorias ----
for (const category of CATEGORIES) {
  for (const lang of LANGS) {
    write(lang, category.slugs[lang], {
      url: urlFor(lang, category.slugs[lang]),
      title: category.metaTitle[lang],
      description: category.metaDescription[lang],
      image: LOGO,
      alternates: alternatesFor(category.slugs),
    });
  }
}

// ---- Investir em Pipa ----
for (const lang of LANGS) {
  write(lang, INVEST_PAGE.slugs[lang], {
    url: urlFor(lang, INVEST_PAGE.slugs[lang]),
    title: INVEST_PAGE.metaTitle[lang],
    description: INVEST_PAGE.metaDescription[lang],
    image: LOGO,
    alternates: alternatesFor(INVEST_PAGE.slugs),
  });
}

// ---- Imóveis (mesma lógica de src/pages/PropertyPage.jsx) ----
const TITLE_SUFFIX = { pt: '', en: ', Brazil', es: ', Brasil' };
const META_SUFFIX = {
  pt: (city) => `Fale com a Ajé Imobiliária em ${city}.`,
  en: (city) => `Contact Ajé Imobiliária in ${city}, Brazil.`,
  es: (city) => `Contacte a Ajé Imobiliária en ${city}, Brasil.`,
};
const DESC_FIELD = { pt: 'description', en: 'descriptionEn', es: 'descriptionEs' };

function ogImageFor(property) {
  // só usa a foto real se o arquivo já existe em /public; senão, o logo
  // (evita prévia quebrada nos imóveis que ainda estão com "Foto em breve").
  const src = property.photos?.[0]?.src;
  if (src && fs.existsSync(path.join(PUBLIC, src))) return `${SITE_URL}${src}`;
  return LOGO;
}

for (const property of PROPERTIES) {
  const slug = getPropertySlug(property);
  const slugs = { pt: slug, en: slug, es: slug };
  for (const lang of LANGS) {
    const raw = property[DESC_FIELD[lang]] ?? property.description ?? '';
    const flat = raw.replace(/[•\n]+/g, ' ').replace(/\s+/g, ' ').trim();
    const title = `${property.title} — ${property.city}${TITLE_SUFFIX[lang]} | Ajé Imobiliária`;
    const description = `${flat} ${property.area} — ${property.priceLabel}. ${META_SUFFIX[lang](property.city)}`.trim();
    write(lang, slug, {
      url: urlFor(lang, slug),
      title,
      description,
      image: ogImageFor(property),
      alternates: alternatesFor(slugs),
    });
  }
}

console.log(`inject-meta: ${count} páginas geradas em dist/.`);
