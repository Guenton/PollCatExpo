import React, { useState, useEffect } from 'react';
import { View, Keyboard } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import i18n from 'i18n-js';

import FormHeader from '../labels/FormHeader';
import EmailInput from '../inputs/EmailInput';
import GradientPawButton from '../buttons/GradientPawButton';
import FormFooter from '../labels/FormFooter';

const styles = ScaledSheet.create({
  container: { flex: 1, justifyContent: 'space-evenly' },
  inputContainer: { width: '290@s', alignSelf: 'center' },
  paw: { alignSelf: 'center' },
});

const ResetRequestFrom = ({ onGoLogin }) => {
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
        label={i18n.t('resetRequestFormHeader')}
        subLabel={i18n.t('resetRequestFormSubHeader')}
      />

      <View style={styles.inputContainer}>
        <EmailInput />
      </View>

      {!isKeyboardOpen && (
        <>
          <GradientPawButton style={styles.paw} variant="reset-request" onPress={() => {}} />

          <FormFooter
            label={i18n.t('rememberYourPassword')}
            boldLabel={i18n.t('login')}
            onPress={() => onGoLogin()}
          />
        </>
      )}
    </View>
  );
};

export default ResetRequestFrom;
