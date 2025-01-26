import Button from '@/shared/Button/Button';
import ErrorNotification from '@/shared/ErrorNotification/ErrorNotification';
import Input from '@/shared/Input/Input';
import CustomLink from '@/shared/CustomLink/CustomLink';
import { Colors, Gaps } from '@/shared/tokens';
import { useEffect, useState } from 'react';
import { View, StyleSheet, Image, Dimensions, KeyboardAvoidingView, Platform } from 'react-native';
import { useAtom } from 'jotai';
import { loginAtom } from '@/entities/auth/model/auth.state';
import { useRouter } from 'expo-router';
import { useScreenOrientation } from '@/shared/hooks';
import { Orientation } from 'expo-screen-orientation';

export default function Login() {
  const router = useRouter();
  const [localError, setLocalError] = useState<string | undefined>();
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [{ access_token, isLoading, error }, login] = useAtom(loginAtom);
  const orientation = useScreenOrientation();

  const inputWidth = orientation === Orientation.PORTRAIT_UP ? 'auto' : Dimensions.get('window').width / 2 - 16 - 48;
  const inputsDirection = orientation === Orientation.PORTRAIT_UP ? 'column' : 'row';

  const submit = () => {
    if (!email || !password) {
      setLocalError('Не введен email или пароль');
      return;
    }

    login({ email, password });
  };

  useEffect(() => {
    if (error) {
      setLocalError(error);
    }
  }, [error]);

  useEffect(() => {
    if (access_token) {
      router.replace('/');
    }
  }, [access_token]);

  return (
    <View style={styles.container}>
      <ErrorNotification error={localError} />
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.content}>
        <Image style={styles.logo} source={require('../assets/images/logo.png')} resizeMode="contain" />
        <View style={styles.form}>
          <View style={{ ...styles.inputs, flexDirection: inputsDirection }}>
            <Input containerStyle={{ width: inputWidth }} placeholder="Email" value={email} onChangeText={setEmail} />
            <Input
              containerStyle={{ width: inputWidth }}
              isPassword
              placeholder="Пароль"
              value={password}
              onChangeText={setPassword}
            />
          </View>
          <Button text="Войти" onPress={submit} isLoading={isLoading} />
        </View>
        <CustomLink href="/restore" text="Восстановить пароль" />
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.black,
    flex: 1,
    justifyContent: 'center',
    padding: 55,
  },
  content: {
    alignItems: 'center',
    gap: Gaps.g50,
  },
  form: {
    alignSelf: 'stretch',
    gap: Gaps.g16,
  },
  logo: {
    width: 220,
  },
  inputs: {
    gap: Gaps.g16,
  },
});
