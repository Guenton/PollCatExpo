import React from 'react';
import { Text, View } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';

import { white, black } from '../../global/colors';

const styles = ScaledSheet.create({
  container: {
    height: '33@s',
  },
  text: {
    fontSize: '24@s',
    fontWeight: 'bold',
  },
});

const Header = ({ label, isBlack, containerStyle }) => (
  <View style={[styles.container, containerStyle]}>
    <Text style={[styles.text, { color: isBlack ? black : white }]}>{label}</Text>
  </View>
);

export default Header;
