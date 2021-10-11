import React from 'react';
import { View } from 'react-native';
import { ScaledSheet, scale } from 'react-native-size-matters';
import { useDispatch, useSelector } from 'react-redux';
import i18n from 'i18n-js';

import Curtain from '../components/containers/Curtain';
import NavBar from '../components/containers/NavBar';
import LoadingBar from '../components/images/LoadingBar';
import Header from '../components/labels/Header';
import EditPollQuestionForm from '../components/forms/EditPollQuestionForm';

import { setRoute } from '../store/actions/core';

import { greenShade } from '../global/colors';

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  setupHeader: {
    justifyContent: 'flex-start',
  },
});

const EditPollQuestionScreen = () => {
  const { t } = i18n;
  const dispatch = useDispatch();

  const isKeyboardOpen = useSelector((state) => state.core.isKeyboardOpen);

  return (
    <View style={styles.container}>
      <View style={styles.setupHeader}>
        <Curtain color={greenShade} height={isKeyboardOpen ? scale(100) : scale(150)}>
          <Header label={t('editPoll')} />
        </Curtain>
      </View>

      <EditPollQuestionForm
        onGoBack={() => dispatch(setRoute('setup-admin'))}
        onGoEdit={() => dispatch(setRoute('setup-edit-poll-detail'))}
      />

      <LoadingBar />
      <NavBar />
    </View>
  );
};

export default EditPollQuestionScreen;
