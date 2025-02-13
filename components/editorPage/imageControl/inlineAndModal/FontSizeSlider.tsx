import { View, Text, StyleSheet} from "react-native";
import { useImageContext } from "../../../../store/ImageContext"
import { ACTIONS } from "../../../../store/reducerImagePicker";
import Slider from "@react-native-community/slider";
import { colors } from "../../../../UI/theme";
import { useState } from "react";
import { useDerivedValue, useSharedValue } from "react-native-reanimated";


const FontSizeSlider: React.FC = () => {
    const { state, dispatch } = useImageContext();

    const handleFontSizeState = (value: number) => {
        dispatch({ type: ACTIONS.SET_TEXT_FONT_SIZE, payload: value})
        console.log(state.textFontSize);
    }

    
    
    return(
        <View style={styles.sliderContainer}>
            <Text style={styles.sliderText}>Adjust Font Size</Text>
            <Slider
                style={styles.slider}
                minimumValue={18}
                maximumValue={50}  
                minimumTrackTintColor={colors.titleText}
                maximumTrackTintColor={colors.bodyText}
                thumbTintColor={colors.primary}
                value={state.textFontSize}
                // onValueChange={handleThumbChange}
                onSlidingComplete={handleFontSizeState}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    sliderContainer: {
        backgroundColor: colors.background,
        borderColor: colors.border,
        borderWidth: 1,
        borderRadius: 5,
        position: 'absolute',
        top: 200,
        left: 0,
        width: '100%',
        height: 'auto', 
        padding: 20,
    },
    sliderText: {
        color: colors.bodyText,
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10
    },
    slider: {
        width: 250,
        height: 40
    }
})

export default FontSizeSlider;