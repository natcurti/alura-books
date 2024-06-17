import { gql } from "@apollo/client";

export const OBTER_DETALHES_DO_LIVRO = gql`
  query ObterDetalhesDoLivro($slug: String!) {
    livro(slug: $slug) {
      id
      titulo
      imagemCapa
      descricao
      sobre
      opcoesCompra {
        id
        titulo
        preco
        formatos
      }
      autor {
        nome
        sobre
      }
      tags {
        nome
      }
    }
  }
`;
