import React from 'react';
import { Icon, Input } from 'react-native-elements';
import { ScaledSheet } from 'react-native-size-matters';
import i18n from 'i18n-js';

import { green, blue, grey } from '../../global/colors';

const styles = ScaledSheet.create({
  container: {
    width: '290@s',
    height: '50@s',
    alignSelf: 'center',
  },
  border: {
    borderColor: grey,
    borderWidth: '1@s',
    borderRadius: '10@s',
    paddingHorizontal: '10@s',
  },
});

const PasswordInput = ({ containerStyle, isGreen }) => (
  <Input
    containerStyle={[styles.container, containerStyle]}
    inputContainerStyle={styles.border}
    placeholder={i18n.t('password')}
    leftIcon={<Icon type="font-awesome-5" name="key" color={isGreen ? green : blue} />}
  />
);

export default PasswordInput;
