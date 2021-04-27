import React from 'react';
import { Pressable } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import i18n from 'i18n-js';

import SubHeader from '../labels/SubHeader';
import BoldText from '../labels/BoldText';

const styles = ScaledSheet.create({
  container: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
    paddingHorizontal: '10@s',
  },
  spacing: {
    marginRight: '5@s',
  },
});

const ForgotPasswordButton = ({ style, onPress }) => (
  <Pressable style={[styles.container, style]} onPress={() => onPress()}>
    <SubHeader label={i18n.t('forgotPassword')} containerStyle={styles.spacing} />
    <BoldText label={i18n.t('reset')} />
  </Pressable>
);

export default ForgotPasswordButton;
