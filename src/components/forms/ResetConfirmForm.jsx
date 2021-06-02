import React, { createRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import { isEmpty, isStrongPassword } from 'validator';
import firebase from 'firebase';
import i18n from 'i18n-js';

import FormHeader from '../labels/FormHeader';
import PasswordInput from '../inputs/PasswordInput';
import GradientPawButton from '../buttons/GradientPawButton';
import FormFooter from '../labels/FormFooter';
import ResetCodeInput from '../inputs/ResetCodeInput';

import {
  setResetCode,
  setPassword,
  setErrResetCode,
  setErrPassword,
} from '../../store/actions/auth';

const styles = ScaledSheet.create({
  container: { flex: 1, justifyContent: 'space-evenly' },
  inputContainer: { width: '290@s', alignSelf: 'center' },
  input: { marginBottom: '18@s' },
  paw: { alignSelf: 'center' },
});

const ResetConfirmFrom = ({ onGoReset, onGoLogin }) => {
  const { t } = i18n;
  const dispatch = useDispatch();

  const isKeyboardOpen = useSelector((state) => state.core.isKeyboardOpen);

  const resetCodeRef = createRef();
  const passwordRef = createRef();

  const resetCode = useSelector((state) => state.auth.resetCode);
  const password = useSelector((state) => state.auth.password);

  const errResetCode = useSelector((state) => state.auth.errResetCode);
  const errPassword = useSelector((state) => state.auth.errPassword);

  const shakeOnError = () => {
    if (errResetCode) resetCodeRef.current.shake();
    if (errPassword) passwordRef.current.shake();
  };

  const validateAndSetResetCode = (val) => {
    if (isEmpty(val)) dispatch(setErrResetCode(t('errNotFilled')));
    else dispatch(setErrResetCode());

    dispatch(setResetCode(val));
  };

  const validateAndSetPassword = (val) => {
    if (isEmpty(val)) dispatch(setErrPassword(t('errNotFilled')));
    else if (val.length < 8) dispatch(setErrPassword(t('errNotLongPassword')));
    else if (!isStrongPassword(val)) dispatch(setErrPassword(t('errNotStrongPassword')));
    else dispatch(setErrPassword());

    dispatch(setPassword(val));
  };

  const confirmResetWithFirebase = () => {
    validateAndSetResetCode(resetCode);
    validateAndSetPassword(password);

    if (errResetCode || errPassword) return shakeOnError();
    if (resetCode && password) {
      try {
        await firebase.auth().confirmPasswordReset(resetCode, password);

        onGoLogin();
      } catch (err) {
        console.error(err);
        console.log(err.code);
        console.log(err.message);
      }
    }
  };

  return (
    <View style={styles.container}>
      <FormHeader label={t('resetConfirmFormHeader')} subLabel={t('resetConfirmFormSubHeader')} />

      <View style={styles.inputContainer}>
        <ResetCodeInput
          inputRef={resetCodeRef}
          containerStyle={styles.input}
          value={resetCode}
          errorMessage={errResetCode}
          onBlur={() => shakeOnError()}
          onChange={(val) => validateAndSetResetCode(val)}
        />
        <PasswordInput
          isNew
          inputRef={passwordRef}
          value={password}
          errorMessage={errPassword}
          onBlur={() => shakeOnError()}
          onChange={(val) => validateAndSetPassword(val)}
        />
      </View>

      {!isKeyboardOpen && (
        <>
          <GradientPawButton
            style={styles.paw}
            variant="reset-confirm"
            onPress={() => confirmResetWithFirebase()}
          />

          <FormFooter
            label={t('noCodeReceived')}
            boldLabel={t('requestAgain')}
            onPress={() => onGoReset()}
          />
        </>
      )}
    </View>
  );
};

export default ResetConfirmFrom;
