import { StudentCourseDescription } from '@/entities/course/model/course.model';
import Button from '@/shared/Button/Button';
import Chip from '@/shared/Chip/Chip';
import { Colors, Fonts, Gaps, Radius } from '@/shared/tokens';
import { Image, StyleSheet, Text, View } from 'react-native';
import * as Linking from 'expo-linking';
import MaskedView from '@react-native-masked-view/masked-view';
import { LinearGradient } from 'expo-linear-gradient';
import CourseProgress from '@/entities/course/ui/CourseProgress/CourseProgress';

const CourseCard = ({ image, shortTitle, courseOnDirection, alias, allTariffs }: StudentCourseDescription) => {
  return (
    <View style={styles.card}>
      <Image
        source={{
          uri: image,
        }}
        height={200}
        style={styles.image}
      />
      <View style={styles.header}>
        <CourseProgress passedLessons={10} totalLessons={120} />
        <Text style={styles.title}>{shortTitle}</Text>
        <View style={styles.chips}>
          {courseOnDirection.length &&
            courseOnDirection.map((item) => <Chip key={item.direction.name} text={item.direction.name} />)}
        </View>
        <MaskedView maskElement={<Text style={styles.tariff}>Тариф &laquo;{allTariffs[0].name}&raquo;</Text>}>
          <LinearGradient colors={['#D77BE5', '#BE63E5', '#6C38CC']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}>
            <Text style={[styles.tariff, styles.tariffWithOpacity]}>Тариф &laquo;{allTariffs[0].name}&raquo;</Text>
          </LinearGradient>
        </MaskedView>
      </View>
      <View style={styles.footer}>
        <Button text="Купить" onPress={() => Linking.openURL(`https://purpleschool.ru/course/${alias}`)} />
      </View>
    </View>
  );
};

export default CourseCard;

const styles = StyleSheet.create({
  card: {
    borderRadius: Radius.r10,
    backgroundColor: Colors.blackLight,
  },
  tariff: {
    marginTop: 18,
    fontSize: Fonts.f16,
    fontFamily: Fonts.regular,
  },
  tariffWithOpacity: {
    opacity: 0,
  },
  image: {
    borderRadius: Radius.r10,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  title: {
    fontSize: Fonts.f21,
    color: Colors.white,
    fontFamily: Fonts.semibold,
    marginBottom: 12,
  },
  chips: {
    flexDirection: 'row',
    gap: Gaps.g10,
  },
  header: {
    paddingHorizontal: 24,
    paddingVertical: 18,
  },
  footer: {
    backgroundColor: Colors.violetDark,
    paddingHorizontal: 24,
    paddingVertical: 20,
    borderBottomLeftRadius: Radius.r10,
    borderBottomRightRadius: Radius.r10,
  },
});
