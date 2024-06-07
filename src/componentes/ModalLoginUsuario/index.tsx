import { AbBotao, AbCampoTexto, AbModal } from "ds-alurabooks";
import { useState } from "react";
import "./ModalLoginUsuario.css";
import imageLogin from "../../assets/login.png";
import "./ModalLoginUsuario.css";
import axios from "axios";
import { usePersistirToken } from "../../hooks/sessionStorageToken";

interface PropsModalLoginUsuario {
  aberta: boolean;
  aoFechar: () => void;
  aoEfetuarLogin: () => void;
}

const ModalLoginUsuario = ({
  aberta,
  aoFechar,
  aoEfetuarLogin,
}: PropsModalLoginUsuario) => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const persistirToken = usePersistirToken();

  const aoSubmeterFormular = (evento: React.FormEvent<HTMLFormElement>) => {
    evento.preventDefault();
    const usuario = {
      email,
      senha,
    };
    axios
      .post("http://localhost:8000/public/login", usuario)
      .then((response) => {
        persistirToken(response.data.access_token);
        setEmail("");
        setSenha("");
        aoFechar();
      })
      .catch((error) => {
        if (error?.response?.data?.message) {
          alert(error?.response?.data?.message);
        } else {
          alert("Erro inesperado ao efetuar login");
        }
        console.log(error);
      });
  };

  return (
    <AbModal titulo="Login" aberta={aberta} aoFechar={aoFechar}>
      <section className="corpoModalCadastro">
        <figure>
          <img
            src={imageLogin}
            alt="Pessoa segurando uma chave na frente de uma tela de computador que está exibindo uma fechadura"
          />
        </figure>
        <form onSubmit={aoSubmeterFormular}>
          <AbCampoTexto
            label="E-mail"
            value={email}
            onChange={setEmail}
            type="email"
          />
          <AbCampoTexto
            label="Senha"
            value={senha}
            onChange={setSenha}
            type="password"
          />
          <div className="acoes">
            <AbBotao texto="Fazer login" onClick={aoEfetuarLogin} />
          </div>
        </form>
      </section>
    </AbModal>
  );
};

export default ModalLoginUsuario;
