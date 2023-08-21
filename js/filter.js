// const btnFiltrarLivrosFront = document.getElementById('btnFiltrarLivrosFront');
// btnFiltrarLivrosFront.addEventListener("click", filtrarLivros); 
// Isso selecionaria um botão por vez, e para evitar a repetição de código fizemos um código mais generalista.

const botoes = document.querySelectorAll('.btn');

botoes.forEach(btn => btn.addEventListener("click", filtrarLivros));

function filtrarLivros(){
    const elementoBotao = document.getElementById(this.id);
    const categoria = elementoBotao.value;
    let livrosFiltrados = categoria == 'disponivel' ? filtrarPorDisponibilidade() : filtrarPorCategoria(categoria);    
    let livrosFiltradoseComDesconto = aplicarDesconto(livrosFiltrados);
    exibeLivrosNaTela(livrosFiltradoseComDesconto);
    if (categoria == 'disponivel'){
        const valorTotal = calcularValorLivrosDisponiveis(livrosFiltradoseComDesconto);
        exibirValorTotalLivros(valorTotal);
    }

}

function filtrarPorCategoria(categoria) {
    return livros.filter(book => book.categoria == categoria);
}

function filtrarPorDisponibilidade() {
    return livros.filter(book => book.quantidade > 0);
}

function exibirValorTotalLivros(valorTotal){
    valorTotalLivrosDisponiveis.innerHTML = `
    <div class="livros__disponiveis">
    <p>Todos os livros disponíveis por R$ <span id="valor">${valorTotal}</span></p>
    </div>
    `
}
