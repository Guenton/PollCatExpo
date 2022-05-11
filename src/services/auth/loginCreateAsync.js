import firebase from 'firebase';

const loginCreateAsync = async (email = '', password = '') => {
  try {
    await firebase.auth().createUserWithEmailAndPassword(email, password);
  } catch (err) {
    throw err;
  }
};

export default loginCreateAsync;
