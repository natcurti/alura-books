import axios, { AxiosError } from "axios";
import { history } from "../App";
import { useObterToken } from "../hooks/sessionStorageToken";
import { ICategoria } from "../interfaces/ICategoria";
import { ILivro } from "../interfaces/ILivro";

const http = axios.create({
  baseURL: "http://localhost:8000",
  headers: {
    Accept: "application/json",
    Content: "application/json",
  },
});

http.interceptors.request.use(
  function (config) {
    const token = useObterToken();
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  function (error) {
    console.log("Erro no interceptor do axios");
    return Promise.reject(error);
  }
);

http.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error: AxiosError) {
    if (error.response?.status === 401) {
      history.push("/");
      return Promise.reject();
    }
    return Promise.reject(error);
  }
);

export default http;

export const obterCategoria = async (slug: string) => {
  const response = await http.get<ICategoria[]>("/categorias", {
    params: {
      slug: slug,
    },
  });

  return response.data[0];
};

export const obterLivrosDestaque = async (tipo: string) => {
  const resposta = await http.get<ILivro[]>(`public/${tipo}`);
  return resposta.data;
};
