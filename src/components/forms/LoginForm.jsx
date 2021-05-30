import React, { useState, useEffect } from 'react';
import { View, Keyboard } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import i18n from 'i18n-js';

import FormHeader from '../labels/FormHeader';
import EmailInput from '../inputs/EmailInput';
import PasswordInput from '../inputs/PasswordInput';
import ForgotPasswordButton from '../buttons/ForgotPasswordButton';
import GradientPawButton from '../buttons/GradientPawButton';
import FormFooter from '../labels/FormFooter';

const styles = ScaledSheet.create({
  container: { flex: 1, justifyContent: 'space-evenly' },
  inputContainer: { width: '290@s', alignSelf: 'center' },
  input: { marginBottom: '18@s' },
  paw: { alignSelf: 'center' },
});

const LoginForm = ({ onGoSignup, onGoReset }) => {
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
      <FormHeader label={i18n.t('loginFormHeader')} subLabel={i18n.t('loginFormSubHeader')} />

      <View style={styles.inputContainer}>
        <EmailInput containerStyle={styles.input} isGreen />
        <PasswordInput isGreen />
        <ForgotPasswordButton onPress={() => onGoReset()} />
      </View>

      {!isKeyboardOpen && (
        <>
          <GradientPawButton style={styles.paw} variant="login" onPress={() => {}} />

          <FormFooter
            label={i18n.t('noAccount')}
            boldLabel={i18n.t('signUp')}
            onPress={() => onGoSignup()}
          />
        </>
      )}
    </View>
  );
};

export default LoginForm;
