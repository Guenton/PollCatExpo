import React from 'react';
import { Image, View } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';

const guentonImage = require('../../global/images/guenton.png');

const styles = ScaledSheet.create({
  container: {
    alignSelf: 'flex-end',
    marginRight: '2@s',
  },
  image: {
    height: '21@s',
    width: '66@s',
  },
});

const GuenTon = ({ containerStyle, style }) => (
  <View style={[styles.container, containerStyle]}>
    <Image style={[styles.image, style]} source={guentonImage} />
  </View>
);

export default GuenTon;
