import { useTranslation } from 'react-i18next';
import { CircularGallery } from './CircularGallery';
import { AREAS } from '../data/areas';
import { CITY_PHOTOS } from '../data/images';

const GALLERY_ITEMS = AREAS.map((area) => ({
  image: CITY_PHOTOS[area],
  text: area,
}));

export default function OndeAtuamos() {
  const { t } = useTranslation();
  return (
    <section id="onde-atuamos" className="bg-transparent px-6 py-14 md:py-24">
      <div className="mx-auto max-w-5xl text-center">
        <span className="inline-flex items-center gap-3 text-sm font-medium tracking-[0.35em] text-aje-cafe-soft md:text-base">
          <span className="h-px w-8 bg-aje-cafe/60" aria-hidden="true" />
          {t('sections.ondeAtuamos.eyebrow').toUpperCase()}
            <span className="h-px w-8 bg-aje-cafe/60" aria-hidden="true" />
        </span>

        <h2 className="section-title-tight mt-5">
          Do litoral potiguar
          <br />
          ao Nordeste inteiro.
        </h2>

        <div className="mt-10 h-[420px] w-full md:h-[500px]">
          <CircularGallery items={GALLERY_ITEMS} bend={2.5} borderRadius={0.06} scrollEase={0.04} />
        </div>

        <p className="mt-2 text-xs tracking-wide text-aje-ink-dim/60">
          Arraste para navegar entre as cidades
        </p>

        <p className="mt-8 inline-flex items-center gap-2 text-xs tracking-wide-label text-aje-cafe-soft">
          <span className="h-1.5 w-1.5 rounded-full bg-aje-cafe" aria-hidden="true" />
          EM EXPANSÃO PELO NORDESTE BRASILEIRO
        </p>
      </div>
    </section>
  );
}
