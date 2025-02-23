import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import Constants from 'expo-constants';
import { useRouter } from 'expo-router';
import { useEffect } from 'react';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

const Notification = () => {
  const router = useRouter();
  const lastNotificationResponse = Notifications.useLastNotificationResponse();

  const requestPushNotificationPermissions = async () => {
    if (!Device.isDevice) return;

    const { status } = await Notifications.getPermissionsAsync();

    if (status === 'granted') {
      return true;
    }

    if (status === 'denied') {
      return false;
    }

    const { status: newStatus } = await Notifications.requestPermissionsAsync();
    return newStatus === 'granted';
  };

  const handleNotificationResponse = (response: Notifications.NotificationResponse) => {
    const data = response.notification.request.content.data;

    if (!data || !data.type) return;

    //обработка уведомлений в зависимости от типа
    switch (data.type) {
      case 'chat':
        //some logic
        break;
      case 'course':
        console.log('🚀 Переход на курс:', data.alias);
        router.push(`/(app)/course/${data.alias}`);
        break;
      default:
        console.warn('Неизвестный тип уведомления:', data.type);
    }
  };

  const registerForPushNotifications = async () => {
    try {
      const granted = await requestPushNotificationPermissions();

      if (!granted) return;

      const projectId = Constants?.expoConfig?.extra?.eas?.projectId ?? Constants?.easConfig?.projectId;

      const { data: pushToken } = await Notifications.getExpoPushTokenAsync({ projectId });
      console.log('pushToken', pushToken);

      // Отправь pushToken на сервер (раскомментируй, если у тебя есть API)
      // await fetch('https://your-api.com/push-token', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ token: pushToken }),
      // });
    } catch (error) {
      console.error('🚨 Ошибка при регистрации push-уведомлений:', error);
    }
  };

  useEffect(() => {
    registerForPushNotifications();

    // Обработка полученного уведомления (в фоне или при открытом приложении)
    const subReceived = Notifications.addNotificationReceivedListener((notification) => {
      console.log('🔔 Уведомление получено:', notification.request.content.data);
    });

    //  Обработка клика по уведомлению
    const subResponseReceived = Notifications.addNotificationResponseReceivedListener(handleNotificationResponse);

    return () => {
      subReceived.remove();
      subResponseReceived.remove();
    };
  }, []);

  useEffect(() => {
    if (lastNotificationResponse?.notification) {
      handleNotificationResponse(lastNotificationResponse);
    }
  }, [lastNotificationResponse]);

  return null;
};

export default Notification;
