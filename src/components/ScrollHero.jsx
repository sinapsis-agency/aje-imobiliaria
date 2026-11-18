import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  FRAME_SETS,
  frameUrl,
  VIDEO_DURATION,
  LOGO_VISIBLE_UNTIL,
  MID_TEXT_DURATION_MS,
  MID_PAUSES,
  MOBILE_QUERY,
  FINAL_AT,
} from '../data/videoIntro';

const MID_TEXT_DURATION_S = MID_TEXT_DURATION_MS / 1000;
const POSTER = '/images/hero-poster.jpg';
const PARALLEL_LOADS = 6;

const clamp01 = (n) => Math.min(1, Math.max(0, n));

// Ordem de carregamento: primeiro o quadro 0, depois um espaçado (a cada 8),
// depois os intermediários. Assim a rolagem já funciona (com saltos) logo no
// começo e vai ficando suave conforme o resto chega.
function loadOrder(count) {
  const seen = new Set();
  const order = [];
  const add = (i) => {
    if (i >= 0 && i < count && !seen.has(i)) {
      seen.add(i);
      order.push(i);
    }
  };
  add(0);
  add(count - 1);
  [8, 4, 2, 1].forEach((step) => {
    for (let i = 0; i < count; i += step) add(i);
  });
  return order;
}

