import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../UI/theme';
import Button from '../UI/buttons/Button';
import { useRouter } from 'expo-router';
import { fonts, useCustomFonts } from '../UI/fonts';
import ImagesAnimation from '../components/ImagesAnimation';

const App: React.FC = () => {
  const fontsLoaded = useCustomFonts();

  const router = useRouter();
  
  
  function handleCreateCard(){
    router.push('/editor');
  }

  if (!fontsLoaded) {
      return null; 
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
export default App;

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
