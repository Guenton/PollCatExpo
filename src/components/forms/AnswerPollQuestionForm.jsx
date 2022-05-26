import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { ScaledSheet } from 'react-native-size-matters';

import PollHeader from '../labels/PollHeader';
import AnswerSelectionDropdown from '../buttons/AnswerSelectionDropdown';

import { setAlert, setLoading } from '../../store/actions/core';
import { setCurrentPollQuestion, setQuestionNumber } from '../../store/actions/poll';

import pollService from '../../services/poll';

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    marginTop: '75@s',
    alignItems: 'center',
  },
  answerContainer: {
    flex: 1,
    marginVertical: '50@s',
    alignItems: 'center',
  },
});

const AnswerPollQuestionForm = () => {
  const dispatch = useDispatch();

  const selectedPollObject = useSelector((state) => state.poll.selectedPollObject);
  const questionNumber = useSelector((state) => state.poll.questionNumber);
  const currentPollQuestion = useSelector((state) => state.poll.currentPollQuestion);
  const currentPollQuestionTotal = useSelector((state) => state.poll.currentPollQuestionTotal);

  const answerArray = currentPollQuestion.responses || [];
  const pollId = selectedPollObject.pollId || null;

  const [selectedAnswer, setSelectedAnswer] = useState(null);

  useEffect(() => {
    pollService
      .fetchPollQuestionAnswer(pollId, questionNumber)
      .then((answer) => setSelectedAnswer(answer))
      .catch((err) => dispatch(setAlert(err)));
  }, [questionNumber]);

  const handleAnswerSelection = (answer) => {
    dispatch(setLoading());
    pollService
      .setPollQuestionAnswer(pollId, questionNumber, answer)
      .then(() => handleNextQuestionSelection(parseInt(questionNumber) + 1))
      .catch((err) => dispatch(setAlert(err)))
      .finally(() => dispatch(setLoading(false)));
  };

  const handleNextQuestionSelection = (number = 1) => {
    if (number > currentPollQuestionTotal) return;
    if (number < 1) return;
    dispatch(setQuestionNumber(number.toString()));
    dispatch(setCurrentPollQuestion(selectedPollObject.questions[number]));
  };

  return (
    <View style={styles.container}>
      <PollHeader label={questionNumber + '.'} />
      <PollHeader label={currentPollQuestion.ask} />

      <View style={styles.answerContainer}>
        <AnswerSelectionDropdown
          answers={answerArray}
          selectedAnswer={selectedAnswer}
          onSelect={(answer) => handleAnswerSelection(answer)}
        />
      </View>
    </View>
  );
};

export default AnswerPollQuestionForm;
