import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { PropertyCard } from '../components/Imoveis';
import { PROPERTIES } from '../data/properties';
import { INVEST_PAGE, getInvestPageUrl } from '../data/investPage';
import { whatsappLink } from '../data/site';
import { useSiteLanguage } from '../hooks/useSiteLanguage';
import { applyPageMeta, applyHreflang, applyOpenGraph } from '../utils/seoHead';

const SITE_URL = 'https://www.ajeimobiliaria.com';

const BACK = {
  pt: '‹ VOLTAR PARA O SITE',
  en: '‹ BACK TO SITE',
  es: '‹ VOLVER AL SITIO',
};

const TALK_TO_LAWYER = {
  pt: 'Falar com a advogada',
  en: 'Talk to our lawyer',
  es: 'Hablar con la abogada',
};

const LAWYER_MESSAGE = {
  pt: 'Olá! Sou de fora e tenho uma dúvida jurídica sobre comprar um imóvel em Pipa.',
  en: "Hello! I'm interested in buying property in Pipa Beach and have a legal question.",
  es: '¡Hola! Estoy interesado en comprar un inmueble en Pipa y tengo una duda legal.',
};

// Página única (não é por categoria) — foco em quem já está pensando em
// comprar vindo de fora (outro país ou outra cidade grande do Brasil).
// pt existe pra pegar também o público brasileiro de fora de Pipa.
export default function InvestPage() {
  const lang = useSiteLanguage();

  const copy = {
    h1: INVEST_PAGE.h1[lang] ?? INVEST_PAGE.h1.pt,
    intro: INVEST_PAGE.intro[lang] ?? INVEST_PAGE.intro.pt,
    stepsTitle: INVEST_PAGE.stepsTitle[lang] ?? INVEST_PAGE.stepsTitle.pt,
    steps: INVEST_PAGE.steps[lang] ?? INVEST_PAGE.steps.pt,
    trust: INVEST_PAGE.trust[lang] ?? INVEST_PAGE.trust.pt,
    featuredTitle: INVEST_PAGE.featuredTitle[lang] ?? INVEST_PAGE.featuredTitle.pt,
    faqTitle: INVEST_PAGE.faqTitle[lang] ?? INVEST_PAGE.faqTitle.pt,
    faq: INVEST_PAGE.faq[lang] ?? INVEST_PAGE.faq.pt,
  };
  const back = BACK[lang] ?? BACK.pt;
  const featured = PROPERTIES.filter((p) => p.featured).slice(0, 3);

  useEffect(() => {
    const cleanupMeta = applyPageMeta({
      title: INVEST_PAGE.metaTitle[lang] ?? INVEST_PAGE.metaTitle.pt,
      description: INVEST_PAGE.metaDescription[lang] ?? INVEST_PAGE.metaDescription.pt,
    });

    const pageUrl = getInvestPageUrl(lang, SITE_URL);
    const ogLocale = { pt: 'pt_BR', en: 'en_US', es: 'es_ES' }[lang] ?? 'pt_BR';
    const cleanupOg = applyOpenGraph({
      url: pageUrl,
      title: INVEST_PAGE.metaTitle[lang] ?? INVEST_PAGE.metaTitle.pt,
      description: INVEST_PAGE.metaDescription[lang] ?? INVEST_PAGE.metaDescription.pt,
      image: `${SITE_URL}/images/aje-logo.png`,
      locale: ogLocale,
    });

    const cleanupHreflang = applyHreflang([
      { hreflang: 'pt-BR', href: getInvestPageUrl('pt', SITE_URL) },
      { hreflang: 'en', href: getInvestPageUrl('en', SITE_URL) },
      { hreflang: 'es', href: getInvestPageUrl('es', SITE_URL) },
      { hreflang: 'x-default', href: getInvestPageUrl('pt', SITE_URL) },
    ]);

    return () => {
      cleanupMeta();
      cleanupOg();
      cleanupHreflang();
    };
  }, [lang]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
            {back}
          </Link>

          <h1 className="section-title mt-6 max-w-3xl text-balance">{copy.h1}</h1>

          <p className="mt-5 max-w-2xl whitespace-pre-line font-light leading-relaxed text-aje-ink-dim">
            {copy.intro}
          </p>

          {/* Processo em passos simples — sem tecnicismo jurídico, só o
              caminho prático de quem nunca comprou um imóvel no Brasil. */}
          <div className="mt-16 max-w-3xl">
            <h2 className="font-display text-xl text-aje-ink">{copy.stepsTitle}</h2>
            <ol className="mt-6 space-y-6">
              {copy.steps.map((step, index) => (
                <li key={step.title} className="flex gap-4">
                  <span className="flex h-8 w-8 flex-none items-center justify-center rounded-full border border-aje-cafe/30 font-display text-sm text-aje-cafe">
                    {index + 1}
                  </span>
                  <div>
                    <p className="font-medium text-aje-ink">{step.title}</p>
                    <p className="mt-1 font-light leading-relaxed text-aje-ink-dim">{step.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          {/* Confiança: em vez de um guia jurídico técnico, direciona pra
              conversa direta com a advogada — pedido explícito da cliente. */}
          <div className="mt-16 max-w-2xl rounded-2xl border border-aje-cafe/20 bg-aje-cafe/5 p-6 md:p-8">
            <p className="font-display text-lg text-aje-ink">{copy.trust.title}</p>
            <p className="mt-2 font-light leading-relaxed text-aje-ink-dim">{copy.trust.body}</p>
            <a
              href={whatsappLink(LAWYER_MESSAGE[lang] ?? LAWYER_MESSAGE.pt)}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-2 rounded-full bg-aje-cafe px-6 py-3 text-xs tracking-wide-label text-white hover:opacity-90"
            >
              {TALK_TO_LAWYER[lang] ?? TALK_TO_LAWYER.pt}
            </a>
          </div>

          {featured.length > 0 && (
            <div className="mt-16">
              <h2 className="font-display text-xl text-aje-ink">{copy.featuredTitle}</h2>
              <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
                {featured.map((property) => (
                  <PropertyCard key={property.id} property={property} />
                ))}
              </div>
            </div>
          )}

          <div className="mt-16 max-w-2xl border-t border-aje-cafe/15 pt-10">
            <h2 className="font-display text-xl text-aje-ink">{copy.faqTitle}</h2>
            <div className="mt-6 space-y-6">
              {copy.faq.map((item) => (
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
