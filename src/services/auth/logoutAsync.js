import firebase from 'firebase';

const logoutAsync = async () => {
  try {
    await firebase.auth().signOut();
  } catch (err) {
    if (err.message) throw err.message;
    else throw err;
  }
};

export default logoutAsync;
