import {
  AbBotao,
  AbGrupoOpcao,
  AbGrupoOpcoes,
  AbInputQuantidade,
  AbTag,
} from "ds-alurabooks";
import { ILivro } from "../../interfaces/ILivro";
import "./Livro.css";
import { formatador } from "../../utils/formatador-moeda";
import SobreAutor from "../SobreAutor";
import BlocoSobre from "../BlocoSobre";
import { useState } from "react";
import { useCarrinhoContext } from "../../context/carrinho";

interface LivroProps {
  livroSelecionado: ILivro;
}

const Livro = ({ livroSelecionado }: LivroProps) => {
  const [quantidade, setQuantidade] = useState(1);
  const [opcaoSelecionada, setOpcaoSelecionada] = useState<AbGrupoOpcao>();

  const opcoesDeCompra: AbGrupoOpcao[] = livroSelecionado.opcoesCompra
    ? livroSelecionado.opcoesCompra.map((opcao) => ({
        id: opcao.id,
        titulo: opcao.titulo,
        corpo: formatador.format(opcao.preco),
        rodape: opcao.formatos ? opcao.formatos.join(",") : "",
      }))
    : [];

  const { adicionarItemCarrinho } = useCarrinhoContext();

  const addItemNoCarrinho = () => {
    if (!opcaoSelecionada) {
      alert("Por favor selecione uma opção de compra!");
      return;
    }
    const opcaoCompraSelecionada = livroSelecionado.opcoesCompra.find(
      (option) => option.id === opcaoSelecionada.id
    );

    adicionarItemCarrinho({
      livro: livroSelecionado,
      quantidade: quantidade,
      opcaoCompra: opcaoCompraSelecionada!,
    });
  };

  return (
    <section className="container">
      <div className="container__detalhes">
        <div>
          <img
            src={livroSelecionado.imagemCapa}
            alt={livroSelecionado.titulo}
          />
        </div>
        <div>
          <h3 className="titulo">{livroSelecionado.titulo}</h3>
          <p className="descricao">{livroSelecionado.descricao}</p>
          <p className="autor">Por: {livroSelecionado.autor.nome}</p>
          <div className="container__opcoes">
            <p className="container__opcoes-titulo">
              Selecione o formato do seu livro:
            </p>
            <div className="opcoes">
              <AbGrupoOpcoes
                opcoes={opcoesDeCompra}
                onChange={setOpcaoSelecionada}
                valorPadrao={opcaoSelecionada}
              />
            </div>
            <p>
              <strong>
                *Você terá acesso às futuras atualizações do livro.
              </strong>
            </p>
          </div>
          <div className="container__buttons">
            <AbInputQuantidade onChange={setQuantidade} value={quantidade} />
            <AbBotao texto="Comprar" onClick={addItemNoCarrinho} />
          </div>
        </div>
      </div>
      <div>
        <SobreAutor detalhesDoAutor={livroSelecionado.autor.sobre} />
        <BlocoSobre titulo="Sobre o livro" corpo={livroSelecionado.sobre} />
      </div>
      <div className="tags">
        {livroSelecionado.tags.map((tag) => (
          <AbTag key={tag.id} texto={tag.nome} contexto="secundario" />
        ))}
      </div>
    </section>
  );
};

export default Livro;
