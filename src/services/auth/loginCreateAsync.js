import firebase from 'firebase';

const loginCreateAsync = async (email = '', password = '') => {
  try {
    await firebase.auth().createUserWithEmailAndPassword(email, password);
  } catch (err) {
    if (err.message) throw err.message;
    else throw err;
  }
};

export default loginCreateAsync;
