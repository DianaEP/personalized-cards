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
  containerWidth,  // New prop for the image container width
  containerHeight
}) {
  
  console.log(containerWidth, containerHeight);
  
  const translateX = useSharedValue(svgPosition.x ); 
  const translateY = useSharedValue(svgPosition.y );
  const scaleValue = useSharedValue(svgScale);

  const startScale = useSharedValue(1);
  const startTranslateX = useSharedValue(svgPosition.x);
  const startTranslateY = useSharedValue(svgPosition.y);

  const isPinching = useSharedValue(false);

  const originalSize = 100;  

  const panGesture = Gesture.Pan()
    .onStart(() => {
      if (isPinching.value) return;
      startTranslateX.value = translateX.value;
      startTranslateY.value = translateY.value;
    })
    .onUpdate((event) => {
      'worklet';
      if (isPinching.value) return;
      // console.log('Pan Update - translationX:', event.translationX, 'translationY:', event.translationY);
      console.log(containerWidth, containerHeight);
      const scaledWidth = originalSize * scaleValue.value;
      const scaledHeight = originalSize * scaleValue.value;

      const boundaryFactor = 1 + (1 - scaleValue.value);

      // console.log(scaledWidth, scaledHeight);
      // const halfWidth = scaledWidth / 2;
      // const halfHeight = scaledHeight / 2;

      const minX = 0;
      const maxX = containerWidth * boundaryFactor - scaledWidth;
      const minY = 0;
      const maxY = containerHeight * boundaryFactor - scaledHeight;

     


    
      translateX.value = Math.min(maxX, Math.max(minX, startTranslateX.value + event.translationX));
      translateY.value = Math.min(maxY, Math.max(minY, startTranslateY.value + event.translationY));
      
    })
    .onEnd(() => {
      'worklet';
      console.log('Pan End - position:', translateX.value, translateY.value);
      runOnJS(setSvgPosition)({ x: translateX.value, y: translateY.value });
    })
 

  const pinchGesture = Gesture.Pinch()
    .onStart(() => {
      'worklet';
      isPinching.value = true;
      startScale.value = scaleValue.value;
    })
    .onUpdate((event) => {
      'worklet';
      // const newScale = Math.max(0.1, Math.min(startScale.value * event.scale, 2));
      // scaleValue.value = newScale;
      // const maxScale = Math.min(containerWidth / originalSize, containerHeight / originalSize);
      // scaleValue.value = Math.min(newScale, maxScale);

      const newScale = Math.max(0.1, Math.min(startScale.value * event.scale, 1)); // Constrain scaling to 0.1 to 1
      scaleValue.value = newScale;
      console.log('svg' + scaleValue.value);
      
     
    })
    .onEnd(() => {
      'worklet';
      isPinching.value = false;
      runOnJS(setSvgScale)(scaleValue.value);
      console.log(svgScale);
      
     
    })
 

  const animatedStyle = useAnimatedStyle(() => {
    // const scaledWidth = originalSize * scaleValue.value; // Calculate scaled width
    // const scaledHeight = originalSize * scaleValue.value;
    return {
      // width: scaledWidth,  // Keep SVG size proportional
      // height: scaledHeight,
      transform: [
        { scale: withSpring(scaleValue.value) },
        { translateX: withSpring(translateX.value) },
        { translateY: withSpring(translateY.value) },
      ],
    };
  });


  const selectedSvgItem = ASSETS_SVG.find((item) => item.id === selectedSvgId);
  const SvgOnImage = selectedSvgItem ? selectedSvgItem.svg : null;

  const composedGesture = Gesture.Simultaneous(pinchGesture, panGesture );
  // const animatedProps = useAnimatedProps(() => ({
  //   width: 10 * scaleValue.value, 
  //   height: 10 * scaleValue.value, 
  // }));

  return (
    <>
      {selectedSvgItem && (
        
          <GestureDetector gesture={composedGesture}>
              <Animated.View style={[styles.overlaySvg, animatedStyle]}>
                  <SvgOnImage  />
              
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
    width: 340, 
    height: 300,
    zIndex: 10, 
  },
 
});


 
