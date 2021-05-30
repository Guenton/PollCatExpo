import React, { useState, useEffect } from 'react';
import { View, Keyboard } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import i18n from 'i18n-js';

import FormHeader from '../labels/FormHeader';
import PasswordInput from '../inputs/PasswordInput';
import GradientPawButton from '../buttons/GradientPawButton';
import FormFooter from '../labels/FormFooter';
import ResetCodeInput from '../inputs/ResetCodeInput';

const styles = ScaledSheet.create({
  container: { flex: 1, justifyContent: 'space-evenly' },
  inputContainer: { width: '290@s', alignSelf: 'center' },
  input: { marginBottom: '18@s' },
  paw: { alignSelf: 'center' },
});

const ResetConfirmFrom = ({ onGoReset }) => {
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);

  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', () => setIsKeyboardOpen(true));
    Keyboard.addListener('keyboardDidHide', () => setIsKeyboardOpen(false));
    return () => {
      Keyboard.removeListener('keyboardDidShow', () => setIsKeyboardOpen(true));
      Keyboard.removeListener('keyboardDidHide', () => setIsKeyboardOpen(false));
    };
  }, []);

  return (
    <View style={styles.container}>
      <FormHeader
        label={i18n.t('resetConfirmFormHeader')}
        subLabel={i18n.t('resetConfirmFormSubHeader')}
      />

      <View style={styles.inputContainer}>
        <ResetCodeInput containerStyle={styles.input} />
        <PasswordInput isNew />
      </View>

      {!isKeyboardOpen && (
        <>
          <GradientPawButton style={styles.paw} variant="reset-confirm" onPress={() => {}} />

          <FormFooter
            label={i18n.t('noCodeReceived')}
            boldLabel={i18n.t('requestAgain')}
            onPress={() => onGoReset()}
          />
        </>
      )}
    </View>
  );
};

export default ResetConfirmFrom;
