import { yupResolver } from "@hookform/resolvers/yup";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { Link } from "react-router-dom";
import { CadastroContext } from "../../contexts/contextCadastro";
import { iLoginData, LoginContext } from "../../contexts/contextLogin";
import { loginSchema } from "../../validations/registerUser";
import { ContainerLogin, DivLogo, DivSenhaLogin, Form } from "./styled";

export const FormLogin = () => {
  const { onSubmit } = useContext(LoginContext);
  const { toggleShowSenha, showSenha } = useContext(CadastroContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<iLoginData>({
    resolver: yupResolver(loginSchema),
  });

  return (
    <ContainerLogin>
      <DivLogo>
        <h1>Kenzie Hub</h1>
      </DivLogo>

      <Form onSubmit={handleSubmit(onSubmit)}>
        <h2>Login</h2>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          placeholder="Digite seu email"
          {...register("email")}
        />
        <span>{errors.email?.message}</span>

        <label htmlFor="senha">Senha</label>
        <DivSenhaLogin>
          <input
            type={showSenha ? "text" : "password"}
            placeholder="Digite sua senha"
            {...register("password")}
          />
          <button type="button" onClick={toggleShowSenha}>
            {showSenha ? <AiFillEyeInvisible /> : <AiFillEye />}
          </button>
        </DivSenhaLogin>
        <span>{errors.password?.message}</span>

        <button type="submit">Entrar</button>
        <p>Ainda não possui uma conta?</p>
        <Link to={"/cadastro"}>Cadastre-se</Link>
      </Form>
    </ContainerLogin>
  );
};
