import React from 'react';
import { View } from 'react-native';

import Curtain from '../components/containers/Curtain';
import PollCatLogo from '../components/images/PollCatLogo';

const LoginScreen = () => {
  return (
    <View style={{ flex: 1 }}>
      <Curtain>
        <PollCatLogo />
      </Curtain>
    </View>
  );
};

export default LoginScreen;
