import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowUpRight } from 'lucide-react';
import { whatsappLink } from '../data/site';
import { SERVICE_PHOTOS } from '../data/images';
import LocalImage from './LocalImage';

// Pequeno helper local para combinar classes condicionalmente —
// substitui o "cn" do shadcn/lib/utils, que não existe neste projeto Vite.
function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}

const SERVICES = [
  { id: 'venda', titleKey: 'services.venda', categoryKey: 'services.categoriaImoveis', ...SERVICE_PHOTOS.venda },
  { id: 'aluguel', titleKey: 'services.aluguel', categoryKey: 'services.categoriaImoveis', ...SERVICE_PHOTOS.aluguel },
  { id: 'terrenos', titleKey: 'services.terrenos', categoryKey: 'services.categoriaImoveis', ...SERVICE_PHOTOS.terrenos },
  { id: 'gestao', titleKey: 'services.gestao', categoryKey: 'services.categoriaSuporte', ...SERVICE_PHOTOS.gestao },
  { id: 'assessoria', titleKey: 'services.assessoria', categoryKey: 'services.categoriaSuporte', ...SERVICE_PHOTOS.assessoria },
  { id: 'advogado', titleKey: 'services.advogado', categoryKey: 'services.categoriaSuporte', ...SERVICE_PHOTOS.advogado },
];

export default function ServicosGallery() {
  const { t } = useTranslation();
  const [activeId, setActiveId] = useState('venda');

  const handleCtaClick = (e, service) => {
    e.stopPropagation();
    window.open(
      whatsappLink(`Olá! Gostaria de saber mais sobre o serviço de ${t(service.titleKey)}.`),
      '_blank',
      'noopener,noreferrer'
    );
  };

  return (
    <div className="flex h-[420px] w-full flex-col gap-2 md:h-[520px] md:flex-row md:gap-3">
      {SERVICES.map((service) => (
        <div
          key={service.id}
          onMouseEnter={() => setActiveId(service.id)}
          onClick={() => setActiveId(service.id)}
          className={cn(
            'relative cursor-pointer overflow-hidden rounded-sm border border-aje-cafe/15',
            'transition-[flex,filter] duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]',
            activeId === service.id ? 'flex-[4]' : 'flex-[1]',
            activeId === service.id ? 'brightness-100' : 'brightness-[0.55] hover:brightness-75'
          )}
        >
          <div className="absolute inset-0 h-full w-full">
            <LocalImage
              src={service.src}
              fallback={service.fallback}
              alt={service.alt}
              className={cn(
                'h-full w-full object-cover transition-transform duration-1000',
                activeId === service.id ? 'scale-100' : 'scale-110'
              )}
              loading="lazy"
            />
            <div
              className={cn(
                'absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent transition-opacity duration-500',
                activeId === service.id ? 'opacity-100' : 'opacity-0'
              )}
            />
          </div>

          <div className="absolute inset-0 flex flex-col justify-end p-4 md:p-8">
            {/* Conteúdo do item ativo */}
            <div
              className={cn(
                'flex flex-col gap-2 transition-all duration-500',
                activeId === service.id
                  ? 'translate-y-0 opacity-100 delay-200'
                  : 'translate-y-8 opacity-0'
              )}
            >
              <span className="w-fit rounded-full border border-white/30 bg-white/10 px-3 py-1 text-[10px] font-medium uppercase tracking-wider text-white backdrop-blur-md">
                {t(service.categoryKey)}
              </span>

              <h3 className="font-display text-xl font-semibold uppercase leading-none text-white md:text-4xl">
                {t(service.titleKey)}
              </h3>

              <button
                type="button"
                onClick={(e) => handleCtaClick(e, service)}
                className="mt-2 flex w-fit items-center gap-2 text-xs font-medium uppercase tracking-widest text-white/85 transition-colors hover:text-aje-turquoise md:mt-4 md:text-sm"
              >
                {t('buttons.consultar')}
                <ArrowUpRight className="h-3 w-3 md:h-4 md:w-4" />
              </button>
            </div>

            {/* Rótulo vertical quando inativo (desktop) */}
            <div
              className={cn(
                'absolute bottom-4 left-1/2 -translate-x-1/2 transition-all duration-500 md:bottom-8',
                activeId === service.id ? 'scale-50 opacity-0' : 'opacity-100 delay-300'
              )}
            >
              <span className="hidden whitespace-nowrap text-sm font-medium uppercase tracking-widest text-white [writing-mode:vertical-rl] md:block">
                {t(service.titleKey)}
              </span>
              <span className="block text-xs font-medium text-white md:hidden">
                {t(service.titleKey).slice(0, 3).toUpperCase()}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
