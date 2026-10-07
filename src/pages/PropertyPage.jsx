import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import LocalImage from '../components/LocalImage';
import { PROPERTIES, getPropertySlug } from '../data/properties';
import { whatsappLink } from '../data/site';
import { useSiteLanguage } from '../hooks/useSiteLanguage';
import { applyPageMeta, applyHreflang } from '../utils/seoHead';

const SITE_URL = 'https://www.ajeimobiliaria.com';

// Só para exibição na página em inglês — os dados continuam em português
// (filtros, nomes de rua etc. não são traduzidos, por pedido da cliente).
const TYPE_EN = { Venda: 'For Sale', Aluguel: 'For Rent', Terreno: 'Land', Outros: 'Other' };
const RENTAL_EN = { Temporada: 'Short-term', Diária: 'Daily', Anual: 'Annual' };

const COPY = {
  pt: {
    back: '‹ VOLTAR PARA IMÓVEIS',
    area: 'Área',
    price: 'Valor',
    cta: 'CONTATE-NOS AQUI',
    notFoundTitle: 'Imóvel não encontrado',
    notFoundBody: 'O imóvel que você procura pode ter sido removido ou o link está incorreto.',
    notFoundCta: 'VER TODOS OS IMÓVEIS',
    prev: 'Foto anterior',
    next: 'Próxima foto',
  },
  en: {
    back: '‹ BACK TO PROPERTIES',
    area: 'Area',
    price: 'Price',
    cta: 'CONTACT US',
    notFoundTitle: 'Property not found',
    notFoundBody: 'The property you are looking for may have been removed, or the link is incorrect.',
    notFoundCta: 'VIEW ALL PROPERTIES',
    prev: 'Previous photo',
    next: 'Next photo',
  },
};

function NotFound({ lang }) {
  const c = COPY[lang];
  return (
    <div>
      <Header forceLight />
      <main className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-6 pt-24 text-center">
        <h1 className="font-display text-2xl text-aje-ink">{c.notFoundTitle}</h1>
        <p className="font-light text-aje-ink-dim">{c.notFoundBody}</p>
        <Link
          to={lang === 'en' ? '/en#imoveis' : '/#imoveis'}
          className="mt-2 rounded-full bg-aje-cafe px-6 py-3 text-xs tracking-wide-label text-aje-paper transition-opacity hover:opacity-90"
        >
          {c.notFoundCta}
        </Link>
      </main>
      <Footer />
    </div>
  );
}

