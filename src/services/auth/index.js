import loginAsync from './loginAsync';
import loginBiometricAsync from './loginBiometricAsync';
import hasBiometricsAsync from './hasBiometricsAsync';
import storeCredentialsAsync from './storeCredentialsAsync';
import getStoredEmailAsync from './getStoredEmailAsync';
import getCurrentUserId from './getCurrentUserId';
import setUserInfoAsync from './setUserInfoAsync';

const authService = {
  loginAsync,
  loginBiometricAsync,
  hasBiometricsAsync,
  storeCredentialsAsync,
  getStoredEmailAsync,
  getCurrentUserId,
  setUserInfoAsync,
};

export default authService;
