import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Image, Pressable } from 'react-native';
import { ScaledSheet, scale } from 'react-native-size-matters';
import { Icon } from 'react-native-elements';
import * as ImagePicker from 'expo-image-picker';

import SubHeader from '../labels/SubHeader';

import { setAvatarUri } from '../../store/actions/user';

import { grey, white } from '../../global/colors';

const styles = ScaledSheet.create({
  container: {
    height: '90@s',
    width: '90@s',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  avatar: {
    height: '80@s',
    width: '80@s',
    borderRadius: '40@s',
  },
});

const AvatarSelect = () => {
  const dispatch = useDispatch();
  const avatarUri = useSelector((state) => state.user.avatarUri);

  const openImagePickerAsync = async () => {
    try {
      const { granted } = await ImagePicker.requestCameraPermissionsAsync();
      if (!granted) return;

      const result = await ImagePicker.launchCameraAsync();
      if (!result.cancelled) dispatch(setAvatarUri(result.uri));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Pressable style={styles.container} onPress={openImagePickerAsync}>
      {!!avatarUri && <Image source={{ uri: avatarUri }} style={styles.avatar} />}

      {!avatarUri && (
        <Icon
          type="font-awesome-5"
          name="user-alt"
          size={scale(30)}
          color={grey}
          reverseColor={white}
          reverse
          raised
        />
      )}

      <SubHeader label="Change Image" />
    </Pressable>
  );
};

export default AvatarSelect;
