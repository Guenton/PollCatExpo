import React from 'react';
import { Pressable, View } from 'react-native';
import { ScaledSheet, scale } from 'react-native-size-matters';
import { Icon } from 'react-native-elements';
import i18n from 'i18n-js';

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

const LogoutButton = ({ style, onPress }) => {
  const { t } = i18n;

  return (
    <Pressable style={[styles.container, style]} onPress={() => onPress()}>
      <View style={styles.leftBox}>
        <Icon type="font-awesome-5" name="user-lock" size={scale(22)} color={blue} />
        <FormText label={t('logout')} containerStyle={styles.label} />
      </View>
      <Icon type="font-awesome-5" name="sign-out-alt" size={scale(20)} color={green} />
    </Pressable>
  );
};

export default LogoutButton;
