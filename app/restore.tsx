import { Colors } from '@/shared/tokens';
import { Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Restore() {
  return (
    <SafeAreaView>
      <Text style={{ color: Colors.white }}>Restore</Text>
    </SafeAreaView>
  );
}
