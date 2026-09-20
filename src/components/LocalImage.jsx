import { useState, useEffect } from 'react';

/**
 * Muestra primero la foto local (`src`). Si aún no existe (404), cambia
 * sola a la foto de respaldo (`fallback`) — sin que haga falta tocar código
 * cuando se agregue la foto real más adelante.
 */
export default function LocalImage({ src, fallback, alt, className, loading }) {
  const [current, setCurrent] = useState(src);

  // IMPORTANTE: useState solo usa `src` como valor inicial, una única vez.
  // Sin este efecto, si el componente cambia de foto (ej: al hacer clic en
  // una miniatura de la galería) el <img> se queda pegado en la primera
  // imagen que mostró, porque React nunca vuelve a leer `src` de por sí.
  useEffect(() => {
    setCurrent(src);
  }, [src]);

  return (
    <img
      src={current}
      alt={alt}
      className={className}
      loading={loading}
      onError={() => {
        if (fallback && current !== fallback) setCurrent(fallback);
      }}
    />
  );
}
