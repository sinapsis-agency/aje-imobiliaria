import { useTranslation } from 'react-i18next';
import ServicosGallery from './ServicosGallery';

export default function Servicos() {
  const { t } = useTranslation();
  return (
    <section id="servicos" className="bg-aje-paper-soft/50 backdrop-blur-sm px-6 py-14 md:py-24">
      <div className="mx-auto max-w-6xl text-center">
        <span className="inline-flex items-center gap-3 text-sm font-medium tracking-[0.35em] text-aje-cafe-soft md:text-base">
          <span className="h-px w-8 bg-aje-cafe/60" aria-hidden="true" />
          {t('sections.servicos.eyebrow').toUpperCase()}
            <span className="h-px w-8 bg-aje-cafe/60" aria-hidden="true" />
        </span>
        <h2 className="section-title mt-5 text-balance">{t('sections.servicos.title')}</h2>

        <div className="mt-12">
          <ServicosGallery />
        </div>
      </div>
    </section>
  );
}
