import { Alert, StyleSheet, Text, View } from "react-native";
import { ImagePickerResult, launchCameraAsync, PermissionStatus, useCameraPermissions } from 'expo-image-picker';
import { launchImageLibraryAsync } from "expo-image-picker";
import { colors } from "../../UI/theme";
import React, { useReducer, useState } from "react";
import EditorText from "./EditorText";
import ImagePreview from "./imagePreview/ImagePreview";
import TextOverlay from "./imagePreview/TextOverlay";
import SvgOverlay from "./imagePreview/SvgOverlay";
import ImageControl from "./imageControl/ImageControl";
import ColorPickerModal from "./imageControl/ColorPickerModal";
import SvgPickerModal from "./imageControl/SvgPickerModal";
import { ACTIONS, initialState, reducer } from "../../util/reducerImagePicker";
import { Position } from "../../util/interfaces";

const ImagePicker: React.FC = () => {
  
    const[cameraPermissionStatus, requestPermission] = useCameraPermissions();
    const [state, dispatch] = useReducer(reducer, initialState);

    const [containerWidth, setContainerWidth] = useState< number | null >(null);
    const [containerHeight, setContainerHeight] = useState< number | null >(null);
    const [rotation, setRotation ] = useState<number>(0);


    
    const verifyPermissions =  async(): Promise<boolean> => {
        if(cameraPermissionStatus?.status === PermissionStatus.UNDETERMINED){
            const permissionResponse = await requestPermission();
            return permissionResponse.granted;
        }
        if(cameraPermissionStatus?.status === PermissionStatus.DENIED){
            Alert.alert('Permission Denied', 'You need to grant camera permissions to use this feature', [{text: 'Okay'}]);
            return false;
        } 
        return true;  
    }
    
    const pickImage = async(fromCamera: boolean = true): Promise<void> => {
        const hasPermission = await verifyPermissions();
        if(!hasPermission){
            return;
        }
        
        let photo;;
        
        if(fromCamera){
            // Open the camera
            photo = await launchCameraAsync({ 
                allowsEditing: true,
                aspect: [16, 9],
                quality: 1,
                mediaTypes: ['images'],
            });    
        }else{
            // Open the gallery
            photo = await launchImageLibraryAsync({
                allowsEditing: true,
                aspect: [16, 9],
                quality: 1,
                mediaTypes: ['images'],
            });
        }
        if(photo.canceled){
            console.log("User canceled the image selection");
            return;
        }
        dispatch({ type: ACTIONS.SET_PHOTO, payload: photo.assets[0].uri})
    }
    
  
    const toggleSvgModal = (): void => {
        if(!state.photoTaken){
            Alert.alert("Sorry!", "You need to upload a photo first.");
            return;
        }
        dispatch({ type: ACTIONS.TOGGLE_SVG_MODAL})
    }
       
    const handleSvgSelect = (id: string): void => {
        
        dispatch({ type: ACTIONS.SELECT_SVG_ID, payload: id})
    }
    
    const toggleColorPicker= (): void => {
        dispatch({ type: ACTIONS.TOGGLE_COLOR_PICKER})
    }

    const setTargetColor = (): void => {
        dispatch({ type: ACTIONS.SET_TARGET_COLOR, payload: state.targetColor === 'text' ? 'svg' : 'text'})
        
    }

    const handleColorChange = (color: string): void => {
        if(state.targetColor === 'text') {
            dispatch({ type: ACTIONS.SET_CHOSEN_COLOR, payload: color})
        }else if( state.targetColor === 'svg'){
            dispatch({type: ACTIONS.SET_SVG_COLOR, payload: color})
        }
    }

    // Apply text to image
    const handleAddText = (): void => {
        if(!state.photoTaken){
            Alert.alert("Sorry!", "You need to upload a photo first.");
            return;
        }
        dispatch({ type: ACTIONS.ADD_TEXT_ON_IMAGE})
    }
    

    
    return(
        <View style={styles.container}>
            <View 
                style={styles.imageContainer}
                onLayout={(event) => {
                    const { width, height } = event.nativeEvent.layout;
                    setContainerWidth(width);
                    setContainerHeight(height);
                  }}
            >
              <ImagePreview photoTaken={state.photoTaken}/>
              <TextOverlay 
                chosenColor={state.chosenColor} 
                setTextPosition={(position: Position) => dispatch({ type: ACTIONS.SET_TEXT_POSITION, payload: position})} 
                textPosition={state.textPosition} 
                textOnImage={state.textOnImage}
                containerWidth={containerWidth}  
                containerHeight={containerHeight}
              />
              {containerWidth! > 0 && containerHeight! > 0 && (
                  <SvgOverlay 
                    svgColor={state.svgColor} 
                    svgPosition={state.svgPosition} 
                    selectedSvgId={state.selectedSvgId} 
                    svgScale={state.svgScale}
                    setSvgPosition={(position: Position) => dispatch({ type: ACTIONS.SET_SVG_POSITION, payload: position})}
                    setSvgScale={(scale: number) => dispatch({type: ACTIONS.SET_SVG_SCALE, payload: scale})}
                    containerWidth={containerWidth} 
                    containerHeight={containerHeight}
                    rotation={rotation}  
                    setRotation={setRotation}
                />
            )}
            </View>

            <ImageControl 
                pickImage={pickImage} 
                toggleColorPicker={toggleColorPicker} 
                toggleModal={toggleSvgModal}
                switchTarget={setTargetColor}
            />

            {state.showColorPicker && (
                <ColorPickerModal  
                    chosenColor={state.targetColor === 'text' ? state.chosenColor : state.svgColor} 
                    setChosenColor={handleColorChange}
                    label={state.targetColor === 'text' ? 'Text Color' : 'SVG Color'}
                />
            )}
            <EditorText 
                chosenColor={state.chosenColor} 
                overlayText={state.overlayText} 
                setOverlayText={(text: string) => dispatch({ type: ACTIONS.SET_OVERLAY_TEXT, payload: text})} 
                onAdd={handleAddText}
            />
            <SvgPickerModal
                visible={state.showSvgModal}
                onClose={toggleSvgModal}
                onSelect={handleSvgSelect}
            />
        </View>
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

});
