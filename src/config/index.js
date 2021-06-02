import * as Localization from 'expo-localization';
import i18n from 'i18n-js';
import en from '../global/languages/en';
import es from '../global/languages/es';
import nl from '../global/languages/nl';
import pap from '../global/languages/pap';

import firebase from 'firebase';
// import 'firebase/auth';
//import "firebase/database";
//import "firebase/firestore";
//import "firebase/functions";
//import "firebase/storage";

export const initLanguages = () => {
  i18n.translations = { en, es, nl, pap };
  i18n.locale = Localization.locale;
  i18n.fallbacks = true;
};

export const initFirebase = () => {
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