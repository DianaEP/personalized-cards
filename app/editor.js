import { StyleSheet, Text, View } from "react-native";
import { colors } from "../UI/theme";
import { fonts } from "../UI/fonts";
import ImagePicker from "../components/editorPage/ImagePicker";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function Editor() {
  return (
    <GestureHandlerRootView style={styles.container}>
      <ImagePicker/>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background, 
  
  },
  
});