// Configuração do vídeo imersivo do hero.
// Duração real informada pelo designer: 10,27s
//
// IMPORTANTE: os tempos de "pausa" (checkpoints) abaixo são uma ESTIMATIVA
// dividindo o vídeo em 3 momentos iguais. Assim que o vídeo final chegar,
// ajustar checkpointTime de cada pausa para coincidir com o momento exato
// em que a cena "assenta" visualmente (ex: quando o drone para de se mover
// sobre o mar, sobre a falésia, e na chegada ao imóvel).

export const VIDEO_SRC = '/videos/hero-intro.mp4';
export const VIDEO_DURATION = 10.27;

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
