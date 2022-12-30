import { createContext, useState } from "react";
import { iContextProps } from "../contextCadastro";

interface iDashBoardContext {
  logout: () => void;
  fecharModal: () => void;
  modal: boolean;
  abrirModal: () => void;
}

export const DashBoardContext = createContext({} as iDashBoardContext);

export const DashBoardProvider = ({ children }: iContextProps) => {
  // const { setLoading } = useContext(LoginContext);
  const [modal, setModal] = useState(false);

  const abrirModal = () => {
    setModal(true);
  };

  const fecharModal = () => {
    setModal(false);
  };

  const logout = () => {
    localStorage.clear();
  };

  return (
    <DashBoardContext.Provider
      value={{
        fecharModal,
        logout,
        modal,
        abrirModal,
      }}
    >
      {children}
    </DashBoardContext.Provider>
  );
};
