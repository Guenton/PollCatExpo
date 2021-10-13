import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { ScaledSheet, scale } from 'react-native-size-matters';
import { Icon } from 'react-native-elements/dist/icons/Icon';

import { green, blue, white, blueShade, greenShade } from '../../global/colors';
import { useSelector } from 'react-redux';

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

const ProgressIndicator = ({ isGreen }) => {
  const length = 5;
  const activeStyle = { borderColor: greenShade, borderWidth: scale(1.2) };
  const completeStyle = { backgroundColor: green };

  const questionNumber = useSelector((state) => state.poll.questionNumber);

  const [indicatorArray, setIndicatorArray] = useState([]);

  useEffect(() => {
    const array = [];
    for (let i = 0; i < length; i++) {
      array[i] = {
        completed: false,
        focused: questionNumber - 1 === i ? true : false,
      };
    }
    setIndicatorArray(array);
  }, [length]);

  return (
    <View style={styles.container}>
      {indicatorArray.map((item, index) => (
        <View key={index} style={styles.indicator} />
      ))}
    </View>
  );
};

export default ProgressIndicator;
