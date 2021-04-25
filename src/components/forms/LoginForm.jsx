import React from 'react';
import { View } from 'react-native';

import FormHeader from '../labels/FormHeader';

const LoginForm = () => (
  <View style={{ flex: 1 }}>
    <FormHeader label="Form Header" subLabel="Sub Label" />
  </View>
);

export default LoginForm;
