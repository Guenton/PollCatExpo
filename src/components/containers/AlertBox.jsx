import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Text, View } from 'react-native';
import { Icon } from 'react-native-elements';
import { ScaledSheet, scale } from 'react-native-size-matters';

import { setAlert } from '../../store/actions/core';

import { info, success, error, blue, green, pink } from '../../global/colors';

const styles = ScaledSheet.create({
  container: {
    height: '55@s',
    width: '300@s',
    alignSelf: 'center',
    borderRadius: '10@s',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '5@s',
  },
  leftIcon: {
    paddingHorizontal: '5@s',
  },
  rightIcon: {
    paddingHorizontal: '5@s',
  },
});

const AlertBox = () => {
  const dispatch = useDispatch();
  const severity = useSelector((state) => state.core.alert.severity);
  const text = useSelector((state) => state.core.alert.text);

  const backgroundColor = () => {
    if (severity === 'info') return { backgroundColor: info };
    else if (severity === 'success') return { backgroundColor: success };
    else if (severity === 'error') return { backgroundColor: error };
    else return { backgroundColor: error };
  };

  const color = () => {
    if (severity === 'info') return blue;
    else if (severity === 'success') return green;
    else if (severity === 'error') return pink;
    else return pink;
  };

  const iconName = () => {
    if (severity === 'info') return 'info-circle';
    else if (severity === 'success') return 'check-circle';
    else if (severity === 'error') return 'exclamation-circle';
    else return 'exclamation-circle';
  };

  return (
    <>
      {!!text && (
        <View style={[styles.container, backgroundColor()]}>
          <Icon
            containerStyle={styles.leftIcon}
            name={iconName()}
            type="font-awesome-5"
            color={color()}
            size={scale(24)}
          />
          <Text style={{ color: color() }}>{text}</Text>
          <Icon
            containerStyle={styles.rightIcon}
            name="times"
            type="font-awesome-5"
            color={color()}
            size={scale(18)}
            onPress={() => dispatch(setAlert())}
          />
        </View>
      )}
    </>
  );
};

export default AlertBox;
