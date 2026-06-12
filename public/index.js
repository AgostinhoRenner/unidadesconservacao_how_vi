async function carregarUnidades() {
    const resposta = await fetch('/unidades/');
    const dados    = await resposta.json();
    
    const lista = document.getElementById('lista');
    lista.innerHTML = dados.map(uc => `
        <li>
            <a href="/uc.html?id=${uc.id}"><strong>${uc.unidade_nome}</strong></a> — ${uc.instituicao_nome}
            <p>${uc.descricao}</p>
            <small>${new Date(uc.data_criacao).toLocaleDateString("pt-BR")}</small>
        </li>
    `).join('');
}
    
carregarUnidades();

const overlay = document.getElementById('modal-overlay');

document.getElementById('btn-abrir').addEventListener('click', () => {
    overlay.style.display = 'block';
    carregarSelect();
});

document.getElementById('btn-fechar').addEventListener('click', () => {
    overlay.style.display = 'none';
});

overlay.addEventListener('click', (evento) => {
    if (evento.target === overlay) {
    overlay.style.display = 'none';
    }
});

async function carregarSelect() {
    const resposta = await fetch('/unidades/');
    const ucs = await resposta.json();

    const select = document.querySelector('#form-comunicacao select');
    select.innerHTML = ucs.map(uc =>
        `<option value="${uc.id}">${uc.unidade_nome}</option>`
    ).join('');
}

const idUnidade = new URLSearchParams(window.location.search).get('id');
if (idUnidade) {
    overlay.style.display = 'block';
    carregarSelect().then(() => {
        document.querySelector('#form-comunicacao select').value = idUnidade;
    });
}

document.getElementById('form-comunicacao').addEventListener('submit', async (evento) => {
    evento.preventDefault();
    const form = evento.target;
    form.querySelector('[name="data_hora"]').value = new Date().toISOString().slice(0,16);
    const dados = Object.fromEntries(new FormData(form));

    const resposta = await fetch('/comunicado/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dados),
    });

    if (resposta.ok) {
        const msg = document.getElementById('msg-sucesso');
        msg.textContent = 'Comunicação enviada com sucesso!';
        form.reset();
        setTimeout(() => {
            msg.textContent = '';
            overlay.style.display = 'none';
        }, 2500);
    }
});