import React, { useState } from 'react';

import LoginScreen from './screens/LoginScreen';
import MainScreen from './screens/MainScreen';

const Router = () => {
  const [screen, setScreen] = useState('login');

  return (
    <>
      {screen === 'login' && <LoginScreen setRoute={(route) => setScreen(route)} />}
      {screen === 'main' && <MainScreen setRoute={(route) => setScreen(route)} />}
    </>
  );
};

export default Router;
