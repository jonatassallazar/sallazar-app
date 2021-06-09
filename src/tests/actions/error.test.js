import moment from 'moment';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { logNewError } from '../../actions/errors';
import { database } from '../../database/firebase';

const createMockStore = configureMockStore([thunk]);

const errorObject = {
  uid: 'wsdf1231',
  userEmail: 'test@gmail.com',
  error: 'Error Message',
  errorInfo: 'Stack Error Message',
  createdAt: +moment(),
};

const store = createMockStore({});
const userID = errorObject.uid;
const email = errorObject.userEmail;
let logID;

beforeEach(() => {
  store.clearActions();
});

it('should add new log object to the database', () => {
  return store.dispatch(logNewError(errorObject, userID, email)).then((key) => {
    logID = key;
    expect(key).toBeTruthy();
  });
});

it('should new log be on database', () => {
  return database
    .ref(`logs/errors/${logID}`)
    .once('value')
    .then((snap) => {
      expect(snap.val()).toEqual(errorObject);
    });
});
