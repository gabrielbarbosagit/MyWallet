import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import MyWalletLogo from "../components/MyWalletLogo";
import { useRef, useState } from "react";
import { login } from "../requisicoes";

export default function SignInPage() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  function handleLogin(e) {
    e.preventDefault();

    const userObj = {
      email: emailRef.current.value.toString(),
      password: passwordRef.current.value.toString()
    };

    setLoading(true);
    login(userObj, handleLoginSuccess);
  }

  function handleLoginSuccess(response, error) {
    setLoading(false);
    if (error) {
      console.log(response);
      return alert(response.response.data.message);
    }

    localStorage.setItem('token', response.data.token);
    navigate('/home', { state: `${response.data.name},${response.data.balance}` });
  }

  return (
    <SingInContainer>
      <form onSubmit={handleLogin}>
        <MyWalletLogo />
        <input data-test="email" required placeholder="E-mail" type="email" ref={emailRef} />
        <input data-test="password" required placeholder="Senha" type="password" ref={passwordRef} />
        <button className="sign-in-btn" data-test="sign-in-submit">Entrar</button>
      </form>
      <Link to="/cadastro">
        Primeira vez? Cadastre-se!
      </Link>
    </SingInContainer>
  );
}

const SingInContainer = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
