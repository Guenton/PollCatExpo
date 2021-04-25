import React from 'react';
import { View } from 'react-native';
import { ScaledSheet, scale } from 'react-native-size-matters';
import i18n from 'i18n-js';

import PollCatSvg from './PollCatSvg';
import Header from '../labels/Header';

const styles = ScaledSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

const PollCatLogo = () => (
  <View style={styles.container}>
    <PollCatSvg height={scale(66)} width={scale(84)} />
    <Header label={i18n.t('logoTitle')} />
  </View>
);

export default PollCatLogo;
