import React from 'react';
import { connect } from 'react-redux';
import { View } from 'react-native';
import { ScaledSheet, scale } from 'react-native-size-matters';
import { useSpring, animated } from 'react-spring';

import GradientButton from './GradientButton';
import PawButton from './PawButton';

import {
  setGradientPawButtonWidth,
  setGradientPawButtonColor,
  setGradientPawButtonGradient,
} from '../../store/actions/animation';

import { green, blue, pink } from '../../global/colors';
import I18n from 'i18n-js';

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
  onPress,
  isLoading,
  gradientPawButtonState,
  setGradientPawButtonWidth,
  setGradientPawButtonColor,
  setGradientPawButtonGradient,
}) => {
  const labelText = () => {
    if (variant === 'login') return I18n.t('login');
    else if (variant === 'signup') return I18n.t('signUp');
    else if (variant === 'reset-request') return I18n.t('requestReset');
    else if (variant === 'reset-confirm') return I18n.t('confirmReset');
    else return '';
  };

  const animateButtonWidth = () => {
    if (variant === 'login') return isLoading ? scale(150) : scale(200);
    else if (variant === 'signup') return isLoading ? scale(150) : scale(250);
    else if (variant === 'reset-request') return isLoading ? scale(150) : scale(250);
    else if (variant === 'reset-confirm') return isLoading ? scale(150) : scale(250);
    else return scale(200);
  };

  const animateColor = variant === 'login' ? green : blue;

  const animateGradient = () => {
    if (variant === 'signup') return green;
    else if (variant === 'reset-request') return pink;
    else if (variant === 'reset-confirm') return pink;
    else return blue;
  };

  const resize = useSpring({
    to: { width: animateButtonWidth() },
    from: { width: gradientPawButtonState.width },
    onRest: () => setGradientPawButtonWidth(animateButtonWidth()),
  });

  const colorize = useSpring({
    to: { color: animateColor },
    from: { color: gradientPawButtonState.color },
    config: { duration: 750 },
    onRest: () => setGradientPawButtonColor(animateColor),
  });

  const gradientize = useSpring({
    to: { color: animateGradient() },
    from: { color: gradientPawButtonState.gradient },
    config: { duration: 750 },
    onRest: () => setGradientPawButtonGradient(animateGradient()),
  });

  return (
    <View style={[styles.container, style]}>
      <AnimatedPawButton color={colorize.color} onPress={() => onPress()} />
      <AnimatedGradientButton
        style={resize}
        color={colorize.color}
        gradient={gradientize.color}
        label={labelText()}
        onPress={() => onPress()}
      />
    </View>
  );
};

const mapStateToProps = (state) => ({
  isLoading: state.core.isLoading,
  gradientPawButtonState: state.animation.gradientPawButton,
});
const mapDispatchToProps = {
  setGradientPawButtonWidth,
  setGradientPawButtonColor,
  setGradientPawButtonGradient,
};

export default connect(mapStateToProps, mapDispatchToProps)(GradientPawButton);
