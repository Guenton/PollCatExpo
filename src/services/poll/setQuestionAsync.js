import firebase from 'firebase';

const setQuestionAsync = async (pollId = '', number = '', questionObject = {}) => {
  try {
    await firebase
      .database()
      .ref(`polls/${pollId}/questions/${number}`)
      .set({ ...questionObject, number });
  } catch (err) {
    throw err;
  }
};

export default setQuestionAsync;
