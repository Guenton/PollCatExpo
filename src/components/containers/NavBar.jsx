import React from 'react';
import { View } from 'react-native';
import { ScaledSheet, scale } from 'react-native-size-matters';

import NavBarButton from '../buttons/NavBarButton';

import { grey, blue, pink, green } from '../../global/colors';

const styles = ScaledSheet.create({
  container: {
    height: '55@s',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
});

const NavBar = ({ view, onGoMain, onGoRank, onGoSetup }) => (
  <View style={styles.container}>
    <NavBarButton name="poll-h" color={view === 'main' ? blue : grey} onPress={onGoMain} />
    <NavBarButton name="flag-checkered" color={view === 'rank' ? pink : grey} onPress={onGoRank} />
    <NavBarButton name="user-shield" color={view === 'setup' ? green : grey} onPress={onGoSetup} />
  </View>
);

export default NavBar;
