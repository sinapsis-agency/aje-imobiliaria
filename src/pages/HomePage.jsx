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
import { applyPageMeta, applyHreflang } from '../utils/seoHead';

const SITE_URL = 'https://www.ajeimobiliaria.com';

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
    const cleanupMeta =
      lang === 'en'
        ? applyPageMeta({
            title: 'Ajé Imobiliária | Real Estate in Pipa Beach, Natal & Northeast Brazil',
            description:
              'Boutique real estate agency in Pipa Beach, Tibau do Sul, Natal and João Pessoa, Brazil. Land, houses and rentals with full legal support — 35 years of local experience, trusted by foreign buyers.',
          })
        : () => {};

    const cleanupHreflang = applyHreflang([
      { hreflang: 'pt-BR', href: `${SITE_URL}/` },
      { hreflang: 'en', href: `${SITE_URL}/en` },
      { hreflang: 'x-default', href: `${SITE_URL}/` },
    ]);

    return () => {
      cleanupMeta();
      cleanupHreflang();
    };
  }, [lang]);

  return (
    <div id="top">
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
