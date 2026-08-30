import { useTranslation } from 'react-i18next';
import { SITE } from '../data/site';
import SpotlightReveal from './SpotlightReveal';
import { QUEM_SOMOS_PHOTOS } from '../data/images';

export default function QuemSomos() {
  const { t } = useTranslation();
  return (
    <section id="quem-somos" className="bg-transparent">
      <SpotlightReveal
        baseSrc={QUEM_SOMOS_PHOTOS.pipaAntiga}
        revealSrc={QUEM_SOMOS_PHOTOS.pipaAtual}
        className="min-h-[60svh] px-6 py-16 md:py-24"
      >
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-3 text-sm font-medium tracking-[0.35em] text-white/90 md:text-base">
            <span className="h-px w-8 bg-white/60" aria-hidden="true" />
            {t('sections.quemSomos.eyebrow').toUpperCase()}
            <span className="h-px w-8 bg-white/60" aria-hidden="true" />
          </span>

          <h2 className="section-title-tight mt-5 text-aje-cafe-soft">
            {t('sections.quemSomos.tituloLinha1')}
          </h2>

          <p className="mx-auto mt-5 max-w-xl text-base font-light leading-snug text-white/85 md:text-lg">
            {t('sections.quemSomos.somosIntro')} {t('sections.quemSomos.paragrafo1')}
          </p>

          <p className="mx-auto mt-4 max-w-xl text-base font-light leading-snug text-white/85 md:text-lg">
            {t('sections.quemSomos.paragrafo2')}
          </p>

          <p className="mt-8 text-xs tracking-wide-label text-aje-cafe-soft">
            CRECI {SITE.creci}
          </p>

          <p className="mt-10 text-[11px] tracking-wide text-white/50">
            {t('sections.quemSomos.dicaCursor')}
          </p>
        </div>
      </SpotlightReveal>
    </section>
  );
}
