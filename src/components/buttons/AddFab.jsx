import React from 'react';
import { Icon } from 'react-native-elements';
import { scale } from 'react-native-size-matters';

import { green } from '../../global/colors';

const AddFab = ({ disabled, onPress, small }) => (
  <Icon
    name="plus"
    type="font-awesome-5"
    color={green}
    disabled={disabled}
    size={small ? scale(14) : scale(22)}
    onPress={() => onPress()}
    reverse
    raised
    solid
  />
);

export default AddFab;
