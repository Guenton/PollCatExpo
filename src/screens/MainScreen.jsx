import React, { useState } from 'react';
import { Dimensions } from 'react-native';
import { View } from 'react-native';
import { ScaledSheet, verticalScale } from 'react-native-size-matters';
import MainCurtain from '../components/containers/MainCurtain';

import NavBar from '../components/containers/NavBar';

import { blueShade, greenShade, pinkShade } from '../global/colors';

const curtainHeight = Dimensions.get('window').height - 55;

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
});

const MainScreen = () => {
  const [view, setView] = useState('main');

  return (
    <View style={styles.container}>
      {view === 'main' && (
        <>
          <MainCurtain color={blueShade} height={curtainHeight} />
        </>
      )}

      <NavBar
        view={view}
        onGoMain={() => setView('main')}
        onGoRank={() => setView('rank')}
        onGoSetup={() => setView('setup')}
      />
    </View>
  );
};

export default MainScreen;
