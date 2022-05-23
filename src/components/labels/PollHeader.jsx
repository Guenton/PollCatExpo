import React from 'react';
import { Text, View } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';

import { white, black } from '../../global/colors';

const styles = ScaledSheet.create({
  container: {
    height: '28@s',
  },
  text: {
    fontSize: '20@s',
    fontWeight: 'bold',
  },
});

const PollHeader = ({ label, isBlack, containerStyle }) => (
  <View style={[styles.container, containerStyle]}>
    <Text style={[styles.text, { color: isBlack ? black : white }]}>{label}</Text>
  </View>
);

export default PollHeader;
