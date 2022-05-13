import firebase from 'firebase';

const fetchSelectableUsersAsync = async () => {
  try {
    const snapshot = await firebase.database().ref('users').once('value');

    const array = [];
    const users = snapshot.val();

    for (const key in users) {
      array.push(`${users[key].firstName} ${users[key].lastName}`);
    }

    return array;
  } catch (err) {
    throw err;
  }
};

export default fetchSelectableUsersAsync;
