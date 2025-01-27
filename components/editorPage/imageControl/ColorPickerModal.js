import { StyleSheet, View } from "react-native";
import  ColorPicker, { HueSlider, OpacitySlider, Panel1 } from "reanimated-color-picker"
import { colors } from "../../../UI/theme";

export default function ColorPickerModal({ chosenColor, setChosenColor}) {
  return (
    <View style={styles.colorPickerContainer}>
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
    top: 35,
    left: 0,
    width: '100%',
    height: 'auto', 
    padding: 20,
},

});
