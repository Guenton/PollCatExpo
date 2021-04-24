import React from 'react';
import { View, Text, StatusBar } from 'react-native';

import Curtain from '../components/containers/Curtain';

const LoginScreen = () => {
  return (
    <View>
      <StatusBar style="light" />
      {/* <Text>Open up App.js to start working on your app!</Text> */}
      <Curtain />
    </View>
  );
};

export default LoginScreen;
