import { StyleSheet, View } from "react-native";
import { PanGestureHandler } from "react-native-gesture-handler";
import { ASSETS_SVG } from "../../../util/dataSvg";
import { fonts } from "../../../UI/fonts";
import { colors } from "../../../UI/theme";

export default function SvgOverlay({
  svgPosition,
  selectedSvgId,
  setSvgPosition,
}) {
  const onDrag = (event) => {
    const { translationX, translationY } = event.nativeEvent;
    setSvgPosition({ x: translationX, y: translationY });
  };

  console.log("svgId " + selectedSvgId);
  const selectedSvgItem = ASSETS_SVG.find((item) => item.id === selectedSvgId);
  const SvgOnImage = selectedSvgItem ? selectedSvgItem.svg : null;
  return (
    <>
      {selectedSvgItem && (
        <PanGestureHandler onGestureEvent={onDrag}>
          <View
            style={[
              styles.overlaySvg,
              {
                transform: [
                  { translateX: svgPosition.x },
                  { translateY: svgPosition.y },
                ],
              },
            ]}
          >
            <SvgOnImage width={50} height={50} />
          </View>
        </PanGestureHandler>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  overlaySvg: {
    position: "absolute",
    bottom: 20,
    left: 20,
    paddingBottom: 0,
    marginBottom: 0,
  },
});
