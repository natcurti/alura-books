import { useQuery } from "@apollo/client";
import { ILivro } from "../../interfaces/ILivro";
import { OBTER_MAIS_VENDIDOS } from "./queries";

export const useMaisVendidos = () => {
  return useQuery<{ destaques: { maisVendidos: ILivro[] } }>(
    OBTER_MAIS_VENDIDOS
  );
};
