import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import i18n from 'i18n-js';

import FormHeader from '../labels/FormHeader';
import FormFooter from '../labels/FormFooter';

import authService from '../../services/auth';

import { setLoading } from '../../store/actions/core';
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
    authService
      .hasBiometricsAsync()
      .then((hasBiometrics) => {
        if (!hasBiometrics) return onGoLogin();
      })
      .catch((err) => {
        console.error(err);
        return onGoLogin();
      });

    authService
      .getStoredEmailAsync()
      .then((storedEmail) => {
        if (!storedEmail) return onGoLogin();
        else {
          const storedFirstName = storedEmail.split('.')[0];
          const storedLastName = storedEmail.split('.')[1].split('@')[0];

          dispatch(setFirstName(storedFirstName));
          dispatch(setLastName(storedLastName));
          dispatch(setEmail(storedEmail));
        }
      })
      .catch((err) => {
        console.error(err);
        return onGoLogin();
      });
  }, []);

  const loginBiometricWithFirebase = async () => {
    try {
      dispatch(setLoading());
      await authService.loginBiometricAsync(email);
      dispatch(setLoading(false));
      onGoMain();
    } catch (err) {
      dispatch(setLoading(false));
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
