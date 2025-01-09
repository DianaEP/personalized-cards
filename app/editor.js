import { StyleSheet, Text, View } from "react-native";
import { colors } from "../UI/theme";
import { fonts } from "../UI/fonts";

export default function Editor() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Editor</Text>
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