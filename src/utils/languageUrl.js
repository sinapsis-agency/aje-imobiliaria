// Mantém a URL em sincronia com o idioma inglês (o único, além do
// português, que tem páginas próprias indexáveis pelo Google — os outros
// 3 idiomas continuam sendo só uma tradução no navegador, sem URL própria).
//
// Dado um caminho atual e o código de idioma escolhido, devolve o caminho
// que deveria ser usado: com prefixo /en quando for inglês, sem prefixo
// para qualquer outro idioma.
export function buildLanguagePath(pathname, code) {
  const isEnglishPath = pathname === '/en' || pathname.startsWith('/en/');
  const bare = isEnglishPath ? pathname.slice(3) || '/' : pathname;

  if (code === 'en') {
    return bare === '/' ? '/en' : `/en${bare}`;
  }
  return bare;
}

export function isEnglishPath(pathname) {
  return pathname === '/en' || pathname.startsWith('/en/');
}
