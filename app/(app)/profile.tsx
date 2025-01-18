import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useAtom } from 'jotai';
import * as Sharing from 'expo-sharing';
import Avatar from '@/entities/user/ui/Avatar/Avatar';
import { updateProfileAtom } from '@/entities/user/model/user.state';
import { Gaps } from '@/shared/tokens';
import ImageUploader from '@/shared/ImageUploader/ImageUploader';
import Button from '@/shared/Button/Button';

export default function ProfilePage() {
  const [image, setImage] = useState<string | null>(null);
  const [profile, updateProfile] = useAtom(updateProfileAtom);

  const shareProfile = async () => {
    const isSharingAvaliable = await Sharing.isAvailableAsync();

    if (!isSharingAvaliable) return;

    await Sharing.shareAsync('https://purpleschool.ru', {
      dialogTitle: 'Поделиться профилем',
    });
  };

  const submitProfile = () => {
    if (!image) return;
    updateProfile({ photo: image });
  };

  useEffect(() => {
    if (profile && profile.profile?.photo) {
      setImage(profile.profile.photo);
    }
  }, [profile]);

  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        <Avatar image={image} />
        <ImageUploader onUpload={setImage} onError={(e) => console.log(e)} />
      </View>
      <Button text="Сохранить" onPress={submitProfile} />
      <Button text="Поделиться" onPress={shareProfile} />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 30,
    paddingVertical: 30,
    gap: Gaps.g30,
  },
  container: {
    flexDirection: 'row',
    gap: Gaps.g20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
