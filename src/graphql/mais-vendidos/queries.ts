import { gql } from "@apollo/client";

export const OBTER_MAIS_VENDIDOS = gql`
  query ObterMaisVendidos {
    destaques {
      maisVendidos {
        id
        titulo
        imagemCapa
        descricao
        autor {
          nome
        }
        opcoesCompra {
          preco
        }
      }
    }
  }
`;
