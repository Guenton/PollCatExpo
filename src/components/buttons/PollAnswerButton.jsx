import React from 'react';
import { Pressable, View } from 'react-native';
import { ScaledSheet, scale } from 'react-native-size-matters';
import { Icon } from 'react-native-elements';

import FormText from '../labels/FormText';

import { white, blue, green } from '../../global/colors';

const styles = ScaledSheet.create({
  container: {
    flexDirection: 'row',
    height: '60@s',
    width: '300@s',
    padding: '10@s',
    borderRadius: '10@s',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: white,
    // Shadows
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,
    elevation: 11,
    zIndex: 11,
  },
  leftBox: {
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  label: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    marginRight: '20@s',
  },
});

const PollAnswerButton = ({ style, label, onPress }) => {
  return (
    <Pressable style={[styles.container, style]} onPress={() => onPress()}>
      <View style={styles.leftBox}>
        <Icon type="font-awesome-5" name="check-circle" size={scale(23)} color={blue} solid />
      </View>
      <FormText label={label} containerStyle={styles.label} />
    </Pressable>
  );
};

export default PollAnswerButton;
