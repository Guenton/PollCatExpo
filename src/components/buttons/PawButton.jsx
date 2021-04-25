import React from 'react';
import { Icon } from 'react-native-elements';
import { scale } from 'react-native-size-matters';

import { green, blue } from '../../global/colors';

const PawButton = ({ style, isGreen, onPress }) => (
  <Icon
    containerStyle={style}
    name="paw"
    type="font-awesome-5"
    color={isGreen ? green : blue}
    size={scale(26)}
    onPress={() => onPress()}
    reverse
    raised
  />
);

export default PawButton;
