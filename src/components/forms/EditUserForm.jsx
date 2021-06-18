import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import { isEmpty, isEmail } from 'validator';
import firebase from 'firebase';
import i18n from 'i18n-js';

import FormHeader from '../labels/FormHeader';
import FormOptionSelector from '../labels/FormOptionSelector';
import DropdownButton from '../buttons/DropdownButton';
import CancelButton from '../buttons/CancelButton';
import ConfirmButton from '../buttons/ConfirmButton';

import { setErrUserEmail, setUserEmail } from '../../store/actions/poll';
import DeleteFab from '../buttons/DeleteFab';
import { setUserArray } from '../../store/actions/user';
import { BottomSheet } from 'react-native-elements';

const styles = ScaledSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'space-evenly' },
  inputContainer: { width: '310@s' },
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

  const userEmail = useSelector((state) => state.user.userEmail);
  const errUserEmail = useSelector((state) => state.user.errUserEmail);
  const userArray = useSelector((state) => state.user.userArray);

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
      let userArray = [];
      snapshot.forEach((item) => userArray.push(item));
      dispatch(setUserArray(userArray));
    });

  return (
    <View style={styles.container}>
      <FormHeader label={t('editUser')} />

      <View>
        <FormOptionSelector
          label={t('userSelection')}
          boldLabel={t('notSelected')}
          onPress={() => {}}
        />
        <DropdownButton
          icon="user"
          label={t('userSelection')}
          items={userArray}
          onSelect={(val) => console.log(val)}
        />
      </View>

      <DeleteFab onPress={() => onGoDeleteUser()} />

      {!isKeyboardOpen && (
        <View style={styles.buttonContainer}>
          <CancelButton onPress={() => onGoAdmin()} />
          <ConfirmButton onPress={() => {}} />
        </View>
      )}

      <BottomSheet isVisible={isBottomSheetVisible} />
    </View>
  );
};

export default EditUserForm;
