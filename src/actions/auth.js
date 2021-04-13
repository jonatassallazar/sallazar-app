import { firebase, googleAuthProvider } from '../database/firebase';

export const login = ({ uid, email, photoURL, displayName }) => ({
  type: 'LOGIN',
  uid,
  email,
  photoURL,
  displayName,
});

export const startGoogleLogin = () => {
  return () => {
    return firebase.auth().signInWithPopup(googleAuthProvider);
  };
};

export const logout = () => ({
  type: 'LOGOUT',
});

export const startLogout = () => {
  return () => {
    return firebase.auth().signOut();
  };
};
