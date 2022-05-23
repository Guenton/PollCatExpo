import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FlatList, View } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import i18n from 'i18n-js';

import Header from '../labels/Header';
import PollSelectionButton from '../buttons/PollSelectionButton';
import CurtainListSeparator from '../containers/CurtainListSeparator';

import { setAlert, setRoute } from '../../store/actions/core';
import {
  setCurrentPollQuestion,
  setCurrentPollQuestionTotal,
  setOpenPollsOArray,
  setPollTitle,
  setQuestionNumber,
  setSelectedPollObject,
} from '../../store/actions/poll';

import pollService from '../../services/poll';

const styles = ScaledSheet.create({
  container: {
    height: '275@s',
    justifyContent: 'center',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: '20@s',
  },
  centerContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '15@s',
  },
});

const SelectPollCardList = () => {
  const { t } = i18n;
  const dispatch = useDispatch();

  const openPollsArray = useSelector((state) => state.poll.openPollsArray);

  useEffect(() => {
    pollService
      .fetchAllOpenAsync()
      .then((polls) => dispatch(setOpenPollsOArray(polls)))
      .catch((err) => dispatch(setAlert(err)));
  }, []);

  const handlePollSelection = (pollObject) => {
    dispatch(setSelectedPollObject(pollObject));
    dispatch(setPollTitle(pollObject.title));
    dispatch(setCurrentPollQuestionTotal(pollObject.questions.length));
    dispatch(setQuestionNumber('1'));
    dispatch(setCurrentPollQuestion(pollObject.questions[1]));
    dispatch(setRoute('main-poll'));
  };

  const renderItem = ({ item }) => (
    <PollSelectionButton label={item.title} onPress={() => handlePollSelection(item)} />
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={openPollsArray}
        renderItem={renderItem}
        keyExtractor={(item) => item.pollId}
        ListHeaderComponent={<Header label={t('currentlyOpenPolls')} />}
        ListHeaderComponentStyle={styles.centerContent}
        ListEmptyComponent={<Header label={t('noPollHeader')} />}
        ItemSeparatorComponent={<CurtainListSeparator />}
      />
    </View>
  );
};

export default SelectPollCardList;
