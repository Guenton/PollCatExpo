import firebase from 'firebase';
import getCurrentUserId from '../auth/getCurrentUserId';

const fetchAmountAnsweredAsync = async (pollId = '') => {
  const userId = getCurrentUserId();
  try {
    const snapshot = await firebase.database().ref(`answers/${pollId}/${userId}`).once('value');

    return snapshot.numChildren();
  } catch (err) {
    throw err;
  }
};

export default fetchAmountAnsweredAsync;
