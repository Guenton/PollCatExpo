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
import ConfirmButton from '../buttons/ConfirmButton';
import DeleteFab from '../buttons/DeleteFab';
import AlertBox from '../containers/AlertBox';

import { setAllUsersObject, setSelectedUserObject } from '../../store/actions/user';
import { setAlert } from '../../store/actions/core';
import RightsSelectionDropdown from '../buttons/RightsSelectionDropdown';

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

const EditUserForm = ({ onGoAdmin, onGoDeleteUser }) => {
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
      onGoDeleteUser();
    } else dispatch(setAlert(t('errUserNotSelected'), 'info'));
  };

  firebase
    .database()
    .ref('users')
    .once('value', (snapshot) => {
      dispatch(setAllUsersObject(snapshot.val()));
    });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <FormHeader label={t('userSelection')} />
      </View>

      <View style={styles.content}>
        <UserSelectionDropdown
          users={allUsersObject}
          selectedUser={selectedUser()}
          onSelect={(user) => dispatch(setSelectedUserObject(user))}
        />

        <View style={styles.centerContent}>
          <RightsSelectionDropdown onSelect={(val) => console.log(val)} />
        </View>
      </View>

      <AlertBox />

      <ButtonContainer>
        <CancelButton onPress={() => onGoAdmin()} />
        <ConfirmButton onPress={() => {}} />
      </ButtonContainer>
    </View>
  );
};

export default EditUserForm;
