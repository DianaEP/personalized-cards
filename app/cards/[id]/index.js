import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../../../UI/theme';
import { useLocalSearchParams, useRouter, useSearchParams } from 'expo-router/build/hooks';
import { fonts } from '../../../UI/fonts';



export default function Card() {
  const { id } = useLocalSearchParams();

  console.log(id);
  
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Card ID: {id}</Text>
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