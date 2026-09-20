import { forwardRef, useState } from 'react';
import LocalImage from './LocalImage';

// Adaptado de um componente shadcn/TSX para Vite + React + JavaScript.
// Mesmo padrão visual dos cards de imóveis: foto cheia, quadrada, com
// overlay escuro revelando nome/cargo no hover (ou toque, no celular), e
// clique abrindo um modal com a foto ampliada e a bio completa.

// Só tons quentes (café/dourado) — sem azul/turquesa, a pedido do designer.
const TINTS = ['bg-aje-cafe/8', 'bg-aje-paper-soft'];

function TeamCard({ member, index, onOpen }) {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <button
      type="button"
      onClick={() => onOpen(member)}
      onTouchStart={() => setShowDetails(true)}
      className={`group relative aspect-square w-40 overflow-hidden rounded-xl text-left shadow-sm transition-all duration-300 ease-in-out hover:shadow-lg sm:w-44 ${TINTS[index % TINTS.length]}`}
    >
      <LocalImage
        src={member.imageSrc.src}
        fallback={member.imageSrc.fallback}
        alt={member.imageSrc.alt ?? member.name}
        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
      />

      {/* Overlay escuro — aparece no hover (desktop) ou toque (celular) */}
      <div
        className={`absolute inset-0 bg-gradient-to-t from-aje-black/90 via-aje-black/20 to-transparent transition-opacity duration-300 md:opacity-0 md:group-hover:opacity-100 ${
          showDetails ? 'opacity-100' : ''
        }`}
      />

      <div
        className={`absolute inset-x-0 bottom-0 p-3 transition-transform duration-300 md:translate-y-3 md:group-hover:translate-y-0 ${
          showDetails ? 'translate-y-0' : ''
        }`}
      >
        <p className="font-display text-sm text-white">{member.name}</p>
        <p className="text-xs font-light text-white/80">{member.designation}</p>
      </div>
    </button>
  );
}

function TeamModal({ member, onClose }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-aje-ink/80 p-4"
      onClick={onClose}
    >
      <button
        type="button"
        onClick={onClose}
        className="absolute right-6 top-6 text-xs tracking-wide-label text-white hover:text-aje-cafe-soft"
        aria-label="Fechar"
      >
        FECHAR ✕
      </button>

      <div
        className="max-h-[85vh] w-full max-w-md overflow-y-auto rounded-sm bg-aje-paper"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="aspect-square w-full overflow-hidden">
          <LocalImage
            src={member.imageSrc.src}
            fallback={member.imageSrc.fallback}
            alt={member.imageSrc.alt ?? member.name}
            className="h-full w-full object-cover"
          />
        </div>

        <div className="p-8 text-center">
          <h3 className="font-display text-2xl text-aje-ink">{member.name}</h3>
          <p className="mt-1 text-sm font-light text-aje-ink-dim">{member.designation}</p>
          {member.detail && (
            <p className="mt-1 text-xs tracking-wide-label text-aje-cafe-soft">{member.detail}</p>
          )}

          {member.bio && (
            <p className="mt-6 text-left text-sm font-light leading-relaxed text-aje-ink-dim">
              {member.bio}
            </p>
          )}

          {member.links && member.links.length > 0 && (
            <div className="mt-6 flex flex-wrap justify-center gap-3 border-t border-aje-cafe/15 pt-5">
              {member.links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs tracking-wide text-aje-cafe underline decoration-aje-cafe/40 underline-offset-2 transition-colors hover:text-aje-cafe-soft"
                >
                  {link.label}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export const TeamSection = forwardRef(
  ({ title, description, members, className = '', ...props }, ref) => {
    const [openMember, setOpenMember] = useState(null);

    return (
      <section ref={ref} className={`relative w-full overflow-hidden ${className}`} {...props}>
        <div className="mx-auto grid max-w-5xl items-center justify-center gap-8 px-6 text-center">
          <div className="relative z-10 flex w-full flex-col items-center gap-3">
            <span className="inline-flex items-center gap-3 text-sm font-medium tracking-[0.35em] text-aje-cafe-soft md:text-base">
              <span className="h-px w-8 bg-aje-cafe/60" aria-hidden="true" />
              A EQUIPE
              <span className="h-px w-8 bg-aje-cafe/60" aria-hidden="true" />
            </span>
            <h2 className="section-title text-balance">{title}</h2>
            {description && (
              <p className="max-w-xl font-light text-aje-ink-dim">{description}</p>
            )}
          </div>

          {/* Largura do contêiner limitada por breakpoint: cabem exatamente 2
              cards por linha no celular e 3 no desktop — a linha incompleta
              (o último membro) sempre fica centralizada, nunca colada num lado. */}
          <div className="relative z-10 mx-auto flex w-full max-w-[350px] flex-wrap justify-center gap-6 sm:max-w-[610px]">
            {members.map((member, index) => (
              <TeamCard key={member.name} member={member} index={index} onOpen={setOpenMember} />
            ))}
          </div>
        </div>

        {openMember && <TeamModal member={openMember} onClose={() => setOpenMember(null)} />}
      </section>
    );
  }
);

TeamSection.displayName = 'TeamSection';
