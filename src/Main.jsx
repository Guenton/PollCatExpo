import React, { useState } from 'react';
import * as Localization from 'expo-localization';
import i18n from 'i18n-js';
// Languages
import en from './languages/en';
import es from './languages/es';
import nl from './languages/nl';
import pap from './languages/pap';
// Components
import LoginScreen from './screens/LoginScreen';

i18n.translations = { en, es, nl, pap };
i18n.locale = Localization.locale;
i18n.fallbacks = true;

const Main = () => {
  const [screen, setScreen] = useState('login');

  return (
    <>
      {screen === 'login' && <LoginScreen setRoute={(route) => setScreen(route)} />}
    </>
  );
};

export default Main;
