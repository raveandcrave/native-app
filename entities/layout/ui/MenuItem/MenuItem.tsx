import { DrawerNavigationHelpers } from '@react-navigation/drawer/lib/typescript/commonjs/src/types';
import { ReactElement, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Href, usePathname, useRouter } from 'expo-router';
import { Colors, Fonts, Gaps } from '@/shared/tokens';

interface MenuItemProps {
  text: string;
  icon: ReactElement;
  navigation: DrawerNavigationHelpers;
  href: Href;
}

const MenuItem = ({ text, icon, navigation, href }: MenuItemProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const [clicked, setClicked] = useState<boolean>(false);

  const isActive = href === pathname;
  const backgroundColor = clicked ? Colors.blackLight : 'transparent';
  const borderColor = isActive ? Colors.primary : Colors.black;

  const onPress = () => {
    router.navigate(href);
    navigation.closeDrawer();
  };

  return (
    <Pressable onPress={onPress} onPressIn={() => setClicked(true)} onPressOut={() => setClicked(false)}>
      <View style={{ ...styles.container, backgroundColor, borderColor }}>
        {icon}
        <Text style={styles.text}>{text}</Text>
      </View>
    </Pressable>
  );
};

export default MenuItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: Gaps.g10,
    alignItems: 'center',
    paddingVertical: 16,
    paddingLeft: 24,
    paddingRight: 20,
    borderRightWidth: 5,
  },
  text: {
    fontFamily: Fonts.regular,
    fontSize: Fonts.f16,
    color: Colors.white,
  },
});
