import React from 'react';
import { Icon } from 'react-native-elements';
import { scale, ScaledSheet } from 'react-native-size-matters';

import { green } from '../../global/colors';

const styles = ScaledSheet.create({
  container: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,

    elevation: 10,
    zIndex: 10,
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
