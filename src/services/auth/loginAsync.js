import firebase from 'firebase';

const loginAsync = async (email, password) => {
  try {
    await firebase.auth().signInWithEmailAndPassword(email, password);
  } catch (err) {
    throw err;
  }
};

export default loginAsync;
