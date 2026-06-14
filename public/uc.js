async function carregarUnidade() {
  try {
    const id = new URLSearchParams(window.location.search).get("id");
    const resposta = await fetch(`/unidades/${id}`);
    const unidade = await resposta.json();

    // 1. Inserindo o Nome no H1
    document.getElementById("unidade-nome").textContent = unidade.unidade_nome;

    // 2. Formatando e inserindo a Data
    // O valor '2007-03-24' vira algo mais legível
    const dataFormatada = new Date(unidade.data_criacao).toLocaleDateString("pt-BR");
    document.getElementById("unidade-data").textContent = dataFormatada;

    // 3. Inserindo a Descrição no P
    document.getElementById("unidade-descricao").textContent = unidade.descricao;

    // 3.1 Listando os municípios (relação N-M)
    const listaMunicipios = document.getElementById("unidade-municipios");
    unidade.municipios.forEach(municipio => {
      const item = document.createElement("li");
      item.textContent = `${municipio.nome} - ${municipio.estado}`;
      listaMunicipios.appendChild(item);
    });

    // 3.2 Instituição responsável e contato
    document.getElementById("unidade-instituicao").textContent = unidade.instituicao_nome;
    document.getElementById("unidade-email").textContent = unidade.email;

    // 4. Mudando o SRC da Imagem
    // Se suas imagens estiverem em uma pasta public/img, adicione o caminho
    document.getElementById("unidade-img").src = unidade.imagem_url;
    document.getElementById("unidade-img").alt = unidade.unidade_nome;

    // 5. Links cruzados com as comunicações desta unidade
    document.getElementById("ver-comunicacoes-link").href = `/comunicacoes.html?id=${id}`;
    document.getElementById("enviar-comunicacao-link").href = `/index.html?id=${id}`;

    // 6. Navegação entre unidades (anterior/próxima)
    await configurarNavegacao(id);
  } catch (error) {
    console.error("Erro ao buscar dados:", error);
    document.getElementById("unidade-nome").textContent = "Erro ao carregar unidade.";
  }
}

// Mostra os botões "<" e ">" para navegar entre as unidades,
// escondendo o botão quando não houver anterior/próxima
async function configurarNavegacao(idAtual) {
  const linkAnterior = document.getElementById("nav-prev");
  const linkProximo = document.getElementById("nav-next");

  try {
    const resposta = await fetch("/unidades/");
    const lista = await resposta.json();

    const indice = lista.findIndex(uc => uc.id === Number(idAtual));

    if (indice > 0) {
      linkAnterior.href = `/uc.html?id=${lista[indice - 1].id}`;
    } else {
      linkAnterior.remove();
    }

    if (indice !== -1 && indice < lista.length - 1) {
      linkProximo.href = `/uc.html?id=${lista[indice + 1].id}`;
    } else {
      linkProximo.remove();
    }
  } catch (error) {
    console.error("Erro ao configurar navegação:", error);
    linkAnterior.remove();
    linkProximo.remove();
  }
}

// Chama a função ao carregar a página
carregarUnidade();
