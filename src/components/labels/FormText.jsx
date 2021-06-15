import React from 'react';
import { Text, View } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';

import { grey } from '../../global/colors';

const styles = ScaledSheet.create({
  text: {
    fontSize: '14@s',
    color: grey,
  },
});

const FormText = ({ label, containerStyle }) => (
  <View style={[containerStyle]}>
    <Text style={styles.text}>{label}</Text>
  </View>
);

export default FormText;
