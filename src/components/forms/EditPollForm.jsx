import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import firebase from 'firebase';
import i18n from 'i18n-js';

import FormHeader from '../labels/FormHeader';
import ButtonContainer from '../containers/ButtonContainer';
import CancelButton from '../buttons/CancelButton';
import EditButton from '../buttons/EditButton';
import DeleteFab from '../buttons/DeleteFab';
import AlertBox from '../containers/AlertBox';

import FormOptionSelector from '../labels/FormOptionSelector';
import PollSelectionDropdown from '../buttons/PollSelectionDropdown';
import { setAllPollsObject, setSelectedPollObject } from '../../store/actions/poll';

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

  firebase
    .database()
    .ref('polls')
    .once('value', (snapshot) => {
      dispatch(setAllPollsObject(snapshot.val()));
    });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <FormHeader label={t('pollSelection')} />
      </View>

      <View style={styles.content}>
        <PollSelectionDropdown
          polls={allPollsObject}
          selectedPoll={selectedPoll}
          onSelect={(poll) => dispatch(setSelectedPollObject(poll))}
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
