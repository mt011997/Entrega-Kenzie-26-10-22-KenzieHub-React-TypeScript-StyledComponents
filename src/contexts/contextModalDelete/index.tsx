import { createContext, useContext, useState } from "react";
import { toast } from "react-toastify";
import { api } from "../../services/api";
import { iContextProps } from "../contextCadastro";
import { LoginContext } from "../contextLogin";

interface iModalDeleteContext {
  abrirModalDelete: (tituloTec: string, idTec: string) => void;
  fecharModalDelete: () => void;
  modalDelete: boolean;
  tituloTec: string;
  deletarTecnologia: () => Promise<void>;
}

interface iModalDeleteResponse {
  status: string;
  message: string;
}

export const ModalDeleteContext = createContext({} as iModalDeleteContext);

export const ModalDeleteProvider = ({ children }: iContextProps) => {
  const [modalDelete, setModalDelete] = useState(false);
  const [tituloTec, setTituloTec] = useState("");
  const [idTec, setIdTec] = useState("");
  const { setLoading } = useContext(LoginContext);

  const abrirModalDelete = (tituloTec: string, idTec: string) => {
    setModalDelete(true);
    setTituloTec(tituloTec);
    setIdTec(idTec);
  };

  const fecharModalDelete = () => {
    setModalDelete(false);
  };

  const deletarTecnologia = async () => {
    await api
      .delete<iModalDeleteResponse>(`/users/techs/${idTec}`)
      .then(() => {
        toast.success(`Tecnologia ${tituloTec} deletado com sucesso!`, {
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setModalDelete(false);
        setLoading(true);
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
    <ModalDeleteContext.Provider
      value={{
        abrirModalDelete,
        fecharModalDelete,
        modalDelete,
        tituloTec,
        deletarTecnologia,
      }}
    >
      {children}
    </ModalDeleteContext.Provider>
  );
};
