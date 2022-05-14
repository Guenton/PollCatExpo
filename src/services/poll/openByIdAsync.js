import firebase from 'firebase';

const openByIdAsync = async (pollId = '') => {
  try {
    await firebase.database().ref(`polls/${pollId}`).update({ isOpen: true });
  } catch (err) {
    throw err;
  }
};

export default openByIdAsync;
