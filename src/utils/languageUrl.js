// Mantém a URL em sincronia com os idiomas que têm páginas próprias
// indexáveis pelo Google — hoje inglês (/en) e espanhol (/es). Italiano e
// francês continuam sendo só uma tradução no navegador, sem URL própria.
//
// Dado um caminho atual e o código de idioma escolhido, devolve o caminho
// que deveria ser usado: com o prefixo correspondente quando o idioma tiver
// URL própria, sem prefixo para qualquer outro idioma (pt/it/fr).
const URL_PREFIXES = ['en', 'es'];

function getPathPrefix(pathname) {
  return URL_PREFIXES.find((p) => pathname === `/${p}` || pathname.startsWith(`/${p}/`)) ?? null;
}

export function buildLanguagePath(pathname, code) {
  const currentPrefix = getPathPrefix(pathname);
  const bare = currentPrefix ? pathname.slice(currentPrefix.length + 1) || '/' : pathname;

  if (URL_PREFIXES.includes(code)) {
    return bare === '/' ? `/${code}` : `/${code}${bare}`;
  }
  return bare;
}

// Mantido por compatibilidade com código existente que só verificava inglês.
export function isEnglishPath(pathname) {
  return pathname === '/en' || pathname.startsWith('/en/');
}

export function isSpanishPath(pathname) {
  return pathname === '/es' || pathname.startsWith('/es/');
}

// Devolve 'en' | 'es' | null — o idioma com URL própria da página atual,
// ou null quando a URL está "nua" (português, ou pt/it/fr escolhidos só no
// seletor, sem prefixo).
export function getUrlLanguage(pathname) {
  return getPathPrefix(pathname);
}
