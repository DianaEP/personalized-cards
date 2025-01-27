import { Alert, Image, StyleSheet, Text, View } from "react-native";
import { launchCameraAsync, PermissionStatus, useCameraPermissions } from 'expo-image-picker';
import { launchImageLibraryAsync } from "expo-image-picker";
import { colors } from "../../UI/theme";
import { useState } from "react";
import EditorText from "./EditorText";
import ImagePreview from "./imagePreview/ImagePreview";
import TextOverlay from "./imagePreview/TextOverlay";
import SvgOverlay from "./imagePreview/SvgOverlay";
import ImageControl from "./imageControl/ImageControl";
import ColorPickerModal from "./imageControl/ColorPickerModal";
import SvgPickerModal from "./imageControl/SvgPickerModal";

export default function ImagePicker(){
    const [photoTaken, setPhotoTaken] = useState(null);
    const[cameraPermissionStatus, requestPermission] = useCameraPermissions();

    const[showColorPicker, setShowColorPicker] = useState(false);
    const[chosenColor, setChosenColor] = useState(colors.titleText);
    const[overlayText, setOverlayText] = useState('');
    const[textOnImage, setTextOnImage] = useState(null);
    const[textPosition, setTextPosition] = useState({x: 0, y: 0})

    // Svg
    const[isModalVisible, setIsModalVisible] = useState(false);
    const[selectedSvgId, setSelectedSvgId] = useState(null);
    const [svgPosition, setSvgPosition] = useState({ x: 0, y: 0 });

    const toggleModal = () => {
        console.log("Modal toggled" +  isModalVisible);
        setIsModalVisible((prevStateModal) => !prevStateModal)
    }
    console.log(isModalVisible);
    
    const handleSvgSelect = (id) => {
        setSelectedSvgId(id);
        console.log(selectedSvgId);
        
        toggleModal();
    }



    const toggleColorPicker= () => {
        setShowColorPicker((prevStateColor) => !prevStateColor)
    }
    
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
        setPhotoTaken(photo.assets[0].uri)
        console.log(photo.assets[0].uri); 
    }

    console.log('Overlay Text:', overlayText);
    // Apply text to image
    const handleAddText = () => {
        if(!overlayText){
            Alert.alert("Error", "Please enter text to add to the image");
            return;
        }
        setTextOnImage(overlayText);
        setOverlayText('');
    }



    console.log('textPosition:', textPosition);
    console.log('textOnImage:', textOnImage);
    
    return(
        <View style={styles.container}>
            <View style={styles.imageContainer}>
              <ImagePreview photoTaken={photoTaken}/>
              <TextOverlay 
                chosenColor={chosenColor} 
                setTextPosition={setTextPosition} 
                textPosition={textPosition} 
                textOnImage={textOnImage}
              />
              <SvgOverlay  
                svgPosition={svgPosition} 
                selectedSvgId={selectedSvgId} 
                setSvgPosition={setSvgPosition}
            />
            </View>

            <ImageControl pickImage={pickImage} toggleColorPicker={toggleColorPicker} toggleModal={toggleModal}/>

            {showColorPicker && (
                <ColorPickerModal  chosenColor={chosenColor} setChosenColor={setChosenColor}/>
            )}
            <EditorText 
                chosenColor={chosenColor} 
                overlayText={overlayText} 
                setOverlayText={setOverlayText} 
                onAdd={handleAddText}
            />
            <SvgPickerModal
                visible={isModalVisible}
                onClose={toggleModal}
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
