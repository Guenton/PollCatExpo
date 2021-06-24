import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ScrollView, View } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import { isEmpty, isEmail } from 'validator';
import firebase from 'firebase';
import i18n from 'i18n-js';

import FormHeader from '../labels/FormHeader';
import FormOptionSelector from '../labels/FormOptionSelector';
import UserSelectionDropdown from '../buttons/UserSelectionDropdown';
import CancelButton from '../buttons/CancelButton';
import ConfirmButton from '../buttons/ConfirmButton';

import { setErrUserEmail, setUserEmail } from '../../store/actions/poll';
import DeleteFab from '../buttons/DeleteFab';
import { setAllUsersObject, setSelectedUserObject } from '../../store/actions/user';
import { BottomSheet } from 'react-native-elements';

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: '25@s',
  },
  content: {
    height: '250@s',
    justifyContent: 'space-between',
    alignItems: 'center',
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

  const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);
  const [bottomList, setBottomList] = useState([]);

  const isKeyboardOpen = useSelector((state) => state.core.isKeyboardOpen);

  const allUsersObject = useSelector((state) => state.user.allUsersObject);
  const selectedUserObject = useSelector((state) => state.user.selectedUserObject);

  const validateAndSetUserEmail = (val) => {
    if (isEmpty(val)) dispatch(setErrUserEmail(t('errNotFilled')));
    else if (!isEmail(val)) dispatch(setErrUserEmail(t('errNotEmail')));
    else dispatch(setErrUserEmail());

    dispatch(setUserEmail(val));
  };

  firebase
    .database()
    .ref('users')
    .once('value', (snapshot) => {
      dispatch(setAllUsersObject(snapshot.val()));
    });

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <FormHeader label={t('userSelection')} />
        <UserSelectionDropdown
          users={allUsersObject}
          onSelect={(user) => setSelectedUserObject(user)}
        />

        <DeleteFab onPress={() => onGoDeleteUser()} />
      </ScrollView>

      {!isKeyboardOpen && (
        <View style={styles.buttonContainer}>
          <CancelButton onPress={() => onGoAdmin()} />
          <ConfirmButton onPress={() => {}} />
        </View>
      )}
    </View>
  );
};

export default EditUserForm;
