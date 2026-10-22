import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { PropertyCard } from '../components/Imoveis';
import { PROPERTIES } from '../data/properties';
import { CATEGORIES, getCategoryUrl } from '../data/categories';
import { useSiteLanguage } from '../hooks/useSiteLanguage';
import { applyPageMeta, applyHreflang, applyOpenGraph } from '../utils/seoHead';

const SITE_URL = 'https://www.ajeimobiliaria.com';

const COPY = {
  pt: { back: '‹ VOLTAR PARA O SITE', faqTitle: 'Perguntas frequentes', empty: 'Nenhum imóvel disponível nesta categoria no momento.' },
  en: { back: '‹ BACK TO SITE', faqTitle: 'Frequently asked questions', empty: 'No properties available in this category right now.' },
  es: { back: '‹ VOLVER AL SITIO', faqTitle: 'Preguntas frecuentes', empty: 'No hay inmuebles disponibles en esta categoría por el momento.' },
};

// categoryKey identifica QUAL categoria renderizar (uma rota por idioma
// aponta pra cá, igual ao padrão já usado em HomePage/Somos).
export default function CategoryPage({ categoryKey }) {
  const lang = useSiteLanguage(); // pt/en/es — único idioma com URL própria aqui
  const category = CATEGORIES.find((c) => c.key === categoryKey);
  const c = COPY[lang] ?? COPY.pt;

  const properties = PROPERTIES.filter((p) => p.type === category?.propertyType);

  useEffect(() => {
    if (!category) return undefined;

    const cleanupMeta = applyPageMeta({
      title: category.metaTitle[lang] ?? category.metaTitle.pt,
      description: category.metaDescription[lang] ?? category.metaDescription.pt,
    });

    const pageUrl = getCategoryUrl(category, lang, SITE_URL);
    const ogLocale = { pt: 'pt_BR', en: 'en_US', es: 'es_ES' }[lang] ?? 'pt_BR';
    const cleanupOg = applyOpenGraph({
      url: pageUrl,
      title: category.metaTitle[lang] ?? category.metaTitle.pt,
      description: category.metaDescription[lang] ?? category.metaDescription.pt,
      image: `${SITE_URL}/images/aje-logo.png`,
      locale: ogLocale,
    });

    const cleanupHreflang = applyHreflang([
      { hreflang: 'pt-BR', href: getCategoryUrl(category, 'pt', SITE_URL) },
      { hreflang: 'en', href: getCategoryUrl(category, 'en', SITE_URL) },
      { hreflang: 'es', href: getCategoryUrl(category, 'es', SITE_URL) },
      { hreflang: 'x-default', href: getCategoryUrl(category, 'pt', SITE_URL) },
    ]);

    return () => {
      cleanupMeta();
      cleanupOg();
      cleanupHreflang();
    };
  }, [category, lang]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [categoryKey]);

  if (!category) return null;

  const faq = category.faq[lang] ?? category.faq.pt;
  const homeHref = lang === 'pt' ? '/' : `/${lang}`;

  return (
    <div>
      <Header forceLight />

      <main className="px-6 pb-20 pt-24 md:pt-28">
        <div className="mx-auto max-w-6xl">
          <Link
            to={homeHref}
            className="inline-flex items-center gap-2 text-xs tracking-wide-label text-aje-cafe-soft hover:text-aje-cafe"
          >
            {c.back}
          </Link>

          <h1 className="section-title mt-6 max-w-3xl text-balance">{category.h1[lang] ?? category.h1.pt}</h1>

          <p className="mt-5 max-w-2xl whitespace-pre-line font-light leading-relaxed text-aje-ink-dim">
            {category.intro[lang] ?? category.intro.pt}
          </p>

          {properties.length === 0 ? (
            <p className="mt-16 text-center font-light text-aje-ink-dim">{c.empty}</p>
          ) : (
            <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
              {properties.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          )}

          {/* FAQ — texto curto e real, não só pra "encher" a página com
              palavras-chave; ajuda quem está decidindo e dá ao Google um
              motivo a mais pra mostrar esta página com rich results. */}
          <div className="mt-16 max-w-2xl border-t border-aje-cafe/15 pt-10">
            <h2 className="font-display text-xl text-aje-ink">{c.faqTitle}</h2>
            <div className="mt-6 space-y-6">
              {faq.map((item) => (
                <div key={item.q}>
                  <p className="font-medium text-aje-ink">{item.q}</p>
                  <p className="mt-1.5 font-light leading-relaxed text-aje-ink-dim">{item.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
