import { forwardRef } from 'react';
import LocalImage from './LocalImage';

// Adaptado de um componente shadcn/TSX para Vite + React + JavaScript.
// As variáveis de cor do shadcn (hsl(var(--destructive)) etc.) foram
// substituídas pelos tokens de marca da Ajé (aje-cafe / aje-turquoise),
// alternando tons suaves entre os cards.

const TINTS = ['bg-aje-cafe/8', 'bg-aje-turquoise/8', 'bg-aje-paper-soft'];

function TeamCard({ member, index }) {
  return (
    <div
      className={`group relative flex w-40 flex-col items-center justify-end overflow-hidden rounded-xl p-4 text-center shadow-sm transition-all duration-300 ease-in-out hover:scale-[1.03] hover:shadow-lg sm:w-44 ${TINTS[index % TINTS.length]}`}
    >
      <div
        className="absolute bottom-0 left-0 right-0 h-1/2 origin-bottom scale-y-0 transform rounded-t-full bg-gradient-to-t from-aje-cafe/15 to-transparent transition-transform duration-500 ease-out group-hover:scale-y-100"
        style={{ transitionDelay: `${index * 50}ms` }}
      />

      <div
        className="relative z-10 h-24 w-24 overflow-hidden rounded-full border-4 border-transparent bg-aje-paper transition-all duration-500 ease-out group-hover:border-aje-cafe group-hover:scale-105"
        style={{ transitionDelay: `${index * 100}ms` }}
      >
        <LocalImage
          src={member.imageSrc.src}
          fallback={member.imageSrc.fallback}
          alt={member.name}
          className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
        />
      </div>

      <h3 className="relative z-10 mt-3 font-display text-base text-aje-ink">{member.name}</h3>
      <p className="relative z-10 text-xs font-light text-aje-ink-dim">{member.designation}</p>
      {member.detail && (
        <p className="relative z-10 mt-1 text-[10px] tracking-wide-label text-aje-cafe-soft">{member.detail}</p>
      )}
    </div>
  );
}

export const TeamSection = forwardRef(
  ({ title, description, members, className = '', ...props }, ref) => {
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
              <TeamCard key={member.name} member={member} index={index} />
            ))}
          </div>
        </div>
      </section>
    );
  }
);

TeamSection.displayName = 'TeamSection';
