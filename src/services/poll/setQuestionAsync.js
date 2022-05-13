import firebase from 'firebase';

const setQuestionAsync = async (pollId = '', questionNumber = '', questionObject = {}) => {
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

export default setQuestionAsync;
