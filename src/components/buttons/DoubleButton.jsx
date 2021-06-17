import React from 'react';
import { Pressable, View } from 'react-native';
import { ScaledSheet, scale } from 'react-native-size-matters';
import { Icon } from 'react-native-elements';
import i18n from 'i18n-js';

import FormText from '../labels/FormText';

import { greyShade, blue, grey } from '../../global/colors';

const styles = ScaledSheet.create({
  container: {
    backgroundColor: greyShade,
    flexDirection: 'row',
    height: '100@s',
    width: '300@s',
    padding: '14@s',
    borderRadius: '10@s',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  button: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  divider: {
    backgroundColor: grey,
    height: '50@s',
    width: '1@s',
    marginHorizontal: '14@s',
  },
  label: {
    marginLeft: '14@s',
  },
});

const DoubleButton = ({
  iconLeft,
  iconRight,
  labelLeft,
  labelRight,
  onPressLeft,
  onPressRight,
}) => {
  const { t } = i18n;

  return (
    <View style={styles.container}>
      <Pressable style={styles.button} onPress={() => onPressLeft()}>
        <Icon type="font-awesome-5" name={iconLeft} size={scale(23)} color={blue} solid />
        <FormText label={labelLeft} containerStyle={styles.label} />
      </Pressable>

      <View style={styles.divider}></View>

      <Pressable style={styles.button} onPress={() => onPressRight()}>
        <Icon type="font-awesome-5" name={iconRight} size={scale(23)} color={blue} solid />
        <FormText label={labelRight} containerStyle={styles.label} />
      </Pressable>
    </View>
  );
};

export default DoubleButton;
