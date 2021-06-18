import React from 'react';
import { Icon } from 'react-native-elements';
import { scale } from 'react-native-size-matters';

import { green } from '../../global/colors';

const ConfirmFab = ({ disabled, onPress }) => (
  <Icon
    name="check"
    type="font-awesome-5"
    color={green}
    disabled={disabled}
    size={scale(22)}
    onPress={() => onPress()}
    reverse
    raised
    solid
  />
);

export default ConfirmFab;
