import firebase from 'firebase';

const createAsync = async (pollTitle = '', defaultResponseOption = '') => {
  try {
    const { key } = await firebase
      .database()
      .ref('polls/')
      .push({ title: pollTitle, defaultResponseOption, isOpen: false });

    await firebase.database().ref(`polls/${key}`).update({ pollId: key });
  } catch (err) {
    throw err;
  }
};

export default createAsync;
