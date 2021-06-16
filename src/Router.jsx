import React, { useEffect } from 'react';
import { SafeAreaView, Keyboard } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import LoginBiometricScreen from './screens/LoginBiometricScreen';
import LoginPasswordScreen from './screens/LoginPasswordScreen';
import LoginResetScreen from './screens/LoginResetScreen';
import LoginSignupScreen from './screens/LoginSignupScreen';

import MainScreen from './screens/MainScreen';

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
    </SafeAreaView>
  );
};

export default Router;
