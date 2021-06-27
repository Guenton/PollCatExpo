import React from 'react';
import { Pressable } from 'react-native';
import { View } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';

import BoldText from './BoldText';
import SubHeader from './SubHeader';

const styles = ScaledSheet.create({
  container: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
    alignItems: 'center',
    marginBottom: '4@s',
  },
  spacing: {
    marginRight: '5@s',
  },
});

const FormOptionSelector = ({ label, boldLabel, onPress }) => (
  <View style={styles.container}>
    <SubHeader label={label} containerStyle={styles.spacing} />

    <Pressable onPress={() => (onPress ? onPress() : {})}>
      <BoldText label={boldLabel} />
    </Pressable>
  </View>
);

export default FormOptionSelector;
