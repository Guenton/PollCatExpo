import React from 'react';
import { View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { ScaledSheet } from 'react-native-size-matters';
import firebase from 'firebase';
import I18n from 'i18n-js';

import FormOptionSelector from '../labels/FormOptionSelector';
import SwitchButton from '../buttons/SwitchButton';
import DoubleButton from '../buttons/DoubleButton';

import { setLoading } from '../../store/actions/core';
import { setPollOpen } from '../../store/actions/poll';
import { ScrollView } from 'react-native';

const styles = ScaledSheet.create({
  container: {
    marginTop: '-20@s',
  },
  content: {
    paddingTop: '20@s',
    height: '475@s',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  pollActivationBox: {
    alignItems: 'flex-start',
  },
});

const AdminForm = ({ onGoCreatePoll, onGoEditPoll, onGoCreateUser, onGoEditUser }) => {
  const { t } = I18n;
  const dispatch = useDispatch();
  const isOpen = useSelector((state) => state.poll.isOpen);
  const selectedPoll = useSelector((state) => state.poll.selectedPoll);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <DoubleButton
        iconLeft="bell"
        labelLeft={t('createPoll')}
        onPressLeft={() => onGoCreatePoll()}
        iconRight="edit"
        labelRight={t('editPoll')}
        onPressRight={() => onGoEditPoll()}
      />

      <View>
        <FormOptionSelector
          label={t('selectedPoll')}
          boldLabel={selectedPoll ? selectedPoll : t('noSelectedPoll')}
          onPress={() => {}}
        />
        <SwitchButton
          icon="play-circle"
          label={isOpen ? t('closeSelectedPoll') : t('openSelectedPoll')}
          isOn={isOpen}
          onPress={() => dispatch(setPollOpen(!isOpen))}
        />
      </View>

      <DoubleButton
        iconLeft="user-plus"
        labelLeft={t('createUser')}
        onPressLeft={() => onGoCreateUser()}
        iconRight="user-edit"
        labelRight={t('editUser')}
        onPressRight={() => onGoEditUser()}
      />
    </ScrollView>
  );
};

export default AdminForm;
