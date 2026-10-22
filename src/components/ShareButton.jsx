import { useState } from 'react';
import { Share2, Copy, Check } from 'lucide-react';

// Ícones de marca não existem mais no lucide-react (removidos a partir da
// v1), então usamos SVGs simples e neutros — só para dar reconhecimento
// visual ao link, sem reproduzir nenhuma arte de marca registrada.
function WhatsAppIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12.004 2.003c-5.514 0-9.997 4.483-9.997 9.997 0 1.762.464 3.49 1.344 5.01l-1.421 5.19 5.312-1.395c1.469.802 3.12 1.225 4.762 1.225h.004c5.514 0 9.997-4.483 9.997-9.997 0-2.669-1.04-5.179-2.929-7.068a9.933 9.933 0 0 0-7.072-2.962zm0 18.179h-.003a8.33 8.33 0 0 1-4.235-1.158l-.304-.18-3.153.828.841-3.075-.198-.316a8.345 8.345 0 0 1-1.278-4.453c0-4.609 3.75-8.358 8.36-8.358a8.302 8.302 0 0 1 5.908 2.449 8.302 8.302 0 0 1 2.447 5.909c0 4.61-3.75 8.358-8.385 8.358zm4.58-6.257c-.251-.126-1.48-.73-1.71-.814-.23-.084-.397-.126-.564.126-.166.251-.647.814-.793.981-.146.168-.292.188-.543.063-.251-.126-1.058-.39-2.015-1.243-.745-.664-1.248-1.484-1.394-1.735-.146-.251-.016-.387.11-.512.112-.112.251-.293.376-.44.126-.147.167-.252.251-.419.084-.168.042-.314-.021-.44-.063-.126-.564-1.36-.773-1.86-.204-.489-.41-.423-.564-.431-.146-.007-.313-.009-.48-.009-.167 0-.439.063-.669.314-.23.252-.878.858-.878 2.09 0 1.233.899 2.425 1.024 2.593.126.168 1.768 2.699 4.283 3.785.598.258 1.065.412 1.429.527.6.191 1.147.164 1.579.1.482-.072 1.48-.605 1.69-1.19.21-.586.21-1.088.146-1.191-.063-.105-.23-.168-.48-.294z" />
    </svg>
  );
}

function FacebookIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M22 12.06C22 6.505 17.523 2 12 2S2 6.505 2 12.06c0 5.02 3.657 9.184 8.438 9.94v-7.03H7.898v-2.91h2.54V9.845c0-2.507 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562v1.875h2.773l-.443 2.91h-2.33V22c4.78-.756 8.437-4.92 8.437-9.94z" />
    </svg>
  );
}

// WhatsApp, Facebook e "copiar link" ficam sempre visíveis como ícones
// diretos — são os jeitos mais usados pela equipe da Ajé (a corretora usa
// Facebook) para mandar um imóvel. O botão com a seta só aparece em
// aparelhos com menu nativo de compartilhar (celulares), que já lista
// Instagram, Mensagens etc. — um site não consegue "mirar" direto no
// Instagram pelo navegador, só o próprio sistema sabe listar os apps.
export default function ShareButton({ title, url, labels }) {
  const [copied, setCopied] = useState(false);

  const canNativeShare = typeof navigator !== 'undefined' && typeof navigator.share === 'function';

  const handleNativeShare = async () => {
    try {
      await navigator.share({ title, url });
    } catch {
      // pessoa cancelou o compartilhamento — nada a fazer
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard indisponível (ex: http sem TLS) — ignora silenciosamente
    }
  };

  const whatsappHref = `https://api.whatsapp.com/send?text=${encodeURIComponent(`${title} — ${url}`)}`;
  const facebookHref = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;

  const iconButtonClass =
    'flex h-10 w-10 items-center justify-center rounded-full border border-aje-cafe/30 text-aje-cafe transition-colors hover:bg-aje-cafe/10';

  return (
    <div className="flex items-center gap-2">
      <a
        href={whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WhatsApp"
        className={iconButtonClass}
      >
        <WhatsAppIcon className="h-4 w-4" />
      </a>

      <a
        href={facebookHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Facebook"
        className={iconButtonClass}
      >
        <FacebookIcon className="h-4 w-4" />
      </a>

      <button type="button" onClick={handleCopy} aria-label={labels.copyLink} className={iconButtonClass}>
        {copied ? <Check className="h-4 w-4 text-aje-cafe" /> : <Copy className="h-4 w-4" />}
      </button>

      {canNativeShare && (
        <button type="button" onClick={handleNativeShare} aria-label={labels.share} className={iconButtonClass}>
          <Share2 className="h-4 w-4" />
        </button>
      )}

      {copied && (
        <span className="text-xs font-medium text-aje-cafe" role="status">
          {labels.copied}
        </span>
      )}
    </div>
  );
}
