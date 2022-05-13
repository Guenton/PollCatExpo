import firebase from 'firebase';

const loginResetAsync = async (email = '') => {
  try {
    await firebase.auth().sendPasswordResetEmail(email);
  } catch (err) {
    if (err.message) throw err.message;
    else throw err;
  }
};

export default loginResetAsync;
