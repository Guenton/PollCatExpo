import React, { useState } from 'react';
import { View } from 'react-native';
import { ScaledSheet, scale } from 'react-native-size-matters';

import PollCatCurtain from '../components/containers/PollCatCurtain';
import LoginForm from '../components/forms/LoginForm';
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

  return (
    <View style={styles.container}>
      {view === 'login' && (
        <>
          <PollCatCurtain color={blueShade} height={scale(200)} />
          <LoginForm
            onGoSignup={() => setView('signup')}
            onGoReset={() => setView('reset-request')}
          />
        </>
      )}

      {view === 'signup' && (
        <>
          <PollCatCurtain color={greenShade} height={scale(150)} />
          <SignupForm onGoLogin={() => setView('login')} />
        </>
      )}

      {view === 'reset-request' && (
        <>
          <PollCatCurtain color={pinkShade} height={scale(250)} />
          <ResetRequestFrom onGoLogin={() => setView('login')} />
        </>
      )}

      <GuenTon />
    </View>
  );
};

export default LoginScreen;
