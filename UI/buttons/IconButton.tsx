import { Pressable, StyleSheet, Platform } from "react-native";
import { Ionicons, MaterialIcons } from '@expo/vector-icons'
import { colors } from "../theme";
import Animated, { interpolateColor, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import { platformStyle } from "../shadowStyle";
import React, { useState } from "react";
import { Text } from "react-native";
import { fonts } from "../fonts";

interface IconButtonProps {
    icon: keyof typeof Ionicons.glyphMap | keyof typeof MaterialIcons.glyphMap;
    size: number;
    color: string;
    save?: boolean;
    label?: string;
    onPress: () => void;
}

const IconButton: React.FC<IconButtonProps> = ({icon, size, color,label, save, onPress}) => {
    const scale = useSharedValue(1);

    const animatedStyle =  useAnimatedStyle(() => {
        return {
            transform: [{scale: scale.value}],
                
        }
    })

    const handlePressIn = () => {
        scale.value = withTiming(0.9, {duration: 130});
    }

    const handlePressOut = () => {
        scale.value = withTiming(1, {duration: 130});
            
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
            <Animated.View style={[styles.button, animatedStyle , { backgroundColor: save ? colors.border : colors.primary}]}>
                {!save && (
                    <Ionicons name={icon as keyof typeof Ionicons.glyphMap} size={size} color={color} />
                )}
                {save && (
                    <MaterialIcons name={icon as keyof typeof MaterialIcons.glyphMap} size={size} color={color}/> 
                )}

            </Animated.View>
            {!save && (
                <Text style={styles.labelText}>{label}</Text>
            )}
        </Pressable>
    )
}
export default IconButton;

const styles = StyleSheet.create({
    button: {
        padding: 8,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 25,
        // borderColor: colors.border,
        // borderWidth: 1,
        // backgroundColor: colors.background,
        ...platformStyle.shadow   
    },
    pressable: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    labelText: {
        fontFamily: fonts.body,
        color: colors.bodyText,
        fontSize: 10,
        marginTop: 5,
    }
})

