import React from 'react';
import { Pressable, View } from 'react-native';
import { ScaledSheet, scale } from 'react-native-size-matters';
import { Icon, Switch } from 'react-native-elements';

import FormText from '../labels/FormText';

import { greyShade, blue, green } from '../../global/colors';

const styles = ScaledSheet.create({
  container: {
    flexDirection: 'row',
    height: '60@s',
    width: '300@s',
    padding: '14@s',
    borderRadius: '10@s',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: greyShade,
  },
  leftBox: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  label: {
    marginLeft: '14@s',
  },
});

const SwitchButton = ({ style, onPress, icon, label, isOn }) => (
  <Pressable style={[styles.container, style]} onPress={() => onPress()}>
    <View style={styles.leftBox}>
      <Icon type="font-awesome-5" name={icon} size={scale(22)} color={blue} solid />
      <FormText label={label} containerStyle={styles.label} />
    </View>
    <Switch value={isOn} color={green} />
  </Pressable>
);

export default SwitchButton;
