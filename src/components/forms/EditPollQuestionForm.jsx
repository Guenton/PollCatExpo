import React, { createRef, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View } from 'react-native';
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
import ProgressIndicator from '../containers/ProgressIndicator';
import AlertBox from '../containers/AlertBox';

import pollService from '../../services/poll';

import { setAlert, setLoading } from '../../store/actions/core';
import {
  incrementQuestionNumber,
  setCurrentPollQuestion,
  setCurrentPollQuestionAsk,
  setCurrentPollQuestionResponses,
  setCurrentPollQuestionTotal,
  setSelectablePollUsers,
} from '../../store/actions/poll';

const styles = ScaledSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'space-evenly' },
  inputContainer: { width: '310@s' },
  buttonContainer: {
    width: '290@s',
    paddingHorizontal: '10@s',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

const questionFormat = {
  number: '',
  ask: '',
  responseOption: '',
  responses: [],
  answer: '',
};

const EditPollQuestionForm = ({ onGoBack, onGoEdit }) => {
  const { t } = i18n;
  const dispatch = useDispatch();
  const questionRef = createRef();
  const choiceRef = createRef();

  const isKeyboardOpen = useSelector((state) => state.core.isKeyboardOpen);

  const currentPollId = useSelector((state) => state.poll.selectedPollObject.pollId);
  const questionNumber = useSelector((state) => state.poll.questionNumber);
  const currentPollQuestion = useSelector((state) => state.poll.currentPollQuestion);
  const currentPollQuestionTotal = useSelector((state) => state.poll.currentPollQuestionTotal);
  const defaultResponseOption = useSelector((state) => state.poll.defaultResponseOption);
  const responseOptions = useSelector((state) => state.poll.responseOptions);
  const selectablePollUsers = useSelector((state) => state.poll.selectablePollUsers);

  const [showAddChoice, setShowAddChoice] = useState(false);
  const [showResponseOptions, setShowResponseOptions] = useState(false);
  const [responseOption, setResponseOption] = useState('');
  const [selectedChoice, setSelectedChoice] = useState('');

  const [questionErr, setQuestionErr] = useState('');
  const [choiceErr, setChoiceErr] = useState('');

  useEffect(() => {
    pollService
      .fetchQuestionAsync(currentPollId, questionNumber)
      .then((questionObject) => {
        if (questionObject) dispatch(setCurrentPollQuestion(questionObject));
        else dispatch(setCurrentPollQuestion({ ...questionFormat, number: questionNumber }));
      })
      .catch((err) => dispatch(setAlert(err)));
  }, [currentPollId, questionNumber]);

  useEffect(() => {
    pollService
      .fetchTotalQuestionAmountAsync(currentPollId)
      .then((total) => dispatch(setCurrentPollQuestionTotal(total)))
      .catch((err) => dispatch(setAlert(err)));
  }, [currentPollId, currentPollQuestionTotal]);

  useEffect(() => {
    pollService
      .fetchSelectableUsersAsync()
      .then((users) => dispatch(setSelectablePollUsers(users)))
      .catch((err) => dispatch(setAlert(err)));
  }, []);

  useEffect(() => {
    if (!showAddChoice) return;
    else choiceRef.current.focus();
  }, [showAddChoice]);

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
    if (isEmpty(val)) setQuestionErr(t('errNotFilled'));
    else if (val.length < 3) setQuestionErr(t('errNotLongTitle'));
    else setQuestionErr(null);

    dispatch(setCurrentPollQuestionAsk(val));
  };

  const validateAndSetSelectedChoice = (val) => {
    if (isEmpty(val)) setChoiceErr(t('errNotFilled'));
    else if (val.length < 3) setChoiceErr(t('errNotLongTitle'));
    else setChoiceErr(null);

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

  const shakeInputOnError = () => {
    if (questionErr) questionRef.current.shake();
    if (choiceErr) choiceRef.current.shake();
  };

  const updatePollAsync = async (followUp = '') => {
    dispatch(setLoading());
    validateAndSetAsk(currentPollQuestion.ask);
    if (questionErr) return shakeInputOnError();

    firebase
      .database()
      .ref(`polls/${currentPollId}/questions/${questionNumber}`)
      .set({
        number: currentPollQuestion.number,
        ask: currentPollQuestion.ask,
        responseOption: currentPollQuestion.responseOption,
        responses: currentPollQuestion.responses,
        answer: currentPollQuestion.answer,
      })
      .then(() => {
        dispatch(setLoading(false));

        if (followUp === 'add') dispatch(incrementQuestionNumber());
        if (followUp === 'done') {
          dispatch(setCurrentPollQuestion());
          onGoBack();
        }
      })
      .catch((err) => {
        dispatch(setLoading(false));
        dispatch(setAlert(err, 'error'));
      });
  };

  return (
    <View style={styles.container}>
      <FormHeader label={t('questionNumber', { number: questionNumber })} />

      <View style={styles.inputContainer}>
        <PollQuestionInput
          inputRef={questionRef}
          containerStyle={styles.input}
          value={currentPollQuestion.ask}
          errorMessage={questionErr}
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
              inputRef={choiceRef}
              containerStyle={styles.input}
              onChange={(val) => validateAndSetSelectedChoice(val)}
              onBlur={() => addSelectedChoiceToResponses()}
            />
          </View>
          {!isKeyboardOpen && (
            <View style={styles.buttonContainer}>
              <CancelButton onPress={() => setShowAddChoice(false)} />
              <ConfirmButton
                disabled={!!choiceErr}
                onPress={() => addSelectedChoiceToResponses()}
              />
            </View>
          )}
        </View>
      )}

      <ProgressIndicator onPress={(val) => console.log(val)} />

      <AlertBox />

      {!isKeyboardOpen && (
        <View style={styles.buttonContainer}>
          <DeleteFab onPress={() => console.log('delete')} />
          <ConfirmFab onPress={() => updatePollAsync('done')} />
          <AddFab onPress={() => updatePollAsync('add')} />
        </View>
      )}
    </View>
  );
};

export default EditPollQuestionForm;
