import { useTranslation } from 'react-i18next';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { SITE, SOCIAL } from '../data/site';
import { buildLanguagePath, getUrlLanguage } from '../utils/languageUrl';
import { CATEGORIES } from '../data/categories';
import { INVEST_PAGE } from '../data/investPage';

const FOOTER_LINK_LABEL = {
  pt: { terreno: 'Terrenos em Pipa', venda: 'Casas à venda em Pipa', aluguel: 'Aluguel em Pipa' },
  en: { terreno: 'Land for sale', venda: 'Homes for sale', aluguel: 'Vacation rentals' },
  es: { terreno: 'Terrenos en venta', venda: 'Casas en venta', aluguel: 'Alquiler de temporada' },
};

const INVEST_LINK_LABEL = {
  pt: 'Investir em Pipa',
  en: 'Invest in Pipa Beach',
  es: 'Invertir en Pipa',
};

function InstagramIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" />
    </svg>
  );
}

function TikTokIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M14 3v11.5a3.5 3.5 0 1 1-3.5-3.5" />
      <path d="M14 3c.4 2.4 2 4 4.5 4.2" />
    </svg>
  );
}

const YEAR = new Date().getFullYear();

const LANGUAGES = [
  { code: 'pt', flag: '🇧🇷' },
  { code: 'en', flag: '🇺🇸' },
  { code: 'it', flag: '🇮🇹' },
  { code: 'es', flag: '🇪🇸' },
  { code: 'fr', flag: '🇫🇷' },
];

export default function Footer() {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLanguageChange = (code) => {
    i18n.changeLanguage(code);
    // Inglês tem URL própria (/en/...) — só essa troca realmente navega,
    // para que o Google indexe a versão em inglês de cada página. Os
    // outros idiomas continuam como tradução no navegador, sem URL própria.
    const nextPath = buildLanguagePath(location.pathname, code);
    if (nextPath !== location.pathname) {
      navigate(nextPath + location.hash);
    }
  };

  // Idioma com URL própria (pt/en/es) pra linkar a página de categoria
  // correta — sem isso, os links sempre apontariam pra versão em português.
  const urlLang = getUrlLanguage(location.pathname) ?? 'pt';
  const labels = FOOTER_LINK_LABEL[urlLang] ?? FOOTER_LINK_LABEL.pt;

  return (
    <footer className="border-t border-aje-cafe/15 bg-aje-paper px-6 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 text-center md:flex-row md:text-left">
        <img src="/images/aje-logo.png" alt={SITE.name} className="h-10 w-auto invert opacity-80" />
        <p className="text-xs font-light text-aje-ink-dim">
          {SITE.name} · CRECI {SITE.creci} · {SITE.tagline}
        </p>
      </div>

      {/* Links internos pras páginas de categoria — ajuda o Google a achar
          essas páginas navegando pelo site, não só pelo sitemap. */}
      <nav className="mx-auto mt-6 flex max-w-6xl flex-wrap items-center justify-center gap-x-6 gap-y-2 border-t border-aje-cafe/10 pt-6 text-center">
        {CATEGORIES.map((category) => {
          const slug = category.slugs[urlLang] ?? category.slugs.pt;
          const prefix = urlLang === 'pt' ? '' : `/${urlLang}`;
          return (
            <Link
              key={category.key}
              to={`${prefix}/${slug}`}
              className="text-xs tracking-wide text-aje-ink-dim transition-colors hover:text-aje-cafe"
            >
              {labels[category.key]}
            </Link>
          );
        })}
        <Link
          to={`${urlLang === 'pt' ? '' : `/${urlLang}`}/${INVEST_PAGE.slugs[urlLang] ?? INVEST_PAGE.slugs.pt}`}
          className="text-xs tracking-wide text-aje-ink-dim transition-colors hover:text-aje-cafe"
        >
          {INVEST_LINK_LABEL[urlLang] ?? INVEST_LINK_LABEL.pt}
        </Link>
      </nav>

      <div className="mx-auto mt-4 max-w-6xl border-t border-aje-cafe/10 pt-6 text-center">
        <div className="mb-5 flex items-center justify-center gap-3">
          <a
            href={SOCIAL.instagram}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram @ajeimobiliaria"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-aje-cafe/30 text-aje-cafe transition-colors hover:bg-aje-cafe/10"
          >
            <InstagramIcon className="h-4 w-4" />
          </a>
          <a
            href={SOCIAL.tiktok}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="TikTok @ajeimobiliaria"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-aje-cafe/30 text-aje-cafe transition-colors hover:bg-aje-cafe/10"
          >
            <TikTokIcon className="h-4 w-4" />
          </a>
        </div>
        <div className="mb-4 flex items-center justify-center gap-3">
          {LANGUAGES.map((lang) => (
            <button
              key={lang.code}
              type="button"
              onClick={() => handleLanguageChange(lang.code)}
              aria-label={lang.code}
              className={`text-lg transition-opacity hover:opacity-100 ${
                i18n.language === lang.code ? 'opacity-100' : 'opacity-40'
              }`}
            >
              {lang.flag}
            </button>
          ))}
        </div>

        <p className="text-[11px] font-light tracking-wide text-aje-ink-dim/70">
          © {YEAR} {SITE.name}. {t('footer.rights')}{' '}
          <a
            href="https://www.ideasinapsis.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-aje-cafe-soft underline decoration-aje-cafe/40 underline-offset-2 transition-colors hover:text-aje-cafe"
          >
            Idea Sinapsis
          </a>
          .
        </p>
      </div>
    </footer>
  );
}

