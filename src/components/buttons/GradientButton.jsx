import React from 'react';
import { Button } from 'react-native-elements';
import { ScaledSheet } from 'react-native-size-matters';
import { LinearGradient } from 'expo-linear-gradient';

const styles = ScaledSheet.create({
  container: {
    alignSelf: 'center',
    borderRadius: '21@s',
    height: '42@s',
    marginLeft: '-50@s',
    backgroundColor: 'red',
    // Shadows
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,
    elevation: 9,
    zIndex: 9,
  },
  button: {
    height: '42@s',
    borderRadius: '21@s',
  },
});

const GradientButton = ({ style, color, gradient, label, disabled, loading, onPress }) => (
  <Button
    ViewComponent={LinearGradient}
    containerStyle={[styles.container, style]}
    buttonStyle={[styles.button]}
    title={label}
    linearGradientProps={{
      colors: [color, gradient],
      start: { x: 0, y: 0.5 },
      end: { x: 1, y: 0.5 },
    }}
    disabled={disabled}
    loading={loading}
    onPress={() => onPress()}
    raised
  />
);

export default GradientButton;
