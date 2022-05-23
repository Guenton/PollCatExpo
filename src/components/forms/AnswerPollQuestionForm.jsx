import React from 'react';
import { FlatList, ScrollView, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { ScaledSheet } from 'react-native-size-matters';
import I18n from 'i18n-js';

import AvatarSelect from '../inputs/AvatarSelect';
import LogoutButton from '../buttons/LogoutButton';
import SwitchButton from '../buttons/SwitchButton';

import authService from '../../services/auth';

import { toggleNotifications } from '../../store/actions/user';
import { setLoading, toggleDark } from '../../store/actions/core';
import Header from '../labels/Header';
import CurtainListSeparator from '../containers/CurtainListSeparator';
import PollSelectionButton from '../buttons/PollSelectionButton';
import PollAnswerButton from '../buttons/PollAnswerButton';
import PollHeader from '../labels/PollHeader';
import AnswerSelectionDropdown from '../buttons/AnswerSelectionDropdown';

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    marginTop: '75@s',
    alignItems: 'center',
  },
  answerContainer: {
    height: '275@s',
    marginTop: '10@s',
    marginBottom: '20@s',
    alignItems: 'center',
  },
  answerOptions: {
    justifyContent: 'space-between',
  },
  answerOptionSpacing: {
    marginVertical: '10@s',
  },
});

const AnswerPollQuestionForm = ({ onGoLogin }) => {
  const { t } = I18n;
  const dispatch = useDispatch();

  const questionNumber = useSelector((state) => state.poll.questionNumber);
  const currentPollQuestion = useSelector((state) => state.poll.currentPollQuestion);
  const answerArray = currentPollQuestion.responses || [];

  const handlePollAnswerSelection = (answer) => console.log(answer);

  return (
    <View style={styles.container}>
      <PollHeader label={questionNumber + '.'} />
      <PollHeader label={currentPollQuestion.ask} />

      <View style={styles.answerContainer}>
        <AnswerSelectionDropdown answers={answerArray} />
      </View>
    </View>
  );
};

export default AnswerPollQuestionForm;
