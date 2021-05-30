import React, { createRef, useEffect } from 'react';
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

const EmailInput = ({ containerStyle, isGreen, isFocused, value, onChange, onBlur }) => {
  const ref = createRef();

  useEffect(() => {
    if (isFocused) ref.current.focus();
  }, [isFocused]);

  return (
    <Input
      ref={ref}
      value={value}
      containerStyle={[styles.container, containerStyle]}
      inputContainerStyle={styles.border}
      inputStyle={styles.text}
      placeholder={i18n.t('email')}
      leftIcon={<Icon type="font-awesome-5" name="at" color={isGreen ? green : blue} />}
      onBlur={() => (onBlur ? onBlur() : {})}
      onChangeText={(val) => (onChange ? onChange(val) : {})}
    />
  );
};

export default EmailInput;
