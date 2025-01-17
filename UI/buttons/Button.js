import { Pressable, StyleSheet, Text } from "react-native";
import { colors } from "../theme";
import { fonts } from "../fonts";
import Animated, { Easing, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";

export default function Button({children, onPress}){
    const scale = useSharedValue(1);

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{scale: withTiming(scale.value, {duration: 300, easing: Easing.out(Easing.cubic)})}]
        }
    })

    const handlePressIn = () => {
        scale.value = 0.95;   
    }

    const  handlePressOut = () => {
        scale.value = 1.03;
        // delay the onPress function to allow the button to animate back to its original size
        setTimeout(() => {
            scale.value = 1;
            onPress();
        }, 100);
        
    }

    return(
        <Pressable 
            onPressIn = {handlePressIn}
            onPressOut={handlePressOut}
            // style={({pressed}) => [pressed && styles.pressed]}
        >
            <Animated.View style={[styles.button, animatedStyle]}>
                <Text style={styles.text}>{children}</Text>
            </Animated.View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: colors.primary,
        borderRadius: 5,
        padding: 10,
        width: '90%',
        margin: 15,
        elevation: 2,
       
    },
    // pressed: {
    //     opacity: 0.7,
    // },
    text: {
        color: colors.titleText,
        fontFamily: fonts.body,
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center'
    }
})