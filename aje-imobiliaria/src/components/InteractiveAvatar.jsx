import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

// Adaptado do briefing original para o stack real deste projeto (Vite + React
// + JavaScript). Diferença principal: em vez de `import img from "../assets/..."`
// (que exige que o bundler resolva os arquivos em build-time), usamos caminhos
// de string para /public/images/avatar/ — mesmo padrão já usado no resto do
// site (aje-logo.png, aje-abogado-avatar.webp etc.), então basta soltar os
// arquivos na pasta pública, sem precisar tocar em código.
//
// Melhoria sobre o briefing original: em vez de trocar a imagem via `key`
// (que remove a anterior instantaneamente, criando um "corte"), as duas
// imagens ficam empilhadas com posição absoluta e cruzam em opacidade
// (crossfade real), o que deixa a transição muito mais suave.
//
// IMPORTANTE: enquanto as 9 imagens reais não chegam, todas apontam para o
// avatar estático que já estava em uso, como placeholder — a troca de pose
// não vai aparecer visualmente até os arquivos reais serem adicionados em
// /public/images/avatar/ com estes nomes exatos:
//   center.png, right.png, left.png, up.png, down.png,
//   up-right.png, up-left.png, down-right.png, down-left.png

const FALLBACK = '/images/aje-abogado-avatar.webp';

const avatarImages = {
  center: '/images/avatar/center.png',
  right: '/images/avatar/right.png',
  left: '/images/avatar/left.png',
  up: '/images/avatar/up.png',
  down: '/images/avatar/down.png',
  upRight: '/images/avatar/up-right.png',
  upLeft: '/images/avatar/up-left.png',
  downRight: '/images/avatar/down-right.png',
  downLeft: '/images/avatar/down-left.png',
};

// Pequeno atraso antes de trocar de direção — evita "tremor" quando o
// cursor passa rápido perto da fronteira entre duas zonas.
const SWITCH_DEBOUNCE_MS = 140;

export default function InteractiveAvatar({ className = '', width = 'min(70vw, 620px)' }) {
  const containerRef = useRef(null);
  const [direction, setDirection] = useState('center');
  const [imgError, setImgError] = useState(false);
  const pendingRef = useRef(null);
  const debounceTimer = useRef(null);

  useEffect(() => {
    Object.values(avatarImages).forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (prefersReducedMotion || isTouchDevice) return undefined;

    const applyDirection = (newDirection) => {
      if (pendingRef.current === newDirection) return;
      pendingRef.current = newDirection;
      if (debounceTimer.current) clearTimeout(debounceTimer.current);
      debounceTimer.current = window.setTimeout(() => {
        setDirection(newDirection);
      }, SWITCH_DEBOUNCE_MS);
    };

    const handleMouseMove = (event) => {
      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const mouseX = event.clientX - rect.left;
      const mouseY = event.clientY - rect.top;
      const x = mouseX / rect.width;
      const y = mouseY / rect.height;

      const centerThreshold = 0.22;
      const horizontal = x < 0.5 - centerThreshold ? 'left' : x > 0.5 + centerThreshold ? 'right' : 'center';
      const vertical = y < 0.5 - centerThreshold ? 'up' : y > 0.5 + centerThreshold ? 'down' : 'center';

      let newDirection = 'center';
      if (vertical === 'center' && horizontal === 'center') newDirection = 'center';
      else if (vertical === 'up' && horizontal === 'left') newDirection = 'upLeft';
      else if (vertical === 'up' && horizontal === 'right') newDirection = 'upRight';
      else if (vertical === 'down' && horizontal === 'left') newDirection = 'downLeft';
      else if (vertical === 'down' && horizontal === 'right') newDirection = 'downRight';
      else if (vertical === 'up') newDirection = 'up';
      else if (vertical === 'down') newDirection = 'down';
      else if (horizontal === 'left') newDirection = 'left';
      else if (horizontal === 'right') newDirection = 'right';

      applyDirection(newDirection);
    };

    const handleMouseLeave = () => applyDirection('center');

    const container = containerRef.current;
    if (!container) return undefined;

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseleave', handleMouseLeave);
      if (debounceTimer.current) clearTimeout(debounceTimer.current);
    };
  }, []);

  const src = imgError ? FALLBACK : avatarImages[direction];

  return (
    <div
      ref={containerRef}
      className={`relative flex items-center justify-center ${className}`}
      style={{ width, aspectRatio: '1080 / 1350' }}
    >
      <AnimatePresence>
        <motion.img
          key={src}
          src={src}
          alt="Advogada responsável pelo suporte jurídico Ajé Imobiliária"
          draggable={false}
          onError={() => setImgError(true)}
          className="pointer-events-none absolute inset-0 block h-full w-full select-none object-contain"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.75, ease: [0.25, 0.1, 0.25, 1] }}
        />
      </AnimatePresence>
    </div>
  );
}
