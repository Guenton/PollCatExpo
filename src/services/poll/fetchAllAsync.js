import firebase from 'firebase';

const fetchAllAsync = async () => {
  try {
    const snapshot = await firebase.database().ref('polls').once('value');

    return snapshot.val();
  } catch (err) {
    throw err;
  }
};

export default fetchAllAsync;
