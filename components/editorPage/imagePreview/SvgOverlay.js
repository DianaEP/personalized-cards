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
  svgColor,
  containerWidth,  
  containerHeight,
  rotation,
  setRotation
}) {
  
  const translateX = useSharedValue(svgPosition.x ); 
  const translateY = useSharedValue(svgPosition.y );
  const scaleValue = useSharedValue(svgScale);
  const rotationValue = useSharedValue(rotation);

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
      const scaledWidth = originalSize * scaleValue.value;
      const scaledHeight = originalSize * scaleValue.value;


    let minX = 0;
    let maxX = containerWidth - scaledWidth;
    let minY = 0;
    let maxY = containerHeight - scaledHeight;

    let newTranslateX = startTranslateX.value + event.translationX;
    let newTranslateY = startTranslateY.value + event.translationY;
    
    if(scaleValue.value >=1){
      newTranslateX = Math.min(maxX, Math.max(minX, startTranslateX.value + event.translationX));
      newTranslateY = Math.min(maxY, Math.max(minY, startTranslateY.value + event.translationY));
    }


      translateX.value = newTranslateX;
      translateY.value = newTranslateY;
    

    })
    .onEnd(() => {
      'worklet';
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
     
      const newScale = Math.max(0.5, Math.min(startScale.value * event.scale, 1)); // Constrain scaling to 0.1 to 1
      scaleValue.value = newScale;

    })
    .onEnd(() => {
      'worklet';
      isPinching.value = false;
      runOnJS(setSvgScale)(scaleValue.value);  
    })

    const rotateGesture = Gesture.Rotation()
      .onUpdate((event) => {
        'worklet'
        rotationValue.value = event.rotation
      })
      .onEnd(() => {
        runOnJS(setRotation)(rotationValue.value) 
      })
 

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { scale: withSpring(scaleValue.value) },
        { translateX: withSpring(translateX.value) },
        { translateY: withSpring(translateY.value) },
        { rotate : withSpring(rotationValue.value + 'rad')}
      ],
    };
  });


  const selectedSvgItem = ASSETS_SVG.find((item) => item.id === selectedSvgId);
  const SvgOnImage = selectedSvgItem ? selectedSvgItem.svg : null;

  const composedGesture = Gesture.Simultaneous(pinchGesture, panGesture, rotateGesture);
  return (
    <>
      {selectedSvgItem && (
        
          <GestureDetector gesture={composedGesture}>
            <View style={styles.wrapper}>
              <Animated.View style={[styles.overlaySvg, animatedStyle]}>
                <SvgOnImage color={svgColor}/>
              </Animated.View>

            </View>

          </GestureDetector>
         
      )}
    </>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: "absolute",
    top: 0,
    left: 0,
    paddingBottom: 0,
    marginBottom: 0,
    width: 340, 
    height: 300,
  },
  overlaySvg: {
    zIndex: 5, 
  },
 
});


 
