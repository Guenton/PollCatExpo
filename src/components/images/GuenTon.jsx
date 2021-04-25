import React from 'react';
import { Image, View } from 'react-native';
import { scale, ScaledSheet } from 'react-native-size-matters';

const guenton = require('../../global/images/guenton.png');

const styles = ScaledSheet.create({
  container: {
    alignSelf: 'flex-end',
  },
  image: {
    height: '28@s',
    width: '100@s',
  },
});

const GuenTon = ({ containerStyle, style }) => (
  <View style={[styles.container, containerStyle]}>
    <Image style={[styles.image, style]} source={guenton} />
  </View>
);

export default GuenTon;
