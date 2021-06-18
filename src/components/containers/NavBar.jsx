import React from 'react';
import { View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { ScaledSheet } from 'react-native-size-matters';

import NavBarButton from '../buttons/NavBarButton';

import { grey, blue, pink, green } from '../../global/colors';

import { setRoute } from '../../store/actions/core';

const styles = ScaledSheet.create({
  container: {
    height: '55@s',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
});

const NavBar = () => {
  const dispatch = useDispatch();

  const isKeyboardOpen = useSelector((state) => state.core.isKeyboardOpen);
  const route = useSelector((state) => state.core.route);

  const highlightMainRouteWhenActive = () => {
    if (route === 'main') return blue;
    else return grey;
  };

  const highlightRankRouteWhenActive = () => {
    if (route === 'rank') return pink;
    else return grey;
  };

  const highlightSetupRouteWhenActive = () => {
    if (route === 'setup-user') return green;
    else return grey;
  };

  return (
    <>
      {!isKeyboardOpen && (
        <View style={styles.container}>
          <NavBarButton
            name="poll-h"
            color={highlightMainRouteWhenActive()}
            onPress={() => dispatch(setRoute('main'))}
          />
          <NavBarButton
            name="flag-checkered"
            color={highlightRankRouteWhenActive()}
            onPress={() => dispatch(setRoute('rank'))}
          />
          <NavBarButton
            name="user-shield"
            color={highlightSetupRouteWhenActive()}
            onPress={() => dispatch(setRoute('setup-user'))}
          />
        </View>
      )}
    </>
  );
};

export default NavBar;
