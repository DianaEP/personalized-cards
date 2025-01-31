import { StyleSheet, Text } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { fonts } from "../../../UI/fonts";
import { colors } from "../../../UI/theme";
import Animated, { runOnJS, useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";
import { useState } from "react";

export default function TextOverlay({
  chosenColor,
  setTextPosition,
  textPosition,
  textOnImage,
  containerWidth,
  containerHeight
}) {

  const translateX = useSharedValue(textPosition.x);
  const translateY = useSharedValue(textPosition.y);

  const startTranslateX = useSharedValue(textPosition.x);
  const startTranslateY = useSharedValue(textPosition.y);

  const [textDimension, setTextDimension] = useState({ width: 0, height: 0});
  const onTextLayout = (event) => {
    const { width, height } = event.nativeEvent.layout;
    setTextDimension({ width, height})
  }

  const panGesture = Gesture.Pan()
    .onStart(() => {
      'worklet';
      startTranslateX.value = translateX.value;
      startTranslateY.value = translateY.value;
    })
    .onUpdate((event) => {
      'worklet'
      const { width, height } = textDimension;
      let minX = 0;
      let maxX = containerWidth - width;
      let minY = 0;
      let maxY = containerHeight - height;
      translateX.value = Math.min(maxX, Math.max(minX, startTranslateX.value + event.translationX));
      translateY.value = Math.min(maxY, Math.max(minY, startTranslateX.value + event.translationY));

    })
    .onEnd(() => {
      'worklet'
      runOnJS(setTextPosition)({ x: translateX.value, y: translateY.value})
    })


  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {translateX: withSpring(translateX.value)},
        {translateY: withSpring(translateY.value)}
      ]
    }
  })
  return (
    <>
      {textOnImage && (
        <GestureDetector gesture={panGesture}>
          <Animated.View 
            style={[styles.wrapper, animatedStyle]}
            onLayout={onTextLayout}
          >
            <Text
              style={[styles.overlayText, {color: chosenColor}]}
            >
              {textOnImage}
            </Text>
          </Animated.View>
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
    zIndex: 10,
  },
  overlayText: {
    fontSize: 24,
    fontWeight: "bold",
    padding: 10,
  },
});
