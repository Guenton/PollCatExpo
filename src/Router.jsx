import React, { useEffect } from 'react';
import { SafeAreaView, Keyboard } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { setKeyboardOpen } from './store/actions/core';

import LoginBiometricScreen from './screens/LoginBiometricScreen';
import LoginPasswordScreen from './screens/LoginPasswordScreen';
import LoginResetScreen from './screens/LoginResetScreen';
import LoginSignupScreen from './screens/LoginSignupScreen';

import MainScreen from './screens/MainScreen';

import SetupUserScreen from './screens/SetupUserScreen';
import SetupAdminScreen from './screens/SetupAdminScreen';
import CreatePollScreen from './screens/CreatePollScreen';
import EditUserScreen from './screens/EditUserScreen';
import RemoveUserScreen from './screens/RemoveUserScreen';
import RemoveUserConfirmScreen from './screens/RemoveUserConfirmScreen';

const Router = () => {
  const dispatch = useDispatch();

  const route = useSelector((state) => state.core.route);

  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', () => dispatch(setKeyboardOpen(true)));
    Keyboard.addListener('keyboardDidHide', () => dispatch(setKeyboardOpen(false)));
    return () => {
      Keyboard.removeListener('keyboardDidShow', () => dispatch(setKeyboardOpen(true)));
      Keyboard.removeListener('keyboardDidHide', () => dispatch(setKeyboardOpen(false)));
    };
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {route === 'login-biometric' && <LoginBiometricScreen />}
      {route === 'login-password' && <LoginPasswordScreen />}
      {route === 'login-signup' && <LoginSignupScreen />}
      {route === 'login-reset' && <LoginResetScreen />}

      {route === 'main' && <MainScreen />}

      {route === 'setup-user' && <SetupUserScreen />}
      {route === 'setup-admin' && <SetupAdminScreen />}
      {route === 'setup-create-poll' && <CreatePollScreen />}
      {route === 'setup-edit-user' && <EditUserScreen />}
      {route === 'setup-remove-user' && <RemoveUserScreen />}
      {route === 'setup-remove-user-confirm' && <RemoveUserConfirmScreen />}
    </SafeAreaView>
  );
};

export default Router;
