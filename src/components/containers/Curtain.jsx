import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dimensions, StatusBar, ImageBackground, View, Platform } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import { useSpring, animated } from 'react-spring';

import { setCurtainColor, setCurtainHeight } from '../../store/actions/animation';

import { transparent } from '../../global/colors';

const backgroundImage = require('../../global/images/rectangle-bg.png');
const isIosDevice = Platform.OS === 'ios' ? true : false;
const deviceWindowWidth = Dimensions.get('window').width;

const styles = ScaledSheet.create({
  container: {
    width: deviceWindowWidth,
    marginTop: isIosDevice ? '-45@s' : '-1@s',
    borderBottomRightRadius: '35@s',
    borderBottomLeftRadius: '35@s',
    // Shadows
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
  },
  image: {
    flex: 1,
    width: deviceWindowWidth,
    overflow: 'hidden',
    borderBottomRightRadius: '35@s',
    borderBottomLeftRadius: '35@s',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const AnimatedView = animated(View);

const Curtain = ({ children, color, height }) => {
  const dispatch = useDispatch();
  const curtain = useSelector((state) => state.animation.curtain);

  const transitionBackgroundColor = useSpring({
    to: { ...styles.content, backgroundColor: color },
    from: { ...styles.content, backgroundColor: curtain.color },
    config: { duration: 750 },
    onRest: () => dispatch(setCurtainColor(color)),
  });

  const transitionCurtainHeight = useSpring({
    to: { ...styles.container, height },
    from: { ...styles.container, height: curtain.height },
    onRest: () => dispatch(setCurtainHeight(height)),
  });

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor={transparent} animated translucent />

      <AnimatedView style={transitionCurtainHeight}>
        <ImageBackground style={styles.image} source={backgroundImage} resizeMode="cover">
          <AnimatedView style={transitionBackgroundColor}>{children}</AnimatedView>
        </ImageBackground>
      </AnimatedView>
    </>
  );
};

export default Curtain;
