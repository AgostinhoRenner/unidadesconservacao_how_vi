async function carregarComunicacoes() {
    const lista = document.getElementById('lista');

    try {
        const resposta = await fetch('/comunicado/');

        if (!resposta.ok) {
            lista.textContent = 'Erro ao carregar comunicações!';
            return;
        }

        const dados = await resposta.json();

        if (dados.length == 0) {
            lista.textContent = 'Nenhuma comunicação registrada.';
            return;
        }

        dados.forEach(c => {
            const item      = document.createElement('li');
            const titulo    = document.createElement('strong')
            const status    = document.createElement('span');
            const unidade   = document.createElement('p');
            const descricao = document.createElement('p');
            const data      = document.createElement('small');

            titulo.textContent = c.titulo;
            status.textContent = c.status === 0 ? 'Pendente' : 'Resolvido';
            status.className = c.status === 0 ? 'status pendente' : 'status resolvido';
            unidade.className = 'unidade';
            unidade.textContent = c.unidade_nome;
            descricao.textContent = c.descricao;
            data.textContent = new Date(c.data_hora).toLocaleString('pt-BR');

            item.append(titulo, status, unidade, descricao, data);
            lista.appendChild(item);
        });

    } catch (error) {
        lista.textContent = 'Não foi possível conectar ao servidor.';
    }
}

carregarComunicacoes();
