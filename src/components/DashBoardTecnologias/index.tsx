import { useContext } from "react";
import { LoginContext } from "../../contexts/contextLogin";
import { ModalDeleteContext } from "../../contexts/contextModalDelete";
import { LiTech, UlTech } from "./styled";

export const DashBoardTecnologias = () => {
  const { userTechs } = useContext(LoginContext);
  const { abrirModalDelete } = useContext(ModalDeleteContext);

  return (
    <UlTech>
      {userTechs.length === 0 ? (
        <h2>Sem tecnologias no momento, adicione uma no botão acima! </h2>
      ) : (
        userTechs.map((tec) => {
          return (
            <LiTech
              key={tec.id}
              onClick={() => abrirModalDelete(tec.title, tec.id)}
            >
              <h2>{tec.title}</h2>
              <div>
                <span>{tec.status}</span>
              </div>
            </LiTech>
          );
        })
      )}
    </UlTech>
  );
};
