// Gera public/sitemap.xml a partir dos dados reais do site (PROPERTIES +
// CATEGORIES) — assim nunca fica desatualizado: toda propriedade ou
// categoria nova entra automaticamente na próxima vez que este script roda,
// sem precisar editar o XML à mão.
//
// Uso: node scripts/gen-sitemap.mjs  (rodar depois de qualquer mudança em
// src/data/properties.js ou src/data/categories.js, antes de publicar).
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { PROPERTIES, getPropertySlug } from '../src/data/properties.js';
import { CATEGORIES } from '../src/data/categories.js';
import { INVEST_PAGE } from '../src/data/investPage.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const SITE_URL = 'https://www.ajeimobiliaria.com';

const urls = [];
const url = (loc, changefreq, priority) => urls.push({ loc, changefreq, priority });

// Home
url(`${SITE_URL}/`, 'weekly', '1.0');
url(`${SITE_URL}/en`, 'weekly', '0.9');
url(`${SITE_URL}/es`, 'weekly', '0.9');

// Somos
url(`${SITE_URL}/somos`, 'monthly', '0.6');
url(`${SITE_URL}/en/somos`, 'monthly', '0.5');
url(`${SITE_URL}/es/somos`, 'monthly', '0.5');

// Categorias (terrenos / casas à venda / aluguel)
for (const category of CATEGORIES) {
  url(`${SITE_URL}/${category.slugs.pt}`, 'weekly', '0.8');
  url(`${SITE_URL}/en/${category.slugs.en}`, 'weekly', '0.7');
  url(`${SITE_URL}/es/${category.slugs.es}`, 'weekly', '0.7');
}

// Página "Investir em Pipa"
url(`${SITE_URL}/${INVEST_PAGE.slugs.pt}`, 'monthly', '0.8');
url(`${SITE_URL}/en/${INVEST_PAGE.slugs.en}`, 'monthly', '0.7');
url(`${SITE_URL}/es/${INVEST_PAGE.slugs.es}`, 'monthly', '0.7');

// Cada propriedade, agrupada pt/en/es
for (const property of PROPERTIES) {
  const slug = getPropertySlug(property);
  url(`${SITE_URL}/${slug}`, 'weekly', '0.8');
  url(`${SITE_URL}/en/${slug}`, 'weekly', '0.7');
  url(`${SITE_URL}/es/${slug}`, 'weekly', '0.7');
}

const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls
  .map(
    (u) =>
      `  <url>\n    <loc>${u.loc}</loc>\n    <changefreq>${u.changefreq}</changefreq>\n    <priority>${u.priority}</priority>\n  </url>`
  )
  .join('\n')}\n</urlset>\n`;

fs.writeFileSync(path.join(ROOT, 'public/sitemap.xml'), xml);
console.log(`Sitemap gerado com ${urls.length} URLs.`);
