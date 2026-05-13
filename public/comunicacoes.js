let todasComunicacoes = [];

function renderComunicacoes(dados) {
    const lista = document.getElementById('lista');
    lista.innerHTML = '';

    if (dados.length === 0) {
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
}

async function carregarDados() {
    const lista = document.getElementById('lista');
    const filtro = document.getElementById('filtro-uc');

    try {
        const [resUcs, resComunicacoes] = await Promise.all([
            fetch('/unidades/'),
            fetch('/comunicado/')
        ]);

        if (!resUcs.ok || !resComunicacoes.ok) {
            lista.textContent = 'Erro ao carregar dados.';
            return;
        }

        const ucs = await resUcs.json();
        todasComunicacoes = await resComunicacoes.json();

        ucs.forEach(uc => {
            const option = document.createElement('option');
            option.value = uc.id;
            option.textContent = uc.unidade_nome;
            filtro.appendChild(option);
        });

        renderComunicacoes(todasComunicacoes);

        filtro.addEventListener('change', () => {
            const ucId = Number(filtro.value);
            const filtradas = ucId
                ? todasComunicacoes.filter(c => c.unidade_id === ucId)
                : todasComunicacoes;
            renderComunicacoes(filtradas);
        });

    } catch (error) {
        lista.textContent = 'Não foi possível conectar ao servidor.';
    }
}

carregarDados();
