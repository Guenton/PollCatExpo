import React, { useEffect } from 'react';
import { SafeAreaView, Keyboard } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { setKeyboardOpen } from './store/actions/core';

import LoginBiometricScreen from './screens/LoginBiometricScreen';
import LoginPasswordScreen from './screens/LoginPasswordScreen';
import LoginResetScreen from './screens/LoginResetScreen';
import LoginSignupScreen from './screens/LoginSignupScreen';

import MainScreen from './screens/MainScreen';
import RankScreen from './screens/RankScreen';

import SetupUserScreen from './screens/SetupUserScreen';
import SetupAdminScreen from './screens/SetupAdminScreen';

import CreatePollScreen from './screens/CreatePollScreen';
import SelectPollScreen from './screens/SelectPollScreen';
import EditPollScreen from './screens/EditPollScreen';
import EditPollDetailScreen from './screens/EditPollDetailScreen';
import RemovePollConfirmScreen from './screens/RemovePollConfirmScreen';
import EditUserScreen from './screens/EditUserScreen';
import RemoveUserScreen from './screens/RemoveUserScreen';
import RemoveUserConfirmScreen from './screens/RemoveUserConfirmScreen';
import EditPollQuestionScreen from './screens/EditPollQuestionScreen';

const Router = () => {
  const dispatch = useDispatch();

  const route = useSelector((state) => state.core.route);

  useEffect(() => {
    const kbShow = Keyboard.addListener('keyboardDidShow', () => dispatch(setKeyboardOpen(true)));
    const kbHide = Keyboard.addListener('keyboardDidHide', () => dispatch(setKeyboardOpen(false)));
    return () => {
      kbShow.remove();
      kbHide.remove();
    };
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {route === 'login-biometric' && <LoginBiometricScreen />}
      {route === 'login-password' && <LoginPasswordScreen />}
      {route === 'login-signup' && <LoginSignupScreen />}
      {route === 'login-reset' && <LoginResetScreen />}

      {route === 'main' && <MainScreen />}
      {route === 'rank' && <RankScreen />}

      {route === 'setup-user' && <SetupUserScreen />}
      {route === 'setup-admin' && <SetupAdminScreen />}

      {route === 'setup-create-poll' && <CreatePollScreen />}
      {route === 'setup-select-poll' && <SelectPollScreen />}
      {route === 'setup-edit-poll' && <EditPollScreen />}
      {route === 'setup-edit-poll-detail' && <EditPollDetailScreen />}
      {route === 'setup-edit-poll-question' && <EditPollQuestionScreen />}
      {route === 'setup-remove-poll-confirm' && <RemovePollConfirmScreen />}
      {route === 'setup-edit-user' && <EditUserScreen />}
      {route === 'setup-remove-user' && <RemoveUserScreen />}
      {route === 'setup-remove-user-confirm' && <RemoveUserConfirmScreen />}
    </SafeAreaView>
  );
};

export default Router;
