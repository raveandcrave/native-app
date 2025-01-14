import { logoutAtom } from '@/entities/auth/model/auth.state';
import CloseDrawer from '@/features/layout/ui/CloseDrawer/CloseDrawer';
import CustomLink from '@/shared/CustomLink/CustomLink';
import { Colors, Gaps } from '@/shared/tokens';
import { DrawerContentComponentProps, DrawerContentScrollView } from '@react-navigation/drawer';
import { useSetAtom } from 'jotai';
import { View, Text, StyleSheet, Image } from 'react-native';

const CustomDrawer = (props: DrawerContentComponentProps) => {
  const logout = useSetAtom(logoutAtom);

  return (
    <DrawerContentScrollView {...props} contentContainerStyle={styles.scrollView}>
      <View style={styles.content}>
        <CloseDrawer navigation={props.navigation} />
        <Text>Text</Text>
      </View>
      <View style={styles.footer}>
        <CustomLink text="Выход" href="/login" onPress={logout} />
        <Image style={styles.logo} source={require('../../../../assets/images/logo.png')} resizeMode="contain" />
      </View>
    </DrawerContentScrollView>
  );
};

export default CustomDrawer;

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.black,
    flex: 1,
  },
  content: {
    flex: 1,
  },
  footer: {
    alignItems: 'center',
    gap: Gaps.g50,
    marginBottom: 40,
  },
  logo: {
    width: 160,
  },
});
