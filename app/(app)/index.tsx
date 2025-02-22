import { StudentCourseDescription } from '@/entities/course/model/course.model';
import { courseAtom, loadCourseAtom } from '@/entities/course/model/course.state';
import Button from '@/shared/Button/Button';
import { Colors } from '@/shared/tokens';
import CourseCard from '@/widgets/course/ui/CourseCard/CourseCard';
import { useAtomValue, useSetAtom } from 'jotai';
import { useEffect } from 'react';
import { ActivityIndicator, FlatList, RefreshControl, StyleSheet, View } from 'react-native';
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import Constants from 'expo-constants';

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

  const allowsNotification = async () => {
    const settings = await Notifications.getPermissionsAsync();
    return settings.granted || settings.ios?.status == Notifications.IosAuthorizationStatus.PROVISIONAL;
  };

  const requestPermissions = async () => {
    return Notifications.requestPermissionsAsync({
      ios: {
        allowAlert: true,
        allowBadge: true,
        allowSound: true,
      },
    });
  };

  const scheduleNotification = async () => {
    const granted = await allowsNotification();

    if (!granted) {
      await requestPermissions();
    }

    const projectId = Constants?.expoConfig?.extra?.eas?.projectId ?? Constants?.easConfig?.projectId;

    if (Device.isDevice) {
      const token = await Notifications.getExpoPushTokenAsync({
        projectId,
      });

      console.log('token', token);
    }

    // await Notifications.cancelAllScheduledNotificationsAsync();

    // const res = await Notifications.getAllScheduledNotificationsAsync();

    // console.log('res', res);

    // await Notifications.scheduleNotificationAsync({
    //   content: {
    //     title: 'Не забудь пройти курс',
    //     subtitle: 'test subtitle',
    //     body: 'Учись каждый день сука!',
    //     data: {
    //       alias: 'typescript',
    //     },
    //   },
    //   trigger: {
    //     seconds: 5,
    //     type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
    //     repeats: false,
    //   },
    // });

    // console.log('notificationId ', notificationId);
  };

  return (
    <>
      {isLoading && <ActivityIndicator size="large" color={Colors.primary} />}
      <Button text="Напомнить" onPress={scheduleNotification} />
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
