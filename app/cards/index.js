import {StyleSheet, Text, View } from 'react-native';
import { colors } from '../../UI/theme';
import { Link } from 'expo-router';
import { fonts } from '../../UI/fonts';


export default function Cards() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Cards</Text>
      <Link href='cards/1' style={styles.text}>Card 1</Link>
      <Link href='cards/2' style={styles.text}>Card 2</Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background, 
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: colors.bodyText,
     fontFamily: fonts.body,
  }
});
