import { database } from '../database/firebase';

export const logNewError = (errorData = {}, userID, email) => {
  return (dispatch, getState) => {
    const uid = userID || getState().auth.uid;
    const userEmail = email || getState().auth.email;
    const errorLog = {
      uid,
      userEmail,
      ...errorData,
    };
    return database
      .ref(`logs/errors`)
      .push(errorLog)
      .then((result) => Promise.resolve(result.key))
      .catch((err) => Promise.reject({ errorLog, err }));
  };
};
