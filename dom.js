// --- dom.js ---

let carrinho = []; // Lista para guardar os livros comprados

document.addEventListener('DOMContentLoaded', function() {
    atualizarTela();
});

// === 1. Renderização da Tela Principal ===
function atualizarTela() {
    const listaLivros = Storage.lerLivros();
    const container = document.getElementById('catalogo-livros');
    const filtroGenero = document.getElementById('filtro-genero').value;

    container.innerHTML = '';

    listaLivros.forEach(livro => {
        if (filtroGenero === 'todos' || livro.genero === filtroGenero) {
            
            let corEstado = 'bg-secondary';
            if(livro.estado === 'Novo') corEstado = 'bg-success';
            if(livro.estado.includes('Usado')) corEstado = 'bg-warning text-dark';

            const economia = livro.precoOriginal - livro.preco;
            const porcentagem = Math.round((economia / livro.precoOriginal) * 100);

            const card = `
                <div class="card card-livro shadow-sm">
                    <div class="row g-0 align-items-center">
                        <div class="col-4 col-md-2 text-center bg-light p-2 position-relative">
                             <span class="position-absolute top-0 start-0 badge rounded-pill bg-danger m-2">
                                -${porcentagem}%
                             </span>
                            <img src="${livro.imagem}" class="capa-livro img-fluid rounded shadow-sm" alt="${livro.titulo}">
                        </div>
                        <div class="col-8 col-md-10">
                            <div class="card-body">
                                <div class="d-flex justify-content-between align-items-start">
                                    <div>
                                        <h5 class="card-title mb-1 fw-bold">${livro.titulo}</h5>
                                        <p class="card-text text-muted mb-1">${livro.autor}</p>
                                        <div class="mb-2">
                                            <span class="badge bg-primary bg-opacity-75 text-white me-1">${livro.genero}</span>
                                            <span class="badge ${corEstado}">${livro.estado}</span>
                                        </div>
                                    </div>
                                    <div class="text-end d-none d-md-block">
                                        <small class="text-muted text-decoration-line-through">R$ ${livro.precoOriginal.toFixed(2)}</small>
                                        <div class="preco-destaque">R$ ${livro.preco.toFixed(2)}</div>
                                    </div>
                                </div>
                                <p class="card-text mt-2 text-truncate d-none d-md-block text-secondary" style="max-width: 600px;">
                                    ${livro.sinopse}
                                </p>
                                <div class="d-flex justify-content-between align-items-end mt-3">
                                    <div class="d-md-none">
                                        <div class="preco-destaque">R$ ${livro.preco.toFixed(2)}</div>
                                    </div>
                                    <button class="btn btn-outline-primary btn-sm px-4" onclick="verDetalhes(${livro.id})">
                                        Ver Detalhes
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            container.innerHTML += card;
        }
    });
}

// === 2. Modal de Detalhes ===
function verDetalhes(id) {
    const livro = Storage.lerLivroPorId(id);

    if (livro) {
        document.getElementById('detalheTitulo').innerText = livro.titulo;
        document.getElementById('detalheAutor').innerText = "Autor: " + livro.autor;
        document.getElementById('detalheGenero').innerText = livro.genero;
        document.getElementById('detalheEstado').innerText = livro.estado;
        document.getElementById('detalheSinopse').innerText = livro.sinopse;
        document.getElementById('detalhePrecoOriginal').innerText = livro.precoOriginal.toFixed(2);
        document.getElementById('detalhePreco').innerText = livro.preco.toFixed(2);
        document.getElementById('detalheImagem').src = livro.imagem;

        // Configura botão de adicionar (passando o ID correto)
        const btnAdicionar = document.getElementById('btn-adicionar-modal');
        // Clona o botão para limpar eventos anteriores (evita adicionar 2x ao clicar várias vezes)
        const novoBtn = btnAdicionar.cloneNode(true);
        btnAdicionar.parentNode.replaceChild(novoBtn, btnAdicionar);
        
        novoBtn.addEventListener('click', function() {
            adicionarAoCarrinho(livro);
        });

        const modal = new bootstrap.Modal(document.getElementById('modalDetalhes'));
        modal.show();
    }
}

// === 3. Lógica do Carrinho ===

function adicionarAoCarrinho(livro) {
    // Adiciona o livro na lista do carrinho
    carrinho.push(livro);
    
    // Atualiza o contador na Navbar
    document.getElementById('contador-carrinho').innerText = carrinho.length;

    // Atualiza a visualização da barra lateral
    desenharCarrinhoLateral();

    // Fecha o modal de detalhes
    const modalElement = document.getElementById('modalDetalhes');
    const modalInstance = bootstrap.Modal.getInstance(modalElement);
    modalInstance.hide();

    // Abre a barra lateral do carrinho automaticamente para mostrar que adicionou
    const offcanvasElement = document.getElementById('offcanvasCarrinho');
    const offcanvasInstance = new bootstrap.Offcanvas(offcanvasElement);
    offcanvasInstance.show();
}

function desenharCarrinhoLateral() {
    const container = document.getElementById('lista-itens-carrinho');
    const totalElement = document.getElementById('valor-total-carrinho');
    
    container.innerHTML = ''; // Limpa

    let total = 0;

    if (carrinho.length === 0) {
        container.innerHTML = '<p class="text-center text-muted mt-5">Seu carrinho está vazio.</p>';
    } else {
        carrinho.forEach((item, index) => {
            total += item.preco;
            
            const itemHtml = `
                <div class="card mb-3 border-0 shadow-sm">
                    <div class="row g-0">
                        <div class="col-3">
                            <img src="${item.imagem}" class="img-fluid rounded-start h-100" style="object-fit: cover;">
                        </div>
                        <div class="col-9">
                            <div class="card-body py-2 px-3 position-relative">
                                <h6 class="card-title mb-1 text-truncate">${item.titulo}</h6>
                                <p class="card-text text-success fw-bold mb-1">R$ ${item.preco.toFixed(2)}</p>
                                <button class="btn btn-sm btn-outline-danger position-absolute bottom-0 end-0 m-2" onclick="removerDoCarrinho(${index})">
                                    Remover
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            container.innerHTML += itemHtml;
        });
    }

    totalElement.innerText = "R$ " + total.toFixed(2);
}

function removerDoCarrinho(index) {
    carrinho.splice(index, 1); // Remove o item pelo índice
    document.getElementById('contador-carrinho').innerText = carrinho.length;
    desenharCarrinhoLateral();
}

function finalizarCompraSimulada() {
    if (carrinho.length === 0) {
        alert("Seu carrinho está vazio! Adicione alguns livros antes de finalizar.");
        return;
    }

    // 1. Calcula o total da compra
    let total = 0;
    carrinho.forEach(item => total += item.preco);

    // 2. Mensagem sem emoji
    const mensagem = `Pedido Confirmado com Sucesso!\n\n` +
                     `Você adquiriu ${carrinho.length} livros.\n` +
                     `Valor Total: R$ ${total.toFixed(2)}\n\n` +
                     `Obrigado por escolher a EcoLivros. Boa leitura!`;

    // Mostra a mensagem
    alert(mensagem);

    // 3. Fecha a barra lateral
    const offcanvasElement = document.getElementById('offcanvasCarrinho');
    const offcanvasInstance = bootstrap.Offcanvas.getInstance(offcanvasElement);
    offcanvasInstance.hide();

    // 4. Limpa o carrinho
    carrinho = [];
    document.getElementById('contador-carrinho').innerText = "0";
    desenharCarrinhoLateral();
}