import { StudentCourseDescription } from '@/entities/course/model/course.model';
import { courseAtom, loadCourseAtom } from '@/entities/course/model/course.state';
import CourseCard from '@/widgets/course/ui/CourseCard/CourseCard';
import { useAtomValue, useSetAtom } from 'jotai';
import { useEffect } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';

export default function MyCourses() {
  const { courses } = useAtomValue(courseAtom);
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
    courses.length > 0 && (
      <FlatList data={courses} keyExtractor={(item) => item.id.toString()} renderItem={renderCourse} />
    )
  );
}

const styles = StyleSheet.create({
  item: {
    padding: 20,
  },
});
