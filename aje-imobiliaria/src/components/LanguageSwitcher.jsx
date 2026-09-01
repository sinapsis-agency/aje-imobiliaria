import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ChevronDown, Check } from 'lucide-react';

// Adaptado do componente TSX/shadcn (language-selector-dropdown) para Vite +
// React + JavaScript, com as cores da marca Ajé em vez do tema shadcn.

const LANGUAGES = [
  { code: 'pt', label: 'Português', flag: '🇧🇷' },
  { code: 'en', label: 'English', flag: '🇺🇸' },
  { code: 'es', label: 'Español', flag: '🇪🇸' },
  { code: 'it', label: 'Italiano', flag: '🇮🇹' },
  { code: 'fr', label: 'Français', flag: '🇫🇷' },
];

export default function LanguageSwitcher({ isLight }) {
  const { i18n } = useTranslation();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  const selected = LANGUAGES.find((l) => l.code === i18n.language) ?? LANGUAGES[0];

  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener('pointerdown', handleClickOutside);
    return () => document.removeEventListener('pointerdown', handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label="Selecionar idioma"
        className={`flex items-center gap-1.5 rounded-full border px-2.5 py-1.5 text-sm backdrop-blur-md shadow-sm transition-all ${
          isLight
            ? 'border-aje-cafe/30 bg-aje-paper/60 text-aje-ink-dim hover:bg-aje-paper'
            : 'border-white/30 bg-black/10 text-white hover:bg-black/20'
        }`}
      >
        <span>{selected.flag}</span>
        <span className="text-[10px] tracking-wide-label">{selected.code.toUpperCase()}</span>
        <ChevronDown className="h-3.5 w-3.5" />
      </button>

      {open && (
        <div className="absolute right-0 z-50 mt-2 w-44 overflow-hidden rounded-xl border border-aje-cafe/20 bg-aje-paper/95 shadow-lg backdrop-blur-xl">
          {LANGUAGES.map((lang) => (
            <button
              key={lang.code}
              type="button"
              onClick={() => {
                i18n.changeLanguage(lang.code);
                setOpen(false);
              }}
              className={`flex w-full items-center gap-2 px-3 py-2 text-left text-sm transition-colors ${
                selected.code === lang.code
                  ? 'font-semibold text-aje-cafe'
                  : 'text-aje-ink-dim hover:bg-aje-cafe/10'
              }`}
            >
              <span>{lang.flag}</span>
              <span className="flex-1">{lang.label}</span>
              {selected.code === lang.code && <Check className="h-4 w-4 text-aje-cafe" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
