import { useEffect, useState } from 'react';
import VideoIntro from '../components/VideoIntro';
import Header from '../components/Header';
import Imoveis from '../components/Imoveis';
import Servicos from '../components/Servicos';
import ApoioJuridico from '../components/ApoioJuridicoHero';
import ComoFunciona from '../components/ComoFunciona';
import VendaAnuncie from '../components/VendaAnuncie';
import Contato from '../components/Contato';
import Footer from '../components/Footer';
import { introState } from '../introState';
import { useSiteLanguage } from '../hooks/useSiteLanguage';
import { applyPageMeta, applyHreflang, applyOpenGraph } from '../utils/seoHead';

const SITE_URL = 'https://www.ajeimobiliaria.com';

// H1 "oculto visualmente" (sr-only) — a home é dominada pelo vídeo/logo, sem
// espaço para um H1 visível sem mexer no design, mas o Google (e leitores de
// tela) continuam precisando de um H1 real descrevendo a página.
const H1_BY_LANG = {
  pt: 'Imobiliária em Pipa, RN — casas, terrenos e aluguel com apoio jurídico',
  en: 'Real Estate in Pipa Beach, RN — Land, Houses & Rentals with Full Legal Support',
  es: 'Inmobiliaria en Pipa Beach, RN — Terrenos, casas y alquileres con apoyo jurídico completo',
};

const OG_IMAGE = `${SITE_URL}/images/aje-logo.png`;

export default function HomePage() {
  const lang = useSiteLanguage();

  // Se o vídeo já foi visto nesta sessão de navegação (SPA), não mostra de
  // novo — só um refresh real da página (F5) reinicia introState.seen.
  const [introDone, setIntroDone] = useState(introState.seen);
  const alreadySeen = introState.seen;

  const handleIntroComplete = () => {
    introState.seen = true;
    setIntroDone(true);
  };

  useEffect(() => {
    const metaByLang = {
      en: {
        title: 'Ajé Imobiliária | Real Estate in Pipa Beach, Natal & Northeast Brazil',
        description:
          'Boutique real estate agency in Pipa Beach, Tibau do Sul, Natal and João Pessoa, Brazil. Land, houses and rentals with full legal support — 35 years of local experience, trusted by foreign buyers.',
      },
      es: {
        title: 'Ajé Imobiliária | Inmuebles en Pipa Beach, Natal y Noreste de Brasil',
        description:
          'Inmobiliaria boutique en Pipa Beach, Tibau do Sul, Natal y João Pessoa, Brasil. Terrenos, casas y alquileres con apoyo jurídico completo — 35 años de experiencia local, de confianza para compradores extranjeros.',
      },
    };
    const cleanupMeta = metaByLang[lang] ? applyPageMeta(metaByLang[lang]) : () => {};

    const pageUrl = lang === 'pt' ? `${SITE_URL}/` : `${SITE_URL}/${lang}`;
    const ogLocale = { pt: 'pt_BR', en: 'en_US', es: 'es_ES' }[lang] ?? 'pt_BR';
    const ogCopy = metaByLang[lang] ?? {
      title: 'Ajé Imobiliária | Imóveis em Pipa, RN e Litoral do Nordeste',
      description:
        'Imobiliária boutique em Pipa, Tibau do Sul, Natal e João Pessoa. Venda, aluguel e terrenos com apoio jurídico completo. 35 anos de experiência local.',
    };
    const cleanupOg = applyOpenGraph({
      url: pageUrl,
      title: ogCopy.title,
      description: ogCopy.description,
      image: OG_IMAGE,
      locale: ogLocale,
    });

    const cleanupHreflang = applyHreflang([
      { hreflang: 'pt-BR', href: `${SITE_URL}/` },
      { hreflang: 'en', href: `${SITE_URL}/en` },
      { hreflang: 'es', href: `${SITE_URL}/es` },
      { hreflang: 'x-default', href: `${SITE_URL}/` },
    ]);

    return () => {
      cleanupMeta();
      cleanupOg();
      cleanupHreflang();
    };
  }, [lang]);

  return (
    <div id="top">
      {/* Oculto visualmente, mas presente no HTML — ver nota em H1_BY_LANG */}
      <h1 className="sr-only">{H1_BY_LANG[lang] ?? H1_BY_LANG.pt}</h1>

      <Header />

      {alreadySeen ? <VideoIntro staticEnd /> : <VideoIntro onIntroComplete={handleIntroComplete} />}

      <main>
        <Imoveis />
        <Servicos />
        <ApoioJuridico />
        <ComoFunciona />
        <VendaAnuncie />
        <Contato />
      </main>

      <Footer />
    </div>
  );
}
