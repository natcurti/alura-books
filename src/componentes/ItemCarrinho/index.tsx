import { AbInputQuantidade } from "ds-alurabooks";
import lixeira from "../../assets/lixeira.png";
import "./ItemCarrinho.css";
import { IItemCarrinho } from "../../interfaces/IItemCarrinho";
import { formatador } from "../../utils/formatador-moeda";
import { useCarrinhoContext } from "../../context/carrinho";

interface ItemCarrinhoProps {
  item: IItemCarrinho;
}

const ItemCarrinho = ({ item }: ItemCarrinhoProps) => {
  const { adicionarItemCarrinho, removerItemCarrinho } = useCarrinhoContext();

  const removerItem = () => {
    removerItemCarrinho({
      livro: item.livro,
      opcaoCompra: item.opcaoCompra,
      quantidade: item.quantidade,
    });
  };

  const alterarQuantidadeItem = (quantidade: number) => {
    if (quantidade === 0) {
      removerItem();
    }
    adicionarItemCarrinho({
      livro: item.livro,
      opcaoCompra: item.opcaoCompra,
      quantidade: quantidade,
    });
  };

  return (
    <div className="item-carrinho">
      <figure>
        <img src={item.livro.imagemCapa} alt={item.livro.descricao} />
      </figure>
      <div className="detalhes">
        <ul>
          <li className="titulo">{item.livro.titulo}</li>
          <li className="descricao">{item.livro.descricao}</li>
          <li className="autor">Por: {item.livro.autor.nome}</li>
        </ul>
      </div>
      <div>
        <ul className="preco">
          <li className="label">
            <strong>Preço:</strong>
          </li>
          <li className="valor">{formatador.format(item.opcaoCompra.preco)}</li>
        </ul>
      </div>
      <div className="quantidade">
        <AbInputQuantidade
          value={item.quantidade}
          onChange={alterarQuantidadeItem}
        />
      </div>
      <div>
        <button className="btn-excluir" onClick={removerItem}>
          <img src={lixeira} alt="Ícone de uma lixeira" />
        </button>
      </div>
    </div>
  );
};

export default ItemCarrinho;
