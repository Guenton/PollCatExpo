import logoutAsync from './logoutAsync';
import loginAsync from './loginAsync';
import loginBiometricAsync from './loginBiometricAsync';
import loginCreateAsync from './loginCreateAsync';
import loginResetAsync from './loginResetAsync';
import loginResetConfirmAsync from './loginResetConfirmAsync';
import hasBiometricsAsync from './hasBiometricsAsync';
import storeCredentialsAsync from './storeCredentialsAsync';
import getStoredEmailAsync from './getStoredEmailAsync';
import getCurrentUserId from './getCurrentUserId';
import setUserInfoAsync from './setUserInfoAsync';

const authService = {
  logoutAsync,
  loginAsync,
  loginBiometricAsync,
  loginCreateAsync,
  loginResetAsync,
  loginResetConfirmAsync,
  hasBiometricsAsync,
  storeCredentialsAsync,
  getStoredEmailAsync,
  getCurrentUserId,
  setUserInfoAsync,
};

export default authService;
