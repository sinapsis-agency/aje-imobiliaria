import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { isEnglishPath } from '../utils/languageUrl';

// Garante que quem chega direto numa URL /en/... (por exemplo, vindo do
// Google) veja o site em inglês mesmo sem clicar em nada — essencial para
// SEO, já que o Google lê o HTML já renderizado nesse idioma.
//
// Fora de /en/..., não mexe no idioma: a pessoa pode ter escolhido
// espanhol/italiano/francês no seletor de bandeiras, e isso continua
// funcionando normalmente (só não tem URL própria ainda).
export function useSiteLanguage() {
  const location = useLocation();
  const { i18n } = useTranslation();
  const english = isEnglishPath(location.pathname);

  useEffect(() => {
    if (english) {
      i18n.changeLanguage('en');
      document.documentElement.lang = 'en';
    } else {
      document.documentElement.lang = i18n.language === 'pt' ? 'pt-BR' : i18n.language;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [english]);

  return english ? 'en' : 'pt';
}
