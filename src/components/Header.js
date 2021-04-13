import React from 'react';
import { startLogout } from '../actions/auth';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@material-ui/core/Button';

const Header = () => {
  const dispatch = useDispatch();
  const logout = () => {
    dispatch(startLogout());
  };

  const { displayName, email, photoURL } = useSelector((state) => state.auth);

  return (
    <div className="header">
      <div className="headerProfile">
        <h3>{displayName}</h3>
        <p>{email}</p>
      </div>
      <img src={photoURL} alt={displayName} />
      <Button onClick={logout}>Sair</Button>
    </div>
  );
};

export { Header as default };
