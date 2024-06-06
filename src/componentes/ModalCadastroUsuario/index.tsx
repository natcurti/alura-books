import { AbBotao, AbCampoTexto, AbModal } from "ds-alurabooks";
import imageForm from "./assets/login.png";
import { useState } from "react";
import "./ModalCadastroUsuario.css";

const ModalCadastroUsuario = () => {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [endereco, setEndereco] = useState("");
  const [complemento, setComplemento] = useState("");
  const [cep, setCep] = useState("");
  const [senha, setSenha] = useState("");
  const [senhaConfirmada, setSenhaConfirmada] = useState("");

  return (
    <AbModal
      titulo="Cadastrar"
      aberta={true}
      aoFechar={() => {
        console.log("Fechar");
      }}
    >
      <div className="corpo-modal">
        <figure>
          <img
            src={imageForm}
            alt="Monitor com uma fechadura e uma pessoa com uma chave logo ao lado"
          />
        </figure>
        <form>
          <AbCampoTexto value={nome} label="Nome" onChange={setNome} />
          <AbCampoTexto value={email} label="Email" onChange={setEmail} />
          <AbCampoTexto
            value={endereco}
            label="Endereço"
            onChange={setEndereco}
          />
          <AbCampoTexto
            value={complemento}
            label="Complemento"
            onChange={setComplemento}
          />
          <AbCampoTexto value={cep} label="CEP" onChange={setCep} />
          <AbCampoTexto value={senha} label="Senha" onChange={setSenha} />
          <AbCampoTexto
            value={senhaConfirmada}
            label="Confirme sua senha"
            onChange={setSenhaConfirmada}
          />
          <footer>
            <AbBotao texto="Cadastrar" />
          </footer>
        </form>
      </div>
    </AbModal>
  );
};

export default ModalCadastroUsuario;
