import MenuIcon from '@/assets/icons/menu';
import { Colors } from '@/shared/tokens';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { ParamListBase } from '@react-navigation/native';
import { useState } from 'react';
import { Pressable, PressableProps, View, StyleSheet } from 'react-native';

const MenuButton = ({
  navigation,
  ...props
}: PressableProps & { navigation: DrawerNavigationProp<ParamListBase, string, undefined> }) => {
  const [clicked, setClicked] = useState<boolean>(false);

  return (
    <Pressable
      {...props}
      onPressIn={() => setClicked(true)}
      onPressOut={() => setClicked(false)}
      onPress={() => navigation.toggleDrawer()}
    >
      <View style={{ ...styles.button, backgroundColor: clicked ? Colors.violetDark : Colors.blackLight }}>
        <MenuIcon />
      </View>
    </Pressable>
  );
};

export default MenuButton;

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
});
