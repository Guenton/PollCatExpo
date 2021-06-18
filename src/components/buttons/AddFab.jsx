import React from 'react';
import { Icon } from 'react-native-elements';
import { scale } from 'react-native-size-matters';

import { yellow } from '../../global/colors';

const AddFab = ({ disabled, onPress }) => (
  <Icon
    name="plus"
    type="font-awesome-5"
    color={yellow}
    disabled={disabled}
    size={scale(22)}
    onPress={() => onPress()}
    reverse
    raised
    solid
  />
);

export default AddFab;
