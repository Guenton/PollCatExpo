import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View } from 'react-native';
import { ScaledSheet, scale } from 'react-native-size-matters';
import { useSpring, animated } from 'react-spring';
import i18n from 'i18n-js';

import GradientButton from './GradientButton';
import PawButton from './PawButton';

import {
  setGradientPawButtonWidth,
  setGradientPawButtonColor,
  setGradientPawButtonGradient,
} from '../../store/actions/animation';

import { green, blue, pink } from '../../global/colors';

const AnimatedGradientButton = animated(GradientButton);
const AnimatedPawButton = animated(PawButton);

const styles = ScaledSheet.create({
  container: {
    flexDirection: 'row',
  },
});

const GradientPawButton = ({ style, variant, onPress }) => {
  const { t } = i18n;
  const dispatch = useDispatch();

  const isLoading = useSelector((state) => state.core.isLoading);
  const gradientPawButtonState = useSelector((state) => state.animation.gradientPawButton);

  const labelText = () => {
    if (variant === 'login') return t('login');
    else if (variant === 'signup') return t('signUp');
    else if (variant === 'reset-request') return t('requestReset');
    else if (variant === 'reset-confirm') return t('confirmReset');
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

  const transitionWidth = useSpring({
    to: { width: animateButtonWidth() },
    from: { width: gradientPawButtonState.width },
    onRest: () => dispatch(setGradientPawButtonWidth(animateButtonWidth())),
  });

  const transitionColor = useSpring({
    to: { color: animateColor },
    from: { color: gradientPawButtonState.color },
    config: { duration: 750 },
    onRest: () => dispatch(setGradientPawButtonColor(animateColor)),
  });

  const transitionGradient = useSpring({
    to: { color: animateGradient() },
    from: { color: gradientPawButtonState.gradient },
    config: { duration: 750 },
    onRest: () => dispatch(setGradientPawButtonGradient(animateGradient())),
  });

  return (
    <View style={[styles.container, style]}>
      <AnimatedPawButton color={transitionColor.color} onPress={() => onPress()} />
      <AnimatedGradientButton
        style={transitionWidth}
        color={transitionColor.color}
        gradient={transitionGradient.color}
        label={labelText()}
        onPress={() => onPress()}
      />
    </View>
  );
};

export default GradientPawButton;
