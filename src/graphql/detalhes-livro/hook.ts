import { useQuery } from "@apollo/client";
import { ILivro } from "../../interfaces/ILivro";
import { OBTER_DETALHES_DO_LIVRO } from "./queries";

export const useDetalhesDoLivro = (slug: string) => {
  return useQuery<{ livro: ILivro }>(OBTER_DETALHES_DO_LIVRO, {
    variables: {
      slug: slug,
    },
  });
};
