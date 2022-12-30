import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { DashBoardApresentacao } from "../../components/DashBoardApresentacao";
import { DashBoardHeader } from "../../components/DashBoardHeader";
import { DashBoardTechHeader } from "../../components/DashBoardTechHeader";
import { DashBoardTecnologias } from "../../components/DashBoardTecnologias";
import { Modal } from "../../components/Modal";
import { ModalDelete } from "../../components/ModalDelete";
import CircularIndeterminate from "../../components/TelaLoading";
import { LoginContext } from "../../contexts/contextLogin";
import { ContainerGeral } from "./styled";

export const DashBoard = () => {
  const { user, loading } = useContext(LoginContext);

  if (loading) {
    return <CircularIndeterminate />;
  }

  return (
    <>
      {user ? (
        <ContainerGeral>
          <Modal />
          <ModalDelete />
          <DashBoardHeader />
          <DashBoardApresentacao />
          <DashBoardTechHeader />
          <DashBoardTecnologias />
        </ContainerGeral>
      ) : (
        <Navigate to="/" replace />
      )}
    </>
  );
};
