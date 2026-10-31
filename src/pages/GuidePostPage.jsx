import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import LocalImage from '../components/LocalImage';
import ArticleBody from '../components/ArticleBody';
import { PropertyCard } from '../components/Imoveis';
import { PROPERTIES } from '../data/properties';
import {
  GUIDE,
  LANGS,
  visiblePosts,
  postHasLang,
  postLangs,
  getGuideUrl,
  getPostUrl,
} from '../data/guide';
import { whatsappLink } from '../data/site';
import { useSiteLanguage } from '../hooks/useSiteLanguage';
import { applyPageMeta, applyHreflang, applyOpenGraph } from '../utils/seoHead';

const SITE_URL = 'https://www.ajeimobiliaria.com';
const LOCALE = { pt: 'pt-BR', en: 'en-US', es: 'es-ES' };
const HOME_LABEL = { pt: 'Início', en: 'Home', es: 'Inicio' };
const COPY = {
  pt: {
    related: 'Imóveis relacionados',
    ctaTitle: 'Quer saber mais sobre Pipa ou sobre algum imóvel?',
    ctaBody: 'Fale com a Ajé Imobiliária — são 35 anos de experiência local.',
    cta: 'Falar pelo WhatsApp',
    wa: 'Olá! Li um artigo no site e gostaria de saber mais sobre Pipa.',
    notFound: 'Artigo não encontrado.',
  },
  en: {
    related: 'Related properties',
    ctaTitle: 'Want to know more about Pipa or a property?',
    ctaBody: 'Talk to Ajé Imobiliária — 35 years of local experience.',
    cta: 'Message us on WhatsApp',
    wa: 'Hello! I read an article on your site and would like to know more about Pipa.',
    notFound: 'Article not found.',
  },
  es: {
    related: 'Inmuebles relacionados',
    ctaTitle: '¿Quieres saber más sobre Pipa o sobre algún inmueble?',
    ctaBody: 'Habla con Ajé Imobiliária — 35 años de experiencia local.',
    cta: 'Escribir por WhatsApp',
    wa: '¡Hola! Leí un artículo en su sitio y me gustaría saber más sobre Pipa.',
    notFound: 'Artículo no encontrado.',
  },
};

