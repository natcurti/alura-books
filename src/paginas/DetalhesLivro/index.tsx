import { useParams } from "react-router-dom";
import TituloPrincipal from "../../componentes/TituloPrincipal";
import Livro from "../../componentes/Livro";
import { useDetalhesDoLivro } from "../../graphql/detalhes-livro/hook";
import Loader from "../../componentes/Loader";

const DetalhesLivro = () => {
  const params = useParams();

  const { data, loading, error } = useDetalhesDoLivro(params.slug || "");

  return (
    <>
      <TituloPrincipal texto="Detalhes do Livro" />
      {loading && <Loader />}
      {error && <h3>Erro inesperado</h3>}
      {data?.livro && <Livro livroSelecionado={data.livro!} />}
    </>
  );
};

export default DetalhesLivro;
