import React from 'react';
import { Icon } from 'react-native-elements';
import { scale, ScaledSheet } from 'react-native-size-matters';

import { green } from '../../global/colors';

const styles = ScaledSheet.create({
  container: {
    zIndex: 5,
    elevation: 5,
  },
});

const PawButton = ({ style, color, disabled, onPress }) => (
  <Icon
    containerStyle={[styles.container, style]}
    name="paw"
    type="font-awesome-5"
    color={color ? color : green}
    size={scale(26)}
    onPress={() => onPress()}
    disabled={disabled}
    reverse
    raised
  />
);

export default PawButton;
