import { useState, useEffect } from 'react';

/**
 * Muestra primero la foto local (`src`). Si aún no existe (404), cambia
 * sola a la foto de respaldo (`fallback`) — sin que haga falta tocar código
 * cuando se agregue la foto real más adelante.
 *
 * Si INCLUSO la foto de respaldo falla (por ejemplo, sin conexión, o si el
 * banco externo bloqueó la imagen), en vez de dejar el ícono de "imagen
 * rota" del navegador, se muestra un fondo neutro liso — nunca una imagen
 * rota visible.
 */
export default function LocalImage({ src, fallback, alt, className, loading }) {
  const [current, setCurrent] = useState(src);
  const [failed, setFailed] = useState(false);

  // IMPORTANTE: useState solo usa `src` como valor inicial, una única vez.
  // Sin este efecto, si el componente cambia de foto (ej: al hacer clic en
  // una miniatura de la galería) el <img> se queda pegado en la primera
  // imagen que mostró, porque React nunca vuelve a leer `src` de por sí.
  useEffect(() => {
    setCurrent(src);
    setFailed(false);
  }, [src]);

  if (failed) {
    return <div className={`${className} bg-aje-paper-soft`} aria-label={alt} role="img" />;
  }

  return (
    <img
      src={current}
      alt={alt}
      className={className}
      loading={loading}
      onError={() => {
        if (fallback && current !== fallback) {
          setCurrent(fallback);
        } else {
          setFailed(true);
        }
      }}
    />
  );
}
