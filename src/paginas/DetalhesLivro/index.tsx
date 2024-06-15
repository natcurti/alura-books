import { useParams } from "react-router-dom";
import TituloPrincipal from "../../componentes/TituloPrincipal";
import Livro from "../../componentes/Livro";
import { useQuery } from "@tanstack/react-query";
import { obterDetalhesLivro } from "../../http";
import { ILivro } from "../../interfaces/ILivro";
import Loader from "../../componentes/Loader";

const DetalhesLivro = () => {
  const params = useParams();

  const {
    data: livro,
    isLoading,
    error,
  } = useQuery<ILivro | null>({
    queryKey: ["buscarDetalhesDoLivro"],
    queryFn: () => obterDetalhesLivro(params.slug || ""),
  });

  return (
    <>
      <TituloPrincipal texto="Detalhes do Livro" />
      {isLoading && <Loader />}
      {livro === null && <h3>Livro não encontrado!</h3>}
      {error && <h3>Ops! Algum erro inesperado ocorreu. Tente novamente.</h3>}
      {livro && <Livro livroSelecionado={livro!} />}
    </>
  );
};

export default DetalhesLivro;
