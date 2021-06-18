import { LogBox } from 'react-native';
import * as Localization from 'expo-localization';
import i18n from 'i18n-js';
import en from '../global/languages/en';
import es from '../global/languages/es';
import nl from '../global/languages/nl';
import pap from '../global/languages/pap';

import firebase from 'firebase';

export const initFirebaseTimeoutErrorBypass = () => LogBox.ignoreLogs(['Setting a timer']);

export const initLanguages = () => {
  i18n.translations = { en, es, nl, pap };
  i18n.locale = Localization.locale;
  i18n.fallbacks = true;
};

export const initFirebase = async () => {
  // Clear Residual Firebase Apps
  if (firebase.apps.length > 0) {
    await Promise.all(
      firebase.apps.map(async (app) => {
        try {
          await app.delete();
        } catch (err) {
          console.error(err);
        }
      }),
    );
  }

  firebase.initializeApp({
    apiKey: process.env.FB_API_KEY,
    authDomain: process.env.FB_AUTH_DOMAIN,
    databaseURL: process.env.FB_DATABASE_URL,
    projectId: process.env.FB_PROJECT_ID,
    storageBucket: process.env.FB_STORAGE_BUCKET,
    messagingSenderId: process.env.FB_MESSAGING_SENDER_ID,
    appId: process.env.FB_APP_ID,
    measurementId: process.env.FB_MEASUREMENT_ID,
  });
};
