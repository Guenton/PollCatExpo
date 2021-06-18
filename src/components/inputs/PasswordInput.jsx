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
  error: {
    marginTop: 0,
    marginLeft: '10@s',
  },
  text: {
    fontSize: '14@s',
    marginLeft: '5@s',
  },
});

const PasswordInput = ({
  inputRef,
  containerStyle,
  isGreen,
  isConfirm,
  isNew,
  value,
  errorMessage,
  onFocus,
  onBlur,
  onChange,
}) => {
  const variant = () => {
    if (isConfirm) return 'confirmPassword';
    else if (isNew) return 'newPassword';
    else return 'password';
  };

  return (
    <Input
      ref={inputRef}
      value={value}
      errorMessage={errorMessage}
      containerStyle={[styles.container, containerStyle]}
      inputContainerStyle={styles.border}
      errorStyle={styles.error}
      inputStyle={styles.text}
      autoCapitalize="none"
      autoCompleteType="password"
      textContentType={isNew ? 'newPassword' : 'password'}
      secureTextEntry
      placeholder={i18n.t(variant())}
      leftIcon={<Icon type="font-awesome-5" name="key" color={isGreen ? green : blue} />}
      onFocus={() => (onFocus ? onFocus() : {})}
      onBlur={() => (onBlur ? onBlur() : {})}
      onChangeText={(val) => (onChange ? onChange(val) : {})}
    />
  );
};

export default PasswordInput;
