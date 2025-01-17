import { View, StyleSheet, Image } from 'react-native';
import { ReactElement, useEffect } from 'react';
import { useAtom, useSetAtom } from 'jotai';
import { Href } from 'expo-router';
import { DrawerContentComponentProps, DrawerContentScrollView } from '@react-navigation/drawer';
import { logoutAtom } from '@/entities/auth/model/auth.state';
import { loadProfileAtom } from '@/entities/user/model/user.state';
import UserMenu from '@/widgets/user/ui/UserMenu/UserMenu';
import CloseDrawer from '@/features/layout/ui/CloseDrawer/CloseDrawer';
import MenuItem from '@/entities/layout/ui/MenuItem/MenuItem';
import CustomLink from '@/shared/CustomLink/CustomLink';
import { Colors, Gaps } from '@/shared/tokens';
import ProfileIcon from '@/assets/menu/profile';
import CoursesIcon from '@/assets/menu/courses';

interface MenuItemType {
  text: string;
  href: Href;
  icon: ReactElement;
}

const MENU: MenuItemType[] = [
  { text: 'Профиль', href: '/profile', icon: <ProfileIcon /> },
  { text: 'Курсы', href: '/', icon: <CoursesIcon /> },
];

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
        <View style={styles.menu}>
          {MENU.map((item) => (
            <MenuItem
              key={item.text}
              navigation={props.navigation}
              icon={item.icon}
              text={item.text}
              href={item.href}
            />
          ))}
        </View>
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
    paddingStart: 0,
    paddingEnd: 0,
  },
  content: {
    flex: 1,
  },
  menu: {
    marginTop: 40,
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
