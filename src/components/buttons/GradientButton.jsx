import React from 'react';
import { Button } from 'react-native-elements';
import { ScaledSheet } from 'react-native-size-matters';

const styles = ScaledSheet.create({
  container: {
    alignSelf: 'center',
    borderRadius: '25@s',
    height: '42@s',
    marginLeft: '-50@s',
    zIndex: 4,
    elevation: 4,
  },
  button: {
    height: '42@s',
    borderRadius: '25@s',
  },
});

const GradientButton = ({ style, label, disabled, loading, onPress }) => (
  <Button
    containerStyle={[styles.container, style]}
    buttonStyle={[styles.button]}
    title={label}
    disabled={disabled}
    loading={loading}
    onPress={() => onPress()}
    raised
  />
);

export default GradientButton;
