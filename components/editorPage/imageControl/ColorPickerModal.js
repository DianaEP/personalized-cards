import { StyleSheet, Text, View } from "react-native";
import  ColorPicker, { HueSlider, OpacitySlider, Panel1 } from "reanimated-color-picker"
import { colors } from "../../../UI/theme";

export default function ColorPickerModal({ chosenColor, setChosenColor, label}) {
  return (
    <View style={styles.colorPickerContainer}>
      <Text style={styles.colorPickerText}>{label}</Text>
      <ColorPicker
        value={chosenColor}
        sliderThickness={20}
        thumbSize={25}
        onComplete={(color) => setChosenColor(color.hex)}
      >
        <HueSlider />
        <Panel1 />
        <OpacitySlider />
      </ColorPicker>
    </View>
  );
}

const styles = StyleSheet.create({
  colorPickerContainer: {
    backgroundColor: colors.background,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: 5,
    position: 'absolute',
    top: 8,
    left: 0,
    width: '100%',
    height: 'auto', 
    padding: 20,
},
colorPickerText: {
  color: colors.bodyText,
  fontSize: 18,
  fontWeight: 'bold',
  textAlign: 'center',
  marginBottom: 10
}

});
