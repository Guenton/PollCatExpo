import React from 'react';
import { View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { ScaledSheet } from 'react-native-size-matters';
import firebase from 'firebase';
import I18n from 'i18n-js';

import AvatarSelect from '../inputs/AvatarSelect';
import LogoutButton from '../buttons/LogoutButton';
import SwitchButton from '../buttons/SwitchButton';

import { toggleNotifications } from '../../store/actions/user';
import { setLoading, toggleDark } from '../../store/actions/core';
import { ScrollView } from 'react-native';

const styles = ScaledSheet.create({
  container: {
    marginTop: '-20@s',
  },
  content: {
    paddingTop: '20@s',
    height: '475@s',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
});

const UserForm = ({ onGoLogin }) => {
  const { t } = I18n;
  const dispatch = useDispatch();
  const notifications = useSelector((state) => state.user.notifications);
  const isDark = useSelector((state) => state.core.isDark);

  const firebaseSignOut = async () => {
    try {
      dispatch(setLoading());
      await firebase.auth().signOut();
      dispatch(setLoading(false));
      onGoLogin();
    } catch (err) {
      dispatch(setLoading(false));
      console.error(err);
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <AvatarSelect />

      <LogoutButton onPress={() => firebaseSignOut()} />

      <SwitchButton
        label={t('notifications')}
        icon="bell"
        isOn={notifications}
        onPress={() => dispatch(toggleNotifications())}
      />

      <SwitchButton
        label={t('darkMode')}
        icon="moon"
        isOn={isDark}
        onPress={() => dispatch(toggleDark())}
      />
    </ScrollView>
  );
};

export default UserForm;
