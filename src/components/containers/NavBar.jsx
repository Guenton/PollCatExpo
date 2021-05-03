import React from 'react';
import { View } from 'react-native';
import { ScaledSheet, scale } from 'react-native-size-matters';

import NavBarButton from '../buttons/NavBarButton';

import { grey } from '../../global/colors';

const styles = ScaledSheet.create({
  container: {
    height: '50@s',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
});

const NavBar = ({ view }) => (
  <View style={styles.container}>
    <NavBarButton name="poll-h" color={grey} />
    <NavBarButton name="flag-checkered" color={grey} />
    <NavBarButton name="user-shield" color={grey} />
  </View>
);

export default NavBar;
