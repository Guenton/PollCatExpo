import React from 'react';
import { View } from 'react-native';
import { useSelector } from 'react-redux';
import { ScaledSheet } from 'react-native-size-matters';

const styles = ScaledSheet.create({
  container: {
    width: '290@s',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: '10@s',
  },
});

const ButtonContainer = ({ children }) => {
  const isKeyboardOpen = useSelector((state) => state.core.isKeyboardOpen);
  const alert = useSelector((state) => state.core.alert);

  return <>{!isKeyboardOpen && !alert.text && <View style={styles.container}>{children}</View>}</>;
};

export default ButtonContainer;
