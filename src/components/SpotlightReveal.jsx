import { useEffect, useRef, useState } from 'react';

// Adaptado do briefing "Lithos" (React + TypeScript + Vite) para Vite + React
// + JavaScript. A versão original usava um <canvas> oculto para desenhar um
// gradiente radial e convertê-lo em imagem (toDataURL) a cada frame — isso é
// pesado, e no celular causava um efeito "tremido/piscando". Esta versão usa
// uma máscara CSS (radial-gradient) diretamente, sem canvas nenhum: o
// navegador anima isso de forma nativa e muito mais suave.

const SPOTLIGHT_R = 220;

function useResolvedImage(image) {
  const [src, setSrc] = useState(image?.src ?? image);

  useEffect(() => {
    const target = image?.src ?? image;
    const fallback = image?.fallback;
    if (!fallback) {
      setSrc(target);
      return undefined;
    }
    const probe = new Image();
    probe.onload = () => setSrc(target);
    probe.onerror = () => setSrc(fallback);
    probe.src = target;
    return undefined;
  }, [image]);

  return src;
}

export default function SpotlightReveal({ baseSrc, revealSrc, className = '', children }) {
  const containerRef = useRef(null);
  const mouse = useRef({ x: -999, y: -999 });
  const smooth = useRef({ x: -999, y: -999 });
  const rafRef = useRef(null);
  const [cursorPos, setCursorPos] = useState({ x: -999, y: -999 });
  const [visible, setVisible] = useState(false);

  const resolvedBase = useResolvedImage(baseSrc);
  const resolvedReveal = useResolvedImage(revealSrc);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return undefined;

    const setFromPoint = (clientX, clientY) => {
      const rect = el.getBoundingClientRect();
      mouse.current = { x: clientX - rect.left, y: clientY - rect.top };
      setVisible(true);
    };

    const handleMouseMove = (event) => setFromPoint(event.clientX, event.clientY);
    const handleMouseLeave = () => setVisible(false);

    // No celular, o "cursor" é o dedo — funciona ao arrastar sobre a imagem,
    // sem bloquear o scroll normal da página (não usamos preventDefault).
    const handleTouchMove = (event) => {
      const touch = event.touches[0];
      if (touch) setFromPoint(touch.clientX, touch.clientY);
    };
    const handleTouchEnd = () => setVisible(false);

    const loop = () => {
      smooth.current.x += (mouse.current.x - smooth.current.x) * 0.12;
      smooth.current.y += (mouse.current.y - smooth.current.y) * 0.12;
      setCursorPos({ x: smooth.current.x, y: smooth.current.y });
      rafRef.current = requestAnimationFrame(loop);
    };

    el.addEventListener('mousemove', handleMouseMove);
    el.addEventListener('mouseleave', handleMouseLeave);
    el.addEventListener('touchmove', handleTouchMove, { passive: true });
    el.addEventListener('touchstart', handleTouchMove, { passive: true });
    el.addEventListener('touchend', handleTouchEnd);
    rafRef.current = requestAnimationFrame(loop);

    return () => {
      el.removeEventListener('mousemove', handleMouseMove);
      el.removeEventListener('mouseleave', handleMouseLeave);
      el.removeEventListener('touchmove', handleTouchMove);
      el.removeEventListener('touchstart', handleTouchMove);
      el.removeEventListener('touchend', handleTouchEnd);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // Máscara CSS nativa — sem canvas, sem toDataURL a cada frame.
  const maskStyle = `radial-gradient(circle ${SPOTLIGHT_R}px at ${cursorPos.x}px ${cursorPos.y}px, white 0%, white 40%, rgba(255,255,255,0.75) 60%, rgba(255,255,255,0.4) 75%, rgba(255,255,255,0.12) 88%, transparent 100%)`;

  return (
    <div ref={containerRef} className={`relative overflow-hidden ${className}`}>
      {/* Camada base — imagem "de fundo" (ex: Pipa antiga) */}
      <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url(${resolvedBase})` }} />

      {/* Camada revelada apenas dentro do círculo do cursor/dedo (ex: Pipa atual) */}
      <div
        className="pointer-events-none absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-300"
        style={{
          backgroundImage: `url(${resolvedReveal})`,
          WebkitMaskImage: maskStyle,
          maskImage: maskStyle,
          opacity: visible ? 1 : 0,
          willChange: 'mask-image, -webkit-mask-image',
        }}
      />

      {/* Escurece um pouco para garantir contraste do texto por cima */}
      <div className="pointer-events-none absolute inset-0 bg-black/25" />

      <div className="relative z-10">{children}</div>
    </div>
  );
}
