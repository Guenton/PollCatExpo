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
  paw: { alignSelf: 'center' },
});

const ResetRequestFrom = ({ onGoLogin }) => (
  <View style={styles.container}>
    <FormHeader
      label={i18n.t('resetRequestFormHeader')}
      subLabel={i18n.t('resetRequestFormSubHeader')}
    />

    <View style={styles.inputContainer}>
      <EmailInput />
    </View>

    <GradientPawButton style={styles.paw} variant="reset-request" onPress={() => {}} />

    <FormFooter
      label={i18n.t('rememberYourPassword')}
      boldLabel={i18n.t('login')}
      onPress={() => onGoLogin()}
    />
  </View>
);

export default ResetRequestFrom;
