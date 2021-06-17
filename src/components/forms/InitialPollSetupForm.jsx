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

import { setLoading } from '../../store/actions/core';
import { setEmail, setPassword, setErrEmail, setErrPassword } from '../../store/actions/auth';
import { setFirstName, setLastName } from '../../store/actions/user';
import PollTitleInput from '../inputs/PollTitleInput';
import { setErrPollTitle, setPollTitle } from '../../store/actions/poll';

const styles = ScaledSheet.create({
  container: { flex: 1, justifyContent: 'space-evenly' },
  inputContainer: { width: '290@s', alignSelf: 'center' },
  input: { marginBottom: '18@s' },
  paw: { alignSelf: 'center' },
});

const InitialPollSetupForm = ({ onGoSignup, onGoReset, onGoMain }) => {
  const { t } = i18n;
  const dispatch = useDispatch();

  const isKeyboardOpen = useSelector((state) => state.core.isKeyboardOpen);

  const pollTitleRef = createRef();
  const pollTitle = useSelector((state) => state.poll.pollTitle);
  const errPollTitle = useSelector((state) => state.auth.errPollTitle);

  const shakeOnError = () => {
    if (errPollTitle) pollTitleRef.current.shake();
  };

  const validateAndSetPollTitle = (val) => {
    if (isEmpty(val)) dispatch(setErrPollTitle(t('errNotFilled')));
    else if (val.length < 3) dispatch(setErrPollTitle(t('errNotLongTitle')));
    else dispatch(setErrPollTitle());

    dispatch(setPollTitle(val));
  };

  return (
    <View style={styles.container}>
      <FormHeader label={t('initialSetup')} />

      <View style={styles.inputContainer}>
        <PollTitleInput
          inputRef={pollTitleRef}
          containerStyle={styles.input}
          value={pollTitle}
          errorMessage={errPollTitle}
          onBlur={() => shakeOnError()}
          onChange={(val) => validateAndSetPollTitle(val)}
        />
      </View>

      {!isKeyboardOpen && <></>}
    </View>
  );
};

export default InitialPollSetupForm;
