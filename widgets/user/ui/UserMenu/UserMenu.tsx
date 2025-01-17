import { StyleSheet, View, Text } from 'react-native';
import { Colors, Fonts, Gaps } from '@/shared/tokens';
import Avatar from '@/entities/user/ui/Avatar/Avatar';
import { User } from '@/entities/user/model/user.model';

const UserMenu = ({ user }: { user: User | null }) => {
  if (!user) return null;

  return (
    <View style={styles.container}>
      <Avatar image={user.photo ?? null} />
      <Text style={styles.name}>
        {user.name} {user.surname}
      </Text>
    </View>
  );
};

export default UserMenu;

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    alignItems: 'center',
    gap: Gaps.g8,
  },
  name: {
    fontSize: Fonts.f16,
    fontFamily: Fonts.regular,
    color: Colors.white,
  },
});
