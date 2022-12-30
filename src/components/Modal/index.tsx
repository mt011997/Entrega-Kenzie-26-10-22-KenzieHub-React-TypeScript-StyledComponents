import { yupResolver } from "@hookform/resolvers/yup";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { DashBoardContext } from "../../contexts/contextDashBoard";
import { iModalData, ModalContext } from "../../contexts/contextModal";
import { modalSchema } from "../../validations/registerUser";
import { ContainerModal, FormModal, HeaderModal, ModalSection } from "./styled";

export const Modal = () => {
  const { modal, fecharModal } = useContext(DashBoardContext);
  const { criarTecnologia } = useContext(ModalContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<iModalData>({
    resolver: yupResolver(modalSchema),
  });
  return (
    <ModalSection modal={modal}>
      <ContainerModal>
        <HeaderModal>
          <span>Cadastrar tecnologia</span>
          <button onClick={fecharModal}>X</button>
        </HeaderModal>
        <FormModal onSubmit={handleSubmit(criarTecnologia)}>
          <label htmlFor="title">Nome</label>
          <input type="text" placeholder="Tecnologia" {...register("title")} />
          <span>{errors.title?.message}</span>
          <label htmlFor="status">Selecionar Status</label>
          <select {...register("status")}>
            <option selected disabled hidden>
              Selecione um Status
            </option>
            <option>Iniciante</option>
            <option>Intermediário</option>
            <option>Avançado</option>
          </select>
          <span>{errors.status?.message}</span>
          <button type="submit">Cadastrar Tecnologia</button>
        </FormModal>
      </ContainerModal>
    </ModalSection>
  );
};
