import { profileAtom } from '@/entities/user/model/user.state';
import { useAtom } from 'jotai';
import { Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function MyCourses() {
  const [profile] = useAtom(profileAtom);

  return (
    <SafeAreaView>
      <Text>{profile.profile?.name}</Text>
    </SafeAreaView>
  );
}
