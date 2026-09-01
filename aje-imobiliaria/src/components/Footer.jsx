import { useTranslation } from 'react-i18next';
import { SITE } from '../data/site';

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
  return (
    <footer className="border-t border-aje-cafe/15 bg-aje-paper px-6 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 text-center md:flex-row md:text-left">
        <img src="/images/aje-logo.png" alt={SITE.name} className="h-10 w-auto invert opacity-80" />
        <p className="text-xs font-light text-aje-ink-dim">
          {SITE.name} · CRECI {SITE.creci} · {SITE.tagline}
        </p>
      </div>

      <div className="mx-auto mt-6 max-w-6xl border-t border-aje-cafe/10 pt-6 text-center">
        <div className="mb-4 flex items-center justify-center gap-3">
          {LANGUAGES.map((lang) => (
            <button
              key={lang.code}
              type="button"
              onClick={() => i18n.changeLanguage(lang.code)}
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

