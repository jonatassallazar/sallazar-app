import React from 'react';
import styled from 'styled-components';
import Tipografia from '../layout/Tipografia';

const ErrorPageStyle = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-content: center;
  height: 50%;
`;

ErrorPageStyle.Title = styled.div`
  width: 100%;
  text-align: center;
`;

ErrorPageStyle.GIF = styled.div`
  width: 45%;
  height: 100%;
  display: flex;
  align-items: center;

  img {
    width: 90%;
    height: 80%;
    border-radius: ${({ theme }) => theme.boxes.borderRadius};
  }
`;

ErrorPageStyle.Texto = styled.div`
  width: 45%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
`;

const ErrorPage = ({ logMessage, hasLogged }) => (
  <>
    <ErrorPageStyle.Title>
      <Tipografia.H1>Oops...</Tipografia.H1>
      {logMessage && <Tipografia.P>{logMessage}</Tipografia.P>}
    </ErrorPageStyle.Title>
    <ErrorPageStyle>
      <ErrorPageStyle.GIF>
        <img src="/img/error.gif" alt="error gif" />
      </ErrorPageStyle.GIF>
      <ErrorPageStyle.Texto>
        <Tipografia.H3>Algo não aconteceu como esperado!</Tipografia.H3>
        {hasLogged ? (
          <Tipografia.P>
            Tente atualizar a página <b>(F5 ou Ctrl + R)</b> ou volte para a
            página anterior, nosso time já foi notificado do problema. Nos
            desculpe.
          </Tipografia.P>
        ) : (
          <Tipografia.P>
            Não conseguimos capturar automaticamente o erro, por favor, tire um
            print do erro que aparece na tela e envie para nossa equipe de
            suporte, obrigado e nos desculpe pelo inconveniente.
          </Tipografia.P>
        )}
      </ErrorPageStyle.Texto>
    </ErrorPageStyle>
  </>
);

export default ErrorPage;
