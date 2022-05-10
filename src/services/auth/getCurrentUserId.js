import firebase from 'firebase';

const getCurrentUserId = () => {
  return firebase.auth().currentUser.uid;
};

export default getCurrentUserId;
