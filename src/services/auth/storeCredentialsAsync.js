import * as SecureStore from 'expo-secure-store';

const storeCredentialsAsync = async (email, password) => {
  try {
    const canStore = await SecureStore.isAvailableAsync();
    if (canStore) await SecureStore.setItemAsync('email', email);
    if (canStore) await SecureStore.setItemAsync('password', password);
  } catch (err) {
    throw err;
  }
};

export default storeCredentialsAsync;
