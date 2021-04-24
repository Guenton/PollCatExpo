import React from 'react';
import { Dimensions, View, Button } from 'react-native';
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
  Easing,
} from 'react-native-reanimated';

const width = Dimensions.get('window').width;

const Curtain = (props) => {
  const animHeight = useSharedValue(150);

  const config = {
    duration: 500,
    easing: Easing.bezier(0.5, 0.01, 0, 1),
  };

  const style = useAnimatedStyle(() => ({
    height: withTiming(animHeight.value, config),
  }));

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
      }}>
      <Animated.View
        style={[
          {
            width: 250,
            height: 250,
            alignSelf: 'center',
            backgroundColor: 'black',
            marginTop: 100,
          },
          style,
        ]}
      />
      <Button
        title="toggle"
        onPress={() => {
          animHeight.value = Math.random() * 350;
        }}
      />
    </View>
  );
};

export default Curtain;
