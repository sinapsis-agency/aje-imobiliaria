import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Somos from './pages/Somos';

// Ao trocar de página (ex: Home -> Somos), o React Router NÃO reseta o
// scroll sozinho — sem isso, a nova página abre na mesma posição de scroll
// da anterior (por isso "Quem somos" parecia cair na seção Equipe).
function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) return; // deixa o navegador rolar até a âncora (#onde-atuamos etc.)
    window.scrollTo(0, 0);
  }, [pathname, hash]);

  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/somos" element={<Somos />} />
      </Routes>
    </BrowserRouter>
  );
}
