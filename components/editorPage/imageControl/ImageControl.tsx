import { Alert, StyleSheet, Text, View } from "react-native";
import { colors } from "../../../UI/theme";
import IconButton from "../../../UI/buttons/IconButton";
import { launchCameraAsync, launchImageLibraryAsync, PermissionStatus, useCameraPermissions } from 'expo-image-picker';
import { ACTIONS } from "../../../store/reducerImagePicker";
import { useImageContext } from "../../../store/ImageContext";
import { fonts } from "../../../UI/fonts";
import { useState } from "react";
import { useSharedValue } from "react-native-reanimated";
import React from "react";

interface ImageControlProps {
    toggleModal: () => void; 
    saveFinalImage: () => Promise<void>;
}

const ImageControl: React.FC<ImageControlProps> = ({toggleModal, saveFinalImage}) => {


    
    const { state, dispatch} = useImageContext(); 
    const[cameraPermissionStatus, requestPermission] = useCameraPermissions();

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

    const checkPhotoValidation = () : boolean => {
        if(!state.photoTaken){
            Alert.alert("Sorry!", "You need to upload a photo first.");
            return false;
        }
        return true;
    }
    const checkTextValidation = () : boolean => {
        if(!state.textOnImage){
            Alert.alert("Sorry!", "You need to add some text first.");
            return false;
        }
        return true;
    }


    const toggleColorPicker= (): void => {
        if(!checkPhotoValidation()) return;
        dispatch({ type: ACTIONS.TOGGLE_COLOR_PICKER})
    }

    const setTargetColor = (): void => {
        
        dispatch({ type: ACTIONS.SET_TARGET_COLOR, payload: state.targetColor === 'text' ? 'svg' : 'text'})     
    }

    const toggleTextFont = (): void => {
        if(!checkPhotoValidation() || !checkTextValidation()) return;
        dispatch({ type: ACTIONS.SET_TEXT_FONT, payload: state.textFont === fonts.body2 ? fonts.handwriting : fonts.body2})
    }

    const toggleFontSizeSlider = ():void => {
        if(!checkPhotoValidation() || !checkTextValidation()) return;
        dispatch({ type: ACTIONS.TOGGLE_FONT_SIZE_SLIDER})
    }

    const toggleEditorText = ():void => {
        if(!checkPhotoValidation()) return;
        dispatch({ type: ACTIONS.TOGGLE_EDITOR_TEXT})
    }

    const colorButton = colors.titleText;

    return(
        <View style={styles.imageButtons}>
            <View style={styles.wrapperIcons}>
                <View style={styles.icons}>
                    
                    <IconButton 
                        icon='camera' 
                        size={24} 
                        color={colorButton} 
                        label='Camera'
                        onPress={() => pickImage(true)}
                    />
                   
                    <IconButton 
                        icon="image" 
                        size={24} 
                        color={colorButton} 
                        label='Photos'
                        onPress={() => pickImage(false)}
                    />
                    <IconButton 
                        icon='grid' 
                        size={24} 
                        color={colorButton}
                        label='SVG' 
                        onPress={toggleModal}
                    />
                </View>
                <View style={styles.icons}>

                    <IconButton 
                        icon='add-outline' 
                        size={24} 
                        color={colorButton} 
                        label='Add Text'
                        onPress={toggleEditorText}
                    />
                    <IconButton 
                        icon='text' 
                        size={24} 
                        color={colorButton} 
                        label='Font'
                        onPress={toggleTextFont}
                    />
                    <IconButton 
                        icon='resize' 
                        size={24} 
                        color={colorButton} 
                        label='Font Size'
                        onPress={toggleFontSizeSlider}
                    />
                </View>
            </View>
            <View style={styles.wrapperIcons}>
                <View style={styles.iconsColors}>
                    <IconButton 
                        icon='color-palette' 
                        size={24} 
                        color={colorButton} 
                        label='Color Picker'
                        onPress={toggleColorPicker}
                    />
                    <IconButton 
                        icon='swap-horizontal' 
                        size={24} 
                        color={colorButton}
                        label='Switch Color' 
                        onPress={setTargetColor}
                    />
                </View>
            </View>
            {state.photoTaken &&  state.selectedSvgId && state.textOnImage &&(
                <View style={styles.wrapperIcons}>
                    <View style={styles.iconsColors}>
                    <IconButton
                            icon='save-alt' 
                            size={24} 
                            color={colorButton} 
                            label="Save"
                            onPress={saveFinalImage}
                            materialIcon
                        />
                    </View>
                </View>
            )}
        </View>
    )
}
export default ImageControl;

const styles = StyleSheet.create({
  imageButtons: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    columnGap: 10,
    marginVertical: 5,   
  },
  wrapperIcons: {
    flexDirection: 'column',
    rowGap: 10
  },
  icons: {
    flexDirection: 'row',
    justifyContent: 'center',
    columnGap: 20
  },
  iconsColors: {
    flexDirection: 'column',
    rowGap: 10
  },
});
