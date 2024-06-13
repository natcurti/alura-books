import TituloPrincipal from "../../componentes/TituloPrincipal";
import { obterCategoria } from "../../http";
import { useParams } from "react-router-dom";
import Loader from "../../componentes/Loader";
import { useQuery } from "@tanstack/react-query";

const Categoria = () => {
  const params = useParams();

  const { data: categoria, isLoading } = useQuery({
    queryKey: ["categoriaSlug", params.slug],
    queryFn: () => obterCategoria(params.slug || ""),
  });

  if (isLoading) {
    return <Loader />;
  }

  return (
    <section>
      <TituloPrincipal texto={categoria?.nome ?? ""} />
    </section>
  );
};

export default Categoria;
