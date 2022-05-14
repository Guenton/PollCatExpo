import firebase from 'firebase';

const fetchByIdAsync = async (pollId = '') => {
  try {
    const snapshot = await firebase.database().ref(`polls/${pollId}`).once('value');

    return snapshot.val();
  } catch (err) {
    throw err;
  }
};

export default fetchByIdAsync;
