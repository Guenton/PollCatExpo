import React from 'react';
import { View } from 'react-native';
import { ScaledSheet, scale } from 'react-native-size-matters';
import { useDispatch, useSelector } from 'react-redux';

import PollCatCurtain from '../components/containers/PollCatCurtain';
import ResetRequestFrom from '../components/forms/ResetRequestForm';
import SignupForm from '../components/forms/SignupForm';
import GuenTon from '../components/images/GuenTon';
import LoadingBar from '../components/images/LoadingBar';
import AlertBox from '../components/containers/AlertBox';

import { pinkShade } from '../global/colors';

import { setRoute } from '../store/actions/core';

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
});

const LoginResetScreen = () => {
  const dispatch = useDispatch();
  const isKeyboardOpen = useSelector((state) => state.core.isKeyboardOpen);

  return (
    <View style={styles.container}>
      <PollCatCurtain color={pinkShade} height={isKeyboardOpen ? scale(100) : scale(250)} />

      <ResetRequestFrom onGoLogin={() => dispatch(setRoute('login-password'))} />

      <AlertBox severity="info" />
      <LoadingBar />
      <GuenTon />
    </View>
  );
};

export default LoginResetScreen;
