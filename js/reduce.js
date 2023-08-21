function calcularValorLivrosDisponiveis(elemento){
    return elemento.reduce((acc, livro) => acc + livro.preco, 0).toFixed(2);
}