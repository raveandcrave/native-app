import { Colors, Fonts } from '@/shared/tokens';
import { StyleSheet, View, Text } from 'react-native';

interface CourseProgressProps {
  totalLessons: number;
  passedLessons: number;
}

const CourseProgress = ({ totalLessons, passedLessons }: CourseProgressProps) => {
  const percent = Math.round((passedLessons / totalLessons) * 100);

  return (
    <View style={styles.wrapper}>
      <View style={styles.head}>
        <Text style={styles.textPercent}>{percent}%</Text>
        <Text style={styles.textCount}>
          {passedLessons}/{totalLessons}
        </Text>
      </View>
      <View style={styles.bar}>
        <View style={[styles.progress, { width: `${percent}%` }]} />
      </View>
    </View>
  );
};

export default CourseProgress;

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 18,
  },
  head: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  textPercent: {
    fontSize: Fonts.f16,
    fontFamily: Fonts.regular,
    color: Colors.secondary,
  },
  textCount: {
    fontSize: Fonts.f12,
    fontFamily: Fonts.regular,
    color: Colors.grayLight,
  },
  bar: {
    height: 5,
    borderRadius: 20,
    backgroundColor: Colors.border,
  },
  progress: {
    height: 5,
    borderRadius: 20,
    backgroundColor: Colors.secondary,
  },
});
