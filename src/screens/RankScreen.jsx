import React, { useState, useEffect } from 'react';
import { Dimensions, Keyboard } from 'react-native';
import { View } from 'react-native';
import { ScaledSheet, scale } from 'react-native-size-matters';
import { useDispatch, useSelector } from 'react-redux';

import MainCurtain from '../components/containers/MainCurtain';
import NavBar from '../components/containers/NavBar';
import NavCard from '../components/containers/NavCard';
import UserForm from '../components/forms/UserForm';
import LoadingBar from '../components/images/LoadingBar';

import { blueShade, pinkShade, greenShade } from '../global/colors';

import { setKeyboardOpen } from '../store/actions/core';

const curtainHeight = Dimensions.get('window').height - scale(55);

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  setupHeader: {
    justifyContent: 'flex-start',
  },
});

const RankScreen = () => {
  return (
    <View style={styles.container}>
      <MainCurtain view="rank" color={pinkShade} height={curtainHeight} />

      <LoadingBar />
      <NavBar />
    </View>
  );
};

export default RankScreen;
