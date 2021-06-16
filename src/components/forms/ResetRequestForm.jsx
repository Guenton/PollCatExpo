import React, { createRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import { isEmpty, isEmail } from 'validator';
import firebase from 'firebase';
import i18n from 'i18n-js';

import FormHeader from '../labels/FormHeader';
import EmailInput from '../inputs/EmailInput';
import GradientPawButton from '../buttons/GradientPawButton';
import FormFooter from '../labels/FormFooter';

import { setLoading } from '../../store/actions/core';
import { setEmail, setErrEmail } from '../../store/actions/auth';

const styles = ScaledSheet.create({
  container: { flex: 1, justifyContent: 'space-evenly' },
  inputContainer: { width: '290@s', alignSelf: 'center' },
  paw: { alignSelf: 'center' },
});

const ResetRequestFrom = ({ onGoLogin }) => {
  const { t } = i18n;
  const dispatch = useDispatch();

  const isKeyboardOpen = useSelector((state) => state.core.isKeyboardOpen);

  const emailRef = createRef();

  const email = useSelector((state) => state.auth.email);
  const errEmail = useSelector((state) => state.auth.errEmail);

  const shakeOnError = () => {
    if (errEmail) emailRef.current.shake();
  };

  const validateAndSetEmail = (val) => {
    if (isEmpty(val)) dispatch(setErrEmail(t('errNotFilled')));
    else if (!isEmail(val)) dispatch(setErrEmail(t('errNotEmail')));
    else if (!val.endsWith('ibis-management.com')) dispatch(setErrEmail(t('errNotIbisEmail')));
    else dispatch(setErrEmail());

    dispatch(setEmail(val));
  };

  const requestResetWithFirebase = async () => {
    validateAndSetEmail(email);

    if (errEmail) return shakeOnError();
    if (email) {
      try {
        dispatch(setLoading());
        await firebase.auth().sendPasswordResetEmail(email);

        dispatch(setLoading(false));
        onGoLogin();
      } catch (err) {
        dispatch(setLoading(false));
        console.error(err);
        console.log(err.code);
        console.log(err.message);
      }
    }
  };

  return (
    <View style={styles.container}>
      <FormHeader label={t('resetRequestFormHeader')} subLabel={t('resetRequestFormSubHeader')} />

      <View style={styles.inputContainer}>
        <EmailInput
          inputRef={emailRef}
          value={email}
          errorMessage={errEmail}
          onBlur={() => requestResetWithFirebase()}
          onChange={(val) => validateAndSetEmail(val)}
        />
      </View>

      {!isKeyboardOpen && (
        <>
          <GradientPawButton
            style={styles.paw}
            variant="reset-request"
            onPress={() => requestResetWithFirebase()}
          />

          <FormFooter
            label={t('rememberYourPassword')}
            boldLabel={t('login')}
            onPress={() => onGoLogin()}
          />
        </>
      )}
    </View>
  );
};

export default ResetRequestFrom;
