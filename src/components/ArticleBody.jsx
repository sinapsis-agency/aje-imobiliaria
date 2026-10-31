// Renderiza o corpo de um artigo (lista de blocos h2 / p / list / tip).
// Compartilhado entre os artigos do "Descubra Pipa" e a página de marés.
export default function ArticleBody({ blocks }) {
  return (
    <div className="mt-8 max-w-2xl space-y-5">
      {blocks.map((block, i) => {
        if (block.type === 'h2') {
          return (
            <h2 key={i} className="pt-4 font-display text-xl text-aje-ink">
              {block.text}
            </h2>
          );
        }
        if (block.type === 'list') {
          return (
            <ul key={i} className="list-disc space-y-1.5 pl-5 font-light leading-relaxed text-aje-ink-dim">
              {block.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          );
        }
        if (block.type === 'tip') {
          return (
            <p
              key={i}
              className="rounded-xl border border-aje-cafe/20 bg-aje-cafe/5 p-4 font-light leading-relaxed text-aje-ink"
            >
              {block.text}
            </p>
          );
        }
        return (
          <p key={i} className="font-light leading-relaxed text-aje-ink-dim">
            {block.text}
          </p>
        );
      })}
    </div>
  );
}
