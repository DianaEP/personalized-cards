import { useEffect } from "react";
import { Image, StyleSheet, View } from "react-native";
import Animated, { Easing, useAnimatedStyle, useSharedValue, withDelay, withRepeat, withSequence, withTiming } from "react-native-reanimated";
import { useIsFocused } from '@react-navigation/native';

export default function ImagesAnimation(){
    const isFocused = useIsFocused();
    console.log(isFocused);
    
    const translateX1 = useSharedValue(400);
    const translateX2 = useSharedValue(400);
    const translateX3 = useSharedValue(400);
    const translateX4 = useSharedValue(400);
    const translateX5 = useSharedValue(400);
    const translateX6 = useSharedValue(400);
    const translateX7 = useSharedValue(400);

    const slideInEffect = () => {
        translateX1.value = withTiming(0, { duration: 1000, easing: Easing.out(Easing.cubic)});
        translateX2.value = withDelay(200, withTiming(0, { duration: 1500, easing: Easing.out(Easing.cubic)}));
        translateX3.value = withDelay(400, withTiming(0, { duration: 1500, easing: Easing.out(Easing.cubic)}));
        translateX4.value = withDelay(300, withTiming(0, { duration: 1500, easing: Easing.out(Easing.cubic)}));
        translateX5.value = withDelay(700, withTiming(0, { duration: 1500, easing: Easing.out(Easing.cubic)}));
        translateX6.value = withDelay(500, withTiming(0, { duration: 1500, easing: Easing.out(Easing.cubic)}));
        translateX7.value = withDelay(1000, withTiming(0, { duration: 1500, easing: Easing.out(Easing.cubic)}));
    }

    const slideOutEffect = () => {
        translateX1.value = withTiming(400, { duration: 1000, easing: Easing.out(Easing.cubic)});
        translateX2.value = withDelay(200, withTiming(400, { duration: 1500, easing: Easing.out(Easing.cubic)}));
        translateX3.value = withDelay(400, withTiming(400, { duration: 1500, easing: Easing.out(Easing.cubic)}));
        translateX4.value = withDelay(300, withTiming(400, { duration: 1500, easing: Easing.out(Easing.cubic)}));
        translateX5.value = withDelay(700, withTiming(400, { duration: 1500, easing: Easing.out(Easing.cubic)}));
        translateX6.value = withDelay(500, withTiming(400, { duration: 1500, easing: Easing.out(Easing.cubic)}));
        translateX7.value = withDelay(1000, withTiming(400, { duration: 1500, easing: Easing.out(Easing.cubic)})); 
    }

    useEffect(() => {
        console.log("Is Focused: ", isFocused);
        if(isFocused){
            slideInEffect();
        }else{
            slideOutEffect();
        }
    },[isFocused])

    const animatedStyle1 = useAnimatedStyle(() => ({ transform: [{translateX: translateX1.value}] }));
    const animatedStyle2 = useAnimatedStyle(() => ({ transform: [{translateX: translateX2.value}] }))
    const animatedStyle3 = useAnimatedStyle(() => ({ transform: [{translateX: translateX2.value}] }))
    const animatedStyle4 = useAnimatedStyle(() => ({ transform: [{translateX: translateX4.value}] }))
    const animatedStyle5 = useAnimatedStyle(() => ({ transform: [{translateX: translateX5.value}] }))
    const animatedStyle6 = useAnimatedStyle(() => ({ transform: [{translateX: translateX6.value}] }))
    const animatedStyle7 = useAnimatedStyle(() => ({ transform: [{translateX: translateX7.value}] }))
    return (
        <View style={styles.container}>
            <Animated.Image 
                source={require('../assets/images/pic3.jpg')} 
                style={[styles.image, { width: 180, height: 110, top: 10, left: 170 }, animatedStyle3]}
                    
            />
            <Animated.Image
                source={require('../assets/images/pic4.jpg')} 
                style={[styles.image, { width: 100, height: 150, top: 150, left: 250 }, animatedStyle4]}
                
            />
            <Animated.Image 
                source={require('../assets/images/pic5.jpg')} 
                style={[styles.image, { width: 90, height: 120, top: 160, left: 170 }, animatedStyle5]}
            />
            <Animated.Image 
                source={require('../assets/images/pic6.jpg')} 
                style={[styles.image, { width: 90, height: 120, top: 80, left: 110 }, animatedStyle6]}
            />
            <Animated.Image 
                source={require('../assets/images/pic1.jpg')} 
                style={[styles.image,{ width: 120, height: 180, top: 0, left: 10 }, animatedStyle1]}
            />
            <Animated.Image 
                source={require('../assets/images/pic2.jpg')} 
                style={[styles.image, { width: 170, height: 120, top: 190, left: 10 }, animatedStyle2]}
            />
            <Animated.Image 
                source={require('../assets/images/marketing.png')} 
                style={[styles.image, { width: 170, height: 120, top: 90, left: 170 }, animatedStyle7]}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        position: 'relative',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'

    },
    image:{
        position: 'absolute',
        borderRadius: 5,
    }
})