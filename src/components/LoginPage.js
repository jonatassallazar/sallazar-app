import React from 'react';
import { useDispatch } from 'react-redux';
import { startGoogleLogin } from '../actions/auth';

export const LoginPage = () => {
  const dispatch = useDispatch();

  const startLogin = () => {
    dispatch(startGoogleLogin());
  };

  return (
    <div>
      <button onClick={startLogin}>Login</button>
    </div>
  );
};

export default LoginPage;
