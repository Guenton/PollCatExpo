import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { ScaledSheet, scale } from 'react-native-size-matters';

import { green, white } from '../../global/colors';
import { useDispatch, useSelector } from 'react-redux';
import pollService from '../../services/poll';
import { setAlert } from '../../store/actions/core';

const styles = ScaledSheet.create({
  container: {
    width: '300@s',
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: '5@s',
  },
  indicator: {
    marginHorizontal: '5@s',
    backgroundColor: white,
    borderColor: green,
    borderWidth: '1.2@s',
    height: '14@s',
    width: '14@s',
    alignSelf: 'center',
    borderRadius: '14@s',
    alignItems: 'center',
    justifyContent: 'center',
    // Shadows
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    zIndex: 5,
  },
});

const PollProgress = () => {
  const dispatch = useDispatch();

  const activeStyle = { borderColor: green, borderWidth: scale(3) };
  const completeStyle = { backgroundColor: green };

  const selectedPollObject = useSelector((state) => state.poll.selectedPollObject);
  const questionNumber = useSelector((state) => state.poll.questionNumber);
  const currentPollQuestionTotal = useSelector((state) => state.poll.currentPollQuestionTotal);

  const [indicatorArray, setIndicatorArray] = useState([]);

  useEffect(() => {
    pollService
      .fetchAmountAnsweredAsync(selectedPollObject.pollId)
      .then((amountAnswered) => {
        const array = [];
        for (let i = 1; i < parseInt(currentPollQuestionTotal); i++) {
          array[i] = {
            completed: amountAnswered >= i ? true : false,
            focused: parseInt(questionNumber) == i ? true : false,
          };
        }
        setIndicatorArray(array);
      })
      .catch((err) => dispatch(setAlert(err)));
  }, [currentPollQuestionTotal, questionNumber]);

  return (
    <View style={styles.container}>
      {indicatorArray.map((item, index) => {
        const style = () => {
          if (item.completed) return { ...styles.indicator, ...completeStyle };
          if (item.focused) return { ...styles.indicator, ...activeStyle };
          return styles.indicator;
        };

        return <View key={index} style={style()} />;
      })}
    </View>
  );
};

export default PollProgress;
