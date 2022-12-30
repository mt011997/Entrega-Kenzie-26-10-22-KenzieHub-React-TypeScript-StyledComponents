import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { api } from "../../services/api";
import { iContextProps } from "../contextCadastro";

export interface iLoginData {
  email: string;
  password: string;
}

export interface iPerson {
  data: string;
  techs: [];
  name?: string;
  course_module?: string;
  id?: string;
}

interface iLoginContext {
  setUser: React.Dispatch<React.SetStateAction<iPerson | null>>;
  setUserTechs: React.Dispatch<React.SetStateAction<iTechs[]>>;
  onSubmit: (data: iLoginData) => Promise<void>;
  user: iPerson | null;
  loading: boolean;
  userTechs: iTechs[];
  setLoading: (data: boolean) => void;
}

interface iTechs {
  id: string;
  status: string;
  title: string;
}

interface iApiResponse {
  token: string;
  user: iPerson;
}

interface iApiGetProfile {
  techs: [];
  data: string;
}

export const LoginContext = createContext({} as iLoginContext);

export const LoginProvider = ({ children }: iContextProps) => {
  const navigate = useNavigate();
  const [user, setUser] = useState<iPerson | null>(null);
  const [userTechs, setUserTechs] = useState<iTechs[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadUser() {
      const token = localStorage.getItem("@Hub:token");

      if (token) {
        try {
          api.defaults.headers.authorization = `Bearer ${token}`;

          const { data } = await api.get<iApiGetProfile>("/profile");
          console.log(data);
          setUser(data);
          setUserTechs(data.techs);
        } catch (error) {
          console.error(error);
        }
      }
      setLoading(false);
    }
    loadUser();
  }, [loading]);

  const onSubmit = async (data: iLoginData) => {
    await api
      .post<iApiResponse>("/sessions", data)
      .then((res) => {
        console.log(res);
        localStorage.setItem("@Hub:token", res.data.token);
        localStorage.setItem("@Hub:User_id", res.data.user.id!);
        api.defaults.headers.authorization = `Bearer ${res.data.token}`;
        const { user: userResponse } = res.data;
        setUser(userResponse);
        setUserTechs(res.data.user.techs);
        toast.success("Login Realizado com sucesso!", {
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        navigate("/dashboard", { replace: true });
      })
      .catch((err) => {
        console.error(err);
        toast.error("Email ou senha incorreta!", {
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
  };

  return (
    <LoginContext.Provider
      value={{
        onSubmit,
        user,
        loading,
        setUser,
        setUserTechs,
        userTechs,
        setLoading,
      }}
    >
      {children}
    </LoginContext.Provider>
  );
};
