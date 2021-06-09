import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import { Header, Menu, ErrorBoundary } from '../components';
import styled from 'styled-components';

const Conteudo = styled.div`
  display: flex;
  flex-direction: row;
  min-height: calc(100% - 80px);
  left: 0;
  right: 0;
`;

Conteudo.Selecionado = styled.div`
  margin: 2rem;
  width: calc(100% - 200px);
`;

export const PrivateRoute = ({ component: Component, ...rest }) => {
  const isAuthenticated = useSelector((state) => {
    if (state.auth.uid) {
      return true;
    }
    return false;
  });

  return (
    <Route
      {...rest}
      component={(props) =>
        isAuthenticated ? (
          <>
            <Header />
            <Conteudo>
              <Menu />
              <Conteudo.Selecionado>
                <ErrorBoundary>
                  <Component {...props} />
                </ErrorBoundary>
              </Conteudo.Selecionado>
            </Conteudo>
          </>
        ) : (
          <Redirect to="/" />
        )
      }
    />
  );
};

export { PrivateRoute as default };
