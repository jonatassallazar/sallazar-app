import React from 'react';
import { startLogout } from '../actions/auth';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@material-ui/core/Button';
import styled from 'styled-components';

const HeaderBar = styled.div`
  height: 5rem;
  position: relative;
  display: flex;
  padding: 0.8rem;
  box-shadow: #ececec 0px 4px 5px;
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
      <Button onClick={logout}>Sair</Button>
    </HeaderBar>
  );
};

export { Header as default };
