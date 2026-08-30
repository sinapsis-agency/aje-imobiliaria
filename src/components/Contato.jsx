import { useTranslation } from 'react-i18next';
import { Mail, MapPin, MessageCircle, Phone } from 'lucide-react';
import { whatsappLink, WHATSAPP_DISPLAY } from '../data/site';
import { Dock, DockItem, DockLabel, DockIcon } from './Dock';

const CONTACT_ITEMS = [
  { label: 'WhatsApp', icon: MessageCircle, href: whatsappLink('Olá! Gostaria de agendar um atendimento.') },
  { label: 'Ligar', icon: Phone, href: 'tel:+5584994766720' },
  { label: 'E-mail', icon: Mail, href: 'mailto:contato@ajeimobiliaria.com' },
  { label: 'Onde estamos', icon: MapPin, href: '/somos#onde-atuamos' },
];

export default function Contato() {
  const { t } = useTranslation();
  return (
    <section id="contato" className="bg-aje-paper-soft/50 backdrop-blur-sm px-6 py-16 md:py-24">
      <div className="mx-auto grid max-w-5xl grid-cols-1 items-center gap-10 md:grid-cols-2 md:gap-16">
        {/* Coluna esquerda — texto */}
        <div className="text-center md:text-left">
          <span className="inline-flex items-center gap-3 text-sm font-medium tracking-[0.35em] text-aje-cafe-soft md:text-base">
            <span className="h-px w-8 bg-aje-cafe/60" aria-hidden="true" />
            {t('sections.contato.eyebrow').toUpperCase()}
            <span className="h-px w-8 bg-aje-cafe/60" aria-hidden="true" />
          </span>
          <h2 className="section-title-tight mt-5">{t('sections.contato.title')}</h2>
        </div>

        {/* Coluna direita — ação */}
        <div className="flex flex-col items-center gap-6 border-t border-aje-cafe/15 pt-8 text-center md:items-start md:border-t-0 md:border-l md:pl-16 md:pt-0 md:text-left">
          <a
            href={whatsappLink('Olá! Gostaria de agendar um atendimento.')}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block rounded-full bg-aje-cafe px-10 py-4 text-sm tracking-wide-label text-aje-paper transition-opacity hover:opacity-90"
          >
            {t('buttons.agendarAtendimento').toUpperCase()}
          </a>

          <p className="text-xs tracking-wide-label text-aje-ink-dim/70">
            VIA WHATSAPP · {WHATSAPP_DISPLAY}
          </p>

          <Dock>
            {CONTACT_ITEMS.map(({ label, icon: Icon, href }) => (
              <DockItem key={label} href={href}>
                <DockLabel>{label}</DockLabel>
                <DockIcon>
                  <Icon className="h-full w-full text-aje-cafe" strokeWidth={1.5} />
                </DockIcon>
              </DockItem>
            ))}
          </Dock>
        </div>
      </div>
    </section>
  );
}
