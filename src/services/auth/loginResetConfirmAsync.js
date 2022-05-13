import firebase from 'firebase';

const loginResetConfirmAsync = async (resetCode = '', password = '') => {
  try {
    await firebase.auth().confirmPasswordReset(resetCode, password);
  } catch (err) {
    if (err.message) throw err.message;
    else throw err;
  }
};

export default loginResetConfirmAsync;
