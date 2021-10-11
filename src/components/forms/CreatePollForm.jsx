import React, { createRef, useEffect } from 'react';
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

import {
  setDefaultResponseOption,
  setErrPollTitle,
  setPollTitle,
  setResponseOptions,
} from '../../store/actions/poll';
import { setAlert, setLoading } from '../../store/actions/core';

import { green } from '../../global/colors';
import FormOptionSelector from '../labels/FormOptionSelector';
import ResponseOptionSelectionDropdown from '../buttons/ResponseOptionSelectionDropdown';
import delay from 'delay';

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

const CreatePollForm = ({ onGoAdmin, onGoEdit }) => {
  const { t } = i18n;
  const dispatch = useDispatch();

  const isKeyboardOpen = useSelector((state) => state.core.isKeyboardOpen);
  const isLoading = useSelector((state) => state.core.isLoading);

  const pollTitleRef = createRef();
  const pollTitle = useSelector((state) => state.poll.pollTitle);
  const errPollTitle = useSelector((state) => state.auth.errPollTitle);
  const responseOptions = useSelector((state) => state.poll.responseOptions);
  const defaultResponseOption = useSelector((state) => state.poll.defaultResponseOption);

  useEffect(() => {
    firebase
      .database()
      .ref('response-options')
      .get()
      .then((snapshot) => {
        const array = [];
        for (const key in snapshot.val()) {
          array.push(`${snapshot.val()[key].label}`);
        }
        dispatch(setResponseOptions(array));
      })
      .catch((err) => console.error(err));
  }, []);

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
        .push({ title: pollTitle, defaultResponseOption, isOpen: false });

      await firebase.database().ref(`polls/${key}`).update({ pollId: key });

      dispatch(setAlert(t('createdPoll', { title: pollTitle }), 'info'));
      dispatch(setLoading(false));
      onGoEdit();

      await delay(5000);
      dispatch(setAlert());
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

      <View>
        <FormOptionSelector
          label={t('defaultResponseOption')}
          boldLabel={defaultResponseOption || t('noSelectedOption')}
          onPress={() => {}}
        />
        <ResponseOptionSelectionDropdown
          options={responseOptions}
          selectedOption={defaultResponseOption}
          onSelect={(val) => dispatch(setDefaultResponseOption(val))}
        />
      </View>

      <ActivityIndicator animating={isLoading} color={green} />
      <AlertBox />

      {!isKeyboardOpen && (
        <View style={styles.buttonContainer}>
          <CancelButton onPress={() => onGoAdmin()} />
          <ConfirmButton disabled={isConfirmDisabled()} onPress={() => createPollAsync()} />
        </View>
      )}
    </View>
  );
};

export default CreatePollForm;
