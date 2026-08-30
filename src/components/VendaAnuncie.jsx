import { useTranslation } from 'react-i18next';
import ScrollExpandMedia from './ScrollExpandMedia';
import { VENDA_ANUNCIE_PHOTO } from '../data/images';

// Número específico para "Quero anunciar" — diferente do WhatsApp principal
// da Eva, pedido explicitamente pelo cliente para esta seção.
const ANUNCIE_WHATSAPP_LINK =
  'https://wa.me/554888204889?text=' +
  encodeURIComponent('Olá! Gostaria de anunciar meu imóvel com a Ajé Imobiliária.');

export default function VendaAnuncie() {
  const { t } = useTranslation();
  return (
    <ScrollExpandMedia
      mediaSrc={VENDA_ANUNCIE_PHOTO.src}
      mediaFallback={VENDA_ANUNCIE_PHOTO.fallback}
      bgImageSrc={VENDA_ANUNCIE_PHOTO.src}
      bgFallback={VENDA_ANUNCIE_PHOTO.fallback}
      title={t('sections.vendaAnuncie.heroTitle')}
      date="Praia da Pipa, RN"
      scrollToExpand={t('sections.vendaAnuncie.scrollHint')}
    >
      <div className="mx-auto max-w-md text-center">
        <h3 className="section-title-tight">{t('sections.vendaAnuncie.title')}</h3>

        <p className="mx-auto mt-3 max-w-sm text-sm font-light leading-snug text-aje-ink-dim">
          {t('sections.vendaAnuncie.body')}
        </p>

        <a
          href={ANUNCIE_WHATSAPP_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-block rounded-full border border-aje-cafe px-7 py-2.5 text-xs tracking-wide-label text-aje-cafe transition-colors hover:bg-aje-cafe hover:text-aje-paper"
        >
          {t('buttons.queroAnunciar').toUpperCase()}
        </a>
      </div>
    </ScrollExpandMedia>
  );
}
