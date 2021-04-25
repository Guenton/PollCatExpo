import React from 'react';
import { View } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';

import Curtain from '../components/containers/Curtain';
import GuenTon from '../components/images/GuenTon';
import PollCatLogo from '../components/images/PollCatLogo';

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
});

const LoginScreen = () => (
  <View style={styles.container}>
    <Curtain>
      <PollCatLogo />
    </Curtain>
    <GuenTon />
  </View>
);

export default LoginScreen;
