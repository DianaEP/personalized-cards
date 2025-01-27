import { StyleSheet, Text } from "react-native";
import { PanGestureHandler } from "react-native-gesture-handler";
import { fonts } from "../../../UI/fonts";
import { colors } from "../../../UI/theme";

export default function TextOverlay({
  chosenColor,
  setTextPosition,
  textPosition,
  textOnImage,
}) {
  const onDrag = (event) => {
    const { translationX, translationY } = event.nativeEvent;
    setTextPosition({ x: translationX, y: translationY });
  };
  return (
    <>
      {textOnImage && (
        <PanGestureHandler onGestureEvent={onDrag}>
          <Text
            style={[
              styles.overlayText,
              {
                color: chosenColor,
                transform: [
                  { translateX: textPosition.x },
                  { translateY: textPosition.y },
                ],
              },
            ]}
          >
            {textOnImage}
          </Text>
        </PanGestureHandler>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  overlayText: {
    position: "absolute",
    bottom: 20,
    left: 20,
    fontSize: 24,
    fontWeight: "bold",
    padding: 10,
  },
});
