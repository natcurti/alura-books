import { useQuery } from "@tanstack/react-query";
import { ICategoria } from "../../interfaces/ICategoria";
import { obterLivros } from "../../http";
import CardLivro from "../CardLivro";
import "./ListaLivros.css";

interface ListaLivrosProps {
  categoria: ICategoria;
}

const ListaLivros = ({ categoria }: ListaLivrosProps) => {
  const { data: livros } = useQuery({
    queryKey: ["buscarLivrosDaCategoria", categoria],
    queryFn: () => obterLivros(categoria),
  });
  return (
    <section className="livros">
      {livros?.map((livro) => (
        <CardLivro livro={livro} key={livro.id} />
      ))}
    </section>
  );
};

export default ListaLivros;
