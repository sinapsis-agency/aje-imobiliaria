import Header from '../components/Header';
import Footer from '../components/Footer';
import QuemSomos from '../components/QuemSomos';
import OndeAtuamos from '../components/OndeAtuamos';
import Equipe from '../components/Equipe';

export default function Somos() {
  return (
    <div>
      <Header forceLight />
      <main className="pt-24">
        <QuemSomos />
        <OndeAtuamos />
        <Equipe />
      </main>
      <Footer />
    </div>
  );
}
