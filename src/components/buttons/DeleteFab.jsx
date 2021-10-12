import React from 'react';
import { Icon } from 'react-native-elements';
import { scale } from 'react-native-size-matters';

import { pink } from '../../global/colors';

const DeleteFab = ({ disabled, onPress, small }) => (
  <Icon
    name="trash-alt"
    type="font-awesome-5"
    color={pink}
    disabled={disabled}
    size={small ? scale(14) : scale(22)}
    onPress={() => onPress()}
    reverse
    raised
    solid
  />
);

export default DeleteFab;
