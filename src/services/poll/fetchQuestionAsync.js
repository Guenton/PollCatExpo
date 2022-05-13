import firebase from 'firebase';

const fetchQuestionAsync = async (pollId = '', questionNumber = '') => {
  try {
    const snapshot = await firebase
      .database()
      .ref(`polls/${pollId}/questions/${questionNumber}`)
      .once('value');

    return snapshot.val();
  } catch (err) {
    throw err;
  }
};

export default fetchQuestionAsync;