export default function PropertyPage() {
  const { slug } = useParams();
  const [activePhoto, setActivePhoto] = useState(0);
  const lang = useSiteLanguage();
  const c = COPY[lang];

  const property = PROPERTIES.find((p) => getPropertySlug(p) === slug);
  const description = lang === 'en' ? property?.descriptionEn ?? property?.description : property?.description;

  useEffect(() => {
    if (!property) return undefined;

    const title =
      lang === 'en'
        ? `${property.title} — ${property.city}, Brazil | Ajé Imobiliária`
        : `${property.title} — ${property.city} | Ajé Imobiliária`;

    // Para a meta-tag (e o JSON-LD) usamos uma versão "achatada" da descrição,
    // sem quebras de linha nem marcadores — esses só fazem sentido no texto
    // visível da página, não numa tag de uma linha só.
    const flatDescription = (description ?? '')
      .replace(/[•\n]+/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
    const metaDescriptionText =
      lang === 'en'
        ? `${flatDescription} ${property.area} — ${property.priceLabel}. Contact Ajé Imobiliária in ${property.city}, Brazil.`.trim()
        : `${flatDescription} ${property.area} — ${property.priceLabel}. Fale com a Ajé Imobiliária em ${property.city}.`.trim();

    const cleanupMeta = applyPageMeta({ title, description: metaDescriptionText });

    const slugPt = getPropertySlug(property);
    const cleanupHreflang = applyHreflang([
      { hreflang: 'pt-BR', href: `${SITE_URL}/${slugPt}` },
      { hreflang: 'en', href: `${SITE_URL}/en/${slugPt}` },
      { hreflang: 'x-default', href: `${SITE_URL}/${slugPt}` },
    ]);

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = 'property-jsonld';
    script.text = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: property.title,
      description: flatDescription || metaDescriptionText,
      image: property.photos.map((photo) => `${SITE_URL}${photo.src}`),
      offers: {
        '@type': 'Offer',
        price: property.priceValue ?? undefined,
        priceCurrency: 'BRL',
        availability: 'https://schema.org/InStock',
        url: `${SITE_URL}/${lang === 'en' ? 'en/' : ''}${slugPt}`,
      },
      address: {
        '@type': 'PostalAddress',
        addressLocality: property.city,
        addressRegion: 'RN',
        addressCountry: 'BR',
      },
    });
    document.head.appendChild(script);

    return () => {
      cleanupMeta();
      cleanupHreflang();
      document.getElementById('property-jsonld')?.remove();
    };
  }, [property, lang, description]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!property) {
    return <NotFound lang={lang} />;
  }

  const photo = property.photos[activePhoto];

  return (
    <div>
      <Header forceLight />

      <main className="px-6 pb-20 pt-24 md:pt-28">
        <div className="mx-auto max-w-4xl">
          <Link
            to={lang === 'en' ? '/en#imoveis' : '/#imoveis'}
            className="inline-flex items-center gap-2 text-xs tracking-wide-label text-aje-cafe-soft hover:text-aje-cafe"
          >
            {c.back}
          </Link>

          {/* Galeria principal */}
          <div className="relative mt-6">
            <LocalImage
              src={photo.src}
              fallback={photo.fallback}
              alt={`${property.title} — ${property.city}`}
              className="aspect-[3/2] w-full rounded-sm object-cover"
            />

            {property.photos.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={() =>
                    setActivePhoto((i) => (i === 0 ? property.photos.length - 1 : i - 1))
                  }
                  aria-label={c.prev}
                  className="absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-aje-ink/60 text-white transition-colors hover:bg-aje-ink/85"
                >
                  ‹
                </button>
                <button
                  type="button"
                  onClick={() => setActivePhoto((i) => (i + 1) % property.photos.length)}
                  aria-label={c.next}
                  className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-aje-ink/60 text-white transition-colors hover:bg-aje-ink/85"
                >
                  ›
                </button>
                <span className="absolute bottom-3 right-3 rounded-full bg-aje-ink/60 px-2.5 py-1 text-[11px] text-white">
                  {activePhoto + 1} / {property.photos.length}
                </span>
              </>
            )}
          </div>

          {property.photos.length > 1 && (
            <div className="mt-4 flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
              {property.photos.map((p, index) => (
                <button
                  key={p.src}
                  type="button"
                  onClick={() => setActivePhoto(index)}
                  className={`h-16 w-16 shrink-0 overflow-hidden border ${
                    index === activePhoto ? 'border-aje-cafe' : 'border-transparent opacity-60'
                  }`}
                >
                  <LocalImage src={p.src} fallback={p.fallback} alt="" className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          )}

          {/* Informações */}
          <div className="mt-8">
            <p className="text-xs tracking-wide-label text-aje-cafe-soft">
              {lang === 'en' ? TYPE_EN[property.type] ?? property.type : property.type.toUpperCase()}
              {property.rentalPeriod
                ? ` · ${
                    lang === 'en'
                      ? RENTAL_EN[property.rentalPeriod] ?? property.rentalPeriod
                      : property.rentalPeriod.toUpperCase()
                  }`
                : ''}
            </p>
            <h1 className="mt-2 font-display text-3xl text-aje-ink md:text-4xl">{property.title}</h1>
            <p className="mt-1 font-light text-aje-ink-dim">
              {property.city}
              {lang === 'en' ? ', Brazil' : ''}
            </p>

            {description && (
              <p className="mt-4 max-w-2xl whitespace-pre-line font-light leading-relaxed text-aje-ink-dim">
                {description}
              </p>
            )}

            <div className="mt-6 flex flex-wrap items-end justify-between gap-6 border-t border-aje-cafe/15 pt-6">
              <div className="flex gap-8 text-sm">
                <div>
                  <p className="text-aje-ink-dim">{c.area}</p>
                  <p className="font-display text-aje-ink">{property.area}</p>
                </div>
                <div>
                  <p className="text-aje-ink-dim">{c.price}</p>
                  <p className="font-display text-aje-ink">{property.priceLabel}</p>
                </div>
              </div>

              <a
                href={whatsappLink(
                  lang === 'en'
                    ? `Hello! I'm interested in the property "${property.title}".`
                    : `Olá! Tenho interesse no imóvel "${property.title}".`
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-aje-cafe px-6 py-3 text-xs tracking-wide-label text-aje-paper transition-opacity hover:opacity-90"
              >
                {c.cta}
              </a>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
