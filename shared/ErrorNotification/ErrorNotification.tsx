import { useEffect, useState } from 'react';
import { ErrorNotificationProps } from './ErrorNotification.props';
import { Text, StyleSheet, Dimensions } from 'react-native';
import { Colors, Fonts } from '../tokens';
import Animated, { SlideInUp, SlideOutUp } from 'react-native-reanimated';

const ErrorNotification = ({ error }: ErrorNotificationProps) => {
  const [isShown, setIsShown] = useState<boolean>(false);

  useEffect(() => {
    if (!error) return;

    setIsShown(true);
    const timerId = setTimeout(() => {
      setIsShown(false);
    }, 3000);
    return () => {
      clearTimeout(timerId);
    };
  }, [error]);

  if (!isShown) {
    return null;
  }

  return (
    <Animated.View style={styles.error} entering={SlideInUp.duration(500)} exiting={SlideOutUp.duration(300)}>
      <Text style={styles.errorText}>{error}</Text>
    </Animated.View>
  );
};

export default ErrorNotification;

const styles = StyleSheet.create({
  error: {
    backgroundColor: Colors.red,
    padding: 15,
    position: 'absolute',
    top: 50,
    width: Dimensions.get('screen').width,
  },
  errorText: {
    color: Colors.white,
    fontFamily: Fonts.regular,
    fontSize: Fonts.f16,
    textAlign: 'center',
  },
});
