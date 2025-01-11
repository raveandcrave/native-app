import { logoutAtom } from '@/entities/auth/model/auth.state';
import { useSetAtom } from 'jotai';
import { Pressable, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function MyCourses() {
  const logout = useSetAtom(logoutAtom);

  return (
    <SafeAreaView>
      <Pressable onPress={() => logout()}>
        <Text>logout</Text>
      </Pressable>
    </SafeAreaView>
  );
}
