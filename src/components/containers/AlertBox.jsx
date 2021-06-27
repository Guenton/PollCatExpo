import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Text, View } from 'react-native';
import { Icon } from 'react-native-elements';
import { ScaledSheet, scale } from 'react-native-size-matters';

import { setAlert } from '../../store/actions/core';

import { info, success, error, blue, green, pink, grey } from '../../global/colors';
import { animated, useTransition } from 'react-spring';

const styles = ScaledSheet.create({
  container: {
    flexDirection: 'row',
    height: '55@s',
    width: '300@s',
    alignSelf: 'center',
    borderRadius: '10@s',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '5@s',
  },
  textArea: {
    flex: 1,
  },
  leftIcon: {
    paddingHorizontal: '5@s',
  },
  rightIcon: {
    paddingHorizontal: '5@s',
  },
});

const AnimatedView = animated(View);

const AlertBox = () => {
  const dispatch = useDispatch();
  const severity = useSelector((state) => state.core.alert.severity);
  const text = useSelector((state) => state.core.alert.text);

  const backgroundColor = () => {
    if (severity === 'info') return info;
    else if (severity === 'success') return success;
    else if (severity === 'error') return error;
    else return error;
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

  const transitionHeightAndOpacity = useTransition(!!text, {
    enter: {
      ...styles.container,
      height: scale(55),
      opacity: 1,
      backgroundColor: backgroundColor(),
    },
    leave: { ...styles.container, height: 0, opacity: 0, backgroundColor: grey },
    from: { ...styles.container, height: 0, opacity: 0, backgroundColor: grey },
    reverse: !!text,
  });

  return transitionHeightAndOpacity((style, item) => (
    <>
      {item && (
        <AnimatedView style={style}>
          <Icon
            containerStyle={styles.leftIcon}
            name={iconName()}
            type="font-awesome-5"
            color={color()}
            size={scale(24)}
          />
          <View style={styles.textArea}>
            <Text style={{ color: color() }}>{text}</Text>
          </View>
          <Icon
            containerStyle={styles.rightIcon}
            name="times"
            type="font-awesome-5"
            color={color()}
            size={scale(18)}
            onPress={() => dispatch(setAlert())}
          />
        </AnimatedView>
      )}
    </>
  ));
};

export default AlertBox;
