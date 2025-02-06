import { StyleSheet, Text } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, { runOnJS, useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";
import { useState } from "react";
import { Position } from "../../../util/interfaces";

interface TextDimension {
  width: number;
  height: number;
}

interface TextOverlayProps {
  chosenColor: string;
  setTextPosition: ({x, y}: Position) => void;
  textPosition: Position;
  textOnImage: string | null;
  containerWidth: number | null;
  containerHeight: number | null;
}

const TextOverlay: React.FC<TextOverlayProps> = ({
  chosenColor,
  setTextPosition,
  textPosition,
  textOnImage,
  containerWidth,
  containerHeight
}) => {

  const translateX = useSharedValue(textPosition.x);
  const translateY = useSharedValue(textPosition.y);

  const startTranslateX = useSharedValue(textPosition.x);
  const startTranslateY = useSharedValue(textPosition.y);

  const [textDimension, setTextDimension] = useState<TextDimension>({ width: 0, height: 0});
  const onTextLayout = (event: any) => {
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
      let maxX = containerWidth ? containerWidth - width : 0;
      let minY = 0;
      let maxY = containerHeight ? containerHeight - height: 0;
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
export default TextOverlay;

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
