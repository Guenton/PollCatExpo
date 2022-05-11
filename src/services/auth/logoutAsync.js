import firebase from 'firebase';

const logoutAsync = async () => {
  try {
    await firebase.auth().signOut();
  } catch (err) {
    throw err;
  }
};

export default logoutAsync;
