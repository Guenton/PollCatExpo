import React from 'react';
import { View } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';

import { white } from '../../global/colors';

const styles = ScaledSheet.create({
  container: {
    height: '2@s',
    width: '100@s',
    alignSelf: 'center',
    margin: '20@s',
    backgroundColor: white,
  },
});

const CurtainListSeparator = () => <View style={styles.container} />;

export default CurtainListSeparator;
