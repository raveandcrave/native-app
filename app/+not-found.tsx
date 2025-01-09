import CustomLink from '@/shared/CustomLink/CustomLink';
import { Colors, Fonts, Gaps } from '@/shared/tokens';
import { Text, StyleSheet, Image, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Unmatched() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Image style={styles.image} source={require('../assets/images/unmatched.png')} resizeMode="contain" />
        <Text style={styles.text}>Ооо... что-то пошло не так. Попробуйте вернуться на главный экран приложения</Text>
        <CustomLink href="/" text="На главный экран" />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 55,
  },
  content: {
    alignItems: 'center',
    gap: Gaps.g50,
  },
  image: {
    flex: 0,
    height: 282,
    width: 204,
  },
  text: {
    color: Colors.white,
    fontFamily: Fonts.regular,
    fontSize: Fonts.f18,
    textAlign: 'center',
  },
});
