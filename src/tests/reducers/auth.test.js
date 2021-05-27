import authReducer from '../../reducers/auth';
import authUser from '../fixtures/authUser';

it('should return auth user data object', () => {
  const result = authReducer(undefined, {
    type: 'LOGIN',
    uid: authUser.uid,
    email: authUser.email,
    displayName: authUser.displayName,
    photoURL: authUser.photoURL,
  });

  expect(result).toEqual(authUser);
});

it('should logout and return empty object', () => {
  const result = authReducer(undefined, {
    type: 'LOGOUT',
  });

  expect(result).toEqual({});
});

it('should return previous state object', () => {
  const result = authReducer(authUser, {
    type: 'NOTHING',
  });

  expect(result).toEqual(authUser);
});

it('should return empty object', () => {
  const result = authReducer(undefined, {
    type: 'NOTHING',
  });

  expect(result).toEqual({});
});
