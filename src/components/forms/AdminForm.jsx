import React from 'react';
import { View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { ScaledSheet } from 'react-native-size-matters';
import I18n from 'i18n-js';

import FormOptionSelector from '../labels/FormOptionSelector';
import SwitchButton from '../buttons/SwitchButton';
import DoubleButton from '../buttons/DoubleButton';
import AlertBox from '../containers/AlertBox';

import pollService from '../../services/poll';

import { setSelectedPollObject } from '../../store/actions/poll';
import { ScrollView } from 'react-native';
import { setAlert, setRoute } from '../../store/actions/core';

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

const AdminForm = ({ onGoCreatePoll, onGoEditPoll, onGoEditUser, onGoRemoveUser }) => {
  const { t } = I18n;
  const dispatch = useDispatch();

  const selectedPollObject = useSelector((state) => state.poll.selectedPollObject);

  const pollTitle = selectedPollObject.title || '';
  const pollId = selectedPollObject.pollId || '';
  const isOpen = selectedPollObject.isOpen;

  const togglePollOpenAsync = async () => {
    try {
      if (isOpen) await pollService.closeByIdAsync(pollId);
      else await pollService.openByIdAsync(pollId);

      const updatedPoll = await pollService.fetchByIdAsync(pollId);
      dispatch(setSelectedPollObject(updatedPoll));
    } catch {
      dispatch(setAlert(err));
    }
  };

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
          boldLabel={pollTitle ? pollTitle : t('noSelectedPoll')}
          onPress={() => dispatch(setRoute('setup-select-poll'))}
        />
        <SwitchButton
          icon="play-circle"
          label={isOpen ? t('closeSelectedPoll') : t('openSelectedPoll')}
          isOn={isOpen}
          onPress={() => togglePollOpenAsync()}
        />
      </View>

      <AlertBox />

      <DoubleButton
        iconLeft="user-edit"
        labelLeft={t('editUser')}
        onPressLeft={() => onGoEditUser()}
        iconRight="user-slash"
        labelRight={t('removeUser')}
        onPressRight={() => onGoRemoveUser()}
      />
    </ScrollView>
  );
};

export default AdminForm;
