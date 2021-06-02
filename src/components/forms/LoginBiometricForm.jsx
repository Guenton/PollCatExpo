import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import * as LocalAuthentication from 'expo-local-authentication';
import * as SecureStore from 'expo-secure-store';
import firebase from 'firebase';
import i18n from 'i18n-js';

import FormHeader from '../labels/FormHeader';
import FormFooter from '../labels/FormFooter';

import { setEmail } from '../../store/actions/auth';
import { setFirstName, setLastName } from '../../store/actions/user';
import PawButton from '../buttons/PawButton';

const styles = ScaledSheet.create({
  container: { flex: 1, justifyContent: 'space-evenly' },
  inputContainer: { width: '290@s', alignSelf: 'center' },
  input: { marginBottom: '18@s' },
  paw: { alignSelf: 'center' },
});

const LoginBiometricForm = ({ onGoLogin, onGoMain }) => {
  const { t } = i18n;
  const dispatch = useDispatch();

  const email = useSelector((state) => state.auth.email);
  const firstName = useSelector((state) => state.user.firstName);

  useEffect(() => {
    const hasBiometrics = async () => {
      try {
        const type = await LocalAuthentication.getEnrolledLevelAsync();
        if (type === 'NONE') return false;

        return true;
      } catch (err) {
        console.error(err);
      }
    };

    const getStoredEmail = async () => {
      try {
        const storedEmail = await SecureStore.getItemAsync('email');
        if (!storedEmail) return false;

        const storedFirstName = storedEmail.split('.')[0];
        const storedLastName = storedEmail.split('.')[1].split('@')[0];

        dispatch(setFirstName(storedFirstName));
        dispatch(setLastName(storedLastName));
        dispatch(setEmail(storedEmail));
        return true;
      } catch (err) {
        console.error(err);
      }
    };

    (async () => {
      if (!(await hasBiometrics())) return onGoLogin();
      if (!(await getStoredEmail())) return onGoLogin();
    })();
  }, []);

  const loginBiometricWithFirebase = async () => {
    try {
      const { success } = await LocalAuthentication.authenticateAsync();

      if (success) {
        const storedPassword = await SecureStore.getItemAsync('password');
        await firebase.auth().signInWithEmailAndPassword(email, storedPassword);
        onGoMain();
      }
    } catch (err) {
      console.error(err);
      console.log(err.code);
      console.log(err.message);
    }
  };

  return (
    <View style={styles.container}>
      <FormHeader label={t('hiName', { name: firstName })} subLabel={t('loginFormSubHeader')} />

      <PawButton style={styles.paw} variant="login" onPress={() => loginBiometricWithFirebase()} />

      <FormFooter
        label={t('notName', { name: firstName })}
        boldLabel={t('login')}
        onPress={() => onGoLogin()}
      />
    </View>
  );
};

export default LoginBiometricForm;
