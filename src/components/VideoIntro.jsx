import { useEffect, useRef, useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import {
  VIDEO_SRC,
  VIDEO_DURATION,
  LOGO_VISIBLE_UNTIL,
  MID_TEXT_DURATION_MS,
  MID_PAUSES,
} from '../data/videoIntro';

const END_THRESHOLD = 0.15; // segundos de margem para considerar "chegou ao fim"
const MID_TEXT_DURATION_S = MID_TEXT_DURATION_MS / 1000;

export default function VideoIntro({ onIntroComplete, staticEnd = false }) {
  const { t } = useTranslation();
  const videoRef = useRef(null);
  const hasEndedRef = useRef(false);
  // Indica que a pessoa iniciou o vídeo pelo botão "plano B" (ver handleForceStart).
  const forcedStartRef = useRef(false);

  const [isReady, setIsReady] = useState(false);
  const [loadTimedOut, setLoadTimedOut] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [showFinalPause, setShowFinalPause] = useState(false);
  const [introFinished, setIntroFinished] = useState(false);

  // Rede de segurança: se o vídeo demorar demais para carregar (wifi fraco,
  // celular, etc.), depois de 3s liberamos a pessoa em vez de deixá-la presa
  // numa tela preta sem conseguir fazer nada.
  useEffect(() => {
    if (staticEnd || isReady) return undefined;
    const timer = window.setTimeout(() => setLoadTimedOut(true), 3000);
    return () => window.clearTimeout(timer);
  }, [staticEnd, isReady]);

  const forceRepaint = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    if ('requestVideoFrameCallback' in video) {
      video.requestVideoFrameCallback(() => {});
    }
    video.style.opacity = '0.9999';
    requestAnimationFrame(() => {
      if (video) video.style.opacity = '1';
    });
  }, []);

  // ---- Primeiro frame visível sem clique, vídeo aguardando o toque do usuário ----
  // No modo staticEnd, pula direto para o último frame (sem reproduzir nada).
  const handleLoadedData = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    // Se a pessoa já iniciou o vídeo pelo botão "plano B", não pausamos nem
    // voltamos ao início: só marcamos como pronto e deixamos o vídeo seguir.
    if (forcedStartRef.current) {
      setIsReady(true);
      return;
    }

    if (staticEnd) {
      video.currentTime = VIDEO_DURATION;
      forceRepaint();
      setIsReady(true);
      return;
    }

    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          video.pause();
          video.currentTime = 0;
          forceRepaint();
          setIsReady(true);
        })
        .catch(() => {
          video.currentTime = 0;
          setIsReady(true);
        });
    } else {
      setIsReady(true);
    }
  }, [forceRepaint, staticEnd]);

  const finishIntro = useCallback(() => {
    setIntroFinished(true);
    onIntroComplete?.();
  }, [onIntroComplete]);

  // Marca o fim (uma única vez) e mostra a pausa final.
  const checkForEnd = useCallback(
    (t) => {
      if (hasEndedRef.current || t < VIDEO_DURATION - END_THRESHOLD) return;
      hasEndedRef.current = true;
      const video = videoRef.current;
      if (video) {
        video.pause();
        video.currentTime = VIDEO_DURATION;
        forceRepaint();
      }
      setShowFinalPause(true);
    },
    [forceRepaint]
  );

  const handleStart = useCallback(() => {
    if (hasStarted || !isReady) return;
    setHasStarted(true);
    videoRef.current?.play();
  }, [hasStarted, isReady]);

  // Plano B para celular: alguns navegadores (iPhone, economia de dados,
  // modo de baixo consumo) não baixam o vídeo até alguém tocar na tela, então
  // o evento "loadeddata" nunca chega e o vídeo nunca fica "pronto". Este
  // botão inicia o vídeo direto a partir do toque da pessoa, e o próprio
  // play() faz o navegador começar a carregar.
  const handleForceStart = useCallback(() => {
    if (hasStarted) return;
    forcedStartRef.current = true;
    setIsReady(true);
    setHasStarted(true);
    const playPromise = videoRef.current?.play();
    if (playPromise) playPromise.catch(() => {});
  }, [hasStarted]);

  // ---- Reprodução contínua e automática, em qualquer dispositivo ----
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !hasStarted) return undefined;

    const onTimeUpdate = () => {
      setCurrentTime(video.currentTime);
      checkForEnd(video.currentTime);
    };

    video.addEventListener('timeupdate', onTimeUpdate);
    return () => video.removeEventListener('timeupdate', onTimeUpdate);
  }, [hasStarted, checkForEnd]);

  useEffect(() => {
    if (staticEnd) return undefined; // modo estático nunca bloqueia o scroll
    const shouldLock = hasStarted && !introFinished;
    document.body.style.overflow = shouldLock ? 'hidden' : 'auto';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [hasStarted, introFinished, staticEnd]);

  const showLogo = !staticEnd && (!hasStarted || (hasStarted && currentTime <= LOGO_VISIBLE_UNTIL));
  const showStartPrompt = !staticEnd && isReady && !hasStarted;
  const showSkip = !staticEnd && loadTimedOut && !isReady && !hasStarted;

  return (
    <section
      className={`relative h-screen w-full overflow-hidden bg-aje-black ${
        !hasStarted && !staticEnd ? 'cursor-pointer' : ''
      }`}
      aria-label="Introdução em vídeo Ajé Imobiliária"
      onClick={!hasStarted && !staticEnd && isReady ? handleStart : undefined}
    >
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover"
        src={VIDEO_SRC}
        preload="auto"
        muted
        playsInline
        onLoadedData={handleLoadedData}
      />

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-aje-black/45 via-transparent to-aje-black/65" />

      {!isReady && !loadTimedOut && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-6 bg-aje-black">
          <div className="h-8 w-8 animate-spin rounded-full border border-aje-gold/30 border-t-aje-gold" />
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              finishIntro();
            }}
            className="text-[11px] tracking-wide-label text-aje-ivory-dim/70 underline underline-offset-4 hover:text-aje-ivory-dim"
          >
            PULAR INTRODUÇÃO
          </button>
        </div>
      )}

      {showSkip && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-aje-black text-center">
          <p className="max-w-xs text-sm font-light text-aje-ivory-dim">
            Toque para assistir à introdução.
          </p>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handleForceStart();
            }}
            className="rounded-full border border-aje-gold bg-aje-gold px-6 py-2 text-xs tracking-wide-label text-aje-black"
          >
            ASSISTIR
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              finishIntro();
            }}
            className="rounded-full border border-aje-gold px-6 py-2 text-xs tracking-wide-label text-aje-gold-soft transition-colors hover:bg-aje-gold hover:text-aje-black"
          >
            PULAR INTRODUÇÃO
          </button>
        </div>
      )}

      {/* Logo — visível na espera do clique e do segundo 0 ao 2 de reprodução */}
      <div
        className={`pointer-events-none absolute left-1/2 top-24 z-10 -translate-x-1/2 transition-all duration-700 md:top-16 ${
          showLogo ? 'opacity-100' : 'opacity-0'
        } w-64 md:w-[450px]`}
      >
        <img src="/images/aje-logo.png" alt="Ajé Imobiliária" className="w-full" />
      </div>

      {/* Convite para iniciar — elegante, sem botão de play */}
      {showStartPrompt && (
        <div className="absolute inset-x-0 bottom-20 z-10 flex flex-col items-center gap-3 text-center md:bottom-24">
          <span className="h-px w-10 bg-aje-gold/50" aria-hidden="true" />
          <p className="animate-pulse text-xs tracking-[0.4em] text-aje-ivory-dim">
            {t('hero.clickToStart').toUpperCase()}
          </p>
        </div>
      )}

      {/* Frase do meio — centralizada no meio da tela. Os dois textos ficam
          sempre no DOM e só mudam de opacidade (transição suave), em vez de
          aparecer/desaparecer de verdade — isso evita o "piscar" que
          acontecia antes ao trocar de frase perto da borda do tempo. */}
      <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center px-6 text-center">
        {MID_PAUSES.map((pause) => {
          const isVisible =
            currentTime >= pause.showAt && currentTime < pause.showAt + MID_TEXT_DURATION_S;
          return (
            <p
              key={pause.id}
              className={`absolute font-display text-2xl font-light tracking-wide text-aje-ivory transition-opacity duration-700 ease-in-out md:text-4xl ${
                isVisible ? 'opacity-100' : 'opacity-0'
              }`}
            >
              {pause.id === 'pausa-1' ? t('hero.pause1') : t('hero.pause2')}
            </p>
          );
        })}
      </div>

      {/* Pausa final — aqui sim o vídeo para de verdade */}
      {showFinalPause && (
        <div className="absolute inset-x-0 bottom-24 z-10 flex flex-col items-center px-6 text-center md:bottom-32">
          <div className="animate-[fadeIn_0.9s_ease-out]">
            <img
              src="/images/aje-logo.png"
              alt={t('hero.brand')}
              className="mx-auto w-64 md:w-[450px]"
            />
            <p className="mt-2 font-display text-lg font-light uppercase tracking-wide text-aje-ivory-dim md:text-2xl">
              {t('hero.tagline')}
            </p>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                finishIntro();
                // Pequeno atraso para o scroll da página ser liberado antes
                // de tentar rolar até a seção — senão o navegador ignora.
                window.setTimeout(() => {
                  document.getElementById('imoveis')?.scrollIntoView({ behavior: 'smooth' });
                }, 50);
              }}
              className="mt-8 rounded-full border border-aje-gold px-8 py-3 text-xs tracking-wide-label text-aje-gold-soft transition-colors hover:bg-aje-gold hover:text-aje-black"
            >
              {t('hero.cta').toUpperCase()}
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
