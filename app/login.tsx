import Button from '@/shared/Button/Button';
import ErrorNotification from '@/shared/ErrorNotification/ErrorNotification';
import Input from '@/shared/Input/Input';
import CustomLink from '@/shared/CustomLink/CustomLink';
import { Colors, Gaps } from '@/shared/tokens';
import { useEffect, useState } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { useAtom } from 'jotai';
import { loginAtom } from '@/entities/auth/model/auth.state';
import { useRouter } from 'expo-router';

export default function Login() {
  const router = useRouter();
  const [localError, setLocalError] = useState<string | undefined>();
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [{ access_token, isLoading, error }, login] = useAtom(loginAtom);

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
      <View style={styles.content}>
        <Image style={styles.logo} source={require('../assets/images/logo.png')} resizeMode="contain" />
        <View style={styles.form}>
          <Input placeholder="Email" value={email} onChangeText={setEmail} />
          <Input isPassword placeholder="Пароль" value={password} onChangeText={setPassword} />
          <Button text="Войти" onPress={submit} isLoading={isLoading} />
        </View>
        <CustomLink href="/restore" text="Восстановить пароль" />
      </View>
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
});
