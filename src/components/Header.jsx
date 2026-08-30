import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Menu, X } from 'lucide-react';
import { whatsappLink } from '../data/site';
import LanguageSwitcher from './LanguageSwitcher';

export default function Header({ forceLight = false }) {
  const { t } = useTranslation();
  const [scrolled, setScrolled] = useState(forceLight);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (forceLight) return undefined;
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, [forceLight]);

  const isLight = forceLight || scrolled;

  const LINKS = [
    { href: '/somos', label: t('nav.quemSomos'), type: 'route' },
    { href: '/#imoveis', label: t('nav.imoveis'), type: 'anchor' },
    { href: '/#servicos', label: t('nav.servicos'), type: 'anchor' },
    { href: '/#contato', label: t('nav.contato'), type: 'anchor' },
  ];

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-colors duration-500 ${
        isLight || menuOpen ? 'bg-aje-paper/90 backdrop-blur-sm shadow-sm' : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link to="/" className="flex items-center gap-3" onClick={() => setMenuOpen(false)}>
          <img
            src="/images/aje-logo.png"
            alt="Ajé Imobiliária"
            className={`h-12 w-auto transition-all duration-500 ${isLight || menuOpen ? 'invert' : ''}`}
          />
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {LINKS.map((link) =>
            link.type === 'route' ? (
              <Link
                key={link.href}
                to={link.href}
                className={`text-xs tracking-wide-label transition-colors hover:text-aje-cafe ${
                  isLight ? 'text-aje-ink-dim' : 'text-white/90'
                }`}
              >
                {link.label.toUpperCase()}
              </Link>
            ) : (
              <a
                key={link.href}
                href={link.href}
                className={`text-xs tracking-wide-label transition-colors hover:text-aje-cafe ${
                  isLight ? 'text-aje-ink-dim' : 'text-white/90'
                }`}
              >
                {link.label.toUpperCase()}
              </a>
            )
          )}
        </nav>

        <div className="flex items-center gap-3">
          <LanguageSwitcher isLight={isLight || menuOpen} />

          <a
            href={whatsappLink('Olá! Gostaria de agendar um atendimento.')}
            target="_blank"
            rel="noopener noreferrer"
            className={`hidden rounded-full border px-5 py-2 text-xs tracking-wide-label transition-colors hover:bg-aje-cafe hover:text-aje-paper sm:inline-block ${
              isLight ? 'border-aje-cafe text-aje-cafe' : 'border-white/70 text-white'
            }`}
          >
            {t('nav.agendar').toUpperCase()}
          </a>

          {/* Hamburguer — só no celular */}
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Abrir menu"
            className={`flex h-9 w-9 items-center justify-center rounded-full border transition-colors md:hidden ${
              isLight || menuOpen ? 'border-aje-cafe/30 text-aje-ink' : 'border-white/40 text-white'
            }`}
          >
            {menuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Menu móvel */}
      {menuOpen && (
        <nav className="flex flex-col items-center gap-1 border-t border-aje-cafe/15 bg-aje-paper px-6 py-4 md:hidden">
          {LINKS.map((link) =>
            link.type === 'route' ? (
              <Link
                key={link.href}
                to={link.href}
                onClick={() => setMenuOpen(false)}
                className="w-full py-3 text-center text-sm tracking-wide-label text-aje-ink-dim transition-colors hover:text-aje-cafe"
              >
                {link.label.toUpperCase()}
              </Link>
            ) : (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="w-full py-3 text-center text-sm tracking-wide-label text-aje-ink-dim transition-colors hover:text-aje-cafe"
              >
                {link.label.toUpperCase()}
              </a>
            )
          )}
          <a
            href={whatsappLink('Olá! Gostaria de agendar um atendimento.')}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMenuOpen(false)}
            className="mt-2 w-full rounded-full bg-aje-cafe py-3 text-center text-xs tracking-wide-label text-aje-paper"
          >
            {t('nav.agendar').toUpperCase()}
          </a>
        </nav>
      )}
    </header>
  );
}
