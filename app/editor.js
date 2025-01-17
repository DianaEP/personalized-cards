import { StyleSheet, Text, View } from "react-native";
import { colors } from "../UI/theme";
import { fonts } from "../UI/fonts";
import ImagePicker from "../components/ImagePicker";

export default function Editor() {
  return (
    <View style={styles.container}>
      <ImagePicker/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background, 
  
  },
  
});