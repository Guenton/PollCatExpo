import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ScrollView, View } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import { isEmpty, isEmail } from 'validator';
import firebase from 'firebase';
import i18n from 'i18n-js';

import FormHeader from '../labels/FormHeader';
import UserSelectionDropdown from '../buttons/UserSelectionDropdown';
import CancelButton from '../buttons/CancelButton';
import ConfirmButton from '../buttons/ConfirmButton';

import { setErrUserEmail, setUserEmail } from '../../store/actions/poll';
import DeleteFab from '../buttons/DeleteFab';
import { setAllUsersObject, setSelectedUserObject } from '../../store/actions/user';
import AlertBox from '../containers/AlertBox';
import { setAlert } from '../../store/actions/core';
import ButtonContainer from '../containers/ButtonContainer';

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
  buttonContainer: {
    width: '290@s',
    paddingHorizontal: '10@s',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

const EditUserForm = ({ onGoAdmin, onGoDeleteUser }) => {
  const { t } = i18n;
  const dispatch = useDispatch();

  const isKeyboardOpen = useSelector((state) => state.core.isKeyboardOpen);
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
          <DeleteFab onPress={() => checkIfCanDelete()} />
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
