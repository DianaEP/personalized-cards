import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../UI/theme';
import Button from '../UI/buttons/Button';
import { useRouter } from 'expo-router';
import { fonts } from '../UI/fonts';
import ImagesAnimation from '../components/ImagesAnimation';

export default function App() {
  const router = useRouter();

  function handleCreateCard(){
    router.push('/editor');
  }
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <ImagesAnimation/>
      <Text style={styles.text}>Open up App.js to start working on your app!</Text>
      <Button onPress={handleCreateCard}>Create your own card</Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background, 
    // alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: colors.bodyText,
    fontFamily: fonts.body,
  }
});
