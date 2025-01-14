import CloseIcon from '@/assets/icons/close';
import { DrawerNavigationHelpers } from '@react-navigation/drawer/lib/typescript/commonjs/src/types';
import { Pressable, View, StyleSheet } from 'react-native';

const CloseDrawer = ({ navigation }: { navigation: DrawerNavigationHelpers }) => {
  return (
    <Pressable onPress={() => navigation.closeDrawer()}>
      <View style={styles.button}>
        <CloseIcon />
      </View>
    </Pressable>
  );
};

export default CloseDrawer;

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    right: 20,
    top: 20,
  },
});
