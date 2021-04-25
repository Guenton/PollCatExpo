import React from 'react';
import { Pressable } from 'react-native';
import i18n from 'i18n-js';

import SubHeader from '../labels/SubHeader';
import { ScaledSheet } from 'react-native-size-matters';

const styles = ScaledSheet.create({
  container: {
    alignSelf: 'flex-end',
    paddingHorizontal: '10@s',
  },
});

const ForgotPasswordButton = ({ style, onPress }) => (
  <Pressable style={[styles.container, style]} onPress={() => onPress()}>
    <SubHeader label={i18n.t('forgotPassword')} />
  </Pressable>
);

export default ForgotPasswordButton;
