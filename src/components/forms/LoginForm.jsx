import React from 'react';
import { View } from 'react-native';
import i18n from 'i18n-js';

import FormHeader from '../labels/FormHeader';
import EmailInput from '../inputs/EmailInput';
import PasswordInput from '../inputs/PasswordInput';

const LoginForm = () => (
  <View style={{ flex: 1, justifyContent: 'space-evenly' }}>
    <FormHeader label={i18n.t('loginFormHeader')} subLabel={i18n.t('loginFormSubHeader')} />

    <View>
      <EmailInput isGreen />
      <PasswordInput isGreen />
    </View>
  </View>
);

export default LoginForm;
