import React from 'react';
import { View } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';

import AvatarSelect from '../inputs/AvatarSelect';

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
});

const UserForm = () => {
  return (
    <View style={styles.container}>
      <AvatarSelect />
    </View>
  );
};

export default UserForm;
