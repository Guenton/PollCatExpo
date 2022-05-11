import firebase from 'firebase';

const loginResetConfirmAsync = async (resetCode = '', password = '') => {
  try {
    await firebase.auth().confirmPasswordReset(resetCode, password);
  } catch (err) {
    throw err;
  }
};

export default loginResetConfirmAsync;
