import {
  login,
  startGoogleLogin,
  logout,
  startLogout,
} from '../../actions/auth';

const userLoginObject = {
  uid: '123',
  email: 'test@test',
  photoURL: 'http//',
  displayName: 'test',
};

test('should contain login object', () => {
  const result = login(userLoginObject);
  expect(result).toEqual({
    ...userLoginObject,
    type: 'LOGIN',
  });
});

test('should receive a function to Google Sign in', () => {
  const result = startGoogleLogin();
  expect.anything(result);
});

test('should contain logout object', () => {
  const result = logout();
  expect(result).toEqual({
    type: 'LOGOUT',
  });
});

test('should receive a function to Google Sign out', () => {
  const result = startLogout();
  expect.anything(result);
});
