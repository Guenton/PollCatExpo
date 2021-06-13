import React from 'react';
import { View } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import { Divider } from 'react-native-elements';

import { grey, white } from '../../global/colors';

const styles = ScaledSheet.create({
  container: {
    height: '100@s',
    width: '300@s',
    alignSelf: 'center',
    marginTop: '-50@s',
    borderRadius: '25@s',
    elevation: 5,
    zIndex: 5,
    backgroundColor: white,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  divider: {
    height: '75@s',
    width: '1@s',
    backgroundColor: grey,
  },
  leftBox: {
    flex: 1,
    height: '75@s',
    backgroundColor: '#444',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  rightBox: {
    flex: 1,
    height: '75@s',
    backgroundColor: '#444',
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
