import { Alert, StyleSheet, Text, View } from "react-native";
import { launchCameraAsync, PermissionStatus, useCameraPermissions } from 'expo-image-picker';
import { launchImageLibraryAsync } from "expo-image-picker";
import { colors } from "../../UI/theme";
import { useReducer, useState } from "react";
import EditorText from "./EditorText";
import ImagePreview from "./imagePreview/ImagePreview";
import TextOverlay from "./imagePreview/TextOverlay";
import SvgOverlay from "./imagePreview/SvgOverlay";
import ImageControl from "./imageControl/ImageControl";
import ColorPickerModal from "./imageControl/ColorPickerModal";
import SvgPickerModal from "./imageControl/SvgPickerModal";
import { ACTIONS, initialState, reducer } from "../../util/reducerImagePicker";

export default function ImagePicker(){
    const[cameraPermissionStatus, requestPermission] = useCameraPermissions();
    const [state, dispatch] = useReducer(reducer, initialState);

    const [containerWidth, setContainerWidth] = useState(null);
    const [containerHeight, setContainerHeight] = useState(null);


    
    async function verifyPermissions(){
        if(cameraPermissionStatus.status === PermissionStatus.UNDETERMINED){
            const permissionResponse = await requestPermission();
            return permissionResponse.granted;
        }
        if(cameraPermissionStatus.status === PermissionStatus.DENIED){
            Alert.alert('Permission Denied', 'You need to grant camera permissions to use this feature', [{text: 'Okay'}]);
            return false;
        } 
        return true;  
    }
    
    async function pickImage(fromCamera = true){
        const hasPermission = await verifyPermissions();
        if(!hasPermission){
            return;
        }
        
        let photo;
        
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
    
  
    const toggleSvgModal = () => {
        // if(!state.photoTaken){
        //     Alert.alert("Sorry!", "You need to upload a photo first.");
        //     return;
        // }
        dispatch({ type: ACTIONS.TOGGLE_SVG_MODAL})
    }
       
    const handleSvgSelect = (id) => {
        
        dispatch({ type: ACTIONS.SELECT_SVG_ID, payload: id})
    }
    
    const toggleColorPicker= () => {
        dispatch({ type: ACTIONS.TOGGLE_COLOR_PICKER})
    }

    // Apply text to image
    const handleAddText = () => {
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
                setTextPosition={(position) => dispatch({ type: ACTIONS.SET_TEXT_POSITION, payload: position})} 
                textPosition={state.textPosition} 
                textOnImage={state.textOnImage}
                containerWidth={containerWidth}  
                containerHeight={containerHeight}
              />
              {containerWidth > 0 && containerHeight > 0 && (
                  <SvgOverlay  
                    svgPosition={state.svgPosition} 
                    selectedSvgId={state.selectedSvgId} 
                    svgScale={state.svgScale}
                    setSvgPosition={(position) => dispatch({ type: ACTIONS.SET_SVG_POSITION, payload: position})}
                    setSvgScale={(scale) => dispatch({type: ACTIONS.SET_SVG_SCALE, scale})}
                    containerWidth={containerWidth} 
                    containerHeight={containerHeight}
                />
            )}
            </View>

            <ImageControl pickImage={pickImage} toggleColorPicker={toggleColorPicker} toggleModal={toggleSvgModal}/>

            {state.showColorPicker && (
                <ColorPickerModal  
                    chosenColor={state.chosenColor} 
                    setChosenColor={(color) => dispatch({ type: ACTIONS.SET_CHOSEN_COLOR, payload: color})}
                />
            )}
            <EditorText 
                chosenColor={state.chosenColor} 
                overlayText={state.overlayText} 
                setOverlayText={(text) => dispatch({ type: ACTIONS.SET_OVERLAY_TEXT, payload: text})} 
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
