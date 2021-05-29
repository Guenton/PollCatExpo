import React, { useState } from 'react';
import * as Localization from 'expo-localization';
import i18n from 'i18n-js';

import en from './global/languages/en';
import es from './global/languages/es';
import nl from './global/languages/nl';
import pap from './global/languages/pap';

import LoginScreen from './screens/LoginScreen';
import MainScreen from './screens/MainScreen';

i18n.translations = { en, es, nl, pap };
i18n.locale = Localization.locale;
i18n.fallbacks = true;

const Router = () => {
  const [screen, setScreen] = useState('main');

  return (
    <>
      {screen === 'login' && <LoginScreen setRoute={(route) => setScreen(route)} />}
      {screen === 'main' && <MainScreen setRoute={(route) => setScreen(route)} />}
    </>
  );
};

export default Router;
