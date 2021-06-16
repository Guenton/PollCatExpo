import React from 'react';
import { View } from 'react-native';
import { ScaledSheet, scale } from 'react-native-size-matters';
import { useDispatch } from 'react-redux';

import PollCatCurtain from '../components/containers/PollCatCurtain';
import LoginBiometricForm from '../components/forms/LoginBiometricForm';
import GuenTon from '../components/images/GuenTon';
import LoadingBar from '../components/images/LoadingBar';
import AlertBox from '../components/containers/AlertBox';

import { blueShade } from '../global/colors';

import { setRoute } from '../store/actions/core';

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
});

const LoginBiometricScreen = () => {
  const dispatch = useDispatch();

  return (
    <View style={styles.container}>
      <PollCatCurtain color={blueShade} height={scale(300)} />
      <LoginBiometricForm
        onGoLogin={() => dispatch(setRoute('login-password'))}
        onGoMain={() => dispatch(setRoute('main'))}
      />

      <AlertBox severity="info" />
      <LoadingBar />
      <GuenTon />
    </View>
  );
};

export default LoginBiometricScreen;
