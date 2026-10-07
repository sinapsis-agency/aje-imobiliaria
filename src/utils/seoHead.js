// Troca temporariamente o <title> e a meta description da página (o
// index.html já traz uma versão padrão em português) e restaura o valor
// anterior ao sair da página — mesmo padrão que o PropertyPage já usava,
// só que reaproveitável também pela HomePage (versão /en).
export function applyPageMeta({ title, description }) {
  const previousTitle = document.title;
  const metaEl = document.querySelector('meta[name="description"]');
  const previousDescription = metaEl?.getAttribute('content') ?? '';

  if (title) document.title = title;
  if (description && metaEl) metaEl.setAttribute('content', description);

  return () => {
    document.title = previousTitle;
    if (metaEl) metaEl.setAttribute('content', previousDescription);
  };
}

// Insere tags <link rel="alternate" hreflang="..."> no <head>, avisando o
// Google que esta mesma página existe em outro idioma numa outra URL —
// sem isso, o Google não sabe que /en/<slug> e /<slug> são a mesma
// página em idiomas diferentes, e tende a mostrar só uma delas.
export function applyHreflang(links) {
  const created = links.map(({ hreflang, href }) => {
    const link = document.createElement('link');
    link.rel = 'alternate';
    link.hreflang = hreflang;
    link.href = href;
    document.head.appendChild(link);
    return link;
  });

  return () => created.forEach((el) => el.remove());
}
