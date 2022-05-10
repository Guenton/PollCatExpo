import * as LocalAuthentication from 'expo-local-authentication';

const hasBiometricsAsync = async () => {
  try {
    const type = await LocalAuthentication.getEnrolledLevelAsync();
    if (type === 'NONE') return false;

    return true;
  } catch (err) {
    throw err;
  }
};

export default hasBiometricsAsync;
