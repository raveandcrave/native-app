import { Link, LinkProps } from 'expo-router';
import { Text, StyleSheet } from 'react-native';
import { Colors, Fonts } from '../tokens';

const CustomLink = ({ text, ...props }: LinkProps & { text: string }) => {
  return (
    <Link {...props}>
      <Text style={styles.link}>{text}</Text>
    </Link>
  );
};

export default CustomLink;

const styles = StyleSheet.create({
  link: {
    color: Colors.link,
    fontFamily: Fonts.regular,
    fontSize: Fonts.f18,
  },
});
