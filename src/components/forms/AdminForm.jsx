import React from 'react';
import { View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { ScaledSheet } from 'react-native-size-matters';
import firebase from 'firebase';
import I18n from 'i18n-js';

import FormOptionSelector from '../labels/FormOptionSelector';
import SwitchButton from '../buttons/SwitchButton';
import LogoutButton from '../buttons/LogoutButton';

import { setLoading } from '../../store/actions/core';
import { setPollOpen } from '../../store/actions/poll';

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  pollActivationBox: {
    alignItems: 'flex-start',
  },
});

const AdminForm = ({ onGoLogin }) => {
  const { t } = I18n;
  const dispatch = useDispatch();
  const isOpen = useSelector((state) => state.poll.isOpen);
  const selectedPoll = useSelector((state) => state.poll.selectedPoll);

  return (
    <View style={styles.container}>
      <View>
        <FormOptionSelector
          label={t('selectedPoll')}
          boldLabel={selectedPoll ? selectedPoll : t('noSelectedPoll')}
          onPress={() => {}}
        />
        <SwitchButton
          label={isOpen ? t('closeSelectedPoll') : t('openSelectedPoll')}
          icon="play-circle"
          isOn={isOpen}
          onPress={() => dispatch(setPollOpen(!isOpen))}
        />
      </View>

      <LogoutButton onPress={() => {}} />
    </View>
  );
};

export default AdminForm;
