import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View, ActivityIndicator } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import { isEmpty } from 'validator';
import firebase from 'firebase';
import i18n from 'i18n-js';

import FormHeader from '../labels/FormHeader';
import PollQuestionInput from '../inputs/PollQuestionInput';
import FormOptionSelector from '../labels/FormOptionSelector';
import ResponseOptionSelectionDropdown from '../buttons/ResponseOptionSelectionDropdown';
import MultipleChoiceCreatorDropdown from '../buttons/MultipleChoiceCreatorDropdown';
import AddFab from '../buttons/AddFab';
import PollOptionInput from '../inputs/PollOptionInput';
import ConfirmFab from '../buttons/ConfirmFab';
import DeleteFab from '../buttons/DeleteFab';
import CancelButton from '../buttons/CancelButton';
import ConfirmButton from '../buttons/ConfirmButton';
import AlertBox from '../containers/AlertBox';

import { setAlert, setLoading } from '../../store/actions/core';
import {
  setCurrentPollQuestionAsk,
  setCurrentPollQuestionResponses,
  setSelectablePollUsers,
} from '../../store/actions/poll';

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

const EditPollQuestionForm = ({ onGoBack, onGoEdit }) => {
  const { t } = i18n;
  const dispatch = useDispatch();

  const isKeyboardOpen = useSelector((state) => state.core.isKeyboardOpen);
  const isLoading = useSelector((state) => state.core.isLoading);

  const pollTitle = useSelector((state) => state.poll.pollTitle);

  const selectedPollObject = useSelector((state) => state.poll.selectedPollObject);
  const currentPollQuestion = useSelector((state) => state.poll.currentPollQuestion);
  const defaultResponseOption = useSelector((state) => state.poll.defaultResponseOption);
  const responseOptions = useSelector((state) => state.poll.responseOptions);
  const selectablePollUsers = useSelector((state) => state.poll.selectablePollUsers);

  const [showAddChoice, setShowAddChoice] = useState(false);
  const [showResponseOptions, setShowResponseOptions] = useState(false);
  const [responseOption, setResponseOption] = useState('');

  const [selectedChoice, setSelectedChoice] = useState('');
  const [inputErr, setInputErr] = useState('');

  useEffect(() => {
    firebase
      .database()
      .ref('users')
      .get()
      .then((snapshot) => {
        const array = [];
        for (const key in snapshot.val()) {
          array.push(`${snapshot.val()[key].firstName} ${snapshot.val()[key].lastName}`);
        }
        dispatch(setSelectablePollUsers(array));
      })
      .catch((err) => console.error(err));
  });

  const setResponseOptionAndHideSelector = (val) => {
    setResponseOption(val);
    setShowResponseOptions(false);
  };

  const responseDropdownType = () => {
    switch (responseOption) {
      case '':
        if (defaultResponseOption === 'Select From Users') return 'users';
        else if (defaultResponseOption === 'Multiple Choice') return 'multi';
        else return null;
      case 'Select From Users':
        return 'users';
      case 'Multiple Choice':
        return 'multi';
      default:
        return null;
    }
  };

  const validateAndSetAsk = (val) => {
    if (isEmpty(val)) setInputErr('errNotFilled');
    else if (val.length < 3) setInputErr('errNotLongTitle');
    else setInputErr(null);

    dispatch(setCurrentPollQuestionAsk(val));
  };

  const validateAndSetSelectedChoice = (val) => {
    if (isEmpty(val)) setInputErr('errNotFilled');
    else if (val.length < 3) setInputErr('errNotLongTitle');
    else setInputErr(null);

    setSelectedChoice(val);
  };

  const addSelectedChoiceToResponses = () => {
    const array = currentPollQuestion.responses;
    const found = array.find((item) => item === selectedChoice);

    if (!found) {
      array.push(selectedChoice);
      dispatch(setCurrentPollQuestionResponses(array));
    }
    setShowAddChoice(false);
  };

  const removeSelectedChoiceFromResponses = () => {
    const array = currentPollQuestion.responses;
    const cleanedArray = array.filter((item) => item !== selectedChoice);
    dispatch(setCurrentPollQuestionResponses(cleanedArray));
    setSelectedChoice('');
  };

  const updatePollAsync = async () => {
    dispatch(setLoading());
    validateAndSetAsk(pollTitle);
    if (inputErr) return shakeOnError();

    firebase
      .database()
      .ref(`polls/${selectedPollObject.pollId}`)
      .update({ title: pollTitle })
      .then(() => {
        dispatch(setAlert(t('updatedPoll', { title: pollTitle }), 'info'));
        dispatch(setLoading(false));
        onGoEdit();
      })
      .catch((err) => {
        dispatch(setLoading(false));
        console.error(err);
        console.log(err.code);
        console.log(err.message);
      });
  };

  return (
    <View style={styles.container}>
      <FormHeader label={t('questionNumber', { number: currentPollQuestion.number })} />

      <View style={styles.inputContainer}>
        <PollQuestionInput
          containerStyle={styles.input}
          value={currentPollQuestion.ask}
          onChange={(val) => validateAndSetAsk(val)}
        />
      </View>

      {!showAddChoice && (
        <View>
          <FormOptionSelector
            label={t('responseOptions') + ':'}
            boldLabel={responseOption || defaultResponseOption}
            onPress={() => setShowResponseOptions(true)}
          />
          {showResponseOptions && (
            <ResponseOptionSelectionDropdown
              options={responseOptions}
              selectedOption={defaultResponseOption}
              onSelect={(val) => setResponseOptionAndHideSelector(val)}
            />
          )}
          {!showResponseOptions && responseDropdownType() === 'users' && (
            <ResponseOptionSelectionDropdown options={selectablePollUsers} onSelect={() => {}} />
          )}
          {!showResponseOptions && responseDropdownType() === 'multi' && (
            <MultipleChoiceCreatorDropdown
              options={currentPollQuestion.responses}
              selectedOption={selectedChoice}
              onSelect={(val) => validateAndSetSelectedChoice(val)}
              onAdd={() => setShowAddChoice(true)}
              onDelete={() => removeSelectedChoiceFromResponses()}
            />
          )}
        </View>
      )}

      {showAddChoice && (
        <View>
          <View style={styles.inputContainer}>
            <PollOptionInput
              containerStyle={styles.input}
              onChange={(val) => validateAndSetSelectedChoice(val)}
              onBlur={() => addSelectedChoiceToResponses()}
            />
          </View>
          {!isKeyboardOpen && (
            <View style={styles.buttonContainer}>
              <CancelButton onPress={() => setShowAddChoice(false)} />
              <ConfirmButton disabled={!!inputErr} onPress={() => addSelectedChoiceToResponses()} />
            </View>
          )}
        </View>
      )}

      <ActivityIndicator animating={isLoading} color={green} />
      <AlertBox />

      {!isKeyboardOpen && (
        <View style={styles.buttonContainer}>
          <DeleteFab onPress={() => console.log('delete')} />
          <ConfirmFab onPress={() => onGoBack()} />
          <AddFab onPress={() => console.log('add')} />
        </View>
      )}
    </View>
  );
};

export default EditPollQuestionForm;
