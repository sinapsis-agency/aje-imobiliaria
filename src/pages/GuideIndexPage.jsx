import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import LocalImage from '../components/LocalImage';
import {
  GUIDE,
  LANGS,
  visiblePosts,
  postHasLang,
  getGuideUrl,
  getPostPath,
} from '../data/guide';
import { useSiteLanguage } from '../hooks/useSiteLanguage';
import { applyPageMeta, applyHreflang, applyOpenGraph } from '../utils/seoHead';

const SITE_URL = 'https://www.ajeimobiliaria.com';
const LOCALE = { pt: 'pt-BR', en: 'en-US', es: 'es-ES' };
const COPY = {
  pt: { back: '‹ VOLTAR PARA O SITE', empty: 'Em breve, novos artigos sobre Pipa.' },
  en: { back: '‹ BACK TO SITE', empty: 'New articles about Pipa coming soon.' },
  es: { back: '‹ VOLVER AL SITIO', empty: 'Pronto, nuevos artículos sobre Pipa.' },
};

export default function GuideIndexPage() {
  const lang = useSiteLanguage();
  const c = COPY[lang] ?? COPY.pt;
  const posts = visiblePosts()
    .filter((p) => postHasLang(p, lang))
    .sort((a, b) => b.date.localeCompare(a.date));

  useEffect(() => {
    const title = GUIDE.metaTitle[lang] ?? GUIDE.metaTitle.pt;
    const description = GUIDE.metaDescription[lang] ?? GUIDE.metaDescription.pt;
    const cleanupMeta = applyPageMeta({ title, description });
    const cleanupOg = applyOpenGraph({
      url: getGuideUrl(lang, SITE_URL),
      title,
      description,
      image: `${SITE_URL}/images/aje-logo.png`,
      locale: { pt: 'pt_BR', en: 'en_US', es: 'es_ES' }[lang] ?? 'pt_BR',
    });
    const available = LANGS.filter((l) => visiblePosts().some((p) => postHasLang(p, l)));
    const cleanupHreflang = applyHreflang([
      ...available.map((l) => ({ hreflang: l === 'pt' ? 'pt-BR' : l, href: getGuideUrl(l, SITE_URL) })),
      { hreflang: 'x-default', href: getGuideUrl(available.includes('pt') ? 'pt' : available[0] ?? 'pt', SITE_URL) },
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
            {c.back}
          </Link>
          <h1 className="section-title mt-6 max-w-3xl text-balance">{GUIDE.h1[lang] ?? GUIDE.h1.pt}</h1>
          <p className="mt-5 max-w-2xl font-light leading-relaxed text-aje-ink-dim">
            {GUIDE.intro[lang] ?? GUIDE.intro.pt}
          </p>

          {posts.length === 0 ? (
            <p className="mt-16 text-center font-light text-aje-ink-dim">{c.empty}</p>
          ) : (
            <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
              {posts.map((post) => (
                <Link
                  key={post.id}
                  to={getPostPath(post, lang)}
                  className="group flex flex-col overflow-hidden rounded-xl border border-aje-cafe/15 bg-aje-paper transition-shadow hover:shadow-md"
                >
                  {post.image && (
                    <LocalImage
                      src={post.image}
                      fallback="/images/imoveis/_placeholder.jpg"
                      alt={post.imageAlt?.[lang] || post[lang].title}
                      className="aspect-[3/2] w-full object-cover"
                    />
                  )}
                  <div className="flex flex-1 flex-col p-5">
                    <p className="text-xs tracking-wide-label text-aje-cafe-soft">
                      {new Date(post.date).toLocaleDateString(LOCALE[lang] ?? LOCALE.pt, {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                      })}
                    </p>
                    <h2 className="mt-2 font-display text-lg text-aje-ink group-hover:text-aje-cafe">
                      {post[lang].title}
                    </h2>
                    <p className="mt-2 text-sm font-light leading-relaxed text-aje-ink-dim">
                      {post[lang].description}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
