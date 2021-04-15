import React from 'react';
import { useDispatch } from 'react-redux';
import { startGoogleLogin } from '../actions/auth';
import styled from 'styled-components';
import Modal from './Modal';
import GoogleIcon from './icons/GoogleIcon';

const Background = styled.div`
  background: url('https://picsum.photos/1920/1080');
  background-repeat: no-repeat;
  background-size: cover;
  height: 100vh;
  width: 100vw;
`;

export const LoginPage = () => {
  const dispatch = useDispatch();

  const startLogin = () => {
    dispatch(startGoogleLogin());
  };

  return (
    <Background>
      <Modal
        title="Faça seu Login"
        description="Seja bem-vindo, crie seu cadastro ou faça login para entrar em sua área restrita."
        btnPrimary="Login com Google"
        btnPrimaryFunction={startLogin}
        btnPrimaryIcon={<GoogleIcon />}
      />
    </Background>
  );
};

export default LoginPage;
