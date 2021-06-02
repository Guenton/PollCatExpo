import React, { useState, useEffect } from 'react';
import { View, Keyboard } from 'react-native';
import { ScaledSheet, scale } from 'react-native-size-matters';
import { useDispatch, useSelector } from 'react-redux';

import PollCatCurtain from '../components/containers/PollCatCurtain';
import LoginForm from '../components/forms/LoginForm';
import ResetConfirmFrom from '../components/forms/ResetConfirmForm';
import ResetRequestFrom from '../components/forms/ResetRequestForm';
import SignupForm from '../components/forms/SignupForm';
import GuenTon from '../components/images/GuenTon';

import { blueShade, greenShade, pinkShade } from '../global/colors';

import { setKeyboardOpen } from '../store/actions/core';

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
});

const LoginScreen = ({ setRoute }) => {
  const [view, setView] = useState('login');

  const isKeyboardOpen = useSelector((state) => state.core.isKeyboardOpen);
  const dispatch = useDispatch();

  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', () => dispatch(setKeyboardOpen(true)));
    Keyboard.addListener('keyboardDidHide', () => dispatch(setKeyboardOpen(false)));
    return () => {
      Keyboard.removeListener('keyboardDidShow', () => dispatch(setKeyboardOpen(true)));
      Keyboard.removeListener('keyboardDidHide', () => dispatch(setKeyboardOpen(false)));
    };
  }, []);

  return (
    <View style={styles.container}>
      {view === 'login' && (
        <>
          <PollCatCurtain color={blueShade} height={isKeyboardOpen ? scale(100) : scale(200)} />
          <LoginForm
            onGoSignup={() => setView('signup')}
            onGoReset={() => setView('reset-request')}
            onGoMain={() => setRoute('main')}
          />
        </>
      )}

      {view === 'signup' && (
        <>
          <PollCatCurtain color={greenShade} height={isKeyboardOpen ? scale(100) : scale(150)} />
          <SignupForm onGoLogin={() => setView('login')} onGoMain={() => setRoute('main')} />
        </>
      )}

      {view === 'reset-request' && (
        <>
          <PollCatCurtain color={pinkShade} height={isKeyboardOpen ? scale(100) : scale(250)} />
          <ResetRequestFrom
            onGoLogin={() => setView('login')}
            onGoConfirm={() => setView('reset-confirm')}
          />
        </>
      )}

      {view === 'reset-confirm' && (
        <>
          <PollCatCurtain color={pinkShade} height={isKeyboardOpen ? scale(100) : scale(200)} />
          <ResetConfirmFrom
            onGoReset={() => setView('reset-request')}
            onGoLogin={() => setView('login')}
          />
        </>
      )}

      <GuenTon />
    </View>
  );
};

export default LoginScreen;