export default function GuidePostPage() {
  const { postSlug } = useParams();
  const lang = useSiteLanguage();
  const c = COPY[lang] ?? COPY.pt;
  const post = visiblePosts().find((p) => p.slugs[lang] === postSlug && postHasLang(p, lang));

  useEffect(() => {
    if (!post) return undefined;
    const content = post[lang];
    const url = getPostUrl(post, lang, SITE_URL);
    const title = `${content.title} | Ajé Imobiliária`;
    const image = post.image ? `${SITE_URL}${post.image}` : `${SITE_URL}/images/aje-logo.png`;

    const cleanupMeta = applyPageMeta({ title, description: content.description });
    const cleanupOg = applyOpenGraph({
      url,
      title,
      description: content.description,
      image,
      locale: { pt: 'pt_BR', en: 'en_US', es: 'es_ES' }[lang] ?? 'pt_BR',
    });
    const available = postLangs(post);
    const cleanupHreflang = applyHreflang([
      ...available.map((l) => ({ hreflang: l === 'pt' ? 'pt-BR' : l, href: getPostUrl(post, l, SITE_URL) })),
      { hreflang: 'x-default', href: getPostUrl(post, available.includes('pt') ? 'pt' : available[0], SITE_URL) },
    ]);

    const addJsonLd = (id, data) => {
      document.getElementById(id)?.remove();
      const s = document.createElement('script');
      s.type = 'application/ld+json';
      s.id = id;
      s.text = JSON.stringify(data);
      document.head.appendChild(s);
    };
    addJsonLd('guide-article-jsonld', {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: content.title,
      description: content.description,
      image: [image],
      datePublished: post.date,
      inLanguage: LOCALE[lang],
      mainEntityOfPage: url,
      author: { '@type': 'Organization', name: 'Ajé Imobiliária', url: `${SITE_URL}/` },
      publisher: {
        '@type': 'Organization',
        name: 'Ajé Imobiliária',
        logo: { '@type': 'ImageObject', url: `${SITE_URL}/images/aje-logo.png` },
      },
    });
    addJsonLd('guide-breadcrumb-jsonld', {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: HOME_LABEL[lang], item: `${SITE_URL}/${lang === 'pt' ? '' : lang}` },
        { '@type': 'ListItem', position: 2, name: GUIDE.name[lang], item: getGuideUrl(lang, SITE_URL) },
        { '@type': 'ListItem', position: 3, name: content.title, item: url },
      ],
    });

    return () => {
      cleanupMeta();
      cleanupOg();
      cleanupHreflang();
      document.getElementById('guide-article-jsonld')?.remove();
      document.getElementById('guide-breadcrumb-jsonld')?.remove();
    };
  }, [post, lang]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [postSlug]);

  const homeHref = lang === 'pt' ? '/' : `/${lang}`;
  const guideHref = `${lang === 'pt' ? '' : `/${lang}`}/${GUIDE.slugs[lang]}`;

  if (!post) {
    return (
      <div>
        <Header forceLight />
        <main className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-6 pt-24 text-center">
          <p className="font-light text-aje-ink-dim">{c.notFound}</p>
          <Link to={guideHref} className="text-sm text-aje-cafe underline">
            {GUIDE.name[lang]}
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  const content = post[lang];
  const related = (post.related ?? [])
    .map((id) => PROPERTIES.find((p) => p.id === id))
    .filter(Boolean);

  return (
    <div>
      <Header forceLight />
      <main className="px-6 pb-20 pt-24 md:pt-28">
        <article className="mx-auto max-w-4xl">
          <nav aria-label="breadcrumb" className="mb-4 flex flex-wrap items-center gap-1.5 text-xs text-aje-cafe-soft">
            <Link to={homeHref} className="hover:text-aje-cafe">{HOME_LABEL[lang]}</Link>
            <span aria-hidden="true">›</span>
            <Link to={guideHref} className="hover:text-aje-cafe">{GUIDE.name[lang]}</Link>
            <span aria-hidden="true">›</span>
            <span className="text-aje-ink-dim">{content.title}</span>
          </nav>

          <h1 className="section-title max-w-3xl text-balance">{content.title}</h1>
          <p className="mt-3 text-xs tracking-wide-label text-aje-cafe-soft">
            {new Date(post.date).toLocaleDateString(LOCALE[lang] ?? LOCALE.pt, {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            })}
          </p>

          {post.image && (
            <LocalImage
              src={post.image}
              fallback="/images/imoveis/_placeholder.jpg"
              alt={post.imageAlt?.[lang] || content.title}
              className="mt-6 aspect-[3/2] w-full rounded-sm object-cover"
            />
          )}

          <ArticleBody blocks={content.body} />

          {related.length > 0 && (
            <section className="mt-14">
              <h2 className="font-display text-xl text-aje-ink">{c.related}</h2>
              <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
                {related.map((property) => (
                  <PropertyCard key={property.id} property={property} />
                ))}
              </div>
            </section>
          )}

          <section className="mt-14 max-w-2xl rounded-2xl border border-aje-cafe/20 bg-aje-cafe/5 p-6 md:p-8">
            <p className="font-display text-lg text-aje-ink">{c.ctaTitle}</p>
            <p className="mt-2 font-light leading-relaxed text-aje-ink-dim">{c.ctaBody}</p>
            <a
              href={whatsappLink(c.wa)}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-2 rounded-full bg-aje-cafe px-6 py-3 text-xs tracking-wide-label text-white hover:opacity-90"
            >
              {c.cta}
            </a>
          </section>
        </article>
      </main>
      <Footer />
    </div>
  );
}
