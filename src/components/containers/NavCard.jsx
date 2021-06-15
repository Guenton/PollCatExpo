import React from 'react';
import { Pressable, View } from 'react-native';
import { ScaledSheet, scale } from 'react-native-size-matters';
import { Icon } from 'react-native-elements';

import { white, grey, blue } from '../../global/colors';
import NavCardHeader from '../labels/NavCardHeader';

const styles = ScaledSheet.create({
  container: {
    height: '85@s',
    width: '290@s',
    alignSelf: 'center',
    marginTop: '-30@s',
    borderRadius: '25@s',

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,

    elevation: 11,

    backgroundColor: white,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  divider: {
    height: '50@s',
    width: '1@s',
    backgroundColor: grey,
  },
  pressable: {
    flex: 1,
    height: '75@s',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
});

const NavCard = () => (
  <View style={styles.container}>
    <Pressable style={styles.pressable}>
      <Icon type="font-awesome-5" name="user-alt" size={scale(26)} color={blue} />
      <NavCardHeader label="User" />
    </Pressable>

    <View style={styles.divider}></View>

    <Pressable style={styles.pressable}>
      <Icon type="font-awesome-5" name="toolbox" size={scale(26)} color={grey} />
      <NavCardHeader label="Admin" />
    </Pressable>
  </View>
);

export default NavCard;
