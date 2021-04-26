import React from 'react';
import { startLogout } from '../actions/auth';
import { useDispatch, useSelector } from 'react-redux';
import { StyledButton } from './forms/elements';
import styled from 'styled-components';

const HeaderBar = styled.div`
  background-color: ${({ theme }) => theme.colors.bgColor};
  border-top: ${({ theme }) => theme.colors.pDark} solid 12px;
  box-shadow: ${({ theme }) => theme.boxes.boxShadow};
  color: ${({ theme }) => theme.colors.text};
  height: 5rem;
  position: relative;
  display: flex;
  padding: 0.8rem;
  justify-content: flex-end;
  z-index: 3;
`;

HeaderBar.Profile = styled.div`
  flex-direction: column;
  justify-content: center;
  display: flex;
`;

HeaderBar.Profile.Name = styled.h3`
  font-size: 1.6rem;
  margin: 0;
`;

HeaderBar.Profile.Email = styled.p`
  font-size: 1rem;
  margin: 0;
`;

HeaderBar.Profile.Picture = styled.img`
  border-radius: 50px;
  margin-left: 0.8rem;
`;

const Header = () => {
  const dispatch = useDispatch();
  const logout = () => {
    dispatch(startLogout());
  };

  const { displayName, email, photoURL } = useSelector((state) => state.auth);

  return (
    <HeaderBar>
      <HeaderBar.Profile>
        <HeaderBar.Profile.Name>{displayName}</HeaderBar.Profile.Name>
        <HeaderBar.Profile.Email>{email}</HeaderBar.Profile.Email>
      </HeaderBar.Profile>
      <HeaderBar.Profile.Picture src={photoURL} alt={displayName} />
      <StyledButton.Outlined onClick={logout}>Sair</StyledButton.Outlined>
    </HeaderBar>
  );
};

export { Header as default };
