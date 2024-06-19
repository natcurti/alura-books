import { ReactElement, createContext, useContext } from "react";
import { ICarrinho } from "../../interfaces/ICarrinho";
import { useAddItens, useCarrinho } from "../../graphql/carrinho/hooks";
import { IItemCarrinho } from "../../interfaces/IItemCarrinho";

export interface ICarrinhoContext {
  carrinho?: ICarrinho;
  adicionarItemCarrinho: (item: IItemCarrinho) => void;
}

export const CarrinhoContext = createContext<ICarrinhoContext>({
  adicionarItemCarrinho: () => null,
});

interface CarrinhoProviderProps {
  children: ReactElement;
}

const CarrinhoProvider = ({ children }: CarrinhoProviderProps) => {
  const { data } = useCarrinho();

  const [adicionaItem] = useAddItens();

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
    console.log(item);
  };

  return (
    <CarrinhoContext.Provider
      value={{ carrinho: data?.carrinho, adicionarItemCarrinho }}
    >
      {children}
    </CarrinhoContext.Provider>
  );
};

export default CarrinhoProvider;

export const useCarrinhoContext = () => {
  return useContext<ICarrinhoContext>(CarrinhoContext);
};
