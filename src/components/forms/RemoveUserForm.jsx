import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import firebase from 'firebase';
import i18n from 'i18n-js';

import FormHeader from '../labels/FormHeader';
import UserSelectionDropdown from '../buttons/UserSelectionDropdown';
import ButtonContainer from '../containers/ButtonContainer';
import CancelButton from '../buttons/CancelButton';
import DeleteButton from '../buttons/DeleteButton';
import DeleteFab from '../buttons/DeleteFab';
import AlertBox from '../containers/AlertBox';

import { setAllUsersObject, setSelectedUserObject } from '../../store/actions/user';
import { setAlert } from '../../store/actions/core';
import FormOptionSelector from '../labels/FormOptionSelector';

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: '20@s',
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

const RemoveUserForm = ({ onGoAdmin, onGoConfirm }) => {
  const { t } = i18n;
  const dispatch = useDispatch();

  const allUsersObject = useSelector((state) => state.user.allUsersObject);
  const selectedUserObject = useSelector((state) => state.user.selectedUserObject);

  const selectedUser = () => {
    if (!selectedUserObject.firstName) return '';
    else return `${selectedUserObject.firstName} ${selectedUserObject.lastName}`;
  };

  const checkIfCanDelete = () => {
    if (selectedUserObject.firstName) {
      dispatch(setAlert());
      onGoConfirm();
    } else dispatch(setAlert(t('errUserNotSelected'), 'info'));
  };

  const clearSelectedUserAndReturn = () => {
    dispatch(setSelectedUserObject());
    onGoAdmin();
  };

  firebase
    .database()
    .ref('users')
    .once('value', (snapshot) => {
      dispatch(setAllUsersObject(snapshot.val()));
    });

  return (
    <View style={styles.container}>
      <FormHeader label={t('userSelection')} />

      <View style={styles.content}>
        <FormOptionSelector
          label={t('selectedUser')}
          boldLabel={selectedUser() ? selectedUser() : t('noSelectedUser')}
          onPress={() => {}}
        />
        <UserSelectionDropdown
          users={allUsersObject}
          selectedUser={selectedUser()}
          onSelect={(user) => dispatch(setSelectedUserObject(user))}
        />
      </View>

      <AlertBox />

      <ButtonContainer>
        <CancelButton onPress={() => clearSelectedUserAndReturn()} />
        <DeleteButton onPress={() => checkIfCanDelete()} />
      </ButtonContainer>
    </View>
  );
};

export default RemoveUserForm;
