import React from 'react';
import { View } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import { Divider } from 'react-native-elements';

import { grey, white } from '../../global/colors';

const styles = ScaledSheet.create({
  container: {
    height: '90@s',
    width: '290@s',
    alignSelf: 'center',
    marginTop: '-40@s',
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
    height: '60@s',
    width: '1@s',
    backgroundColor: grey,
  },
  leftBox: {
    flex: 1,
    height: '75@s',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  rightBox: {
    flex: 1,
    height: '75@s',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});

const NavCard = () => (
  <View style={styles.container}>
    <View style={styles.leftBox}></View>
    <View style={styles.divider}></View>
    <View style={styles.rightBox}></View>
  </View>
);

export default NavCard;
