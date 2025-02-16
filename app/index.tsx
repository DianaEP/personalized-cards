import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../UI/theme';
import Button from '../UI/buttons/Button';
import { useRouter } from 'expo-router';
import { fonts, useCustomFonts } from '../UI/fonts';
import TextAnimation from '../components/animations/TextAnimation';
import PostcardsAnimation from '../components/animations/PostcardsAnimations';

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
      <TextAnimation/>
      <PostcardsAnimation/>
      <Text style={styles.text}>Create personalized postcards with your photos, messages, and unique touches. Send your memories across the world—heartfelt and meaningful.</Text>
      <Button onPress={handleCreateCard}>Get Started</Button>
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
    textAlign: 'center',
    color: colors.bodyText,
    fontFamily: fonts.body,
    fontSize: 14, 
    lineHeight: 18,
    marginHorizontal: 15,
  }
});
