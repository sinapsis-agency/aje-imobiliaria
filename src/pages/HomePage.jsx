import { useState } from 'react';
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

export default function HomePage() {
  // Se o vídeo já foi visto nesta sessão de navegação (SPA), não mostra de
  // novo — só um refresh real da página (F5) reinicia introState.seen.
  const [introDone, setIntroDone] = useState(introState.seen);
  const alreadySeen = introState.seen;

  const handleIntroComplete = () => {
    introState.seen = true;
    setIntroDone(true);
  };

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
