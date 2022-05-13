import firebase from 'firebase';

const fetchTotalQuestionAmountAsync = async (pollId = '') => {
  try {
    const snapshot = await firebase.database().ref(`polls/${pollId}/questions/`).once('value');

    return snapshot.numChildren();
  } catch (err) {
    throw err;
  }
};

export default fetchTotalQuestionAmountAsync;
