import { GA_MEASUREMENT_ID } from '../data/site';

let started = false;

// Carrega o Google Analytics 4 só se houver um ID configurado em
// src/data/site.js. Como o site é uma SPA, o page_view é enviado
// manualmente a cada troca de rota (ver trackPageView).
export function initAnalytics() {
  if (started || !GA_MEASUREMENT_ID || typeof document === 'undefined') return;
  started = true;

  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    window.dataLayer.push(arguments);
  };
  window.gtag('js', new Date());
  window.gtag('config', GA_MEASUREMENT_ID, { send_page_view: false });
}

export function trackPageView(path) {
  if (!started || typeof window.gtag !== 'function') return;
  window.gtag('event', 'page_view', {
    page_path: path,
    page_location: window.location.href,
    page_title: document.title,
  });
}

// Eventos úteis de negócio (ex: clique no WhatsApp). No-op sem GA.
export function trackEvent(name, params = {}) {
  if (!started || typeof window.gtag !== 'function') return;
  window.gtag('event', name, params);
}
