import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { ScaledSheet, scale } from 'react-native-size-matters';
import { Icon } from 'react-native-elements/dist/icons/Icon';

import { green, blue, white } from '../../global/colors';
import { useSelector } from 'react-redux';

const styles = ScaledSheet.create({
  container: {
    width: '300@s',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  icon: {
    marginHorizontal: '3@s',
  },
});

const ProgressIndicator = ({ isGreen }) => {
  const length = 5;

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
        <Icon
          key={index}
          containerStyle={styles.icon}
          type="font-awesome-5"
          name={item.focused ? 'dot-circle' : 'circle'}
          solid={item.completed}
          size={scale(12)}
          color={isGreen ? green : blue}
        />
      ))}
    </View>
  );
};

export default ProgressIndicator;
