import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Ruler, Wallet } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import LocalImage from '../components/LocalImage';
import ShareButton from '../components/ShareButton';
import { PROPERTIES, getPropertySlug } from '../data/properties';
import { getCategoryForPropertyType, getCategoryUrl } from '../data/categories';
import { whatsappLink } from '../data/site';
import { useSiteLanguage } from '../hooks/useSiteLanguage';
import { applyPageMeta, applyHreflang, applyOpenGraph } from '../utils/seoHead';

const SITE_URL = 'https://www.ajeimobiliaria.com';

const BREADCRUMB_HOME_LABEL = { pt: 'Início', en: 'Home', es: 'Inicio' };
const CATEGORY_SHORT_LABEL = {
  pt: { terreno: 'Terrenos', venda: 'Casas à venda', aluguel: 'Aluguel' },
  en: { terreno: 'Land for sale', venda: 'Homes for sale', aluguel: 'Vacation rentals' },
  es: { terreno: 'Terrenos', venda: 'Casas en venta', aluguel: 'Alquiler' },
};

// Mapas de exibição para cada idioma suportado — os dados continuam em
// português (filtros, nomes de rua etc. não são traduzidos, por pedido da
// cliente). Só o inglês (en) tem URL própria (/en/...) para fins de SEO;
// es/it/fr são apenas tradução visual, sem URL dedicada.
const TYPE_LABELS = {
  en: { Venda: 'For Sale', Aluguel: 'For Rent', Terreno: 'Land', Outros: 'Other' },
  es: { Venda: 'Venta', Aluguel: 'Alquiler', Terreno: 'Terreno', Outros: 'Otros' },
  it: { Venda: 'Vendita', Aluguel: 'Affitto', Terreno: 'Terreno', Outros: 'Altro' },
  fr: { Venda: 'Vente', Aluguel: 'Location', Terreno: 'Terrain', Outros: 'Autre' },
};

const RENTAL_LABELS = {
  en: { Temporada: 'Short-term', Diária: 'Daily', Anual: 'Annual' },
  es: { Temporada: 'Temporada', Diária: 'Diaria', Anual: 'Anual' },
  it: { Temporada: 'Stagionale', Diária: 'Giornaliera', Anual: 'Annuale' },
  fr: { Temporada: 'Saisonnier', Diária: 'Journalier', Anual: 'Annuel' },
};

const WHATSAPP_MESSAGE = {
  pt: (title) => `Olá! Tenho interesse no imóvel "${title}".`,
  en: (title) => `Hello! I'm interested in the property "${title}".`,
  es: (title) => `¡Hola! Estoy interesado/a en el inmueble "${title}".`,
  it: (title) => `Ciao! Sono interessato/a all'immobile "${title}".`,
  fr: (title) => `Bonjour ! Je suis intéressé(e) par le bien "${title}".`,
};

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
    share: 'Compartilhar',
    copyLink: 'Copiar link',
    copied: 'Link copiado!',
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
    share: 'Share',
    copyLink: 'Copy link',
    copied: 'Link copied!',
  },
  es: {
    back: '‹ VOLVER A LOS INMUEBLES',
    area: 'Área',
    price: 'Precio',
    cta: 'CONTÁCTENOS AQUÍ',
    notFoundTitle: 'Inmueble no encontrado',
    notFoundBody: 'El inmueble que busca puede haber sido eliminado o el enlace es incorrecto.',
    notFoundCta: 'VER TODOS LOS INMUEBLES',
    prev: 'Foto anterior',
    next: 'Foto siguiente',
    share: 'Compartir',
    copyLink: 'Copiar enlace',
    copied: '¡Enlace copiado!',
  },
  it: {
    back: '‹ TORNA AGLI IMMOBILI',
    area: 'Superficie',
    price: 'Prezzo',
    cta: 'CONTATTACI QUI',
    notFoundTitle: 'Immobile non trovato',
    notFoundBody: "L'immobile che cerchi potrebbe essere stato rimosso oppure il link non è corretto.",
    notFoundCta: 'VEDI TUTTI GLI IMMOBILI',
    prev: 'Foto precedente',
    next: 'Foto successiva',
    share: 'Condividi',
    copyLink: 'Copia link',
    copied: 'Link copiato!',
  },
  fr: {
    back: '‹ RETOUR AUX BIENS',
    area: 'Surface',
    price: 'Prix',
    cta: 'CONTACTEZ-NOUS ICI',
    notFoundTitle: 'Bien introuvable',
    notFoundBody: "Le bien que vous recherchez a peut-être été retiré, ou le lien est incorrect.",
    notFoundCta: 'VOIR TOUS LES BIENS',
    prev: 'Photo précédente',
    next: 'Photo suivante',
    share: 'Partager',
    copyLink: 'Copier le lien',
    copied: 'Lien copié !',
  },
};

