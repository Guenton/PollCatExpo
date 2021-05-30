import React, { useState, useEffect, createRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { View, Keyboard } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import i18n from 'i18n-js';

import FormHeader from '../labels/FormHeader';
import EmailInput from '../inputs/EmailInput';
import PasswordInput from '../inputs/PasswordInput';
import GradientPawButton from '../buttons/GradientPawButton';
import FormFooter from '../labels/FormFooter';

import {
  setEmail,
  setPassword,
  setPasswordConfirm,
  setErrEmail,
  setErrPassword,
  setErrPasswordConfirm,
} from '../../store/actions/auth';

import { isEmpty, isEmail, isStrongPassword } from 'validator';

const styles = ScaledSheet.create({
  container: { flex: 1, justifyContent: 'space-evenly' },
  inputContainer: { width: '290@s', alignSelf: 'center' },
  input: { marginBottom: '18@s' },
  paw: { alignSelf: 'center' },
});

const SignupForm = ({ onGoLogin }) => {
  const { t } = i18n;
  const dispatch = useDispatch();

  const emailRef = createRef();
  const passwordRef = createRef();
  const passwordConfirmRef = createRef();

  const isKeyboardOpen = useSelector((state) => state.core.isKeyboardOpen);

  const email = useSelector((state) => state.auth.email);
  const password = useSelector((state) => state.auth.password);
  const passwordConfirm = useSelector((state) => state.auth.passwordConfirm);

  const setInputFocus = (input = 'email') => {
    switch (input) {
      case 'email':
        if (errEmail) emailRef.current.shake();
        emailRef.current.focus();
        break;
      case 'password':
        if (errEmail) setInputFocus('email');
        else {
          if (errPassword) passwordRef.current.shake();
          passwordRef.current.focus();
        }
        break;
      case 'passwordConfirm':
        if (errEmail) setInputFocus('email');
        else if (errPassword) setInputFocus('password');
        else {
          if (errPasswordConfirm) passwordConfirmRef.current.shake();
          passwordConfirmRef.current.focus();
        }
        break;
      default:
        break;
    }
  };

  const errEmail = useSelector((state) => state.auth.errEmail);
  const errPassword = useSelector((state) => state.auth.errPassword);
  const errPasswordConfirm = useSelector((state) => state.auth.errPasswordConfirm);

  const validateAndSetEmail = (val) => {
    switch (true) {
      case isEmpty(val):
        dispatch(setErrEmail(t('errNotFilled')));
        break;
      case !isEmail(val):
        dispatch(setErrEmail(t('errNotEmail')));
        break;
      case !val.endsWith('ibis-management.com'):
        dispatch(setErrEmail(t('errNotIbisEmail')));
      default:
        dispatch(setErrEmail());
        break;
    }
    dispatch(setEmail(val));
  };

  const validateAndSetPassword = (val) => {
    switch (true) {
      case isEmpty(val):
        dispatch(setErrPassword(t('errNotFilled')));
        break;
      case val.length < 8:
        dispatch(setErrPassword(t('errNotLongPassword')));
        break;
      case !isStrongPassword(val):
        dispatch(setErrEmail(t('errNotStrongPassword')));
      default:
        dispatch(setErrPassword());
        break;
    }
    dispatch(setPassword(val));
  };

  const validateAndSetPasswordConfirm = (val) => {
    switch (true) {
      case isEmpty(val):
        dispatch(setErrPasswordConfirm(t('errNotFilled')));
        break;
      case val !== password:
        dispatch(setErrPasswordConfirm(t('errNotMatchingPassword')));
        break;
      default:
        dispatch(setErrPasswordConfirm());
        break;
    }
    dispatch(setPasswordConfirm(val));
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
          onBlur={() => setInputFocus('password')}
          onChange={(val) => validateAndSetEmail(val)}
        />
        <PasswordInput
          inputRef={passwordRef}
          containerStyle={styles.input}
          value={password}
          errorMessage={errPassword}
          onBlur={() => setInputFocus('passwordConfirm')}
          onChange={(val) => validateAndSetPassword(val)}
        />
        <PasswordInput
          isConfirm
          inputRef={passwordConfirmRef}
          value={passwordConfirm}
          errorMessage={errPasswordConfirm}
          onChange={(val) => validateAndSetPasswordConfirm(val)}
        />
      </View>

      {!isKeyboardOpen && (
        <>
          <GradientPawButton style={styles.paw} variant="signup" onPress={() => {}} />

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
