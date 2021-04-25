import React from 'react';
import { Dimensions, StatusBar, ImageBackground, View } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
  Easing,
} from 'react-native-reanimated';

import { transparent, blueShade } from '../../global/colors';

const bg = require('../../global/images/rectangle-bg.png');
const width = Dimensions.get('window').width;
const styles = ScaledSheet.create({
  container: {
    width,
    height: '250@s',
    borderBottomRightRadius: '35@s',
    borderBottomLeftRadius: '35@s',
  },
  image: {
    flex: 1,
    width,
    overflow: 'hidden',
    borderBottomRightRadius: '35@s',
    borderBottomLeftRadius: '35@s',
  },
  content: {
    flex: 1,
    backgroundColor: blueShade,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const Curtain = ({ children }) => {
  const animHeight = useSharedValue(250);

  const config = {
    duration: 500,
    easing: Easing.bezier(0.5, 0.01, 0, 1),
  };

  const anim = useAnimatedStyle(() => ({
    height: withTiming(animHeight.value, config),
  }));

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor={transparent} animated translucent />

      <Animated.View style={[styles.container, anim]}>
        <ImageBackground style={styles.image} source={bg} resizeMode="cover">
          <View style={styles.content}>{children}</View>
        </ImageBackground>
      </Animated.View>
    </>
  );
};

export default Curtain;
