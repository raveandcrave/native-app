import {
  Pressable,
  PressableProps,
  Text,
  StyleSheet,
  Animated,
  GestureResponderEvent,
} from "react-native";
import { Colors, Fonts, Radius } from "../tokens";

const Button = ({ text, ...props }: PressableProps & { text: string }) => {
  const animatedValue = new Animated.Value(100);
  const color = animatedValue.interpolate({
    inputRange: [0, 100],
    outputRange: [Colors.primaryHover, Colors.primary],
  });

  const fadeIn = (e: GestureResponderEvent) => {
    Animated.timing(animatedValue, {
      toValue: 0,
      duration: 100,
      useNativeDriver: true,
    }).start();
    props.onPressIn && props.onPressIn(e);
  };

  const fadeOut = (e: GestureResponderEvent) => {
    Animated.timing(animatedValue, {
      toValue: 100,
      duration: 100,
      useNativeDriver: true,
    }).start();
    props.onPressOut && props.onPressOut(e);
  };

  return (
    <Pressable {...props} onPressIn={fadeIn} onPressOut={fadeOut}>
      <Animated.View
        style={{
          ...styles.button,
          backgroundColor: color,
        }}
      >
        <Text style={styles.text}>{text}</Text>
      </Animated.View>
    </Pressable>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    height: 58,
    borderRadius: Radius.r10,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: Fonts.f18,
    color: Colors.white,
  },
});
