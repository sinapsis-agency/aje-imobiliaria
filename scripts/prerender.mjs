// Pré-renderização "pobre, mas eficaz" para um SPA (Vite + React Router),
// sem migrar para Next.js.
//
// PROBLEMA: o site é um SPA — o dist/index.html sempre tem o mesmo
// <title>/<meta>/canonical/og (os da home). Cada página só troca esses
// valores via JavaScript, DEPOIS de montar (ver src/utils/seoHead.js). Isso
// funciona bem para quem navega com JS ligado, mas rastreadores que NÃO
// executam JavaScript — o preview do WhatsApp, por exemplo — sempre veem o
// HTML "cru" do index.html, ou seja: sempre a home, nunca o imóvel
// específico.
//
// SOLUÇÃO: depois do `vite build`, para cada rota conhecida (home, somos,
// cada imóvel × pt/en/es), abrir essa página num navegador de verdade,
// esperar o React montar e o useEffect de SEO rodar (título, canonical,
// og:image, hreflang, JSON-LD), e salvar o HTML já pronto em
// dist/<rota>/index.html.
//
// O Vercel serve arquivos estáticos do diretório de saída ANTES de aplicar
// o rewrite catch-all (vercel.json manda tudo pra /index.html) — por isso
// basta esse arquivo existir no caminho certo para o rastreador receber o
// HTML completo, sem precisar mudar o vercel.json. Quem navega pelo site
// normalmente (clicando em links) nem percebe: o React assume o DOM normal
// e continua funcionando como SPA.
import { spawn } from 'node:child_process';
import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { PROPERTIES, getPropertySlug } from '../src/data/properties.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const DIST = path.join(ROOT, 'dist');
const PORT = 4174;
const BASE = `http://localhost:${PORT}`;
const CHROMIUM_PATH = process.env.PW_CHROMIUM_PATH || '/opt/pw-browsers/chromium';

const LANGS = ['', 'en', 'es'];
const STATIC_PAGES = ['', 'somos'];

function buildRoutes() {
  const routes = [];
  for (const lang of LANGS) {
    for (const page of STATIC_PAGES) {
      const parts = [lang, page].filter(Boolean);
      routes.push(parts.length ? `/${parts.join('/')}` : '/');
    }
    for (const property of PROPERTIES) {
      const slug = getPropertySlug(property);
      const parts = [lang, slug].filter(Boolean);
      routes.push(`/${parts.join('/')}`);
    }
  }
  return routes;
}

function routeToFilePath(route) {
  if (route === '/') return path.join(DIST, 'index.html');
  const clean = route.replace(/^\/+/, '').replace(/\/+$/, '');
  return path.join(DIST, clean, 'index.html');
}

async function waitForServer() {
  for (let i = 0; i < 50; i += 1) {
    try {
      const res = await fetch(BASE);
      if (res.ok) return;
    } catch {
      // ainda subindo
    }
    await new Promise((r) => setTimeout(r, 200));
  }
  throw new Error('O servidor de preview não respondeu a tempo.');
}

async function main() {
  if (!fs.existsSync(DIST)) {
    throw new Error('dist/ não existe — rode `npm run build` antes do prerender.');
  }

  const routes = buildRoutes();
  console.log(`Pré-renderizando ${routes.length} rotas...`);

  const server = spawn('npx', ['vite', 'preview', '--port', String(PORT), '--strictPort'], {
    cwd: ROOT,
    stdio: 'pipe',
  });
  server.stderr.on('data', (d) => process.stderr.write(d));

  try {
    await waitForServer();

    const browser = await chromium.launch({ executablePath: CHROMIUM_PATH });
    const page = await browser.newPage();

    // O sandbox onde isto roda bloqueia saída de rede para domínios fora de
    // uma allowlist (ex: fonts.googleapis.com) — sem isso, cada página fica
    // tentando (e falhando) baixar a fonte do Google até dar timeout, e
    // 'networkidle' nunca é atingido. Em produção essas fontes carregam
    // normalmente; aqui só precisamos abortar rápido pra não travar.
    await page.route(/^https?:\/\/(?!localhost)/, (route) => route.abort());

    // IMPORTANTE: captura TODAS as rotas primeiro, em memória, e só escreve
    // em disco no final. Se escrevêssemos cada rota assim que capturada,
    // sobrescrever dist/index.html (a rota "/") estragaria o fallback de
    // SPA que o próprio vite preview usa pra servir as rotas seguintes
    // ainda não processadas — cada nova rota herdaria title/og/hreflang
    // da home já "vazados" no HTML, duplicando as tags em vez de
    // substituí-las (applyHreflang só adiciona <link>, nunca remove os que
    // já vieram prontos no HTML servido).
    const captured = [];
    for (const route of routes) {
      try {
        await page.goto(`${BASE}${route}`, { waitUntil: 'domcontentloaded', timeout: 15000 });
        // espera o useEffect de SEO (title/canonical/og/hreflang/JSON-LD)
        // terminar de rodar depois do mount.
        await page.waitForTimeout(400);
        const html = await page.content();
        captured.push({ route, html });
      } catch (err) {
        console.error(`  ✗ ${route}: ${err.message}`);
      }
    }

    await browser.close();

    for (const { route, html } of captured) {
      const filePath = routeToFilePath(route);
      fs.mkdirSync(path.dirname(filePath), { recursive: true });
      fs.writeFileSync(filePath, html);
    }

    console.log(`Pronto: ${captured.length}/${routes.length} rotas pré-renderizadas.`);
  } finally {
    server.kill();
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
