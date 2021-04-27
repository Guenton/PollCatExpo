import React from 'react';
import { Icon, Input } from 'react-native-elements';
import { ScaledSheet } from 'react-native-size-matters';
import i18n from 'i18n-js';

import { green, blue, grey } from '../../global/colors';

const styles = ScaledSheet.create({
  container: {
    height: '50@s',
  },
  border: {
    borderColor: grey,
    borderWidth: '1@s',
    borderRadius: '10@s',
    paddingHorizontal: '10@s',
  },
  text: {
    fontSize: '12@s',
  },
});

const PasswordInput = ({ containerStyle, isGreen, isConfirm }) => {
  const variant = () => {
    if (isConfirm) return 'confirmPassword';
    else return 'password';
  };

  return (
    <Input
      containerStyle={[styles.container, containerStyle]}
      inputContainerStyle={styles.border}
      inputStyle={styles.text}
      placeholder={i18n.t(variant())}
      leftIcon={<Icon type="font-awesome-5" name="key" color={isGreen ? green : blue} />}
    />
  );
};

export default PasswordInput;
