import { ReactElement, createContext, useContext } from "react";
import { ICarrinho } from "../../interfaces/ICarrinho";
import { useCarrinho } from "../../graphql/carrinho/hook";
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

  const adicionarItemCarrinho = (item: IItemCarrinho) => {
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
