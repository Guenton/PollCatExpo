import React from 'react';
import { View, Text } from 'react-native';

import Curtain from '../components/containers/Curtain';

const LoginScreen = () => {
  return (
    <View style={{ flex: 1 }}>
      <Curtain>
        <Text>Open up App.js to start working on your app!</Text>
      </Curtain>
    </View>
  );
};

export default LoginScreen;
