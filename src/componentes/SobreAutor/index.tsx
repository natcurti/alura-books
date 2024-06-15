import BlocoSobre from "../BlocoSobre";

interface ISobreAutor {
  detalhesDoAutor: string;
}

const SobreAutor = ({ detalhesDoAutor }: ISobreAutor) => {
  return <BlocoSobre titulo="Sobre o Autor" corpo={detalhesDoAutor} />;
};

export default SobreAutor;
