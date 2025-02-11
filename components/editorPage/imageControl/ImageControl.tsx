import { Alert, StyleSheet, View } from "react-native";
import { colors } from "../../../UI/theme";
import IconButton from "../../../UI/buttons/IconButton";
import { launchCameraAsync, launchImageLibraryAsync, PermissionStatus, useCameraPermissions } from 'expo-image-picker';
import { ACTIONS } from "../../../store/reducerImagePicker";
import { useImageContext } from "../../../store/ImageContext";
import { fonts } from "../../../UI/fonts";

interface ImageControlProps {
    toggleModal: () => void; 
}

const ImageControl: React.FC<ImageControlProps> = ({toggleModal}) => {
    
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

    const toggleColorPicker= (): void => {
        dispatch({ type: ACTIONS.TOGGLE_COLOR_PICKER})
    }

    const setTargetColor = (): void => {
        dispatch({ type: ACTIONS.SET_TARGET_COLOR, payload: state.targetColor === 'text' ? 'svg' : 'text'})     
    }

    const toggleTextFont = (): void => {
        dispatch({ type: ACTIONS.SET_TEXT_FONT, payload: state.textFont === fonts.body2 ? fonts.handwriting : fonts.body2})
    }

    return(
        <View style={styles.imageButtons}>
                <IconButton 
                    icon='camera' 
                    size={24} 
                    color={colors.bodyText} 
                    onPress={() => pickImage(true)}
                />
                <IconButton 
                    icon="image" 
                    size={24} 
                    color={colors.bodyText} 
                    onPress={() => pickImage(false)}
                />
                <IconButton 
                    icon='text' 
                    size={24} 
                    color={colors.bodyText} 
                    onPress={toggleTextFont}
                />
                <IconButton 
                    icon='color-palette' 
                    size={24} 
                    color={colors.bodyText} 
                    onPress={toggleColorPicker}
                />
                <IconButton 
                    icon='swap-horizontal' 
                    size={24} 
                    color={colors.bodyText} 
                    onPress={setTargetColor}
                />
                 <IconButton 
                    icon='add-circle' 
                    size={24} 
                    color={colors.bodyText} 
                    onPress={toggleModal}
                />
            </View>
    )
}
export default ImageControl;

const styles = StyleSheet.create({
 
  imageButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    columnGap: 10,
    marginVertical: 10,
  },
});
