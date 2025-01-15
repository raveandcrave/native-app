import { logoutAtom } from '@/entities/auth/model/auth.state';
import { loadProfileAtom } from '@/entities/user/model/user.state';
import UserMenu from '@/entities/user/ui/UserMenu/UserMenu';
import CloseDrawer from '@/features/layout/ui/CloseDrawer/CloseDrawer';
import CustomLink from '@/shared/CustomLink/CustomLink';
import { Colors, Gaps } from '@/shared/tokens';
import { DrawerContentComponentProps, DrawerContentScrollView } from '@react-navigation/drawer';
import { useAtom, useSetAtom } from 'jotai';
import { useEffect } from 'react';
import { View, StyleSheet, Image } from 'react-native';

const CustomDrawer = (props: DrawerContentComponentProps) => {
  const logout = useSetAtom(logoutAtom);
  const [profile, loadProfile] = useAtom(loadProfileAtom);

  useEffect(() => {
    loadProfile();
  }, []);

  return (
    <DrawerContentScrollView {...props} contentContainerStyle={styles.scrollView}>
      <View style={styles.content}>
        <CloseDrawer navigation={props.navigation} />
        <UserMenu user={profile.profile} />
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
