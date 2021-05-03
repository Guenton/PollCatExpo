import React, { useState } from 'react';
import { View } from 'react-native';
import { ScaledSheet, scale } from 'react-native-size-matters';
import MainCurtain from '../components/containers/MainCurtain';

import NavBar from '../components/containers/NavBar';

import { blueShade, greenShade, pinkShade } from '../global/colors';

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
});

const MainScreen = () => {
  const [view, setView] = useState('home');

  return (
    <View style={styles.container}>
      {view === 'home' && (
        <>
          <MainCurtain color={blueShade} height={scale(640)} />
        </>
      )}

      <NavBar view={view} />
    </View>
  );
};

export default MainScreen;
