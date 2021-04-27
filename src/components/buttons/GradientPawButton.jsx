import React from 'react';
import { connect } from 'react-redux';
import { View } from 'react-native';
import { ScaledSheet, scale } from 'react-native-size-matters';
import { useSpring, animated } from 'react-spring';

import GradientButton from './GradientButton';
import PawButton from './PawButton';

import {
  setGradientPawButtonWidth,
  setGradientPawButtonFabColor,
} from '../../store/actions/animation';

import { green, blue } from '../../global/colors';

const AnimatedGradientButton = animated(GradientButton);
const AnimatedPawButton = animated(PawButton);

const styles = ScaledSheet.create({
  container: {
    flexDirection: 'row',
  },
});

const GradientPawButton = ({
  style,
  variant,
  isLoading,
  onPress,
  gradientPawButtonState,
  setGradientPawButtonWidth,
  setGradientPawButtonFabColor,
}) => {
  const animateButtonWidth = () => {
    if (variant === 'login' && isLoading) return scale(250);
    else if (variant === 'signup') return scale(250);
    else if (variant === 'request-reset') return scale(250);
    else if (variant === 'confirm-reset') return scale(250);
    else return 0;
  };

  const resize = useSpring({
    to: { width: animateButtonWidth() },
    from: { width: gradientPawButtonState.width },
    onRest: () => setGradientPawButtonWidth(animateButtonWidth()),
  });

  const colorizeFab = useSpring({
    to: { color: variant === 'login' ? green : blue },
    from: { color: gradientPawButtonState.fabColor },
    config: { duration: 750 },
    onRest: () => setGradientPawButtonFabColor(variant === 'login' ? green : blue),
  });

  return (
    <View style={[styles.container, style]}>
      <AnimatedPawButton color={colorizeFab.color} onPress={() => onPress()} />
      <AnimatedGradientButton style={resize} label="Sign Up" onPress={() => onPress()} />
    </View>
  );
};

const mapStateToProps = (state) => ({ gradientPawButtonState: state.animation.gradientPawButton });
const mapDispatchToProps = { setGradientPawButtonWidth, setGradientPawButtonFabColor };

export default connect(mapStateToProps, mapDispatchToProps)(GradientPawButton);
