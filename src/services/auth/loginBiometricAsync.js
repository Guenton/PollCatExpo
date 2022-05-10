import * as LocalAuthentication from 'expo-local-authentication';
import * as SecureStore from 'expo-secure-store';
import firebase from 'firebase';

const loginBiometricAsync = async (email) => {
  try {
    const { success } = await LocalAuthentication.authenticateAsync();

    if (success) {
      const storedPassword = await SecureStore.getItemAsync('password');
      await firebase.auth().signInWithEmailAndPassword(email, storedPassword);
    }
  } catch (err) {
    throw err;
  }
};

export default loginBiometricAsync;
