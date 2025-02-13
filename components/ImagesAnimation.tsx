import React, { useEffect, useState } from "react";
import { Image, StyleSheet, View } from "react-native";
import Animated, { Easing, interpolateColor, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import { colors } from "../UI/theme";
import { fonts, useCustomFonts } from "../UI/fonts";



const ImagesAnimation: React.FC = () => {
     const fontsLoaded: boolean = useCustomFonts();

    // Image animation state
    const translateX1 = useSharedValue<number>(400);

    // Pin animation state
    const translateXPin = useSharedValue<number>(400);
    const translateYPin = useSharedValue<number>(-200);

    // Text animation state
    const typingProgress = useSharedValue<number>(0);
    const [displayedText, setDisplayedText] = useState<string>('');
    const text = "Mark Memories Your Way";
    
    const slideInEffect = () => {
        translateX1.value = withTiming(0, { duration: 1000, easing: Easing.out(Easing.cubic)});
    }

    const dropPinEffect = () => {
        setTimeout(() => {
            translateXPin.value = withTiming(0, { duration: 800, easing: Easing.out(Easing.cubic)});
            translateYPin.value = withTiming(0, { duration: 800, easing: Easing.out(Easing.cubic)});
        },2000)
    }

    const startTypingEffect = () => {
        let index = 0;

        setTimeout(() => {
            const typingInterval = setInterval(() => {
                if (index < text.length) {
                    const currentChar = text[index];

                    setDisplayedText((prevText) => prevText + currentChar);
                    typingProgress.value = withTiming(index + 1, { duration: 100, easing: Easing.out(Easing.cubic) });
                    
                    index++;
                } else {
                    clearInterval(typingInterval); 
                }
            }, 150); 
        },3200)
    }

    useEffect(() => {
        slideInEffect();
        dropPinEffect();
        startTypingEffect();
    },[])

    
    const pictureStyle = useAnimatedStyle(() => ({ transform: [{translateX: translateX1.value}] }));
    const pinStyle = useAnimatedStyle(() => ({transform: [{translateY : translateYPin.value}, { translateX: translateXPin.value }] }));
    const typingStyle = useAnimatedStyle(() => ({
        color: interpolateColor(
            typingProgress.value,
            [0, text.length],
            [colors.primary, colors.bodyText]
        ),
        // fontFamily: typingProgress.value === text.length ? 'Pacifico_400Regular' : 'system-font',
    }));


    if (!fontsLoaded) {
        return null; 
    }
    
return (
        <View style={styles.container}>
            <Animated.View style={[styles.imageWrapper, pictureStyle]}>
                <Image 
                    source={require('../assets/images/umbrellaCropped.jpg')} 
                    style={styles.image}
                    resizeMode="cover" 
                    />

            </Animated.View>

            <Animated.View style={[styles.pinWrapper, pinStyle]}>
                <Image 
                    source={require('../assets/images/pin.png')} 
                    style={styles.pinImage}
                    resizeMode="contain" 
                    />

            </Animated.View>

            <Animated.View style={styles.textWrapper}>
                <Animated.Text style={[styles.text, typingStyle]}>
                    {displayedText}
                </Animated.Text>

            </Animated.View>

        </View>
    )
}
export default ImagesAnimation;

const styles = StyleSheet.create({
    container:{
        flex: 1,
        position: 'relative',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
        
    },
    imageWrapper:{
        position: 'absolute',
        width: '90%', 
        height: '90%',
        borderRadius: 5,
        overflow: 'hidden',
    },
    image: {
        width: '100%',
        height: '100%',
        borderRadius: 5,
    },
    pinWrapper:{
        position: 'absolute',
        top: 15,
        left: '50%',
        width: 50,
        height: 50,
    },
    pinImage:{
        width: 40,
        height: 50,
    },
    textWrapper:{
        position: 'absolute',
        top: 70,
        left: '30%',
        width: '50%',
        height: 100,
    },
    text:{
        fontSize: 24,
        // color: colors.bodyText,
        // fontWeight: 'bold',
        textAlign: 'center',
        fontFamily: fonts.handwriting,
    }
})

  // opacity: interpolate(
        //     typingProgress.value, // Typing progress (0 to text.length)
        //     [0, text.length], // Interpolate from 0 to full text
        //     [0, 1] // From 0 (invisible) to 1 (fully visible)
        // )