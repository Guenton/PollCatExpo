import React, { useEffect, useState } from 'react';
import { Pressable, View } from 'react-native';
import { ScaledSheet, scale } from 'react-native-size-matters';
import { Icon } from 'react-native-elements/dist/icons/Icon';

import { green, blue, white, blueShade, greenShade } from '../../global/colors';
import { useDispatch, useSelector } from 'react-redux';
import { setQuestionNumber } from '../../store/actions/poll';

const styles = ScaledSheet.create({
  container: {
    width: '300@s',
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: '5@s',
  },
  indicator: {
    marginHorizontal: '5@s',
    backgroundColor: white,
    borderColor: green,
    borderWidth: '1.2@s',
    height: '13@s',
    width: '13@s',
    alignSelf: 'center',
    borderRadius: '13@s',
    alignItems: 'center',
    justifyContent: 'center',
    // Shadows
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,
    elevation: 11,
    zIndex: 11,
  },
});

const ProgressIndicator = ({ onPress }) => {
  const dispatch = useDispatch();

  const activeStyle = { borderColor: green, borderWidth: scale(3) };
  const completeStyle = { backgroundColor: green };

  const questionNumber = useSelector((state) => state.poll.questionNumber);
  const currentPollQuestionTotal = useSelector((state) => state.poll.currentPollQuestionTotal);

  const [indicatorArray, setIndicatorArray] = useState([]);

  useEffect(() => {
    const array = [];
    for (let i = 0; i < parseInt(currentPollQuestionTotal); i++) {
      array[i] = {
        completed: false,
        focused: parseInt(questionNumber) - 1 === i ? true : false,
      };
    }
    setIndicatorArray(array);
  }, [currentPollQuestionTotal]);

  return (
    <View style={styles.container}>
      {indicatorArray.map((item, index) => (
        <Pressable
          key={index}
          style={item.focused ? { ...styles.indicator, ...activeStyle } : styles.indicator}
          onPress={() => onPress(index + 1)}
        />
      ))}
    </View>
  );
};

export default ProgressIndicator;
