import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { PROPERTIES, getPropertySlug } from '../data/properties';
import { AREAS } from '../data/areas';
import LocalImage from './LocalImage';

// Os nomes/rótulos dos filtros ficam SEMPRE em português, mesmo com outro
// idioma selecionado no site — pedido explícito do cliente.
const TYPES = ['Todos', 'Venda', 'Aluguel', 'Terreno', 'Outros'];
const RENTAL_PERIODS = ['Anual', 'Diária', 'Temporada'];

const PRICE_BANDS = [
  { id: 'all', label: 'Todas as faixas' },
  { id: '100-300', label: 'R$ 100 – R$ 300', test: (v) => v >= 100 && v < 300 },
  { id: '300-1000', label: 'R$ 300 – R$ 1.000', test: (v) => v >= 300 && v < 1000 },
  { id: '1000-300k', label: 'R$ 1.000 – R$ 300 mil', test: (v) => v >= 1000 && v < 300000 },
  { id: '300k-700k', label: 'R$ 300 mil – R$ 700 mil', test: (v) => v >= 300000 && v < 700000 },
  { id: '700k-1.5m', label: 'R$ 700 mil – R$ 1,5 milhão', test: (v) => v >= 700000 && v < 1500000 },
  { id: 'gt1.5m', label: 'Acima de R$ 1,5 milhão', test: (v) => v >= 1500000 },
];

function PropertyCard({ property }) {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <Link
      to={`/${getPropertySlug(property)}`}
      onTouchStart={() => setShowDetails(true)}
      className="group relative aspect-[4/5] w-full overflow-hidden rounded-sm text-left"
    >
      <LocalImage
        src={property.photos[0].src}
        fallback={property.photos[0].fallback}
        alt={`${property.title} — ${property.city}`}
        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        loading="lazy"
      />

      {/* Escurece a imagem no hover para que o texto fique legível para todos */}
      <div
        className={`absolute inset-0 bg-gradient-to-t from-aje-black/95 via-aje-black/25 to-transparent transition-all duration-300 md:from-aje-black/80 md:via-aje-black/5 md:group-hover:from-aje-black/95 md:group-hover:via-aje-black/30 ${
          showDetails ? 'from-aje-black/95 via-aje-black/25' : ''
        }`}
      />

      <div
        className={`absolute inset-x-0 bottom-0 p-5 transition-transform duration-300 md:translate-y-6 md:group-hover:translate-y-0 ${
          showDetails ? 'translate-y-0' : ''
        }`}
      >
        <p className="text-[10px] tracking-wide-label text-aje-cafe-soft">
          {property.type.toUpperCase()}
          {property.rentalPeriod ? ` · ${property.rentalPeriod.toUpperCase()}` : ''}
        </p>
        <p className="mt-1 font-display text-lg text-white">{property.title}</p>
        <p className="text-sm font-light text-white/75">{property.city}</p>

        {/* Extra: só aparece no hover (desktop) ou toque (mobile) */}
        <div
          className={`mt-2 flex items-center gap-3 text-xs font-light text-white/90 opacity-0 transition-opacity duration-300 md:group-hover:opacity-100 ${
            showDetails ? 'opacity-100' : ''
          }`}
        >
          <span>{property.area}</span>
          <span className="text-aje-cafe-soft">·</span>
          <span>{property.priceLabel}</span>
        </div>
      </div>
    </Link>
  );
}

export default function Imoveis() {
  const { t } = useTranslation();
  const [location, setLocation] = useState('Todas');
  const [type, setType] = useState('Todos');
  const [rentalPeriod, setRentalPeriod] = useState('Todos');
  const [priceBand, setPriceBand] = useState('all');

  const filtered = useMemo(() => {
    const band = PRICE_BANDS.find((b) => b.id === priceBand);
    return PROPERTIES.filter((p) => {
      if (location !== 'Todas' && p.city !== location) return false;
      if (type !== 'Todos' && p.type !== type) return false;
      if (type === 'Aluguel' && rentalPeriod !== 'Todos' && p.rentalPeriod !== rentalPeriod) return false;
      if (band && band.test && !band.test(p.priceValue)) return false;
      return true;
    });
  }, [location, type, rentalPeriod, priceBand]);

  return (
    <section id="imoveis" className="bg-transparent px-6 py-14 md:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <span className="inline-flex items-center gap-3 text-sm font-medium tracking-[0.35em] text-aje-cafe-soft md:text-base">
            <span className="h-px w-8 bg-aje-cafe/60" aria-hidden="true" />
            {t('sections.imoveis.eyebrow').toUpperCase()}
            <span className="h-px w-8 bg-aje-cafe/60" aria-hidden="true" />
          </span>
          <h2 className="section-title mt-5 text-balance">{t('sections.imoveis.title')}</h2>
        </div>

        {/* Filtros — rótulos sempre em português */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="rounded-full border-2 border-aje-turquoise/50 bg-aje-paper px-6 py-3 text-sm font-medium tracking-wide text-aje-ink outline-none transition-all hover:border-aje-turquoise focus:border-aje-turquoise focus:ring-2 focus:ring-aje-turquoise/20"
          >
            <option value="Todas">Todas as localizações</option>
            {AREAS.map((area) => (
              <option key={area} value={area}>
                {area}
              </option>
            ))}
          </select>

          <select
            value={type}
            onChange={(e) => {
              setType(e.target.value);
              setRentalPeriod('Todos');
            }}
            className="rounded-full border-2 border-aje-turquoise/50 bg-aje-paper px-6 py-3 text-sm font-medium tracking-wide text-aje-ink outline-none transition-all hover:border-aje-turquoise focus:border-aje-turquoise focus:ring-2 focus:ring-aje-turquoise/20"
          >
            {TYPES.map((typeOption) => (
              <option key={typeOption} value={typeOption}>
                {typeOption === 'Todos' ? 'Todos os tipos' : typeOption}
              </option>
            ))}
          </select>

          {/* Submenu — só aparece quando o tipo selecionado é Aluguel */}
          {type === 'Aluguel' && (
            <select
              value={rentalPeriod}
              onChange={(e) => setRentalPeriod(e.target.value)}
              className="rounded-full border-2 border-aje-turquoise/50 bg-aje-paper px-6 py-3 text-sm font-medium tracking-wide text-aje-ink outline-none transition-all hover:border-aje-turquoise focus:border-aje-turquoise focus:ring-2 focus:ring-aje-turquoise/20"
            >
              <option value="Todos">Todos os períodos</option>
              {RENTAL_PERIODS.map((period) => (
                <option key={period} value={period}>
                  {period.toUpperCase()}
                </option>
              ))}
            </select>
          )}

          <select
            value={priceBand}
            onChange={(e) => setPriceBand(e.target.value)}
            className="rounded-full border-2 border-aje-turquoise/50 bg-aje-paper px-6 py-3 text-sm font-medium tracking-wide text-aje-ink outline-none transition-all hover:border-aje-turquoise focus:border-aje-turquoise focus:ring-2 focus:ring-aje-turquoise/20"
          >
            {PRICE_BANDS.map((b) => (
              <option key={b.id} value={b.id}>
                {b.label}
              </option>
            ))}
          </select>
        </div>

        {filtered.length === 0 ? (
          <p className="mt-16 text-center font-light text-aje-ink-dim">
            {t('filters.semResultados')}
          </p>
        ) : (
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
            {filtered.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
