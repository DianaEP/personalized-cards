import { Alert, ScrollView, StyleSheet, Text, View } from "react-native";


import { colors } from "../../UI/theme";
import React, {  useRef, useState } from "react";
import EditorText from "./imageControl/inlineAndModal/EditorText";
import ImagePreview from "./imagePreview/ImagePreview";
import TextOverlay from "./imagePreview/TextOverlay";
import SvgOverlay from "./imagePreview/SvgOverlay";
import ImageControl from "./imageControl/ImageControl";
import SvgPickerModal from "./imageControl/inlineAndModal/SvgPickerModal";
import { ACTIONS} from "../../store/reducerImagePicker";
import { useImageContext } from "../../store/ImageContext";
import ViewShot from "react-native-view-shot";
import Button from "../../UI/buttons/Button";
import ColorPickerPanel from "./imageControl/inlineAndModal/ColorPickerPanel";
import FontSizeSlider from "./imageControl/inlineAndModal/FontSizeSlider";
import IconButton from "../../UI/buttons/IconButton";

const ImagePicker: React.FC = () => {
    const { state, dispatch } = useImageContext();
    const viewShotRef = useRef<ViewShot | null>(null);

    const [containerWidth, setContainerWidth] = useState< number | null >(null);
    const [containerHeight, setContainerHeight] = useState< number | null >(null);

    // SET ROTATION LOCALLY AND NOT IN THE REDUCER BECAUSE THE INTERACTION IS SMOOTHER
    const [rotation, setRotation ] = useState<number>(0);

    const [resetKey, setResetKey] = useState<number>(0);

    

    const toggleSvgModal = (): void => {
        if(!state.photoTaken){
            Alert.alert("Sorry!", "You need to upload a photo first.");
            return;
        }
        dispatch({ type: ACTIONS.TOGGLE_SVG_MODAL})
    }

    const saveFinalImage = async(): Promise<void> => {
        if(!viewShotRef.current || !viewShotRef.current.capture) return;
        try{
            const uri = await viewShotRef.current.capture();
            dispatch({type: ACTIONS.SET_FINAL_IMAGE_URI, payload: uri});
            Alert.alert("Image Saved!", "Your final image has been saved.");
            dispatch({ type: ACTIONS.RESET_STATE })
            setContainerHeight(null)
            setContainerWidth(null);
            setRotation(0);
            setResetKey(prevKey => prevKey + 1); 
        }catch(error){
            console.error("Error capturing image:", error);
            Alert.alert("Error", "Failed to save the image.");
        }
    }

           
    return(
        <ScrollView style={styles.container}>
            <ViewShot
                ref={viewShotRef} 
                key={resetKey}
                options={{ format: "jpg", quality: 1 }}
                style={styles.imageContainer}
                onLayout={(event) => {
                    const { width, height } = event.nativeEvent.layout;
                    setContainerWidth(width);
                    setContainerHeight(height);
                  }}
            >
              <ImagePreview />
              <TextOverlay 
                containerWidth={containerWidth}  
                containerHeight={containerHeight}
              />
              { containerWidth! > 0 && containerHeight! > 0 && (
                  <SvgOverlay 
                    rotation={rotation}  
                    setRotation={setRotation}
                />
            )}
            </ViewShot>
            <ImageControl toggleModal={toggleSvgModal}/>
            {state.showColorPicker && (
                <ColorPickerPanel />
            )}
            {state.showFontSizeSlider && (
                <FontSizeSlider />
            )}
            {state.showEditorText && (
                <EditorText />
            )}
            <SvgPickerModal onClose={toggleSvgModal}/>

            {state.photoTaken && (
                <View style={styles.floatingButtonContainer}>
                    <IconButton
                        icon='save-alt' 
                        size={24} 
                        color={colors.primary} 
                        onPress={saveFinalImage}
                        save
                    />
                </View>
            )
            }

        </ScrollView>
    )
}
export default ImagePicker;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background, 
    margin: 10,
  },
 
  imageContainer: {
    width: '100%',
    height: 300,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    marginVertical: 10,
  },

  floatingButtonContainer: {
    position: 'absolute',
    top : 10,
    right: 0,
    zIndex: 100
  }


});
