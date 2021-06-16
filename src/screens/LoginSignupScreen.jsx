import React from 'react';
import { View } from 'react-native';
import { ScaledSheet, scale } from 'react-native-size-matters';
import { useDispatch, useSelector } from 'react-redux';

import PollCatCurtain from '../components/containers/PollCatCurtain';
import SignupForm from '../components/forms/SignupForm';
import GuenTon from '../components/images/GuenTon';
import LoadingBar from '../components/images/LoadingBar';
import AlertBox from '../components/containers/AlertBox';

import { greenShade } from '../global/colors';

import { setRoute } from '../store/actions/core';

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
});

const LoginSignupScreen = () => {
  const dispatch = useDispatch();
  const isKeyboardOpen = useSelector((state) => state.core.isKeyboardOpen);

  return (
    <View style={styles.container}>
      <PollCatCurtain color={greenShade} height={isKeyboardOpen ? scale(100) : scale(150)} />

      <SignupForm
        onGoLogin={() => dispatch(setRoute('login-password'))}
        onGoMain={() => dispatch(setRoute('main'))}
      />

      <AlertBox severity="info" />
      <LoadingBar />
      <GuenTon />
    </View>
  );
};

export default LoginSignupScreen;
