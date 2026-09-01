import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import InteractiveAvatar from './InteractiveAvatar';

export default function ApoioJuridicoHero() {
  const { t } = useTranslation();
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    // Pequeno delay para disparar a animação de entrada suave
    const t = window.setTimeout(() => setEntered(true), 80);
    return () => window.clearTimeout(t);
  }, []);

  return (
    <section
      id="apoio-juridico"
      className="relative w-full overflow-hidden bg-aje-paper-soft px-6 py-16 md:py-0"
      style={{ minHeight: '70svh' }}
    >
      <div className="mx-auto flex h-full max-w-6xl flex-col items-center gap-10 md:min-h-[70svh] md:flex-row md:justify-between md:gap-12">
        {/* Texto */}
        <div
          className={`order-2 max-w-lg text-center transition-all duration-700 md:order-1 md:text-left ${
            entered ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
          }`}
        >
          <span className="inline-flex items-center gap-3 text-sm font-medium tracking-[0.35em] text-aje-cafe-soft md:text-base">
            <span className="h-px w-8 bg-aje-cafe/60" aria-hidden="true" />
            {t('sections.apoioJuridico.eyebrow').toUpperCase()}
            <span className="h-px w-8 bg-aje-cafe/60" aria-hidden="true" />
          </span>

          <h2 className="section-title mt-5">{t('sections.apoioJuridico.title')}</h2>

          <p className="mx-auto mt-6 max-w-md font-light leading-snug text-aje-ink-dim md:mx-0">
            {t('sections.apoioJuridico.body')}
          </p>
        </div>

        {/* Avatar — 9 poses reagindo à posição do cursor */}
        <div
          className={`order-1 flex w-full max-w-xs items-center justify-center transition-all duration-700 md:order-2 md:max-w-md ${
            entered ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
          }`}
        >
          <InteractiveAvatar />
        </div>
      </div>
    </section>
  );
}
