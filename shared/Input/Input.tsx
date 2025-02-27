import { Pressable, StyleProp, StyleSheet, TextInput, TextInputProps, View, ViewStyle } from 'react-native';
import { Colors, Fonts, Radius } from '../tokens';
import { useState } from 'react';
import EyeOpenedIcon from '@/assets/icons/eye-opened';
import EyeClosedIcon from '@/assets/icons/eye-closed';

const Input = ({
  isPassword,
  containerStyle,
  ...props
}: TextInputProps & { isPassword?: boolean; containerStyle: StyleProp<ViewStyle> }) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);

  return (
    <View style={containerStyle}>
      <TextInput
        style={styles.input}
        placeholderTextColor={Colors.gray}
        secureTextEntry={isPassword && !isPasswordVisible}
        {...props}
      />
      {isPassword && (
        <Pressable style={styles.eyeIcon} onPress={() => setIsPasswordVisible((prev) => !prev)}>
          {isPasswordVisible ? <EyeOpenedIcon /> : <EyeClosedIcon />}
        </Pressable>
      )}
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  eyeIcon: {
    paddingHorizontal: 20,
    paddingVertical: 18,
    position: 'absolute',
    right: 0,
  },
  input: {
    backgroundColor: Colors.violetDark,
    borderRadius: Radius.r10,
    color: Colors.gray,
    fontFamily: Fonts.regular,
    fontSize: Fonts.f16,
    height: 58,
    paddingHorizontal: 24,
  },
});
