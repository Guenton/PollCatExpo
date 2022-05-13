import React, { createRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import { isEmpty, isEmail } from 'validator';
import i18n from 'i18n-js';
import _ from 'lodash';

import FormHeader from '../labels/FormHeader';
import EmailInput from '../inputs/EmailInput';
import PasswordInput from '../inputs/PasswordInput';
import ForgotPasswordButton from '../buttons/ForgotPasswordButton';
import GradientPawButton from '../buttons/GradientPawButton';
import FormFooter from '../labels/FormFooter';

import authService from '../../services/auth';

import { setAlert, setLoading } from '../../store/actions/core';
import { setEmail, setPassword, setErrEmail, setErrPassword } from '../../store/actions/auth';
import { setFirstName, setLastName, setUserId } from '../../store/actions/user';

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

  const loginWithFirebase = async () => {
    validateAndSetEmail(email);
    validateAndSetPassword(password);

    if (errEmail || errPassword) return shakeOnError();
    if (email && password) {
      try {
        dispatch(setLoading());

        await authService.loginAsync(email, password);
        await authService.storeCredentialsAsync(email, password);

        const userId = authService.getCurrentUserId();
        const firstName = _.capitalize(email.split('.')[0]);
        const lastName = _.capitalize(email.split('.')[1].split('@')[0]);

        await authService.setUserInfoAsync(userId, firstName, lastName, email);

        dispatch(setUserId(userId));
        dispatch(setFirstName(firstName));
        dispatch(setLastName(lastName));
        dispatch(setPassword());

        dispatch(setLoading(false));
        onGoMain();
      } catch (err) {
        dispatch(setLoading(false));
        dispatch(setAlert(err));
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
          onBlur={() => loginWithFirebase()}
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
