import React from 'react';
import { useSelector } from 'react-redux';
import { View } from 'react-native';
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
  const isKeyboardOpen = useSelector((state) => state.core.isKeyboardOpen);
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
