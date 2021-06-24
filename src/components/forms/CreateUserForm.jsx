import React, { createRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import { isEmpty, isEmail } from 'validator';
import firebase from 'firebase';
import i18n from 'i18n-js';

import FormHeader from '../labels/FormHeader';
import EmailInput from '../inputs/EmailInput';
import FormOptionSelector from '../labels/FormOptionSelector';
// import DropdownButton from '../buttons/DropdownButton';
import CancelButton from '../buttons/CancelButton';
import ConfirmButton from '../buttons/ConfirmButton';

import { setErrUserEmail, setUserEmail } from '../../store/actions/poll';

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

const CreateUserForm = ({ onGoAdmin }) => {
  const { t } = i18n;
  const dispatch = useDispatch();

  const isKeyboardOpen = useSelector((state) => state.core.isKeyboardOpen);

  const userEmailRef = createRef();
  const userEmail = useSelector((state) => state.poll.userEmail);
  const errUserEmail = useSelector((state) => state.poll.errUserEmail);

  const shakeOnError = () => {
    if (errUserEmail) userEmailRef.current.shake();
  };

  const validateAndSetUserEmail = (val) => {
    if (isEmpty(val)) dispatch(setErrUserEmail(t('errNotFilled')));
    else if (!isEmail(val)) dispatch(setErrUserEmail(t('errNotEmail')));
    else dispatch(setErrUserEmail());

    dispatch(setUserEmail(val));
  };

  const signupWithFirebase = async () => {
    validateAndSetUserEmail(userEmail);

    if (errUserEmail) return shakeOnError();
    if (userEmail) {
      try {
        dispatch(setLoading());
        await firebase.auth().createUserWithEmailAndPassword(email, password);

        const canStore = await SecureStore.isAvailableAsync();
        if (canStore) await SecureStore.setItemAsync('email', email);
        if (canStore) await SecureStore.setItemAsync('password', password);

        const firstName = email.split('.')[0];
        const lastName = email.split('.')[1].split('@')[0];
        dispatch(setFirstName(firstName));
        dispatch(setLastName(lastName));

        dispatch(setPassword());
        dispatch(setPasswordConfirm());
        dispatch(setLoading(false));
        onGoMain();
      } catch (err) {
        dispatch(setLoading(false));
        console.error(err);
        console.log(err.code);
        console.log(err.message);
      }
    }
  };

  return (
    <View style={styles.container}>
      <FormHeader label={t('userSetup')} />

      <View style={styles.inputContainer}>
        <EmailInput
          inputRef={userEmailRef}
          containerStyle={styles.input}
          value={userEmail}
          errorMessage={errUserEmail}
          onBlur={() => shakeOnError()}
          onChange={(val) => validateAndSetUserEmail(val)}
        />
      </View>

      <View>
        <FormOptionSelector
          label={t('userRights')}
          boldLabel={t('notSelected')}
          onPress={() => {}}
        />
        {/* <DropdownButton icon="user-shield" label={t('userRights')} onPress={() => {}} /> */}
      </View>

      {!isKeyboardOpen && (
        <View style={styles.buttonContainer}>
          <CancelButton onPress={() => onGoAdmin()} />
          <ConfirmButton onPress={() => {}} />
        </View>
      )}
    </View>
  );
};

export default CreateUserForm;
