import React from 'react';
import { View } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import i18n from 'i18n-js';

import FormHeader from '../labels/FormHeader';
import EmailInput from '../inputs/EmailInput';
import PasswordInput from '../inputs/PasswordInput';
import GradientPawButton from '../buttons/GradientPawButton';
import FormFooter from '../labels/FormFooter';

const styles = ScaledSheet.create({
  container: { flex: 1, justifyContent: 'space-evenly' },
  inputContainer: { width: '290@s', alignSelf: 'center' },
  input: { marginBottom: '18@s' },
  paw: { alignSelf: 'center' },
});

const SignupForm = ({ onGoLogin }) => (
  <View style={styles.container}>
    <FormHeader label={i18n.t('signupFormHeader')} subLabel={i18n.t('signupFormSubHeader')} />

    <View style={styles.inputContainer}>
      <EmailInput containerStyle={styles.input} />
      <PasswordInput containerStyle={styles.input} />
      <PasswordInput isConfirm />
    </View>

    <GradientPawButton style={styles.paw} variant="signup" onPress={() => {}} />

    <FormFooter
      label={i18n.t('alreadySignedUp')}
      boldLabel={i18n.t('login')}
      onPress={() => onGoLogin()}
    />
  </View>
);

export default SignupForm;
