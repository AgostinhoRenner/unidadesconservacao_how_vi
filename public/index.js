async function carregarUnidade() {
  try {
    // Substitua pela URL real da sua rota no Express
    const resposta = await fetch("http://localhost:3000/unidades/1");
    const unidade = await resposta.json();

    // 1. Inserindo o Nome no H1
    document.getElementById("unidade-nome").textContent = unidade.nome;

    // 2. Formatando e inserindo a Data
    // O valor '2007-03-24' vira algo mais legível
    const dataFormatada = new Date(unidade.data_criacao).toLocaleDateString("pt-BR");
    document.getElementById("unidade-data").textContent = dataFormatada;

    // 3. Inserindo a Descrição no P
    document.getElementById("unidade-descricao").textContent = unidade.descricao;

    // 4. Mudando o SRC da Imagem
    // Se suas imagens estiverem em uma pasta public/img, adicione o caminho
    document.getElementById("unidade-img").src = unidade.imagem_url;
    document.getElementById("unidade-img").alt = unidade.nome;
  } catch (error) {
    console.error("Erro ao buscar dados:", error);
    document.getElementById("unidade-nome").textContent = "Erro ao carregar unidade.";
  }
}

// Chama a função ao carregar a página
carregarUnidade();
