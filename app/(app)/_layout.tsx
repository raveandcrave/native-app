import { authAtom } from '@/entities/auth/model/auth.state';
import MenuButton from '@/features/layout/ui/MenuButton/MenuButton';
import { Colors, Fonts } from '@/shared/tokens';
import { Redirect } from 'expo-router';
import { Drawer } from 'expo-router/drawer';
import { useAtomValue } from 'jotai';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StyleSheet } from 'react-native';
import CustomDrawer from '@/entities/layout/ui/CustomDrawer/CustomDrawer';

export default function AppLayout() {
  const { access_token } = useAtomValue(authAtom);

  if (!access_token) {
    return <Redirect href="/login" />;
  }

  return (
    <GestureHandlerRootView style={styles.gestureView}>
      <Drawer
        drawerContent={(props) => <CustomDrawer {...props} />}
        screenOptions={({ navigation }) => ({
          headerStyle: {
            backgroundColor: Colors.blackLight,
          },
          headerLeft: () => <MenuButton navigation={navigation} />,
          headerTitleStyle: {
            color: Colors.white,
            fontFamily: Fonts.regular,
            fontSize: Fonts.f20,
          },
          headerTitleAlign: 'center',
          sceneStyle: {
            backgroundColor: Colors.black,
          },
        })}
      >
        <Drawer.Screen
          name="index"
          options={{
            title: 'Мои курсы',
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  gestureView: {
    flex: 1,
  },
});
