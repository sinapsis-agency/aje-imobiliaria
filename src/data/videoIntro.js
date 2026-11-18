// Configuração do vídeo imersivo do hero.
// Duração real informada pelo designer: 10,27s
//
// IMPORTANTE: os tempos de "pausa" (checkpoints) abaixo são uma ESTIMATIVA
// dividindo o vídeo em 3 momentos iguais. Assim que o vídeo final chegar,
// ajustar checkpointTime de cada pausa para coincidir com o momento exato
// em que a cena "assenta" visualmente (ex: quando o drone para de se mover
// sobre o mar, sobre a falésia, e na chegada ao imóvel).

// Duas versões do mesmo vídeo (mesmos tempos, mesma duração):
//  - desktop: 1280x720, ~2,8 MB
//  - celular: recorte vertical 540x960, ~1,9 MB (o vídeo original tinha 12 MB)
// Ambas sem áudio e com o "moov" no início do arquivo (faststart), para
// começar a tocar antes de terminar de baixar.
export const VIDEO_SRC = '/videos/hero-intro.mp4';
export const VIDEO_SRC_MOBILE = '/videos/hero-intro-mobile.mp4';
export const MOBILE_QUERY = '(max-width: 767px)';
export const VIDEO_DURATION = 10.73;

export const LOGO_VISIBLE_UNTIL = 1; // segundos — logo visível do 0 ao 1

// Quanto tempo (ms) cada frase do meio fica na tela antes de desaparecer
// sozinha. O vídeo NÃO pausa nesses momentos — continua rodando fluido.
export const MID_TEXT_DURATION_MS = 2000;

// Frases que aparecem SOBRE o vídeo em reprodução contínua, sem pausar.
export const MID_PAUSES = [
  { id: 'pausa-1', showAt: 1, text: 'Onde o Nordeste toca o céu.' }, // 1s a 3s
  { id: 'pausa-2', showAt: 5, text: 'Prosperidade tem forma de lar.' }, // 5s a 7s
];

// Pausa final real — aqui sim o vídeo para de verdade, mostra o texto e o
// CTA, e aguarda o clique do usuário para liberar o resto do site.
export const FINAL_PAUSE = {
  id: 'pausa-3',
  brand: 'Ajé Imobiliária',
  tagline: 'Bem-vindo ao Nordeste.',
  cta: 'Descobrir imóveis',
};

// ---- Intro controlada pelo scroll (ScrollHero) ----
// Em vez de tocar um vídeo, o hero mostra uma sequência de quadros (WebP)
// desenhados num <canvas> conforme a pessoa rola a página. Os quadros foram
// extraídos do mesmo vídeo (10 por segundo) e ficam em public/frames/.
// Para trocar o vídeo no futuro: gere os quadros de novo (ver LEIA-ME em
// public/frames/) e ajuste `count` e VIDEO_DURATION.
export const FRAME_SETS = {
  desktop: { dir: '/frames/desktop', count: 107, width: 960, height: 540, scrollVh: 450 },
  mobile: { dir: '/frames/mobile', count: 107, width: 406, height: 720, scrollVh: 380 },
};
export const frameUrl = (set, index) =>
  `${set.dir}/f${String(index + 1).padStart(3, '0')}.webp`;

// Progresso (0 a 1) a partir do qual aparece o texto final + botão.
export const FINAL_AT = 0.95;
