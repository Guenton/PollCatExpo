import * as SecureStore from 'expo-secure-store';

const getStoredEmailAsync = async () => {
  try {
    const storedEmail = await SecureStore.getItemAsync('email');
    if (!storedEmail) return null;
    else return storedEmail;
  } catch (err) {
    throw err;
  }
};

export default getStoredEmailAsync;
