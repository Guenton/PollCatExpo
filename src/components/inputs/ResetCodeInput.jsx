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

const ResetCodeInput = ({
  inputRef,
  containerStyle,
  isGreen,
  value,
  errorMessage,
  onFocus,
  onBlur,
  onChange,
}) => (
  <Input
    ref={inputRef}
    value={value}
    errorMessage={errorMessage}
    containerStyle={[styles.container, containerStyle]}
    inputContainerStyle={styles.border}
    errorStyle={styles.error}
    inputStyle={styles.text}
    autoCapitalize="none"
    placeholder={i18n.t('resetCode')}
    leftIcon={<Icon type="font-awesome-5" name="unlock-alt" color={isGreen ? green : blue} />}
    onFocus={() => (onFocus ? onFocus() : {})}
    onBlur={() => (onBlur ? onBlur() : {})}
    onChangeText={(val) => (onChange ? onChange(val) : {})}
  />
);

export default ResetCodeInput;
