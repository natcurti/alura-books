function aplicarDesconto(elemento){
    const desconto = 0.3;
    livrosNovoPreco = elemento.map(book => {
        return {... book, preco: book.preco - (book.preco * desconto)}
    })
    return livrosNovoPreco;
}