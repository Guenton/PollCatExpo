import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import i18n from 'i18n-js';

import AlertBox from '../containers/AlertBox';
import ButtonContainer from '../containers/ButtonContainer';
import PollSelectionDropdown from '../buttons/PollSelectionDropdown';
import CancelButton from '../buttons/CancelButton';
import EditButton from '../buttons/EditButton';
import DeleteFab from '../buttons/DeleteFab';
import FormHeader from '../labels/FormHeader';
import FormOptionSelector from '../labels/FormOptionSelector';

import pollService from '../../services/poll';

import { setAllPollsObject, setPollTitle, setSelectedPollObject } from '../../store/actions/poll';
import { setAlert } from '../../store/actions/core';

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: '20@s',
  },
  header: {
    marginBottom: '15@s',
  },
  content: {
    flex: 1,
    alignItems: 'center',
  },
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    marginBottom: '15@s',
  },
});

const EditPollForm = ({ onGoAdmin, onGoEdit, onGoRemove }) => {
  const { t } = i18n;
  const dispatch = useDispatch();

  const allPollsObject = useSelector((state) => state.poll.allPollsObject);
  const selectedPollObject = useSelector((state) => state.poll.selectedPollObject);
  const selectedPoll = selectedPollObject.title ? selectedPollObject.title : '';

  const deSelectAndCancel = () => {
    dispatch(setSelectedPollObject());
    onGoAdmin();
  };

  const setSelectedPollObjectAndTitle = (poll) => {
    dispatch(setSelectedPollObject(poll));
    dispatch(setPollTitle(poll.title));
  };

  useEffect(() => {
    pollService
      .fetchAllAsync()
      .then((polls) => dispatch(setAllPollsObject(polls)))
      .catch((err) => dispatch(setAlert(err)));
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <FormHeader label={t('pollSelection')} />
      </View>

      <View style={styles.content}>
        <PollSelectionDropdown
          polls={allPollsObject}
          selectedPoll={selectedPoll}
          onSelect={(poll) => setSelectedPollObjectAndTitle(poll)}
        />
        <FormOptionSelector
          label={t('selectedPoll')}
          boldLabel={selectedPoll || t('notSelected')}
        />

        <View style={styles.centerContent}>
          <DeleteFab disabled={!selectedPoll} onPress={() => onGoRemove()} />
        </View>
      </View>

      <AlertBox />

      <ButtonContainer>
        <CancelButton onPress={() => deSelectAndCancel()} />
        <EditButton disabled={!selectedPoll} onPress={() => onGoEdit()} />
      </ButtonContainer>
    </View>
  );
};

export default EditPollForm;
