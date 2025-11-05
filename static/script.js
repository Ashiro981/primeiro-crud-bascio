const form = document.getElementById('form');
const tabelaBody = document.getElementById('tbody');

async function carregarDados() {
    const resposta = await fetch('/api/dados');
    const dados = await resposta.json();

    tabelaBody.innerHTML = '';
    dados.forEach(item => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${item.id}</td>
            <td>${item.nome}</td>
            <td>${item.email}</td>
            <td class="Ferramentas"><button class="BtnEditar">Editar</button> <button class="BtnExcluir">Excluir</button></td>
        `;
        tabelaBody.appendChild(tr);
    });
}

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;

    const resposta = await fetch('/api/dados', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({nome,email})
    })

    if (resposta.ok) {
        form.reset();
        carregarDados();
    }
});
tabelaBody.addEventListener('click', async (e) => {
    if (e.target.classList.contains('BtnEditar')) {
        const linha = e.target.closest('tr');

        
        const id = linha.children[0].textContent;
        
        const novoNome = prompt('Digite o novo nome:', linha.children[1].textContent);
        const novoEmail = prompt('Digite o novo email:', linha.children[2].textContent);

        if (novoNome && novoEmail) {
            const resposta = await fetch(`/api/dados/${id}`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({nome: novoNome, email: novoEmail})
        });

            if (resposta.ok) {
                carregarDados();
            }
        }
    }
});
tabelaBody.addEventListener('click', async (e) => {
    if (e.target.classList.contains('BtnExcluir')) {
        const linha = e.target.closest('tr');
        const id = linha.children[0].textContent;
        const confirmar = confirm('Tem certeza que deseja excluir este item?');
        if (confirmar) {
        const resposta = await fetch(`api/dados/${id}`, {
            method: 'DELETE'
        });
        if (resposta.ok) {
            carregarDados();
        }
        }
    }
});
carregarDados();
