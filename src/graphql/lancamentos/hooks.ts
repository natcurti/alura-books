import { useQuery } from "@apollo/client";
import { ILivro } from "../../interfaces/ILivro";
import { OBTER_LANCAMENTOS } from "./queries";

export const useLancamentos = () => {
  return useQuery<{ destaques: { lancamentos: ILivro[] } }>(OBTER_LANCAMENTOS);
};
