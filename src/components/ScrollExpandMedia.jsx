import { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import LocalImage from './LocalImage';

// Reescrito para reagir ao scroll NATURAL da página (scroll-linked), em vez
// de capturar/bloquear o scroll global (scroll-jacking). A versão anterior
// interceptava wheel/touch na janela inteira para forçar a expansão, o que
// prendia o usuário na seção e impedia voltar às seções anteriores. Esta
// versão nunca chama preventDefault nem trava o scroll — o progresso da
// animação é só uma função da posição da seção na tela, então rolar para
// cima ou para baixo sempre funciona normalmente.

export default function ScrollExpandMedia({ mediaSrc, mediaFallback, bgImageSrc, bgFallback, title, date, scrollToExpand, children }) {
  const sectionRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [isMobileState, setIsMobileState] = useState(false);
  const rafRef = useRef(null);

  useEffect(() => {
    const checkIfMobile = () => setIsMobileState(window.innerWidth < 768);
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  useEffect(() => {
    const computeProgress = () => {
      const section = sectionRef.current;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const vh = window.innerHeight;

      // 0 quando o topo da seção está na base da tela, 1 quando o topo da
      // seção chega ao topo da tela — a mídia expande enquanto a seção
      // "entra" na tela, e volta a encolher se o usuário rolar para cima.
      const raw = (vh - rect.top) / vh;
      setProgress(Math.min(1, Math.max(0, raw)));
    };

    const onScroll = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(computeProgress);
    };

    computeProgress();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const mediaWidth = 300 + progress * (isMobileState ? 500 : 900);
  const mediaHeight = 320 + progress * (isMobileState ? 160 : 320);
  const textTranslateX = progress * (isMobileState ? 140 : 120);
  const showContent = progress > 0.85;

  const firstWord = title ? title.split(' ')[0] : '';
  const restOfTitle = title ? title.split(' ').slice(1).join(' ') : '';

  return (
    <div ref={sectionRef} className="relative overflow-hidden">
      <section className="relative flex min-h-[100svh] flex-col items-center justify-start">
        <div className="relative flex min-h-[100svh] w-full flex-col items-center">
          <motion.div
            className="absolute inset-0 z-0 h-full"
            animate={{ opacity: 1 - progress }}
            transition={{ duration: 0.1 }}
          >
            <LocalImage src={bgImageSrc} fallback={bgFallback} alt="" className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-black/20" />
          </motion.div>

          <div className="relative z-10 mx-auto flex w-full flex-col items-center justify-start">
            <div className="relative flex h-[100svh] w-full flex-col items-center justify-center">
              <div
                className="absolute left-1/2 top-1/2 z-0 -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-2xl"
                style={{
                  width: `${mediaWidth}px`,
                  height: `${mediaHeight}px`,
                  maxWidth: '92vw',
                  maxHeight: '75vh',
                  boxShadow: '0px 20px 60px rgba(0, 0, 0, 0.3)',
                }}
              >
                <div className="relative h-full w-full">
                  <LocalImage src={mediaSrc} fallback={mediaFallback} alt={title || 'Imóvel'} className="h-full w-full object-cover" />
                  <div className="absolute inset-0 bg-black/45" style={{ opacity: 0.6 - progress * 0.35 }} />
                </div>

                <div className="absolute inset-x-0 bottom-4 z-10 flex flex-col items-center px-4 text-center">
                  {date && (
                    <p className="text-sm tracking-wide-label text-white/85" style={{ transform: `translateX(-${textTranslateX * 0.3}px)` }}>
                      {date}
                    </p>
                  )}
                  {scrollToExpand && (
                    <p
                      className="mt-1 text-xs tracking-wide-label text-white/70"
                      style={{ transform: `translateX(${textTranslateX * 0.3}px)` }}
                    >
                      {scrollToExpand}
                    </p>
                  )}
                </div>
              </div>

              <div className="relative z-10 flex w-full flex-col items-center justify-center gap-2 text-center">
                <h2 className="section-title text-white" style={{ transform: `translateX(-${textTranslateX}px)` }}>
                  {firstWord}
                </h2>
                <h2 className="section-title text-white" style={{ transform: `translateX(${textTranslateX}px)` }}>
                  {restOfTitle}
                </h2>
              </div>
            </div>

            <motion.section
              className="flex w-full flex-col items-center px-6 py-14 md:px-16 md:py-20"
              animate={{ opacity: showContent ? 1 : 0 }}
              transition={{ duration: 0.5 }}
              style={{ pointerEvents: showContent ? 'auto' : 'none' }}
            >
              {children}
            </motion.section>
          </div>
        </div>
      </section>
    </div>
  );
}
