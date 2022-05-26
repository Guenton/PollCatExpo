import firebase from 'firebase';
import getCurrentUserId from '../auth/getCurrentUserId';

const setPollQuestionAnswer = async (pollId = '', number = '', answer = null) => {
  const userId = getCurrentUserId();
  try {
    await firebase.database().ref(`answers/${pollId}/${userId}/${number}`).set(answer);
  } catch (err) {
    throw err;
  }
};

export default setPollQuestionAnswer;
