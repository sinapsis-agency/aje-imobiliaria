import { useState } from 'react';

/**
 * Muestra primero la foto local (`src`). Si aún no existe (404), cambia
 * sola a la foto de respaldo (`fallback`) — sin que haga falta tocar código
 * cuando se agregue la foto real más adelante.
 */
export default function LocalImage({ src, fallback, alt, className, loading }) {
  const [current, setCurrent] = useState(src);

  return (
    <img
      src={current}
      alt={alt}
      className={className}
      loading={loading}
      onError={() => {
        if (current !== fallback) setCurrent(fallback);
      }}
    />
  );
}
