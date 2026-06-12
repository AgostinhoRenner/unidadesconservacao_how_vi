async function carregarComunicacao() {
    const id = new URLSearchParams(window.location.search).get('id');
    const container = document.getElementById('comunicacao');

    try {
        const resposta = await fetch(`/comunicado/${id}`);

        if (resposta.status === 404) {
            container.textContent = 'Comunicação não encontrada.';
            return;
        }

        if (!resposta.ok) {
            container.textContent = 'Erro ao carregar a comunicação.';
            return;
        }

        const c = await resposta.json();

        const unidade = document.createElement('h1');
        unidade.textContent = c.unidade_nome;

        const titulo = document.createElement('h2');
        titulo.textContent = c.titulo;

        const status = document.createElement('span');
        status.textContent = c.status === 0 ? 'Em Análise' : 'Analisada';
        status.className = c.status === 0 ? 'status pendente' : 'status resolvido';

        const descricao = document.createElement('p');
        descricao.className = 'descricao-comunicacao';
        descricao.textContent = c.descricao;

        const data = document.createElement('small');
        data.textContent = new Date(c.data_hora).toLocaleString('pt-BR');

        const email = document.createElement('p');
        email.className = 'meta-info';
        email.textContent = `Enviado por: ${c.email}`;

        const instituicao = document.createElement('p');
        instituicao.className = 'meta-info';
        instituicao.textContent = `Instituição responsável: ${c.instituicao_nome}`;

        container.append(unidade, titulo, status, descricao, data, email, instituicao);

        await configurarNavegacao(id);
    } catch (error) {
        container.textContent = 'Não foi possível conectar ao servidor.';
    }
}

// Mostra os botões "<" e ">" para navegar entre as comunicações,
// escondendo o botão quando não houver anterior/próxima
async function configurarNavegacao(idAtual) {
    const linkAnterior = document.getElementById('nav-prev');
    const linkProximo = document.getElementById('nav-next');

    try {
        const resposta = await fetch('/comunicado/');
        const lista = await resposta.json();

        const indice = lista.findIndex(c => c.id === Number(idAtual));

        if (indice > 0) {
            linkAnterior.href = `/comunicacao.html?id=${lista[indice - 1].id}`;
        } else {
            linkAnterior.remove();
        }

        if (indice !== -1 && indice < lista.length - 1) {
            linkProximo.href = `/comunicacao.html?id=${lista[indice + 1].id}`;
        } else {
            linkProximo.remove();
        }
    } catch (error) {
        console.error('Erro ao configurar navegação:', error);
        linkAnterior.remove();
        linkProximo.remove();
    }
}

carregarComunicacao();
