import { useEffect, useState } from "react";
import TituloPrincipal from "../../componentes/TituloPrincipal";
import { ICategoria } from "../../interfaces/ICategoria";
import http from "../../http";
import { useParams } from "react-router-dom";
import Loader from "../../componentes/Loader";

const Categoria = () => {
  const [categoria, setCategoria] = useState<ICategoria>();
  const [estaCarregando, setEstaCarregando] = useState(true);

  const params = useParams();

  useEffect(() => {
    http
      .get<ICategoria[]>("/categorias", {
        params: {
          slug: params.slug,
        },
      })
      .then((response) => {
        setCategoria(response.data[0]);
        setEstaCarregando(false);
      });
  }, [params.slug]);

  if (estaCarregando) {
    return <Loader />;
  }

  return (
    <section>
      <TituloPrincipal texto={categoria?.nome ?? ""} />
    </section>
  );
};

export default Categoria;
