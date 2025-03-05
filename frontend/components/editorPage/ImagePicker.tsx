import { Alert, ScrollView, StyleSheet, Text, View } from "react-native";
import { colors } from "../../UI/theme";
import React, {  useEffect, useRef, useState } from "react";
import EditorText from "./imageControl/controllers/EditorText";
import ImagePreview from "./imagePreview/ImagePreview";
import TextOverlay from "./imagePreview/TextOverlay";
import SvgOverlay from "./imagePreview/SvgOverlay";
import ImageControl from "./imageControl/ImageControl";
import SvgPickerModal from "./imageControl/controllers/SvgPickerModal";
import { ACTIONS, ImageItem} from "../../store/reducerImagePicker";
import { useImageContext } from "../../store/ImageContext";
import ViewShot from "react-native-view-shot";
import Button from "../../UI/buttons/Button";
import ColorPickerPanel from "./imageControl/controllers/ColorPickerPanel";
import FontSizeSlider from "./imageControl/controllers/FontSizeSlider";
import IconButton from "../../UI/buttons/IconButton";
import { platformStyle } from "../../UI/shadowStyle";
import { useRouter } from "expo-router";
import { height, width } from "../../util/screenDimension";
import { getImages, saveImageUri, updateImage } from "../../util/http/postcardApi";
import * as FileSystem from 'expo-file-system'; 

// This is needed because the `viewShotRef.current.capture()` method initially saves the image URI as a temporary cache.
// When the app re-renders, the cached URI might no longer be valid or accessible, causing issues when trying to display or process the image.
// By moving the image to permanent storage, we ensure that the URI remains valid across re-renders and app restarts.
const moveImageToPermanentStorage = async(uri: string): Promise<string> => {
    try{
         // 1. Check if the document directory (permanent storage) is available.
        if (!FileSystem.documentDirectory) {
            throw new Error("Permanent storage directory is not available.");
        }
         // 2. Extract the file name from the URI.
        const fileName = uri.split('/').pop();
         // 3. Construct the permanent URI by appending the file name to the document directory.
        const permanentUri = FileSystem.documentDirectory + fileName;
         // 4.`moveAsync()` actually moves the file from the temporary location to the new permanent path.
        await FileSystem.moveAsync({
            from: uri,
            to: permanentUri,
        });
        return permanentUri
    }catch(error){
        console.error("Error moving image to permanent storage:", error);
        throw new Error("Failed to move image to permanent storage");
    }
}

const ImagePicker: React.FC = () => {
    const { state, dispatch } = useImageContext();
    const viewShotRef = useRef<ViewShot | null>(null);
    const router = useRouter();

    const [containerWidth, setContainerWidth] = useState< number | null >(null);
    const [containerHeight, setContainerHeight] = useState< number | null >(null);

    // SET ROTATION LOCALLY AND NOT IN THE REDUCER BECAUSE THE INTERACTION IS SMOOTHER
     // ROTATION WILL NOT KEEP THE VALUE ON UPDATE , AS IS NO ROTATION VALUE IN THE BACKEND
    const [rotation, setRotation ] = useState<number>(0);

    const [resetKey, setResetKey] = useState<number>(0);

 
    const saveFinalImage = async(): Promise<void> => {
        if(!viewShotRef.current || !viewShotRef.current.capture) return;
        try{
            const uri = await viewShotRef.current.capture();
            const permanentUri = await moveImageToPermanentStorage(uri);

            if (!state.photoTaken) {
                console.error("No image to save!");
                return;
            }
           
            const permanentOriginalUri = await moveImageToPermanentStorage(state.photoTaken);

            const svgData = {
                id: state.selectedSvgId,
                position: state.svgPosition,
                scale: state.svgScale,
                color: state.svgColor
            };

            const imageData: Omit<ImageItem, 'id'>= {
                finalImageUri: permanentUri, 
                originalImageUri: permanentOriginalUri,
                overlayText: state.textOnImage,
                textPosition: state.textPosition,
                textFont: state.textFont,
                textFontSize: state.textFontSize,
                chosenColor: state.chosenColor,
                svgData: svgData 
            }

        
            const selectedImage = state.imageHistory.find((image) => image.id === state.selectedImageHistoryId);
            const selectedImageId = state.selectedImageHistoryId;

            

            if(!selectedImage || !selectedImageId){
                // console.log(state.chosenColor)
                const response = await saveImageUri(imageData);
    
                if( response && response.id){
                    const newImage: ImageItem = {
                        id: response.id,  
                        ...imageData                  
                    };
                    dispatch({ type: ACTIONS.SET_IMAGE_HISTORY, payload: newImage });            
                    Alert.alert("Image Saved!", "Your final image has been saved.");
                }

            }else{
                if(selectedImageId){
                    const updatedImage = {
                        ...selectedImage,
                        ...imageData    
                    }
                    const response  = await updateImage(selectedImageId, updatedImage);
                    console.log('API Response:', response);
                    dispatch({type: ACTIONS.UPDATE_IMAGE_HISTORY, payload: updatedImage});
                    
                    Alert.alert("Image Updated!", "Your image has been updated.");
                    // console.log('Updated Image History:', state.imageHistory);
                }
            }
            // await getImages();
            dispatch({ type: ACTIONS.RESET_STATE })
            setContainerHeight(null)
            setContainerWidth(null);
            setRotation(0);
            setResetKey(prevKey => prevKey + 1); 
            router.push('/cards')
        }catch(error){
            console.error("Error capturing image:", error);
            Alert.alert("Error", "Failed to save the image.");
        }
    }

           
    return(
        <View style={styles.container}>
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
            <ImageControl saveFinalImage={saveFinalImage}/>
            {state.showColorPicker && (
                <ColorPickerPanel />
            )}
            {state.showFontSizeSlider && (
                <FontSizeSlider />
            )}
            {state.showEditorText && (
                <EditorText />
            )}
            {state.showSvgModal && (
                <SvgPickerModal/>
            )}

        </View>
    )
}
export default ImagePicker;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    justifyContent: 'center',
    margin: 10,
    borderRadius: 5,
  },
 
  imageContainer: {
    width: '100%',
    height: 300,
    backgroundColor: colors.background, 
    borderColor: colors.bodyText,
    borderWidth: 1,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    marginVertical: height > 700 ? 40 : 10,
    ...platformStyle.shadow,  
  },



});
