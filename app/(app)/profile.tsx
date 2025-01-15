import { Colors } from '@/shared/tokens';
import { Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ProfilePage() {
  return (
    <SafeAreaView>
      <Text style={{ color: Colors.white }}>Profile</Text>
    </SafeAreaView>
  );
}
