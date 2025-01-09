import { Colors } from '@/shared/tokens';
import { useLocalSearchParams } from 'expo-router';
import { Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function CoursePage() {
  const { alias } = useLocalSearchParams();

  return (
    <SafeAreaView>
      <Text style={{ color: Colors.white }}>{alias}</Text>
    </SafeAreaView>
  );
}
