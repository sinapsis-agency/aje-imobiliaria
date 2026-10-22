import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getUrlLanguage } from '../utils/languageUrl';

// Garante que quem chega direto numa URL /en/... ou /es/... (por exemplo,
// vindo do Google) veja o site nesse idioma mesmo sem clicar em nada —
// essencial para SEO, já que o Google lê o HTML já renderizado nesse
// idioma. Esses dois são, por enquanto, os únicos idiomas com URL própria
// indexável; italiano/francês continuam só no seletor de bandeiras.
//
// Fora de /en/... e /es/..., não mexe no idioma: a pessoa pode ter
// escolhido italiano/francês no seletor, e isso continua funcionando
// normalmente (só não tem URL própria ainda).
export function useSiteLanguage() {
  const location = useLocation();
  const { i18n } = useTranslation();
  const urlLang = getUrlLanguage(location.pathname); // 'en' | 'es' | null

  useEffect(() => {
    if (urlLang) {
      i18n.changeLanguage(urlLang);
      document.documentElement.lang = urlLang;
    } else {
      document.documentElement.lang = i18n.language === 'pt' ? 'pt-BR' : i18n.language;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [urlLang]);

  // Mantém o retorno binário pt/"idioma da URL" que o restante do código
  // (meta tags, hreflang, JSON-LD) já espera — agora pode ser 'en' ou 'es'
  // além de 'pt'.
  return urlLang ?? 'pt';
}
