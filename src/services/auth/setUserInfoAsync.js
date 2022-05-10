import firebase from 'firebase';

const setUserInfoAsync = async (userId, firstName, lastName, email) => {
  try {
    await firebase.database().ref(`users/${userId}`).set({
      userId,
      firstName,
      lastName,
      email,
    });
  } catch (err) {
    throw err;
  }
};

export default setUserInfoAsync;
