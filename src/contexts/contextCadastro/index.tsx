import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { api } from "../../services/api";

export interface iContextProps {
  children: React.ReactNode;
}

export interface iCadastroData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  bio: string;
  contact: string;
  course_module: string;
}

interface iCadastroContext {
  onSubmit: (data: iCadastroData) => Promise<void>;
  showSenha: boolean;
  showConfirmSenha: boolean;
  toggleShowSenha: (e: React.MouseEvent) => void;
  toggleShowConfirmSenha: (e: React.MouseEvent) => void;
}
interface iApiErrorCadastro {
  status: string;
  message: string;
  response: { data: { message: string } };
}

export const CadastroContext = createContext({} as iCadastroContext);

export const CadastroProvider = ({ children }: iContextProps) => {
  const navigate = useNavigate();
  const [showSenha, setShowSenha] = useState(false);
  const [showConfirmSenha, setShowConfirmSenha] = useState(false);

  const toggleShowSenha = (e: React.MouseEvent): void => {
    e.preventDefault();
    showSenha === true ? setShowSenha(false) : setShowSenha(true);
  };

  const toggleShowConfirmSenha = (e: React.MouseEvent): void => {
    e.preventDefault();
    showConfirmSenha === true
      ? setShowConfirmSenha(false)
      : setShowConfirmSenha(true);
  };
  const onSubmit = async (data: iCadastroData) => {
    await api
      .post<iApiErrorCadastro>("/users", data)
      .then(() => {
        toast.success("Cadastro Realizado com sucesso!", {
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        navigate("/");
      })
      .catch((err) => {
        toast.error(err.response.data.message, {
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
  };

  return (
    <CadastroContext.Provider
      value={{
        onSubmit,
        toggleShowSenha,
        showSenha,
        showConfirmSenha,
        toggleShowConfirmSenha,
      }}
    >
      {children}
    </CadastroContext.Provider>
  );
};
