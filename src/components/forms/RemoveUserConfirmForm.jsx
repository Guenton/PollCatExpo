import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import firebase from 'firebase';
import I18n from 'i18n-js';

import FormHeader from '../labels/FormHeader';
import UserSelectionDropdown from '../buttons/UserSelectionDropdown';
import ButtonContainer from '../containers/ButtonContainer';
import CancelButton from '../buttons/CancelButton';
import DeleteButton from '../buttons/DeleteButton';
import DeleteFab from '../buttons/DeleteFab';
import AlertBox from '../containers/AlertBox';

import { setAllUsersObject, setSelectedUserObject } from '../../store/actions/user';
import { setAlert, setLoading } from '../../store/actions/core';
import FormOptionSelector from '../labels/FormOptionSelector';
import SubHeader from '../labels/SubHeader';

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

const RemoveUserConfirmForm = ({ onGoBack }) => {
  const { t } = I18n;
  const dispatch = useDispatch();

  const selectedUserObject = useSelector((state) => state.user.selectedUserObject);

  const selectedUserId = selectedUserObject.userId ? selectedUserObject.userId : '';

  const selectedUser = () => {
    if (!selectedUserObject.firstName) return '';
    else return `${selectedUserObject.firstName} ${selectedUserObject.lastName}`;
  };

  const removeUserAndReturn = async () => {
    try {
      dispatch(setLoading());
      if (!selectedUserId) throw t('errUserNotSelected');

      await firebase.database().ref(`users/${selectedUserId}`).remove();

      dispatch(setSelectedUserObject());
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
      <FormHeader label={t('removeUser')} />

      <View style={styles.warning}>
        <SubHeader label={t('msgUserSureRemoval')} />
        <SubHeader label={t('msgPermanentAction')} />
      </View>

      <View style={styles.content}>
        <FormOptionSelector
          label={t('selectedUser')}
          boldLabel={selectedUser() ? selectedUser() : t('noSelectedUser')}
          onPress={() => {}}
        />
      </View>

      <AlertBox />

      <ButtonContainer>
        <CancelButton onPress={() => onGoBack()} />
        <DeleteButton onPress={() => removeUserAndReturn()} />
      </ButtonContainer>
    </View>
  );
};

export default RemoveUserConfirmForm;