// Intro em scroll: os quadros do vídeo são desenhados num <canvas> conforme a
// pessoa rola. Não há vídeo para decodificar nem reproduzir, então roda
// fluido mesmo em celulares simples.
export default function ScrollHero({ onIntroComplete, staticEnd = false }) {
  const { t } = useTranslation();
  const sectionRef = useRef(null);
  const stickyRef = useRef(null);
  const canvasRef = useRef(null);
  const onCompleteRef = useRef(onIntroComplete);
  onCompleteRef.current = onIntroComplete;

  // Versão leve e vertical no celular; escolhida uma vez, na montagem.
  const [set] = useState(() =>
    typeof window !== 'undefined' && window.matchMedia?.(MOBILE_QUERY).matches
      ? FRAME_SETS.mobile
      : FRAME_SETS.desktop
  );

  const [time, setTime] = useState(0); // segundos do vídeo, em passos de 0,1
  const [showFinal, setShowFinal] = useState(false);
  const [atStart, setAtStart] = useState(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    const section = sectionRef.current;
    const sticky = stickyRef.current;
    if (!canvas || !section || !sticky) return undefined;

    const ctx = canvas.getContext('2d');
    const { count } = set;
    const frames = new Array(count).fill(null); // <img> já carregadas
    let disposed = false;
    let lastDrawn = -1;
    let want = staticEnd ? count - 1 : 0; // quadro desejado agora
    let target = staticEnd ? 1 : 0;
    let shown = target;
    let raf = 0;
    let completed = false;
    let lastTime = -1;
    let lastFinal = false;
    let lastAtStart = true;

    const draw = (index) => {
      // desenha o quadro carregado mais próximo do desejado
      for (let d = 0; d < count; d += 1) {
        const a = frames[index - d];
        const b = frames[index + d];
        const img = a || b;
        if (img) {
          if (img !== frames[lastDrawn]) ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          lastDrawn = frames.indexOf(img);
          return;
        }
      }
    };

    const applyProgress = (p) => {
      want = Math.round(p * (count - 1));
      if (want !== lastDrawn) draw(want);

      const time01 = Math.floor(p * VIDEO_DURATION * 10) / 10;
      if (time01 !== lastTime) {
        lastTime = time01;
        setTime(time01);
      }
      const isFinal = p >= FINAL_AT;
      if (isFinal !== lastFinal) {
        lastFinal = isFinal;
        setShowFinal(isFinal);
      }
      const start = p < 0.02;
      if (start !== lastAtStart) {
        lastAtStart = start;
        setAtStart(start);
      }
      if (isFinal && !completed) {
        completed = true;
        onCompleteRef.current?.();
      }
    };

    // Suaviza o movimento: o quadro "persegue" a posição do scroll.
    const tick = () => {
      const diff = target - shown;
      if (Math.abs(diff) < 0.0004) shown = target;
      else shown += diff * 0.2;
      applyProgress(shown);
      raf = shown === target ? 0 : requestAnimationFrame(tick);
    };

    const readScroll = () => {
      if (staticEnd) return;
      const rect = section.getBoundingClientRect();
      const total = rect.height - sticky.offsetHeight;
      target = total > 0 ? clamp01(-rect.top / total) : 0;
      if (!raf) raf = requestAnimationFrame(tick);
    };

    // ---- carregamento dos quadros ----
    const order = staticEnd ? [count - 1] : loadOrder(count);
    let next = 0;
    const loadNext = () => {
      if (disposed || next >= order.length) return;
      const index = order[next];
      next += 1;
      const img = new Image();
      img.onload = () => {
        if (disposed) return;
        frames[index] = img;
        // se este quadro é o mais próximo do desejado, redesenha
        if (lastDrawn === -1 || Math.abs(index - want) < Math.abs(lastDrawn - want)) draw(want);
        loadNext();
      };
      img.onerror = () => {
        if (!disposed) loadNext();
      };
      img.src = frameUrl(set, index);
    };
    for (let i = 0; i < PARALLEL_LOADS; i += 1) loadNext();

    window.addEventListener('scroll', readScroll, { passive: true });
    window.addEventListener('resize', readScroll);
    if (staticEnd) applyProgress(1);
    else readScroll(); // cobre refresh no meio da página

    return () => {
      disposed = true;
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener('scroll', readScroll);
      window.removeEventListener('resize', readScroll);
    };
  }, [set, staticEnd]);

  const goToProperties = () => {
    document.getElementById('imoveis')?.scrollIntoView({ behavior: 'smooth' });
  };

  const showLogo = !staticEnd && !showFinal && time <= LOGO_VISIBLE_UNTIL;

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-aje-black"
      style={staticEnd ? { height: '100svh', minHeight: '100vh' } : { height: `${set.scrollVh}svh` }}
      aria-label="Introdução Ajé Imobiliária"
    >
      <div
        ref={stickyRef}
        className="sticky top-0 h-screen w-full overflow-hidden"
        style={{ height: '100svh' }}
      >
        {/* Foto de capa enquanto o primeiro quadro não chega */}
        <img
          src={POSTER}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <canvas
          ref={canvasRef}
          width={set.width}
          height={set.height}
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover"
        />

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-aje-black/45 via-transparent to-aje-black/65" />

        {/* Logo — logo no início */}
        <div
          className={`pointer-events-none absolute left-1/2 top-24 z-10 w-64 -translate-x-1/2 transition-opacity duration-700 md:top-16 md:w-[450px] ${
            showLogo ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <img src="/images/aje-logo.png" alt="Ajé Imobiliária" className="w-full" />
        </div>

        {/* Convite para rolar */}
        {!staticEnd && (
          <div
            className={`pointer-events-none absolute inset-x-0 bottom-20 z-10 flex flex-col items-center gap-3 text-center transition-opacity duration-500 md:bottom-24 ${
              atStart ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <p className="animate-pulse text-xs tracking-[0.4em] text-aje-ivory-dim">
              {t('hero.scrollHint').toUpperCase()}
            </p>
            <span className="h-10 w-px bg-aje-gold/60" aria-hidden="true" />
          </div>
        )}

        {/* Frases do meio — sempre no DOM, só mudam de opacidade */}
        <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center px-6 text-center">
          {MID_PAUSES.map((pause) => {
            const visible = time >= pause.showAt && time < pause.showAt + MID_TEXT_DURATION_S;
            return (
              <p
                key={pause.id}
                className={`absolute font-display text-2xl font-light tracking-wide text-aje-ivory transition-opacity duration-700 ease-in-out md:text-4xl ${
                  visible && !staticEnd ? 'opacity-100' : 'opacity-0'
                }`}
              >
                {pause.id === 'pausa-1' ? t('hero.pause1') : t('hero.pause2')}
              </p>
            );
          })}
        </div>

        {/* Final: marca, frase e botão */}
        {!staticEnd && (
          <div
            className={`absolute inset-x-0 bottom-24 z-10 flex flex-col items-center px-6 text-center transition-opacity duration-700 md:bottom-32 ${
              showFinal ? 'opacity-100' : 'pointer-events-none opacity-0'
            }`}
            aria-hidden={!showFinal}
          >
            <img src="/images/aje-logo.png" alt={t('hero.brand')} className="mx-auto w-64 md:w-[450px]" />
            <p className="mt-2 font-display text-lg font-light uppercase tracking-wide text-aje-ivory-dim md:text-2xl">
              {t('hero.tagline')}
            </p>
            <button
              type="button"
              tabIndex={showFinal ? 0 : -1}
              onClick={goToProperties}
              className="mt-8 rounded-full border border-aje-gold px-8 py-3 text-xs tracking-wide-label text-aje-gold-soft transition-colors hover:bg-aje-gold hover:text-aje-black"
            >
              {t('hero.cta').toUpperCase()}
            </button>
          </div>
        )}

        {/* Pular a intro */}
        {!staticEnd && !showFinal && !atStart && (
          <button
            type="button"
            onClick={goToProperties}
            className="absolute bottom-6 right-6 z-20 text-[11px] tracking-wide-label text-aje-ivory-dim/80 underline underline-offset-4 hover:text-aje-ivory"
          >
            {t('hero.skip').toUpperCase()}
          </button>
        )}
      </div>
    </section>
  );
}