// lang = idioma com URL própria (pt/en/es, SEO, URL /en/... ou /es/...);
// displayLang = idioma de exibição real escolhido pela pessoa
// (pt/en/es/it/fr), só para o texto da página.
function NotFound({ lang, displayLang }) {
  const c = COPY[displayLang] ?? COPY[lang];
  const urlPrefix = lang === 'pt' ? '/' : `/${lang}`;
  return (
    <div>
      <Header forceLight />
      <main className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-6 pt-24 text-center">
        <h1 className="font-display text-2xl text-aje-ink">{c.notFoundTitle}</h1>
        <p className="font-light text-aje-ink-dim">{c.notFoundBody}</p>
        <Link
          to={`${urlPrefix}#imoveis`}
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
  const lang = useSiteLanguage(); // binário pt/en — só para SEO (meta/hreflang/JSON-LD/URL)
  const { t, i18n } = useTranslation();
  // Idioma realmente exibido na tela: pode ser pt/en/es/it/fr, escolhido
  // livremente pela pessoa no seletor — independente da URL /en.
  const displayLang = ['en', 'es', 'it', 'fr'].includes(i18n.language) ? i18n.language : 'pt';
  const c = COPY[displayLang];

  const property = PROPERTIES.find((p) => getPropertySlug(p) === slug);
  const descriptionByLang = {
    pt: property?.description,
    en: property?.descriptionEn ?? property?.description,
    es: property?.descriptionEs ?? property?.description,
    it: property?.descriptionIt ?? property?.description,
    fr: property?.descriptionFr ?? property?.description,
  };
  const description = descriptionByLang[displayLang];
  const highlightByLang = {
    pt: property?.highlight,
    en: property?.highlightEn ?? property?.highlight,
    es: property?.highlightEs ?? property?.highlight,
    it: property?.highlightIt ?? property?.highlight,
    fr: property?.highlightFr ?? property?.highlight,
  };
  const highlight = highlightByLang[displayLang];
  // Só pt/en/es têm versão própria da meta-descrição/JSON-LD (as únicas com
  // URL indexável); it/fr usam a descrição exibida na tela, mas a tag SEO
  // segue o idioma da URL (`lang`), como antes.
  const seoDescription = descriptionByLang[lang] ?? descriptionByLang.pt;

  useEffect(() => {
    if (!property) return undefined;

    const titleSuffix = { pt: '', en: ', Brazil', es: ', Brasil' }[lang] ?? '';
    const title = `${property.title} — ${property.city}${titleSuffix} | Ajé Imobiliária`;

    // Para a meta-tag (e o JSON-LD) usamos uma versão "achatada" da descrição,
    // sem quebras de linha nem marcadores — esses só fazem sentido no texto
    // visível da página, não numa tag de uma linha só. Segue sempre o idioma
    // da URL (pt/en/es), os únicos indexáveis pelo Google.
    const flatDescription = (seoDescription ?? '')
      .replace(/[•\n]+/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
    const metaSuffix = {
      pt: `Fale com a Ajé Imobiliária em ${property.city}.`,
      en: `Contact Ajé Imobiliária in ${property.city}, Brazil.`,
      es: `Contacte a Ajé Imobiliária en ${property.city}, Brasil.`,
    }[lang];
    const metaDescriptionText = `${flatDescription} ${property.area} — ${property.priceLabel}. ${metaSuffix}`.trim();

    const cleanupMeta = applyPageMeta({ title, description: metaDescriptionText });

    const slugPt = getPropertySlug(property);
    const pageUrl = `${SITE_URL}/${lang === 'pt' ? '' : `${lang}/`}${slugPt}`;
    const ogLocale = { pt: 'pt_BR', en: 'en_US', es: 'es_ES' }[lang] ?? 'pt_BR';
    const firstPhoto = property.photos?.[0]?.src;
    const cleanupOg = applyOpenGraph({
      url: pageUrl,
      title,
      description: metaDescriptionText,
      image: firstPhoto ? `${SITE_URL}${firstPhoto}` : undefined,
      locale: ogLocale,
    });

    const cleanupHreflang = applyHreflang([
      { hreflang: 'pt-BR', href: `${SITE_URL}/${slugPt}` },
      { hreflang: 'en', href: `${SITE_URL}/en/${slugPt}` },
      { hreflang: 'es', href: `${SITE_URL}/es/${slugPt}` },
      { hreflang: 'x-default', href: `${SITE_URL}/${slugPt}` },
    ]);

    // Remove um JSON-LD anterior antes de adicionar o novo — evita duplicar
    // caso o efeito rode mais de uma vez para a mesma página.
    document.getElementById('property-jsonld')?.remove();
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
        url: `${SITE_URL}/${lang === 'pt' ? '' : `${lang}/`}${slugPt}`,
      },
      address: {
        '@type': 'PostalAddress',
        addressLocality: property.city,
        addressRegion: 'RN',
        addressCountry: 'BR',
      },
    });
    document.head.appendChild(script);

    // Breadcrumb JSON-LD — ajuda o Google a mostrar o caminho (Início ›
    // Categoria › Imóvel) nos resultados de busca, e reforça pra ele que
    // esta página pertence à categoria do imóvel.
    const homeUrl = `${SITE_URL}/${lang === 'pt' ? '' : lang}`;
    const category = getCategoryForPropertyType(property.type);
    const breadcrumbItems = [{ '@type': 'ListItem', position: 1, name: BREADCRUMB_HOME_LABEL[lang] ?? BREADCRUMB_HOME_LABEL.pt, item: homeUrl }];
    if (category) {
      breadcrumbItems.push({
        '@type': 'ListItem',
        position: 2,
        name: CATEGORY_SHORT_LABEL[lang]?.[category.key] ?? CATEGORY_SHORT_LABEL.pt[category.key],
        item: getCategoryUrl(category, lang, SITE_URL),
      });
    }
    breadcrumbItems.push({ '@type': 'ListItem', position: breadcrumbItems.length + 1, name: property.title, item: pageUrl });

    document.getElementById('property-breadcrumb-jsonld')?.remove();
    const breadcrumbScript = document.createElement('script');
    breadcrumbScript.type = 'application/ld+json';
    breadcrumbScript.id = 'property-breadcrumb-jsonld';
    breadcrumbScript.text = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: breadcrumbItems,
    });
    document.head.appendChild(breadcrumbScript);

    return () => {
      cleanupMeta();
      cleanupOg();
      cleanupHreflang();
      document.getElementById('property-jsonld')?.remove();
      document.getElementById('property-breadcrumb-jsonld')?.remove();
    };
  }, [property, lang, seoDescription]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!property) {
    return <NotFound lang={lang} displayLang={displayLang} />;
  }

  const photo = property.photos[activePhoto];
  const backPrefix = lang === 'pt' ? '/' : `/${lang}`;
  const category = getCategoryForPropertyType(property.type);
  const categoryHref = category
    ? `${lang === 'pt' ? '' : `/${lang}`}/${category.slugs[lang] ?? category.slugs.pt}`
    : null;
  const categoryLabel = category ? CATEGORY_SHORT_LABEL[lang]?.[category.key] ?? CATEGORY_SHORT_LABEL.pt[category.key] : null;

  return (
    <div>
      <Header forceLight />

      <main className="px-6 pb-20 pt-24 md:pt-28">
        <div className="mx-auto max-w-4xl">
          {/* Breadcrumb visível — além do JSON-LD, dá ao visitante (e ao
              Google navegando o site) um caminho claro de volta pra
              categoria do imóvel, algo que antes só existia no sitemap. */}
          {category && (
            <nav aria-label="breadcrumb" className="mb-2 flex flex-wrap items-center gap-1.5 text-xs text-aje-cafe-soft">
              <Link to={backPrefix} className="hover:text-aje-cafe">
                {BREADCRUMB_HOME_LABEL[lang] ?? BREADCRUMB_HOME_LABEL.pt}
              </Link>
              <span aria-hidden="true">›</span>
              <Link to={categoryHref} className="hover:text-aje-cafe">
                {categoryLabel}
              </Link>
              <span aria-hidden="true">›</span>
              <span className="text-aje-ink-dim">{property.title}</span>
            </nav>
          )}

          <Link
            to={`${backPrefix}#imoveis`}
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
                  <LocalImage
                    src={p.src}
                    fallback={p.fallback}
                    alt={`${property.title} — ${property.city} — foto ${index + 1}`}
                    className="h-full w-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}

          {/* Informações */}
          <div className="mt-8">
            <div className="flex flex-wrap items-center gap-2">
              <p className="text-xs tracking-wide-label text-aje-cafe-soft">
                {displayLang === 'pt'
                  ? property.type.toUpperCase()
                  : (TYPE_LABELS[displayLang]?.[property.type] ?? property.type).toUpperCase()}
                {property.rentalPeriod
                  ? ` · ${(
                      displayLang === 'pt'
                        ? property.rentalPeriod.toUpperCase()
                        : (RENTAL_LABELS[displayLang]?.[property.rentalPeriod] ?? property.rentalPeriod).toUpperCase()
                    )}`
                  : ''}
              </p>
              {property.featured && (
                <span className="rounded-full border border-aje-cafe/40 bg-aje-cafe/10 px-2.5 py-0.5 text-[10px] font-medium tracking-wide-label text-aje-cafe">
                  {t('badges.featured').toUpperCase()}
                </span>
              )}
            </div>
            {/* Tipografia "palito" (sans-serif, Inter) em vez da fonte de
                display serifada — pedido explícito da cliente só para este
                título dentro da ficha do imóvel (os cards da grade ficam
                como estavam, com a fonte de display). */}
            <h1 className="mt-2 font-body text-3xl font-bold uppercase tracking-tight text-aje-ink md:text-4xl">
              {property.title}
            </h1>
            <p className="mt-1 font-light text-aje-ink-dim">
              {property.city}
              {{ pt: '', en: ', Brazil', es: ', Brasil', it: ', Brasile', fr: ', Brésil' }[displayLang]}
            </p>

            {highlight && (
              <div className="relative mt-4 inline-block max-w-xl">
                {/* Retângulo difuminado atrás do texto — dá o efeito de
                    "glow" suave pedido pela cliente */}
                <span className="absolute inset-0 -z-10 rounded-2xl bg-aje-cafe/25 blur-xl" aria-hidden="true" />
                <p className="rounded-2xl bg-aje-paper/80 px-5 py-3 text-sm font-semibold uppercase tracking-wide text-aje-cafe shadow-sm ring-1 ring-aje-cafe/25 backdrop-blur-sm md:text-base">
                  {highlight.toUpperCase()}
                </p>
              </div>
            )}

            {description && (
              <p className="mt-4 max-w-2xl whitespace-pre-line font-light leading-relaxed text-aje-ink-dim">
                {description}
              </p>
            )}

            <div className="mt-6 flex flex-wrap items-end justify-between gap-6 border-t border-aje-cafe/15 pt-6">
              <div className="flex gap-8 text-sm">
                <div>
                  <p className="flex items-center gap-1.5 text-aje-ink-dim">
                    <Ruler className="h-3.5 w-3.5 text-aje-cafe-soft" aria-hidden="true" />
                    {c.area}
                  </p>
                  <p className="font-display text-aje-ink">{property.area}</p>
                </div>
                <div>
                  <p className="flex items-center gap-1.5 text-aje-ink-dim">
                    <Wallet className="h-3.5 w-3.5 text-aje-cafe-soft" aria-hidden="true" />
                    {c.price}
                  </p>
                  <p
                    className={
                      property.priceOriginal
                        ? 'font-display text-xl font-semibold text-aje-cafe md:text-2xl'
                        : 'font-display text-aje-ink'
                    }
                  >
                    {property.priceLabel}
                  </p>
                  {property.priceOriginal && (
                    <p className="text-xs text-aje-ink-dim line-through">{property.priceOriginal}</p>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <ShareButton
                  title={`${property.title} — ${property.city}`}
                  url={typeof window !== 'undefined' ? window.location.href : `${SITE_URL}/${slug}`}
                  labels={c}
                />
                <a
                  href={whatsappLink(
                    (WHATSAPP_MESSAGE[displayLang] ?? WHATSAPP_MESSAGE.pt)(property.title)
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
        </div>
      </main>

      <Footer />
    </div>
  );
}
