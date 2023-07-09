import { Link } from "react-router-dom";
import styled from "styled-components";
import MyWalletLogo from "../components/MyWalletLogo";
import { signup } from "../requisicoes";
import { useRef, useState } from "react";

export default function SignUpPage() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const password2Ref = useRef();
  const nameRef = useRef();
  const [loading, setLoading] = useState(false);

  function handleSignUp(e) {
    e.preventDefault();

    if (passwordRef.current.value !== password2Ref.current.value) {
      alert('Senhas não correspondem!');
      return;
    }

    const userObj = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    setLoading(true);
    signup(userObj, handleSignUpSuccess);
  }

  function handleSignUpSuccess(response, error) {
    console.log('Response:', response);
    console.log('Error:', error);
  
    setLoading(false);
    if (error) {
      if (response && response.response && response.response.data) {
        return alert(response.response.data.message);
      } else {
        return alert('Erro ao realizar o cadastro');
      }
    }
    // Sucesso no cadastro
  }
  

  return (
    <SignUpContainer>
      <form onSubmit={handleSignUp}>
        <MyWalletLogo />
        <input data-test="name" ref={nameRef} required placeholder="Nome" type="text" />
        <input data-test="email" ref={emailRef} required placeholder="E-mail" type="email" />
        <input data-test="password" ref={passwordRef} required placeholder="Senha" type="password" autoComplete="true" />
        <input data-test="conf-password" ref={password2Ref} required placeholder="Confirme a senha" type="password" autoComplete="true" />
        <button className="sign-up-btn" data-test="sign-up-submit">Cadastrar</button>
      </form>

      <Link to="/">Já tem uma conta? Entre agora!</Link>
    </SignUpContainer>
  );
}

const SignUpContainer = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  
 
  
`;
