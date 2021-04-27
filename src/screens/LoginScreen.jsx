import React, { useState } from 'react';
import { View } from 'react-native';
import { ScaledSheet, scale } from 'react-native-size-matters';

import PollCatCurtain from '../components/containers/PollCatCurtain';
import LoginForm from '../components/forms/LoginForm';
import SignupForm from '../components/forms/SignupForm';
import GuenTon from '../components/images/GuenTon';

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
          <PollCatCurtain />
          <LoginForm onGoSignUp={() => setView('signup')} />
        </>
      )}

      {view === 'signup' && (
        <>
          <PollCatCurtain color="green" height={scale(175)} />
          <SignupForm onGoLogin={() => setView('login')} />
        </>
      )}

      <GuenTon />
    </View>
  );
};

export default LoginScreen;
