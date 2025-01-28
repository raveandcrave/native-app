import { courseAtom, loadCourseAtom } from '@/entities/course/model/course.state';
import { Colors } from '@/shared/tokens';
import { useAtomValue, useSetAtom } from 'jotai';
import { useEffect } from 'react';
import { Text, View } from 'react-native';

export default function MyCourses() {
  const { courses } = useAtomValue(courseAtom);
  const loadCourses = useSetAtom(loadCourseAtom);

  useEffect(() => {
    loadCourses();
  }, []);

  return (
    <View>
      {courses.length > 0 &&
        courses.map((c) => (
          <Text style={{ color: Colors.white }} key={c.id}>
            {c.title}
          </Text>
        ))}
    </View>
  );
}
