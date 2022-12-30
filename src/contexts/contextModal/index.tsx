import { createContext, useContext } from "react";
import { toast } from "react-toastify";
import { api } from "../../services/api";
import { iContextProps } from "../contextCadastro";
import { LoginContext } from "../contextLogin";

export interface iModalData {
  title: string;
  status: string;
}

interface iModalDeleteProps {
  criarTecnologia: (data: iModalData) => Promise<void>;
}

interface iModalResponse {
  user: { techs: [] };
  techs: [];
}

export const ModalContext = createContext({} as iModalDeleteProps);

export const ModalProvider = ({ children }: iContextProps) => {
  const { setUserTechs, setLoading } = useContext(LoginContext);

  const criarTecnologia = async (data: iModalData) => {
    const token = localStorage.getItem("@Hub:token");
    api.defaults.headers.authorization = `Bearer ${token}`;
    await api
      .post<iModalResponse>("/users/techs", data)
      .then((res) => {
        setUserTechs(res.data.user.techs);
        toast.success("Tecnologia Cadastrada com sucesso", {
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setLoading(true);
        setUserTechs(res.data.techs);
      })
      .catch((err) => {
        console.error(err);
        toast.error("Algo deu errado!", {
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
  };

  return (
    <ModalContext.Provider value={{ criarTecnologia }}>
      {children}
    </ModalContext.Provider>
  );
};
