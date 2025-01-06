import Button from "@/shared/Button/Button";
import Input from "@/shared/Input/Input";
import { Colors, Gaps } from "@/shared/tokens";
import { useNavigation } from "expo-router";
import { useEffect } from "react";
import { Text, View, StyleSheet, Image } from "react-native";

export default function Index() {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Image
          style={styles.logo}
          source={require("../assets/images/logo.png")}
          resizeMode="contain"
        />
        <View style={styles.form}>
          <Input placeholder="Email" />
          <Input isPassword placeholder="Пароль" />
          <Button text="Войти" />
        </View>
        <Text>Восстановить пароль</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 55,
    justifyContent: "center",
    backgroundColor: Colors.black,
  },
  content: {
    gap: Gaps.g50,
    alignItems: "center",
  },
  logo: {
    width: 220,
  },
  form: {
    gap: Gaps.g16,
    alignSelf: "stretch",
  },
  button: {
    backgroundColor: "#6C38CC",
    borderRadius: 10,
  },
});
