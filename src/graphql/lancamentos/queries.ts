import { gql } from "@apollo/client";

export const OBTER_LANCAMENTOS = gql`
  query ObterLancamentos {
    destaques {
      lancamentos {
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
