import { Colors } from '@/shared/tokens';
import { useReactNavigationDevTools } from '@dev-plugins/react-navigation';
import { useFonts } from 'expo-font';
import { Stack, useNavigationContainerRef } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    FiraSans: require('../assets/fonts/FiraSans-Regular.ttf'),
    FiraSansSemiBold: require('../assets/fonts/FiraSans-SemiBold.ttf'),
  });

  //Navigation DevTools It doesn't affect your production bundle.
  const navigationRef = useNavigationContainerRef();
  useReactNavigationDevTools(navigationRef);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  useEffect(() => {
    if (error) {
      throw error;
    }
  }, [error]);

  if (!loaded) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          headerShown: false,
          statusBarBackgroundColor: Colors.black,
          contentStyle: {
            backgroundColor: Colors.black,
          },
        }}
      >
        <Stack.Screen name="login" />
        <Stack.Screen
          name="restore"
          options={{
            presentation: 'modal',
          }}
        />
      </Stack>
    </SafeAreaProvider>
  );
}
