import { useTranslation } from 'react-i18next';
import { CoverflowCarousel } from './CoverflowCarousel';
import { STEP_PHOTOS } from '../data/images';

export default function ComoFunciona() {
  const { t } = useTranslation();

  const STEPS = [
    { title: t('steps.primeiroContato.title'), subtitle: t('steps.primeiroContato.subtitle'), ...STEP_PHOTOS.primeiroContato },
    { title: t('steps.selecaoVisita.title'), subtitle: t('steps.selecaoVisita.subtitle'), ...STEP_PHOTOS.selecaoVisita },
    { title: t('steps.topografia.title'), subtitle: t('steps.topografia.subtitle'), ...STEP_PHOTOS.topografia },
    { title: t('steps.advogado.title'), subtitle: t('steps.advogado.subtitle'), ...STEP_PHOTOS.advogado },
    { title: t('steps.assinatura.title'), subtitle: t('steps.assinatura.subtitle'), ...STEP_PHOTOS.assinatura },
  ];

  return (
    <section id="como-funciona" className="bg-aje-paper-soft/50 backdrop-blur-sm px-6 py-14 md:py-24">
      <div className="mx-auto max-w-5xl text-center">
        <span className="inline-flex items-center gap-3 text-sm font-medium tracking-[0.35em] text-aje-cafe-soft md:text-base">
          <span className="h-px w-8 bg-aje-cafe/60" aria-hidden="true" />
          {t('sections.comoFunciona.eyebrow').toUpperCase()}
            <span className="h-px w-8 bg-aje-cafe/60" aria-hidden="true" />
        </span>
        <h2 className="section-title mt-5 text-balance">
          {t('sections.comoFunciona.title')}
        </h2>

        <div className="mt-10">
          <CoverflowCarousel slides={STEPS} showCaption showNavigation />
        </div>

        <p className="mt-2 text-xs tracking-wide text-aje-ink-dim/60">
          {t('sections.comoFunciona.dica')}
        </p>
      </div>
    </section>
  );
}
