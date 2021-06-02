import React, { createRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import { isEmpty, isEmail } from 'validator';
import * as SecureStore from 'expo-secure-store';
import firebase from 'firebase';
import i18n from 'i18n-js';

import FormHeader from '../labels/FormHeader';
import EmailInput from '../inputs/EmailInput';
import PasswordInput from '../inputs/PasswordInput';
import ForgotPasswordButton from '../buttons/ForgotPasswordButton';
import GradientPawButton from '../buttons/GradientPawButton';
import FormFooter from '../labels/FormFooter';

import { setEmail, setPassword, setErrEmail, setErrPassword } from '../../store/actions/auth';

const styles = ScaledSheet.create({
  container: { flex: 1, justifyContent: 'space-evenly' },
  inputContainer: { width: '290@s', alignSelf: 'center' },
  input: { marginBottom: '18@s' },
  paw: { alignSelf: 'center' },
});

const LoginForm = ({ onGoSignup, onGoReset, onGoMain }) => {
  const { t } = i18n;
  const dispatch = useDispatch();

  const isKeyboardOpen = useSelector((state) => state.core.isKeyboardOpen);

  const emailRef = createRef();
  const passwordRef = createRef();

  const email = useSelector((state) => state.auth.email);
  const password = useSelector((state) => state.auth.password);

  const errEmail = useSelector((state) => state.auth.errEmail);
  const errPassword = useSelector((state) => state.auth.errPassword);

  const shakeOnError = () => {
    if (errEmail) emailRef.current.shake();
    if (errPassword) passwordRef.current.shake();
  };

  const validateAndSetEmail = (val) => {
    if (isEmpty(val)) dispatch(setErrEmail(t('errNotFilled')));
    else if (!isEmail(val)) dispatch(setErrEmail(t('errNotEmail')));
    else if (!val.endsWith('ibis-management.com')) dispatch(setErrEmail(t('errNotIbisEmail')));
    else dispatch(setErrEmail());

    dispatch(setEmail(val));
  };

  const validateAndSetPassword = (val) => {
    if (isEmpty(val)) dispatch(setErrPassword(t('errNotFilled')));
    else dispatch(setErrPassword());

    dispatch(setPassword(val));
  };

  const loginWithFirebase = () => {
    validateAndSetEmail(email);
    validateAndSetPassword(password);

    if (errEmail || errPassword) return shakeOnError();
    if (email && password) {
      try {
        await firebase.auth().signInWithEmailAndPassword(email, password);

        const canStore = await SecureStore.isAvailableAsync();
        if (canStore) await SecureStore.setItemAsync('email', email);
        if (canStore) await SecureStore.setItemAsync('password', password);

        onGoMain();
      } catch (err) {
        console.error(err);
        console.log(err.code);
        console.log(err.message);
      }
    }
  };

  return (
    <View style={styles.container}>
      <FormHeader label={t('loginFormHeader')} subLabel={t('loginFormSubHeader')} />

      <View style={styles.inputContainer}>
        <EmailInput
          isGreen
          inputRef={emailRef}
          containerStyle={styles.input}
          value={email}
          errorMessage={errEmail}
          onBlur={() => shakeOnError()}
          onChange={(val) => validateAndSetEmail(val)}
        />
        <PasswordInput
          isGreen
          inputRef={passwordRef}
          value={password}
          errorMessage={errPassword}
          onBlur={() => shakeOnError()}
          onChange={(val) => validateAndSetPassword(val)}
        />
        <ForgotPasswordButton onPress={() => onGoReset()} />
      </View>

      {!isKeyboardOpen && (
        <>
          <GradientPawButton
            style={styles.paw}
            variant="login"
            onPress={() => loginWithFirebase()}
          />

          <FormFooter label={t('noAccount')} boldLabel={t('signUp')} onPress={() => onGoSignup()} />
        </>
      )}
    </View>
  );
};

export default LoginForm;
