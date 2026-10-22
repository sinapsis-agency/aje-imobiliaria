// Troca temporariamente o <title> e a meta description da página (o
// index.html já traz uma versão padrão em português) e restaura o valor
// anterior ao sair da página — mesmo padrão que o PropertyPage já usava,
// só que reaproveitável também pela HomePage (versão /en).
export function applyPageMeta({ title, description }) {
  const previousTitle = document.title;
  const metaEl = document.querySelector('meta[name="description"]');
  const previousDescription = metaEl?.getAttribute('content') ?? '';

  if (title) document.title = title;
  if (description && metaEl) metaEl.setAttribute('content', description);

  return () => {
    document.title = previousTitle;
    if (metaEl) metaEl.setAttribute('content', previousDescription);
  };
}

// Troca o <link rel="canonical"> e as tags Open Graph/Twitter (o
// index.html só traz a versão padrão da home) — sem isso, TODA página
// (inclusive cada imóvel) compartilhava o canonical/og:image da home, e
// quem compartilhasse o link de um imóvel no WhatsApp via a prévia da
// home em vez da foto e do título do imóvel.
export function applyOpenGraph({ url, title, description, image, locale }) {
  const canonicalEl = document.querySelector('link[rel="canonical"]');
  const previousCanonical = canonicalEl?.getAttribute('href') ?? null;

  const ogTitleEl = document.querySelector('meta[property="og:title"]');
  const ogDescriptionEl = document.querySelector('meta[property="og:description"]');
  const ogUrlEl = document.querySelector('meta[property="og:url"]');
  const ogImageEl = document.querySelector('meta[property="og:image"]');
  const ogLocaleEl = document.querySelector('meta[property="og:locale"]');
  const twitterTitleEl = document.querySelector('meta[name="twitter:title"]');
  const twitterDescriptionEl = document.querySelector('meta[name="twitter:description"]');

  const previous = {
    ogTitle: ogTitleEl?.getAttribute('content') ?? '',
    ogDescription: ogDescriptionEl?.getAttribute('content') ?? '',
    ogUrl: ogUrlEl?.getAttribute('content') ?? '',
    ogImage: ogImageEl?.getAttribute('content') ?? '',
    ogLocale: ogLocaleEl?.getAttribute('content') ?? '',
    twitterTitle: twitterTitleEl?.getAttribute('content') ?? '',
    twitterDescription: twitterDescriptionEl?.getAttribute('content') ?? '',
  };

  if (canonicalEl && url) canonicalEl.setAttribute('href', url);
  if (ogTitleEl && title) ogTitleEl.setAttribute('content', title);
  if (ogDescriptionEl && description) ogDescriptionEl.setAttribute('content', description);
  if (ogUrlEl && url) ogUrlEl.setAttribute('content', url);
  if (ogImageEl && image) ogImageEl.setAttribute('content', image);
  if (ogLocaleEl && locale) ogLocaleEl.setAttribute('content', locale);
  if (twitterTitleEl && title) twitterTitleEl.setAttribute('content', title);
  if (twitterDescriptionEl && description) twitterDescriptionEl.setAttribute('content', description);

  return () => {
    if (canonicalEl) canonicalEl.setAttribute('href', previousCanonical ?? `${location.origin}/`);
    if (ogTitleEl) ogTitleEl.setAttribute('content', previous.ogTitle);
    if (ogDescriptionEl) ogDescriptionEl.setAttribute('content', previous.ogDescription);
    if (ogUrlEl) ogUrlEl.setAttribute('content', previous.ogUrl);
    if (ogImageEl) ogImageEl.setAttribute('content', previous.ogImage);
    if (ogLocaleEl) ogLocaleEl.setAttribute('content', previous.ogLocale);
    if (twitterTitleEl) twitterTitleEl.setAttribute('content', previous.twitterTitle);
    if (twitterDescriptionEl) twitterDescriptionEl.setAttribute('content', previous.twitterDescription);
  };
}

// Insere tags <link rel="alternate" hreflang="..."> no <head>, avisando o
// Google que esta mesma página existe em outro idioma numa outra URL —
// sem isso, o Google não sabe que /en/<slug> e /<slug> são a mesma
// página em idiomas diferentes, e tende a mostrar só uma delas.
export function applyHreflang(links) {
  // Remove quaisquer tags hreflang que já estejam no <head> antes de
  // adicionar as novas — torna a função "idempotente": mesmo que o efeito
  // rode mais de uma vez para a mesma página (ex: StrictMode em
  // desenvolvimento), nunca duplica as tags.
  document.querySelectorAll('link[rel="alternate"][hreflang]').forEach((el) => el.remove());

  const created = links.map(({ hreflang, href }) => {
    const link = document.createElement('link');
    link.rel = 'alternate';
    link.hreflang = hreflang;
    link.href = href;
    document.head.appendChild(link);
    return link;
  });

  return () => created.forEach((el) => el.remove());
}
