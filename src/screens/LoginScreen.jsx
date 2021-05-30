import React, { useState, useEffect } from 'react';
import { View, Keyboard } from 'react-native';
import { ScaledSheet, scale } from 'react-native-size-matters';

import PollCatCurtain from '../components/containers/PollCatCurtain';
import LoginForm from '../components/forms/LoginForm';
import ResetConfirmFrom from '../components/forms/ResetConfirmForm';
import ResetRequestFrom from '../components/forms/ResetRequestForm';
import SignupForm from '../components/forms/SignupForm';
import GuenTon from '../components/images/GuenTon';

import { blueShade, greenShade, pinkShade } from '../global/colors';

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
});

const LoginScreen = () => {
  const [view, setView] = useState('login');
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);

  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', () => setIsKeyboardOpen(true));
    Keyboard.addListener('keyboardDidHide', () => setIsKeyboardOpen(false));
    return () => {
      Keyboard.removeListener('keyboardDidShow', () => setIsKeyboardOpen(true));
      Keyboard.removeListener('keyboardDidHide', () => setIsKeyboardOpen(false));
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
          />
        </>
      )}

      {view === 'signup' && (
        <>
          <PollCatCurtain color={greenShade} height={isKeyboardOpen ? scale(100) : scale(150)} />
          <SignupForm onGoLogin={() => setView('login')} />
        </>
      )}

      {view === 'reset-request' && (
        <>
          <PollCatCurtain color={pinkShade} height={isKeyboardOpen ? scale(100) : scale(250)} />
          <ResetRequestFrom onGoLogin={() => setView('login')} />
        </>
      )}

      {view === 'reset-confirm' && (
        <>
          <PollCatCurtain color={pinkShade} height={isKeyboardOpen ? scale(100) : scale(200)} />
          <ResetConfirmFrom onGoReset={() => setView('reset-request')} />
        </>
      )}

      <GuenTon />
    </View>
  );
};

export default LoginScreen;
