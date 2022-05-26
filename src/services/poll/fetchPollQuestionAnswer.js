import firebase from 'firebase';
import getCurrentUserId from '../auth/getCurrentUserId';

const fetchPollQuestionAnswer = async (pollId = '', number = '') => {
  const userId = getCurrentUserId();
  try {
    const snapshot = await firebase
      .database()
      .ref(`answers/${pollId}/${userId}/${number}`)
      .once('value');

    return snapshot.val();
  } catch (err) {
    throw err;
  }
};

export default fetchPollQuestionAnswer;
