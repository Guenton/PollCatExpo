import React from 'react';
import { Dimensions, StatusBar, ImageBackground, View } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import { useSpring, animated } from 'react-spring';

import { transparent, blueShade, greenShade, pinkShade } from '../../global/colors';

const AnimatedView = animated(View);
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

const Curtain = ({ children, color, height }) => {
  const animateColor = () => {
    if (color === 'green') return { ...styles.content, backgroundColor: greenShade };
    else if (color === 'pink') return { ...styles.content, backgroundColor: pinkShade };
    else return styles.content;
  };

  const colorize = useSpring({
    to: animateColor(),
    from: styles.content,
    config: { duration: 750 },
  });

  const resize = useSpring({
    to: { ...styles.container, height },
    from: styles.container,
  });

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor={transparent} animated translucent />

      <AnimatedView style={resize}>
        <ImageBackground style={styles.image} source={bg} resizeMode="cover">
          <AnimatedView style={colorize}>{children}</AnimatedView>
        </ImageBackground>
      </AnimatedView>
    </>
  );
};

export default Curtain;
