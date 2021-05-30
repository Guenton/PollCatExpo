import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { View, Keyboard } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import i18n from 'i18n-js';

import FormHeader from '../labels/FormHeader';
import EmailInput from '../inputs/EmailInput';
import PasswordInput from '../inputs/PasswordInput';
import GradientPawButton from '../buttons/GradientPawButton';
import FormFooter from '../labels/FormFooter';

import { setEmail, setPassword, setPasswordConfirm } from '../../store/actions/auth';

const styles = ScaledSheet.create({
  container: { flex: 1, justifyContent: 'space-evenly' },
  inputContainer: { width: '290@s', alignSelf: 'center' },
  input: { marginBottom: '18@s' },
  paw: { alignSelf: 'center' },
});

const SignupForm = ({ onGoLogin }) => {
  const dispatch = useDispatch();

  const email = useSelector((state) => state.auth.email);
  const password = useSelector((state) => state.auth.password);
  const passwordConfirm = useSelector((state) => state.auth.passwordConfirm);

  const [isFocusedEmail, setIsFocusedEmail] = useState(false);
  const [isFocusedPassword, setIsFocusedPassword] = useState(false);
  const [isFocusedPasswordConfirm, setIsFocusedPasswordConfirm] = useState(false);

  const setInputFocus = (input = 'email') => {
    switch (input) {
      case 'email':
        setIsFocusedEmail(true);
        setIsFocusedPassword(false);
        setIsFocusedPasswordConfirm(false);
        break;
      case 'password':
        setIsFocusedEmail(false);
        setIsFocusedPassword(true);
        setIsFocusedPasswordConfirm(false);
        break;
      case 'passwordConfirm':
        setIsFocusedEmail(false);
        setIsFocusedPassword(false);
        setIsFocusedPasswordConfirm(true);
        break;
      default:
        break;
    }
  };

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
      <FormHeader label={i18n.t('signupFormHeader')} subLabel={i18n.t('signupFormSubHeader')} />

      <View style={styles.inputContainer}>
        <EmailInput
          containerStyle={styles.input}
          value={email}
          onChange={(val) => dispatch(setEmail(val))}
          isFocused={isFocusedEmail}
          onBlur={() => setInputFocus('password')}
        />
        <PasswordInput
          containerStyle={styles.input}
          value={password}
          onChange={(val) => dispatch(setPassword(val))}
          isFocused={isFocusedPassword}
          onBlur={() => setInputFocus('passwordConfirm')}
        />
        <PasswordInput
          isConfirm
          value={passwordConfirm}
          onChange={(val) => dispatch(setPasswordConfirm(val))}
          isFocused={isFocusedPasswordConfirm}
        />
      </View>

      {!isKeyboardOpen && (
        <>
          <GradientPawButton style={styles.paw} variant="signup" onPress={() => {}} />

          <FormFooter
            label={i18n.t('alreadySignedUp')}
            boldLabel={i18n.t('login')}
            onPress={() => onGoLogin()}
          />
        </>
      )}
    </View>
  );
};

export default SignupForm;
