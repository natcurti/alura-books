import { ReactElement, createContext, useContext } from "react";
import { ICarrinho } from "../../interfaces/ICarrinho";
import {
  useAddItens,
  useCarrinho,
  useRemoverItem,
} from "../../graphql/carrinho/hooks";
import { IItemCarrinho } from "../../interfaces/IItemCarrinho";

export interface ICarrinhoContext {
  carrinho?: ICarrinho;
  adicionarItemCarrinho: (item: IItemCarrinho) => void;
  removerItemCarrinho: (item: IItemCarrinho) => void;
  carregando: boolean;
}

export const CarrinhoContext = createContext<ICarrinhoContext>({
  adicionarItemCarrinho: () => null,
  removerItemCarrinho: () => null,
  carregando: false,
});

interface CarrinhoProviderProps {
  children: ReactElement;
}

const CarrinhoProvider = ({ children }: CarrinhoProviderProps) => {
  const { data, loading: loadingCarrinho } = useCarrinho();

  const [adicionaItem, { loading: loadingAdicionar }] = useAddItens();
  const [removerItem, { loading: loadingRemover }] = useRemoverItem();

  const adicionarItemCarrinho = (item: IItemCarrinho) => {
    adicionaItem({
      variables: {
        item: {
          livroId: item.livro.id,
          opcaoCompraId: item.opcaoCompra.id,
          quantidade: item.quantidade,
        },
      },
    });
  };

  const removerItemCarrinho = (item: IItemCarrinho) => {
    removerItem({
      variables: {
        item: {
          livroId: item.livro.id,
          opcaoCompraId: item.opcaoCompra.id,
          quantidade: item.quantidade,
        },
      },
    });
  };

  return (
    <CarrinhoContext.Provider
      value={{
        carrinho: data?.carrinho,
        adicionarItemCarrinho,
        removerItemCarrinho,
        carregando: loadingCarrinho || loadingAdicionar || loadingRemover,
      }}
    >
      {children}
    </CarrinhoContext.Provider>
  );
};

export default CarrinhoProvider;

export const useCarrinhoContext = () => {
  return useContext<ICarrinhoContext>(CarrinhoContext);
};
