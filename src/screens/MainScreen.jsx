import React from 'react';
import { Dimensions } from 'react-native';
import { View } from 'react-native';
import { ScaledSheet, scale } from 'react-native-size-matters';
import { useSelector } from 'react-redux';
import i18n from 'i18n-js';

import NavBar from '../components/containers/NavBar';
import LoadingBar from '../components/images/LoadingBar';
import SelectPollCardList from '../components/forms/SelectPollCardList';

import { blueShade } from '../global/colors';

import Curtain from '../components/containers/Curtain';
import Header from '../components/labels/Header';

const curtainHeight = Dimensions.get('window').height - scale(55);

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  content: {
    flex: 1,
    marginTop: '100@s',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
});

const MainScreen = () => {
  const { t } = i18n;
  const firstName = useSelector((state) => state.user.firstName);

  return (
    <View style={styles.container}>
      <Curtain color={blueShade} height={curtainHeight}>
        <View style={styles.content}>
          <Header label={t('hiName', { name: firstName })} />
          <SelectPollCardList />
        </View>
      </Curtain>

      <LoadingBar />
      <NavBar />
    </View>
  );
};

export default MainScreen;
