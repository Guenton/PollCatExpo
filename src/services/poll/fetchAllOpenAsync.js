import firebase from 'firebase';

const fetchAllOpenAsync = async () => {
  try {
    const snapshot = await firebase.database().ref('polls').once('value');

    const array = [];
    const polls = snapshot.val();

    for (const key in polls) {
      if (polls[key].isOpen) array.push(polls[key]);
    }

    return array;
  } catch (err) {
    throw err;
  }
};

export default fetchAllOpenAsync;
