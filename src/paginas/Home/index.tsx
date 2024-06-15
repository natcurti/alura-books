import { AbCampoTexto } from "ds-alurabooks";
import { useState } from "react";
import Banner from "../../componentes/Banner";
import LivrosDestaque from "../../componentes/LivrosDestaque";
import Newsletter from "../../componentes/Newsletter";
import TagsCategorias from "../../componentes/TagsCategorias";
import Titulo from "../../componentes/Titulo";
import { useQuery } from "@tanstack/react-query";

import "./Home.css";
import { obterLivrosDestaque } from "../../http";
import Loader from "../../componentes/Loader";
import { ILivro } from "../../interfaces/ILivro";
import { AxiosError } from "axios";

const Home = () => {
  const [busca, setBusca] = useState("");

  const {
    data: lancamentos,
    isLoading: isLoadingDestaques,
    error: errorDestaque,
  } = useQuery<ILivro[] | null, AxiosError>({
    queryKey: ["destaques"],
    queryFn: () => obterLivrosDestaque("lancamentos"),
  });
  const {
    data: maisVendidos,
    isLoading: isLoadingMaisVendidos,
    error: errorMaisVendidos,
  } = useQuery<ILivro[] | null, AxiosError>({
    queryKey: ["maisVendidos"],
    queryFn: () => obterLivrosDestaque("mais-vendidos"),
  });

  return (
    <section className="home">
      <Banner
        subtitulo="Encontre em nossa estante o que precisa para seu desenvolvimento!"
        titulo="Já sabe por onde começar?"
      >
        <form className="buscar">
          <AbCampoTexto
            placeholder="Qual será sua próxima leitura?"
            value={busca}
            onChange={setBusca}
            darkmode={true}
            placeholderAlign="center"
          />
        </form>
      </Banner>

      <Titulo texto="ÚLTIMOS LANÇAMENTOS" />
      <div className="container__lancamentos">
        {isLoadingDestaques && <Loader />}
        {lancamentos === null && <p>Não encontramos os últimos lançamentos.</p>}
        {errorDestaque && <p>{errorDestaque.message}</p>}
      </div>
      {lancamentos && <LivrosDestaque livros={lancamentos!} />}

      <Titulo texto="MAIS VENDIDOS" />
      <div className="container__mais-vendidos">
        {isLoadingMaisVendidos && <Loader />}
        {maisVendidos === null && <p>Não encontramos os mais vendidos.</p>}
        {errorMaisVendidos && <p>{errorMaisVendidos.message}</p>}
      </div>
      {maisVendidos && <LivrosDestaque livros={maisVendidos!} />}

      <TagsCategorias />
      <Newsletter />
    </section>
  );
};

export default Home;
