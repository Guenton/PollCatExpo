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

const ResetCodeInput = ({ containerStyle, isGreen, isFocused, isCleared, onChange, onBlur }) => {
  const ref = createRef();

  useEffect(() => {
    if (isFocused) ref.current.focus();
  }, [isFocused]);

  useEffect(() => {
    if (isCleared) ref.current.clear();
  }, [isCleared]);

  return (
    <Input
      ref={ref}
      containerStyle={[styles.container, containerStyle]}
      inputContainerStyle={styles.border}
      inputStyle={styles.text}
      placeholder={i18n.t('resetCode')}
      leftIcon={<Icon type="font-awesome-5" name="unlock-alt" color={isGreen ? green : blue} />}
      onBlur={() => (onBlur ? onBlur() : {})}
      onChangeText={(val) => (onChange ? onChange(val) : {})}
    />
  );
};

export default ResetCodeInput;
