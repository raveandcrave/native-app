import { Image, StyleSheet } from 'react-native';

const Avatar = ({ image }: { image: string | null }) => {
  return (
    <>
      {image ? (
        <Image
          style={styles.image}
          source={{
            uri: image,
          }}
        />
      ) : (
        <Image style={styles.image} source={require('@/assets/images/avatar.png')} />
      )}
    </>
  );
};

export default Avatar;

const styles = StyleSheet.create({
  image: {
    width: 70,
    height: 70,
    borderRadius: 35,
  },
});
