import firebase from 'firebase';

const closeByIdAsync = async (pollId = '') => {
  try {
    await firebase.database().ref(`polls/${pollId}`).update({ isOpen: false });
  } catch (err) {
    throw err;
  }
};

export default closeByIdAsync;
