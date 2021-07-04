import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import firebase from 'firebase';
import I18n from 'i18n-js';

import FormHeader from '../labels/FormHeader';
import ButtonContainer from '../containers/ButtonContainer';
import CancelButton from '../buttons/CancelButton';
import DeleteButton from '../buttons/DeleteButton';
import SubHeader from '../labels/SubHeader';
import FormOptionSelector from '../labels/FormOptionSelector';
import AlertBox from '../containers/AlertBox';

import { setAlert, setLoading } from '../../store/actions/core';
import { setSelectedPollObject } from '../../store/actions/poll';

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: '20@s',
  },
  warning: {
    marginTop: '20@s',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '15@s',
  },
  centerContent: {
    flex: 1,
    justifyContent: 'center',
  },
});

const RemovePollConfirmForm = ({ onGoBack }) => {
  const { t } = I18n;
  const dispatch = useDispatch();

  const selectedPollObject = useSelector((state) => state.poll.selectedPollObject);

  const selectedPollId = selectedPollObject.pollId ? selectedPollObject.pollId : '';
  const selectedPoll = selectedPollObject.title ? selectedPollObject.title : '';

  const removePollAndReturn = async () => {
    try {
      dispatch(setLoading());
      if (!selectedPollId) throw t('errPollNotSelected');

      await firebase.database().ref(`polls/${selectedPollId}`).remove();

      dispatch(setSelectedPollObject());
      dispatch(setLoading(false));

      onGoBack();
    } catch (err) {
      dispatch(setLoading(false));
      console.error(err);
      console.log(err.code);
      console.log(err.message);
    }
  };

  return (
    <View style={styles.container}>
      <FormHeader label={t('removePoll')} />

      <View style={styles.warning}>
        <SubHeader label={t('msgPollSureRemoval')} />
        <SubHeader label={t('msgPermanentAction')} />
      </View>

      <View style={styles.content}>
        <FormOptionSelector
          label={t('selectedPoll')}
          boldLabel={selectedPoll || t('noSelectedUser')}
        />
      </View>

      <AlertBox />

      <ButtonContainer>
        <CancelButton onPress={() => onGoBack()} />
        <DeleteButton onPress={() => removePollAndReturn()} />
      </ButtonContainer>
    </View>
  );
};

export default RemovePollConfirmForm;
