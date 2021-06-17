import React from 'react';
import { Button } from 'react-native-elements';
import { ScaledSheet } from 'react-native-size-matters';
import I18n from 'i18n-js';

import { blue } from '../../global/colors';

const styles = ScaledSheet.create({
  container: {
    alignSelf: 'center',
    borderRadius: '21@s',
    height: '42@s',
    width: '115@s',
    // Shadows
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,
    elevation: 9,
    zIndex: 9,
  },
  button: {
    height: '42@s',
    width: '115@s',
    borderRadius: '21@s',
    backgroundColor: blue,
  },
});

const CancelButton = ({ disabled, loading, onPress }) => (
  <Button
    containerStyle={styles.container}
    buttonStyle={[styles.button]}
    title={I18n.t('cancel')}
    disabled={disabled}
    loading={loading}
    onPress={() => onPress()}
    raised
  />
);

export default CancelButton;
