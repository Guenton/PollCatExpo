import React from 'react';
import { View } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import i18n from 'i18n-js';

import FormHeader from '../labels/FormHeader';
import EmailInput from '../inputs/EmailInput';
import PasswordInput from '../inputs/PasswordInput';
import ForgotPasswordButton from '../buttons/ForgotPasswordButton';
import PawButton from '../buttons/PawButton';

const styles = ScaledSheet.create({
  container: { flex: 1, justifyContent: 'space-evenly' },
  inputContainer: { width: '290@s', alignSelf: 'center' },
  email: { marginBottom: '15@s' },
  paw: { alignSelf: 'center' },
});

const LoginForm = () => (
  <View style={styles.container}>
    <FormHeader label={i18n.t('loginFormHeader')} subLabel={i18n.t('loginFormSubHeader')} />

    <View style={styles.inputContainer}>
      <EmailInput containerStyle={styles.email} isGreen />
      <PasswordInput isGreen />
      <ForgotPasswordButton onPress={() => {}} />
    </View>

    <PawButton style={styles.paw} isGreen onPress={() => {}} />
  </View>
);

export default LoginForm;
