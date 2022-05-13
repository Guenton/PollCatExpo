import firebase from 'firebase';

const loginAsync = async (email = '', password = '') => {
  try {
    await firebase.auth().signInWithEmailAndPassword(email, password);
  } catch (err) {
    if (err.message) throw err.message;
    else throw err;
  }
};

export default loginAsync;
