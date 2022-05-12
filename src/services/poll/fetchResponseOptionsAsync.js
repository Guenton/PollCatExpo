import firebase from 'firebase';

const fetchResponseOptionsAsync = async () => {
  try {
    const snapshot = await firebase.database().ref('response-options').get();
    const array = [];

    for (const key in snapshot.val()) {
      array.push(`${snapshot.val()[key].label}`);
    }

    return array;
  } catch (err) {
    throw err;
  }
};

export default fetchResponseOptionsAsync;
