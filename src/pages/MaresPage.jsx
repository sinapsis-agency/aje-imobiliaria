import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ArticleBody from '../components/ArticleBody';
import { MARES, maresVisible, maresLangs, getMaresUrl } from '../data/mares';
import { whatsappLink } from '../data/site';
import { useSiteLanguage } from '../hooks/useSiteLanguage';
import { applyPageMeta, applyHreflang, applyOpenGraph } from '../utils/seoHead';

const SITE_URL = 'https://www.ajeimobiliaria.com';
const HOME_LABEL = { pt: 'Início', en: 'Home', es: 'Inicio' };

const COPY = {
  pt: {
    officialTitle: 'Tábua oficial de marés',
    officialBody:
      'A Marinha do Brasil publica a tábua do Porto de Natal, o porto de referência mais próximo de Pipa. Os horários em Pipa podem variar alguns minutos.',
    officialBtn: 'Abrir tábua da Marinha',
    source: 'Fonte: Marinha do Brasil — Centro de Hidrografia da Marinha (CHM).',
    disclaimer: 'Referência: Porto de Natal. Informação para passeio, não vale para navegação.',
    ctaTitle: 'Quer conhecer Pipa de perto?',
    ctaBody: 'Fale com a Ajé Imobiliária — são 35 anos de experiência local.',
    cta: 'Falar pelo WhatsApp',
    wa: 'Olá! Vi a página de marés no site e gostaria de saber mais sobre Pipa.',
    notFound: 'Página não encontrada.',
  },
  en: {
    officialTitle: 'Official tide table',
    officialBody:
      "The Brazilian Navy publishes the Port of Natal tide table, the closest reference port to Pipa. Times in Pipa can differ by a few minutes.",
    officialBtn: 'Open the Navy tide table',
    source: 'Source: Brazilian Navy — Hydrography Center (CHM).',
    disclaimer: 'Reference: Port of Natal. For leisure planning only, not valid for navigation.',
    ctaTitle: 'Want to see Pipa up close?',
    ctaBody: 'Talk to Ajé Imobiliária — 35 years of local experience.',
    cta: 'Message us on WhatsApp',
    wa: 'Hello! I saw the tides page on your site and would like to know more about Pipa.',
    notFound: 'Page not found.',
  },
  es: {
    officialTitle: 'Tabla oficial de mareas',
    officialBody:
      'La Marina de Brasil publica la tabla del Puerto de Natal, el puerto de referencia más cercano a Pipa. Los horarios en Pipa pueden variar unos minutos.',
    officialBtn: 'Abrir tabla de la Marina',
    source: 'Fuente: Marina de Brasil — Centro de Hidrografía (CHM).',
    disclaimer: 'Referencia: Puerto de Natal. Información para paseos, no válida para navegación.',
    ctaTitle: '¿Quieres conocer Pipa de cerca?',
    ctaBody: 'Habla con Ajé Imobiliária — 35 años de experiencia local.',
    cta: 'Escribir por WhatsApp',
    wa: '¡Hola! Vi la página de mareas en su sitio y me gustaría saber más sobre Pipa.',
    notFound: 'Página no encontrada.',
  },
};

export default function MaresPage() {
  const lang = useSiteLanguage();
  const c = COPY[lang] ?? COPY.pt;
  const visible = maresVisible(lang);
  const content = MARES[lang];

  useEffect(() => {
    if (!visible) return undefined;
    const url = getMaresUrl(lang, SITE_URL);
    const cleanupMeta = applyPageMeta({ title: content.metaTitle, description: content.description });
    const cleanupOg = applyOpenGraph({
      url,
      title: content.metaTitle,
      description: content.description,
      image: `${SITE_URL}/images/aje-logo.png`,
      locale: { pt: 'pt_BR', en: 'en_US', es: 'es_ES' }[lang] ?? 'pt_BR',
    });
    const available = maresLangs();
    const cleanupHreflang = applyHreflang([
      ...available.map((l) => ({ hreflang: l === 'pt' ? 'pt-BR' : l, href: getMaresUrl(l, SITE_URL) })),
      { hreflang: 'x-default', href: getMaresUrl(available.includes('pt') ? 'pt' : available[0], SITE_URL) },
    ]);

    document.getElementById('mares-breadcrumb-jsonld')?.remove();
    const s = document.createElement('script');
    s.type = 'application/ld+json';
    s.id = 'mares-breadcrumb-jsonld';
    s.text = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: HOME_LABEL[lang], item: `${SITE_URL}/${lang === 'pt' ? '' : lang}` },
        { '@type': 'ListItem', position: 2, name: MARES.name[lang], item: url },
      ],
    });
    document.head.appendChild(s);

    return () => {
      cleanupMeta();
      cleanupOg();
      cleanupHreflang();
      document.getElementById('mares-breadcrumb-jsonld')?.remove();
    };
  }, [visible, lang, content]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const homeHref = lang === 'pt' ? '/' : `/${lang}`;

  if (!visible) {
    return (
      <div>
        <Header forceLight />
        <main className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-6 pt-24 text-center">
          <p className="font-light text-aje-ink-dim">{c.notFound}</p>
          <Link to={homeHref} className="text-sm text-aje-cafe underline">
            {HOME_LABEL[lang] ?? HOME_LABEL.pt}
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div>
      <Header forceLight />
      <main className="px-6 pb-20 pt-24 md:pt-28">
        <article className="mx-auto max-w-4xl">
          <nav aria-label="breadcrumb" className="mb-4 flex flex-wrap items-center gap-1.5 text-xs text-aje-cafe-soft">
            <Link to={homeHref} className="hover:text-aje-cafe">{HOME_LABEL[lang]}</Link>
            <span aria-hidden="true">›</span>
            <span className="text-aje-ink-dim">{MARES.name[lang]}</span>
          </nav>

          <h1 className="section-title max-w-3xl text-balance">{content.h1}</h1>
          <p className="mt-5 max-w-2xl font-light leading-relaxed text-aje-ink-dim">{content.intro}</p>

          {/* Tábua oficial: link para a fonte, sem copiar a tabela (licença CC BY-ND).
              Fase 2: a tábua ao vivo entra aqui, acima deste bloco. */}
          <section className="mt-10 max-w-2xl rounded-2xl border border-aje-cafe/20 bg-aje-cafe/5 p-6 md:p-8">
            <h2 className="font-display text-lg text-aje-ink">{c.officialTitle}</h2>
            <p className="mt-2 font-light leading-relaxed text-aje-ink-dim">{c.officialBody}</p>
            <a
              href={MARES.officialUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-2 rounded-full bg-aje-cafe px-6 py-3 text-xs tracking-wide-label text-white hover:opacity-90"
            >
              {c.officialBtn}
            </a>
            <p className="mt-4 text-xs font-light text-aje-ink-dim">{c.source}</p>
            <p className="mt-1 text-xs font-light text-aje-ink-dim">{c.disclaimer}</p>
          </section>

          <ArticleBody blocks={content.body} />

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
