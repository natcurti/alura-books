const sectionLivros = document.getElementById('livros');
const valorTotalLivrosDisponiveis = document.getElementById('valor_total_livros_disponiveis');

function exibeLivrosNaTela(listaDeLivros){
    sectionLivros.innerHTML = '';
    valorTotalLivrosDisponiveis.innerHTML = '';
    listaDeLivros.forEach(elemento => {
        let disponibilidade = elemento.quantidade > 0 ? 'livro_imagens' : 'livro_imagens indisponivel';
        sectionLivros.innerHTML += `
        <div class="livro">
        <img class="${disponibilidade}" src="${elemento.imagem}"
          alt="${elemento.alt}" />
        <h2 class="livro__titulo">${elemento.titulo}</h2>
        <p class="livro__descricao">${elemento.autor}</p>
        <p class="livro__preco" id="preco">R$${elemento.preco.toFixed(2)}</p>
        <div class="tags">
          <span class="tag">${elemento.categoria}</span>
        </div>
      </div>
        `
    });
}

// function verificarDisponibilidade(livro){
//   if (livro.quantidade > 0){
//     return 'livro_imagens';
//   } else {
//     return 'livro_imagens indisponivel';
//   }

// }