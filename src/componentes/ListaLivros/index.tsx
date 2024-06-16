import { useState } from "react";
import { ICategoria } from "../../interfaces/ICategoria";
import { ILivro } from "../../interfaces/ILivro";
import CardLivro from "../CardLivro";
import "./ListaLivros.css";
import { gql, useQuery } from "@apollo/client";
import { AbBotao, AbCampoTexto } from "ds-alurabooks";

interface ListaLivrosProps {
  categoria: ICategoria;
}

const OBTER_LIVROS = gql`
  query ObterLivros($categoriaId: Int, $titulo: String) {
    livros(categoriaId: $categoriaId, titulo: $titulo) {
      id
      slug
      titulo
      imagemCapa
      opcoesCompra {
        id
        preco
      }
    }
  }
`;

const ListaLivros = ({ categoria }: ListaLivrosProps) => {
  const [busca, setBusca] = useState("");

  const { data, refetch } = useQuery<{ livros: ILivro[] }>(OBTER_LIVROS, {
    variables: {
      categoriaId: categoria.id,
    },
  });

  const buscarLivros = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (busca) {
      refetch({
        categoriaId: categoria.id,
        titulo: busca,
      });
    }
  };

  return (
    <section>
      <form
        onSubmit={buscarLivros}
        style={{ maxWidth: "80%", margin: "0 auto", textAlign: "center" }}
      >
        <AbCampoTexto
          value={busca}
          onChange={setBusca}
          placeholder="Digite o título do livro"
        />
        <div style={{ marginTop: "16px" }}>
          <AbBotao texto="Buscar" />
        </div>
      </form>
      <div className="livros">
        {data?.livros.map((livro) => (
          <CardLivro livro={livro} key={livro.id} />
        ))}
      </div>
    </section>
  );
};

export default ListaLivros;
