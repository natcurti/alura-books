import { AbCampoTexto } from "ds-alurabooks";
import { useState } from "react";
import Banner from "../../componentes/Banner";
import LivrosDestaque from "../../componentes/LivrosDestaque";
import Newsletter from "../../componentes/Newsletter";
import TagsCategorias from "../../componentes/TagsCategorias";
import Titulo from "../../componentes/Titulo";
import "./Home.css";
import { useLancamentos } from "../../graphql/lancamentos/hooks";
import { useMaisVendidos } from "../../graphql/mais-vendidos/hooks";

const Home = () => {
  const [busca, setBusca] = useState("");

  const { data: dataLancamentos } = useLancamentos();
  const { data: dataMaisVendidos } = useMaisVendidos();

  const lancamentos = dataLancamentos?.destaques?.lancamentos;
  const maisVendidos = dataMaisVendidos?.destaques?.maisVendidos;

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
        {lancamentos === null && <p>Não encontramos os últimos lançamentos.</p>}
      </div>
      <LivrosDestaque livros={lancamentos ?? []} />

      <Titulo texto="MAIS VENDIDOS" />
      <div className="container__mais-vendidos">
        {maisVendidos === null && <p>Não encontramos os mais vendidos.</p>}
      </div>
      <LivrosDestaque livros={maisVendidos ?? []} />

      <TagsCategorias />
      <Newsletter />
    </section>
  );
};

export default Home;
