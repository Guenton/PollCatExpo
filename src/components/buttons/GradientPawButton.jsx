import React from 'react';
import { View } from 'react-native';
import { ScaledSheet, scale } from 'react-native-size-matters';
import { useSpring, animated } from 'react-spring';

import { green, blue } from '../../global/colors';
import GradientButton from './GradientButton';
import PawButton from './PawButton';

const AnimatedGradientButton = animated(GradientButton);
const AnimatedPawButton = animated(PawButton);

const styles = ScaledSheet.create({
  container: {
    flexDirection: 'row',
  },
});

const GradientPawButton = ({ style, variant, isLoading, onPress }) => {
  const animateButtonWith = () => {
    if (variant === 'login' && isLoading) return scale(250);
    else if (variant === 'signup') return scale(250);
    else if (variant === 'request-reset') return scale(250);
    else if (variant === 'confirm-reset') return scale(250);
    else return 0;
  };

  const resize = useSpring({
    to: { width: animateButtonWith() },
    from: { width: 0 },
  });

  const colorize = useSpring({
    to: { color: variant === 'login' ? green : blue },
    from: { color: green },
    config: { duration: 750 },
  });

  return (
    <View style={[styles.container, style]}>
      <AnimatedPawButton color={colorize.color} onPress={() => onPress()} />
      <AnimatedGradientButton style={resize} label="Sign Up" onPress={() => onPress()} />
    </View>
  );
};

export default GradientPawButton;
