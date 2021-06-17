import React, { createRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import { isEmpty } from 'validator';
import firebase from 'firebase';
import i18n from 'i18n-js';

import FormHeader from '../labels/FormHeader';
import PollTitleInput from '../inputs/PollTitleInput';
import CancelButton from '../buttons/CancelButton';
import EditButton from '../buttons/EditButton';

import { setErrPollTitle, setPollTitle } from '../../store/actions/poll';

const styles = ScaledSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'space-evenly' },
  inputContainer: { width: '290@s' },
  input: { marginBottom: '18@s' },
  buttonContainer: {
    width: '290@s',
    paddingHorizontal: '10@s',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
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

      {!isKeyboardOpen && (
        <View style={styles.buttonContainer}>
          <CancelButton onPress={() => {}} />
          <EditButton onPress={() => {}} />
        </View>
      )}
    </View>
  );
};

export default InitialPollSetupForm;
