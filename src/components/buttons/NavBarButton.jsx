import React from 'react';
import { Icon } from 'react-native-elements';
import { scale } from 'react-native-size-matters';

const NavBarButton = ({ name, style, color, disabled, onPress }) => (
  <Icon
    containerStyle={style}
    name={name}
    type="font-awesome-5"
    color={color}
    size={scale(30)}
    onPress={() => onPress()}
    disabled={disabled}
  />
);

export default NavBarButton;
