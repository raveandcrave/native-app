import {
  Pressable,
  PressableProps,
  Text,
  StyleSheet,
  View,
} from "react-native";
import { Colors, Fonts, Radius } from "../tokens";

const Button = ({ text, ...props }: PressableProps & { text: string }) => {
  return (
    <Pressable {...props}>
      <View style={styles.button}>
        <Text style={styles.text}>{text}</Text>
      </View>
    </Pressable>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    height: 58,
    backgroundColor: Colors.primary,
    borderRadius: Radius.r10,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: Fonts.f18,
    color: Colors.white,
  },
});
