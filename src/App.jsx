import { useEffect, lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { CATEGORIES } from './data/categories';
import { INVEST_PAGE } from './data/investPage';
import { trackPageView } from './utils/analytics';

// Cada página carrega só quando é visitada (code-splitting por rota), em
// vez de tudo ir num único arquivo JS. Antes, visitar a página de UM
// imóvel baixava também o código do WebGL/animações usados só na Home e
// na Quem Somos — sem necessidade. Header/Footer continuam carregando
// direto, por serem leves e aparecerem em toda página de qualquer forma.
const HomePage = lazy(() => import('./pages/HomePage'));
const Somos = lazy(() => import('./pages/Somos'));
const PropertyPage = lazy(() => import('./pages/PropertyPage'));
const CategoryPage = lazy(() => import('./pages/CategoryPage'));
const InvestPage = lazy(() => import('./pages/InvestPage'));

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

// Envia um page_view ao Google Analytics a cada troca de rota (SPA).
function RouteTracker() {
  const { pathname } = useLocation();

  useEffect(() => {
    // pequeno atraso: deixa a página atualizar o <title> antes do envio
    const id = setTimeout(() => trackPageView(pathname), 300);
    return () => clearTimeout(id);
  }, [pathname]);

  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <RouteTracker />
      {/* fallback null: o <body> já tem a cor de fundo do site via CSS,
          então não há "flash" branco enquanto o chunk da rota carrega. */}
      <Suspense fallback={null}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/en" element={<HomePage />} />
        <Route path="/es" element={<HomePage />} />
        <Route path="/somos" element={<Somos />} />
        <Route path="/en/somos" element={<Somos />} />
        <Route path="/es/somos" element={<Somos />} />
        {/* Páginas de categoria (terrenos/casas/aluguel), uma URL própria
            por idioma — ficam ANTES de /:slug pra não serem engolidas pelo
            catch-all de propriedade. */}
        {CATEGORIES.flatMap((category) =>
          ['pt', 'en', 'es'].map((lang) => {
            const slug = category.slugs[lang];
            const path = lang === 'pt' ? `/${slug}` : `/${lang}/${slug}`;
            return <Route key={path} path={path} element={<CategoryPage categoryKey={category.key} />} />;
          })
        )}

        {/* Página "Investir em Pipa" — também antes do catch-all. */}
        {['pt', 'en', 'es'].map((lang) => {
          const slug = INVEST_PAGE.slugs[lang];
          const path = lang === 'pt' ? `/${slug}` : `/${lang}/${slug}`;
          return <Route key={path} path={path} element={<InvestPage />} />;
        })}

        <Route path="/:slug" element={<PropertyPage />} />
        <Route path="/en/:slug" element={<PropertyPage />} />
        <Route path="/es/:slug" element={<PropertyPage />} />
      </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
