// Estado simples em memória (não localStorage/sessionStorage) para lembrar
// se a intro em vídeo já foi vista nesta "sessão" do app.
//
// Por quê um objeto em módulo, e não sessionStorage? Porque o comportamento
// pedido é: navegar entre páginas (Home -> Somos -> Home) NÃO deve repetir o
// vídeo, mas um F5 (refresh real da página) DEVE mostrá-lo de novo. Um
// módulo JS é recriado do zero a cada carregamento de página (refresh), mas
// permanece o mesmo enquanto o React Router troca de rota sem recarregar —
// exatamente o comportamento pedido, sem precisar limpar nada manualmente.
export const introState = {
  seen: false,
};
