import firebase from 'firebase';

const loginResetAsync = async (email = '') => {
  try {
    await firebase.auth().sendPasswordResetEmail(email);
  } catch (err) {
    throw err;
  }
};

export default loginResetAsync;
