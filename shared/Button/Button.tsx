import { Pressable, PressableProps, Text, StyleSheet, GestureResponderEvent } from 'react-native';
import { Colors, Fonts, Radius } from '../tokens';
import Animated, { useSharedValue, interpolateColor, useAnimatedStyle, withTiming } from 'react-native-reanimated';

const Button = (props: PressableProps & { text: string }) => {
  const { text, onPressIn, onPressOut } = props;

  const colorProgress = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(colorProgress.value, [0, 1], [Colors.primary, Colors.primaryHover]);
    return { backgroundColor };
  });

  const fadeIn = (e: GestureResponderEvent) => {
    colorProgress.value = withTiming(1, { duration: 100 });

    if (onPressIn) {
      onPressIn(e);
    }
  };

  const fadeOut = (e: GestureResponderEvent) => {
    colorProgress.value = withTiming(0, { duration: 100 });

    if (onPressOut) {
      onPressOut(e);
    }
  };

  return (
    <Pressable {...props} onPressIn={fadeIn} onPressOut={fadeOut}>
      <Animated.View style={[styles.button, animatedStyle]}>
        <Text style={styles.text}>{text}</Text>
      </Animated.View>
    </Pressable>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    borderRadius: Radius.r10,
    height: 58,
    justifyContent: 'center',
  },
  text: {
    color: Colors.white,
    fontFamily: Fonts.regular,
    fontSize: Fonts.f18,
  },
});
