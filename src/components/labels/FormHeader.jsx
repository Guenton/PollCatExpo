import React from 'react';
import { View } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';

import Header from './Header';
import SubHeader from './SubHeader';

const styles = ScaledSheet.create({
  container: {
    alignSelf: 'center',
    alignItems: 'center',
  },
});

const FormHeader = ({ label, subLabel }) => (
  <View style={styles.container}>
    <Header label={label} isBlack />
    {subLabel && <SubHeader label={subLabel} />}
  </View>
);

export default FormHeader;
