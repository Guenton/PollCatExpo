import React, { createRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View, ActivityIndicator } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import { isEmpty } from 'validator';
import firebase from 'firebase';
import i18n from 'i18n-js';

import FormHeader from '../labels/FormHeader';
import PollTitleInput from '../inputs/PollTitleInput';
import CancelButton from '../buttons/CancelButton';
import ConfirmButton from '../buttons/ConfirmButton';
import SubHeader from '../labels/SubHeader';
import AlertBox from '../containers/AlertBox';

import { setErrPollTitle, setPollTitle } from '../../store/actions/poll';
import { setAlert, setLoading } from '../../store/actions/core';

import { green } from '../../global/colors';

const styles = ScaledSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'space-evenly' },
  inputContainer: { width: '310@s', marginBottom: '15@s' },
  buttonContainer: {
    width: '290@s',
    paddingHorizontal: '10@s',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

const EditPollDetailForm = ({ onGoBack, onGoEdit }) => {
  const { t } = i18n;
  const dispatch = useDispatch();

  const isKeyboardOpen = useSelector((state) => state.core.isKeyboardOpen);
  const isLoading = useSelector((state) => state.core.isLoading);

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

  const isConfirmDisabled = () => {
    if (errPollTitle) return true;
    else if (!pollTitle) return true;
    else return false;
  };

  const createPollAsync = async () => {
    validateAndSetPollTitle(pollTitle);
    if (errPollTitle) return shakeOnError();

    try {
      const { key } = await firebase
        .database()
        .ref('polls/')
        .push({ title: pollTitle, isOpen: false });

      await firebase.database().ref(`polls/${key}`).update({ pollId: key });

      dispatch(setAlert(t('createdPoll', { title: pollTitle }), 'info'));
      dispatch(setLoading(false));
      onGoEdit();
    } catch (err) {
      dispatch(setLoading(false));
      console.error(err);
      console.log(err.code);
      console.log(err.message);
    }
  };

  return (
    <View style={styles.container}>
      <View>
        <FormHeader label={t('pollSetup')} />
        <SubHeader label={t('enterTitleForPoll')} />
      </View>

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

      <ActivityIndicator animating={isLoading} color={green} />
      <AlertBox />

      {!isKeyboardOpen && (
        <View style={styles.buttonContainer}>
          <CancelButton onPress={() => onGoBack()} />
          <ConfirmButton disabled={isConfirmDisabled()} onPress={() => createPollAsync()} />
        </View>
      )}
    </View>
  );
};

export default EditPollDetailForm;
