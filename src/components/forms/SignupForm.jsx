import React, { createRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { View } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import { isEmpty, isEmail, isStrongPassword } from 'validator';
import * as SecureStore from 'expo-secure-store';
import firebase from 'firebase';
import i18n from 'i18n-js';

import FormHeader from '../labels/FormHeader';
import EmailInput from '../inputs/EmailInput';
import PasswordInput from '../inputs/PasswordInput';
import GradientPawButton from '../buttons/GradientPawButton';
import FormFooter from '../labels/FormFooter';

import { setLoading } from '../../store/actions/core';
import {
  setEmail,
  setPassword,
  setPasswordConfirm,
  setErrEmail,
  setErrPassword,
  setErrPasswordConfirm,
} from '../../store/actions/auth';
import { setFirstName, setLastName } from '../../store/actions/user';

const styles = ScaledSheet.create({
  container: { flex: 1, justifyContent: 'space-evenly' },
  inputContainer: { width: '290@s', alignSelf: 'center' },
  input: { marginBottom: '18@s' },
  paw: { alignSelf: 'center' },
});

const SignupForm = ({ onGoLogin, onGoMain }) => {
  const { t } = i18n;
  const dispatch = useDispatch();

  const isKeyboardOpen = useSelector((state) => state.core.isKeyboardOpen);

  const emailRef = createRef();
  const passwordRef = createRef();
  const passwordConfirmRef = createRef();

  const email = useSelector((state) => state.auth.email);
  const password = useSelector((state) => state.auth.password);
  const passwordConfirm = useSelector((state) => state.auth.passwordConfirm);

  const errEmail = useSelector((state) => state.auth.errEmail);
  const errPassword = useSelector((state) => state.auth.errPassword);
  const errPasswordConfirm = useSelector((state) => state.auth.errPasswordConfirm);

  const shakeOnError = () => {
    if (errEmail) emailRef.current.shake();
    if (errPassword) passwordRef.current.shake();
    if (errPasswordConfirm) passwordConfirmRef.current.shake();
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
    else if (val.length < 8) dispatch(setErrPassword(t('errNotLongPassword')));
    else if (!isStrongPassword(val)) dispatch(setErrPassword(t('errNotStrongPassword')));
    else dispatch(setErrPassword());

    dispatch(setPassword(val));
  };

  const validateAndSetPasswordConfirm = (val) => {
    if (isEmpty(val)) dispatch(setErrPasswordConfirm(t('errNotFilled')));
    else if (val !== password) dispatch(setErrPasswordConfirm(t('errNotMatchingPassword')));
    else dispatch(setErrPasswordConfirm());

    dispatch(setPasswordConfirm(val));
  };

  const signupWithFirebase = async () => {
    validateAndSetEmail(email);
    validateAndSetPassword(password);
    validateAndSetPasswordConfirm(passwordConfirm);

    if (errEmail || errPassword || errPasswordConfirm) return shakeOnError();
    if (email && password && passwordConfirm) {
      try {
        await firebase.auth().createUserWithEmailAndPassword(email, password);

        const canStore = await SecureStore.isAvailableAsync();
        if (canStore) await SecureStore.setItemAsync('email', email);
        if (canStore) await SecureStore.setItemAsync('password', password);

        const firstName = email.split('.')[0];
        const lastName = email.split('.')[1].split('@')[0];
        dispatch(setFirstName(firstName));
        dispatch(setLastName(lastName));

        dispatch(setPassword());
        dispatch(setPasswordConfirm());
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
      <FormHeader label={t('signupFormHeader')} subLabel={t('signupFormSubHeader')} />

      <View style={styles.inputContainer}>
        <EmailInput
          inputRef={emailRef}
          containerStyle={styles.input}
          value={email}
          errorMessage={errEmail}
          onBlur={() => shakeOnError()}
          onChange={(val) => validateAndSetEmail(val)}
        />
        <PasswordInput
          inputRef={passwordRef}
          containerStyle={styles.input}
          value={password}
          errorMessage={errPassword}
          onBlur={() => shakeOnError()}
          onChange={(val) => validateAndSetPassword(val)}
        />
        <PasswordInput
          isConfirm
          inputRef={passwordConfirmRef}
          value={passwordConfirm}
          errorMessage={errPasswordConfirm}
          onBlur={() => signupWithFirebase()}
          onChange={(val) => validateAndSetPasswordConfirm(val)}
        />
      </View>

      {!isKeyboardOpen && (
        <>
          <GradientPawButton
            style={styles.paw}
            variant="signup"
            onPress={() => signupWithFirebase()}
          />

          <FormFooter
            label={t('alreadySignedUp')}
            boldLabel={t('login')}
            onPress={() => onGoLogin()}
          />
        </>
      )}
    </View>
  );
};

export default SignupForm;
