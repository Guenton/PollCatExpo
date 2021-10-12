import React from 'react';
import { Icon } from 'react-native-elements';
import { scale } from 'react-native-size-matters';

import { yellow } from '../../global/colors';

const ConfirmFab = ({ disabled, onPress, small }) => (
  <Icon
    name="check"
    type="font-awesome-5"
    color={yellow}
    disabled={disabled}
    size={small ? scale(14) : scale(22)}
    onPress={() => onPress()}
    reverse
    raised
    solid
  />
);

export default ConfirmFab;
