import { StudentCourseDescription } from '@/entities/course/model/course.model';
import { courseAtom, loadCourseAtom } from '@/entities/course/model/course.state';
import { Colors } from '@/shared/tokens';
import CourseCard from '@/widgets/course/ui/CourseCard/CourseCard';
import { useAtomValue, useSetAtom } from 'jotai';
import { useEffect } from 'react';
import { ActivityIndicator, FlatList, RefreshControl, StyleSheet, View } from 'react-native';

export default function MyCourses() {
  const { courses, isLoading } = useAtomValue(courseAtom);
  const loadCourses = useSetAtom(loadCourseAtom);

  useEffect(() => {
    loadCourses();
  }, []);

  const renderCourse = ({ item }: { item: StudentCourseDescription }) => {
    return (
      <View style={styles.item}>
        <CourseCard {...item} />
      </View>
    );
  };

  return (
    <>
      {isLoading && <ActivityIndicator size="large" color={Colors.primary} />}
      {courses.length > 0 && (
        <FlatList
          refreshControl={
            <RefreshControl
              colors={[Colors.primary]}
              tintColor={Colors.primary}
              refreshing={isLoading}
              onRefresh={loadCourses}
            />
          }
          data={courses}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderCourse}
        />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  item: {
    padding: 20,
  },
});
