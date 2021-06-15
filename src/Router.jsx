import React, { useState } from 'react';
import { SafeAreaView } from 'react-native';

import LoginScreen from './screens/LoginScreen';
import MainScreen from './screens/MainScreen';

const Router = () => {
  const [screen, setScreen] = useState('login');

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {screen === 'login' && <LoginScreen setRoute={(route) => setScreen(route)} />}
      {screen === 'main' && <MainScreen setRoute={(route) => setScreen(route)} />}
    </SafeAreaView>
  );
};

export default Router;
