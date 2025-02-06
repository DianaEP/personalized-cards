import { Pressable, StyleSheet, Text } from "react-native";
import { colors } from "../theme";
import { fonts } from "../fonts";
import Animated, { Easing, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import { platformStyle } from "../shadowStyle";
import React, { ReactNode } from "react";

interface ButtonTypes {
    children: ReactNode;
    onPress: () => void;
    textOnly?: boolean;
}


const Button: React.FC<ButtonTypes> = ({children, onPress, textOnly}) => {
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
            <Animated.View style={[styles.button, animatedStyle, textOnly && styles.textOnlyButton]}>
                <Text style={styles.text}>{children}</Text>
            </Animated.View>
        </Pressable>
    )
}
export default Button;

const styles = StyleSheet.create({
    button: {
        backgroundColor: colors.primary,
        borderRadius: 5,
        padding: 10,
        width: '90%',
        margin: 15,
        ...platformStyle.shadow,  
       
    },
    textOnlyButton: {
        backgroundColor: 'transparent',
        borderWidth: 0, 
        marginBottom: 0,
        elevation: 0,
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