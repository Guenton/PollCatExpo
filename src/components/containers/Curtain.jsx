import React from 'react';
import { connect } from 'react-redux';
import { Dimensions, StatusBar, ImageBackground, View, Platform } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import { useSpring, animated } from 'react-spring';

import { setCurtainColor, setCurtainHeight } from '../../store/actions/animation';

import { transparent } from '../../global/colors';

const AnimatedView = animated(View);
const bg = require('../../global/images/rectangle-bg.png');

const isIos = Platform.OS === 'ios' ? true : false;
const width = Dimensions.get('window').width;
const styles = ScaledSheet.create({
  container: {
    width,
    marginTop: isIos ? '-40@s' : '-1@s',
    borderBottomRightRadius: '35@s',
    borderBottomLeftRadius: '35@s',

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
    width,
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

const Curtain = ({ children, color, height, curtainState, setCurtainColor, setCurtainHeight }) => {
  const colorize = useSpring({
    to: { ...styles.content, backgroundColor: color },
    from: { ...styles.content, backgroundColor: curtainState.color },
    config: { duration: 750 },
    onRest: () => setCurtainColor(color),
  });

  const resize = useSpring({
    to: { ...styles.container, height },
    from: { ...styles.container, height: curtainState.height },
    onRest: () => setCurtainHeight(height),
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

const mapStateToProps = (state) => ({ curtainState: state.animation.curtain });
const mapDispatchToProps = { setCurtainColor, setCurtainHeight };

export default connect(mapStateToProps, mapDispatchToProps)(Curtain);
