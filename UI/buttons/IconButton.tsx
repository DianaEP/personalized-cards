import { Pressable, StyleSheet, Platform } from "react-native";
import { Ionicons, MaterialIcons } from '@expo/vector-icons'
import { colors } from "../theme";
import Animated, { interpolateColor, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import { platformStyle } from "../shadowStyle";
import React, { useState } from "react";

interface IconButtonProps {
    icon: keyof typeof Ionicons.glyphMap | keyof typeof MaterialIcons.glyphMap;
    size: number;
    color: string;
    save?: boolean;
    onPress: () => void;
}

const IconButton: React.FC<IconButtonProps> = ({icon, size, color, save, onPress}) => {
    const buttonColor = useSharedValue(0);
    const scale = useSharedValue(1);

    const animatedStyle =  useAnimatedStyle(() => {
        return {
            transform: [{scale: scale.value}],
            borderColor: interpolateColor(
                buttonColor.value, 
                [0, 1], 
                [colors.bodyText, colors.border]
            ),
            
        }
    })

    const handlePressIn = () => {
        scale.value = withTiming(0.95, {duration: 130});
        buttonColor.value = withTiming(1, {duration: 130});
    }

    const handlePressOut = () => {
        scale.value = withTiming(1, {duration: 130});
        buttonColor.value = withTiming(0, {duration: 130});
            
        setTimeout(() => {
            onPress();
        }, 150);
       
    }
    return(
        <Pressable 
            style={styles.pressable}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
        >
            <Animated.View style={[styles.button, animatedStyle , { borderWidth: save ? 0 : 1, backgroundColor: save ? 'transparent' : colors.background}]}>
                {!save && (
                    <Ionicons name={icon as keyof typeof Ionicons.glyphMap} size={size} color={color} />
                )}
                {save && (
                    <MaterialIcons name={icon as keyof typeof MaterialIcons.glyphMap} size={size} color={color}/> 
                )}
            </Animated.View>
        </Pressable>
    )
}
export default IconButton;

const styles = StyleSheet.create({
    button: {
        padding: 8,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        // borderColor: colors.border,
        // borderWidth: 1,
        // backgroundColor: colors.background,
        ...platformStyle.shadow   
    },
    pressable: {
        justifyContent: 'center',
        alignItems: 'center',
    }
})

