import React from 'react';
import { Pressable, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { ScaledSheet, scale } from 'react-native-size-matters';
import { Icon } from 'react-native-elements';
import { useSpring, animated } from 'react-spring';
import i18n from 'i18n-js';

import NavCardHeader from '../labels/NavCardHeader';

import { white, grey, blue } from '../../global/colors';

import { setRoute } from '../../store/actions/core';
import {
  setAdminRouteIconColor,
  setUnderscorePosition,
  setUserRouteIconColor,
} from '../../store/actions/animation';

const styles = ScaledSheet.create({
  container: {
    height: '85@s',
    width: '290@s',
    alignSelf: 'center',
    marginTop: '-35@s',
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
  underscore: {
    backgroundColor: blue,
    height: '2@s',
    width: '45@s',
    bottom: '29@s',
    left: '77@s',
    position: 'absolute',
  },
  pressable: {
    flex: 1,
    height: '75@s',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
});

const AnimatedIcon = animated(Icon);
const AnimatedView = animated(View);

const NavCard = () => {
  const { t } = i18n;
  const dispatch = useDispatch();

  const route = useSelector((state) => state.core.route);
  const userRouteIcon = useSelector((state) => state.animation.userRouteIcon);
  const adminRouteIcon = useSelector((state) => state.animation.adminRouteIcon);
  const underscore = useSelector((state) => state.animation.underscore);

  const transitionUnderscore = useSpring({
    to: { ...styles.underscore, left: route === 'setup-user' ? scale(77) : scale(220) },
    from: { ...styles.underscore, left: underscore.left },
    onRest: () => dispatch(setUnderscorePosition(route === 'setup-user' ? scale(77) : scale(220))),
  });

  const { userRouteIconColor } = useSpring({
    to: { userRouteIconColor: route === 'setup-user' ? blue : grey },
    from: { userRouteIconColor: userRouteIcon.color },
    onRest: () => dispatch(setUserRouteIconColor(route === 'setup-user' ? blue : grey)),
  });

  const { adminRouteIconColor } = useSpring({
    to: { adminRouteIconColor: route === 'setup-admin' ? blue : grey },
    from: { adminRouteIconColor: adminRouteIcon.color },
    onRest: () => dispatch(setAdminRouteIconColor(route === 'setup-admin' ? blue : grey)),
  });

  return (
    <View style={styles.container}>
      <Pressable style={styles.pressable} onPress={() => dispatch(setRoute('setup-user'))}>
        <AnimatedIcon
          type="font-awesome-5"
          name="user-alt"
          size={scale(26)}
          color={userRouteIconColor}
        />
        <NavCardHeader label={t('user')} />
      </Pressable>

      <AnimatedView style={transitionUnderscore}></AnimatedView>
      <View style={styles.divider}></View>

      <Pressable style={styles.pressable} onPress={() => dispatch(setRoute('setup-admin'))}>
        <AnimatedIcon
          type="font-awesome-5"
          name="toolbox"
          size={scale(26)}
          color={adminRouteIconColor}
        />
        <NavCardHeader label={t('admin')} />
      </Pressable>
    </View>
  );
};

export default NavCard;
