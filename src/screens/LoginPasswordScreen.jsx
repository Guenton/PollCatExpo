import React from 'react';
import { View } from 'react-native';
import { ScaledSheet, scale } from 'react-native-size-matters';
import { useDispatch, useSelector } from 'react-redux';

import PollCatCurtain from '../components/containers/PollCatCurtain';
import LoginForm from '../components/forms/LoginForm';
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

const LoginPasswordScreen = () => {
  const dispatch = useDispatch();
  const isKeyboardOpen = useSelector((state) => state.core.isKeyboardOpen);

  return (
    <View style={styles.container}>
      <PollCatCurtain color={blueShade} height={isKeyboardOpen ? scale(100) : scale(200)} />

      <LoginForm
        onGoSignup={() => dispatch(setRoute('login-signup'))}
        onGoReset={() => dispatch(setRoute('login-reset'))}
        onGoMain={() => dispatch(setRoute('main'))}
      />

      <AlertBox severity="info" />
      <LoadingBar />
      <GuenTon />
    </View>
  );
};

export default LoginPasswordScreen;
