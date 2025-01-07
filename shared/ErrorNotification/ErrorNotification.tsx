import { useEffect, useState } from 'react';
import { ErrorNotificationProps } from './ErrorNotification.props';
import { Text, StyleSheet, Dimensions, Animated } from 'react-native';
import { Colors, Fonts } from '../tokens';

const ErrorNotification = ({ error }: ErrorNotificationProps) => {
  const [isShown, setIsShown] = useState<boolean>(false);
  const animatedValue = new Animated.Value(-100);

  const onEnter = () => {
    Animated.timing(animatedValue, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    if (!error) {
      return;
    }
    setIsShown(true);
    const timerId = setTimeout(() => {
      setIsShown(false);
    }, 3000);
    return () => {
      clearTimeout(timerId);
    };
  }, [error]);

  if (!isShown) {
    return <></>;
  }

  return (
    <Animated.View
      style={{
        ...styles.error,
        transform: [{ translateY: animatedValue }],
      }}
      onLayout={onEnter}
    >
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
    fontSize: Fonts.f16,
    textAlign: 'center',
  },
});
