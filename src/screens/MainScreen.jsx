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

const MainScreen = ({ setRoute }) => {
  const [view, setView] = useState('main');

  const isKeyboardOpen = useSelector((state) => state.core.isKeyboardOpen);

  return (
    <View style={styles.container}>
      {view === 'main' && (
        <>
          <MainCurtain view={view} color={blueShade} height={curtainHeight} />
        </>
      )}

      {view === 'rank' && (
        <>
          <MainCurtain view={view} color={pinkShade} height={curtainHeight} />
        </>
      )}

      {view === 'setup' && (
        <>
          <View style={styles.setupHeader}>
            <MainCurtain
              view={view}
              color={greenShade}
              height={isKeyboardOpen ? scale(100) : scale(150)}
            />
            <NavCard />
          </View>

          <UserForm onGoLogin={() => setRoute('login')} />
        </>
      )}

      {view === 'create' ||
        view === 'edit' ||
        (view === 'delete' && (
          <>
            <MainCurtain
              view={view}
              color={greenShade}
              height={isKeyboardOpen ? scale(100) : scale(200)}
            />
          </>
        ))}

      <LoadingBar />
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
