import { StyleSheet, View } from "react-native";
import { Gesture, GestureDetector, GestureHandlerRootView, PanGestureHandler,PinchGestureHandler} from "react-native-gesture-handler";
import { ASSETS_SVG } from "../../../util/dataSvg";
import Animated, {  runOnJS, useAnimatedProps, useAnimatedStyle, useDerivedValue, useSharedValue, withSpring, withTiming } from "react-native-reanimated";
import { useEffect } from "react";


export default function SvgOverlay({
  svgPosition,
  selectedSvgId,
  setSvgPosition,
  svgScale,
  setSvgScale,
}) {
  

  const translateX = useSharedValue(svgPosition.x);
  const translateY = useSharedValue(svgPosition.y);
  const scaleValue = useSharedValue(svgScale);
  const startScale = useSharedValue(1);

  const panGesture = Gesture.Pan()
    .onUpdate((event) => {
      'worklet';
      console.log('Pan Update - translationX:', event.translationX, 'translationY:', event.translationY);
      translateX.value = event.translationX;
      translateY.value = event.translationY;
    })
    .onEnd(() => {
      'worklet';
      console.log('Pan End - position:', translateX.value, translateY.value);
      runOnJS(setSvgPosition)({ x: translateX.value, y: translateY.value });
    })
 

  const pinchGesture = Gesture.Pinch()
    .onStart(() => {
      'worklet';
      console.log('Pinch Started');
      startScale.value = scaleValue.value; // Store the current scale
    })
    .onUpdate((event) => {
      'worklet';
      scaleValue.value = Math.max(0.2, Math.min(startScale.value * event.scale, 2));
      console.log('Pinch Update - scale:', event.scale, 'New scale:', scaleValue.value);
    })
    .onEnd(() => {
      'worklet';
      runOnJS(setSvgScale)(scaleValue.value);
      console.log('Pinch End - final scale:', scaleValue.value);
    })
 

  const animatedStyle = useAnimatedStyle(() => {
    console.log('Animated Style - scaleValue:', scaleValue.value);
    return {
      transform: [
        { scale: withSpring(scaleValue.value) },
        { translateX: withSpring(translateX.value) },
        { translateY: withSpring(translateY.value) },
      ],
    };
  },[scaleValue, translateX, translateY]);

  // console.log("svgId " + selectedSvgId);
  const selectedSvgItem = ASSETS_SVG.find((item) => item.id === selectedSvgId);
  const SvgOnImage = selectedSvgItem ? selectedSvgItem.svg : null;

  const composedGesture = Gesture.Simultaneous(pinchGesture, panGesture );
  const animatedProps = useAnimatedProps(() => ({
    width: 10 * scaleValue.value, 
    height: 10 * scaleValue.value, 
  }));

  return (
    <>
      {selectedSvgItem && (
        
          <GestureDetector gesture={composedGesture}>
              <Animated.View style={[styles.overlaySvg, animatedStyle]}>
                <Animated.View animatedProps={animatedProps}>
                  <SvgOnImage  />

                </Animated.View>
              
              </Animated.View>

          </GestureDetector>
              
      )}
    </>
  );
}

const styles = StyleSheet.create({
  overlaySvg: {
    position: "absolute",
    top: 0,
    left: 0,
    paddingBottom: 0,
    marginBottom: 0,
  },
 
});


 
  // const onDrag = (event) => {
  //   const { translationX, translationY } = event.nativeEvent;
  //   translateX.value = translationX;
  //   translateY.value = translationY;
  // };

// const onPinch = (event) => {
//   const { scale } = event.nativeEvent;
//   scaleValue.value = scale;
// };

// const onDragEnd = () => {
//   setSvgPosition({ x: translateX.value, y: translateY.value })
// }

// const onPinchEnd = () => {
//   setSvgScale(scaleValue.value);
// };