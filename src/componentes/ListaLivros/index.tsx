import { useState } from "react";
import { ICategoria } from "../../interfaces/ICategoria";
import CardLivro from "../CardLivro";
import "./ListaLivros.css";
import { AbBotao, AbCampoTexto } from "ds-alurabooks";
import { useLivros } from "../../graphql/livros/hooks";
import { useReactiveVar } from "@apollo/client";
import { livrosVar } from "../../graphql/livros/state";

interface ListaLivrosProps {
  categoria: ICategoria;
}

const ListaLivros = ({ categoria }: ListaLivrosProps) => {
  const [busca, setBusca] = useState("");

  // const { data, refetch } = useLivros(categoria);
  useLivros(categoria);

  const livros = useReactiveVar(livrosVar);

  const buscarLivros = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // if (busca) {
    //   refetch({
    //     categoriaId: categoria.id,
    //     titulo: busca,
    //   });
    // }
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
        {livros.map((livro) => (
          <CardLivro livro={livro} key={livro.id} />
        ))}
      </div>
    </section>
  );
};

export default ListaLivros;
