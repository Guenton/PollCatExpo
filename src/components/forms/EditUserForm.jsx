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
import { setAlert, setLoading } from '../../store/actions/core';
import RightsSelectionDropdown from '../buttons/RightsSelectionDropdown';
import FormOptionSelector from '../labels/FormOptionSelector';

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

const EditUserForm = ({ onGoAdmin }) => {
  const { t } = i18n;
  const dispatch = useDispatch();

  const allUsersObject = useSelector((state) => state.user.allUsersObject);
  const selectedUserObject = useSelector((state) => state.user.selectedUserObject);
  const selectedUserId = selectedUserObject.userId ? selectedUserObject.userId : '';

  const selectedUser = () => {
    if (!selectedUserObject.firstName) return '';
    else return `${selectedUserObject.firstName} ${selectedUserObject.lastName}`;
  };

  const selectedUserRights = () => {
    if (!selectedUser()) return t('selectUser');
    else if (!selectedUserObject.rights) return t('userAppRights');
    else if (selectedUserObject.rights === 'poller') return t('pollerAppRights');
    else if (selectedUserObject.rights === 'admin') return t('adminAppRights');
    else return t('userAppRights');
  };

  const updateUserRightsAsync = async (rights = 'user') => {
    try {
      dispatch(setLoading());
      if (!selectedUserId) throw t('errUserNotSelected');

      await firebase.database().ref(`users/${selectedUserId}`).update({ rights });

      dispatch(setSelectedUserObject());
      dispatch(setLoading(false));

      dispatch(setAlert(t('updatedRights', { name: selectedUser() })));
    } catch (err) {
      dispatch(setLoading(false));
      console.error(err);
      console.log(err.code);
      console.log(err.message);
    }
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
        <FormOptionSelector label={t('userRights') + ':'} boldLabel={selectedUserRights()} />

        <View style={styles.centerContent}>
          <RightsSelectionDropdown
            disabled={!selectedUser()}
            onSelect={(rights) => updateUserRightsAsync(rights)}
          />
        </View>
      </View>

      <AlertBox />

      <ButtonContainer>
        <CancelButton onPress={() => onGoAdmin()} />
        <ConfirmButton onPress={() => onGoAdmin()} />
      </ButtonContainer>
    </View>
  );
};

export default EditUserForm;
