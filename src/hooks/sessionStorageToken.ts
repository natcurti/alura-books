export const usePersistirToken = () => {
  return (token: string) => {
    console.log(token);
    sessionStorage.setItem("token", token);
  };
};

export const useObterToken = () => {
  return sessionStorage.getItem("token");
};

export const useLimparToken = () => {
  return () => {
    sessionStorage.removeItem("token");
  };
};
