import { Alert, Image, StyleSheet, Text, View } from "react-native";
import { launchCameraAsync, PermissionStatus, useCameraPermissions } from 'expo-image-picker';
import { launchImageLibraryAsync } from "expo-image-picker";
import { fonts } from "../../UI/fonts";
import { colors } from "../../UI/theme";
import { useState } from "react";
import IconButton from "../../UI/buttons/IconButton";
import  ColorPicker, { HueSlider, OpacitySlider, Panel1, Preview, Swatches } from "reanimated-color-picker"
import EditorText from "./EditorText";
import { PanGestureHandler } from "react-native-gesture-handler";

export default function ImagePicker(){
    const [photoTaken, setPhotoTaken] = useState(null);
    const[cameraPermissionStatus, requestPermission] = useCameraPermissions();

    const[showColorPicker, setShowColorPicker] = useState(false);
    const[chosenColor, setChosenColor] = useState(colors.titleText);
    const[overlayText, setOverlayText] = useState('');
    const[textOnImage, setTextOnImage] = useState(null);
    const[textPosition, setTextPosition] = useState({x: 0, y: 0})



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

    // Update text position
    const onDrag = (event) => {
        console.log('Drag Event:', event.nativeEvent);
        const { translationX, translationY} = event.nativeEvent;
        setTextPosition({x: translationX, y: translationY})
    }

    let imagePreview = <Text style={styles.text}>No image taken yet.</Text>;
    if(photoTaken){
        imagePreview = (
            <>
                <Image style={styles.image} source={{uri: photoTaken}}/>
                {textOnImage && (
                   <PanGestureHandler onGestureEvent={onDrag}>
                        <Text 
                            style={[
                                styles.overlayText, 
                                {color: chosenColor, 
                                    transform: [
                                        {translateX: textPosition.x}, 
                                        {translateY: textPosition.y}
                                    ]
                                }]}>
                            {textOnImage}
                        </Text>
                   </PanGestureHandler>
                )}
            </>
        )
    }


    console.log('textPosition:', textPosition);
    console.log('textOnImage:', textOnImage);
    
    return(
        <View style={styles.container}>
            <View style={styles.imageContainer}>
              {imagePreview}
            </View>
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
                    icon='color-palette' 
                    size={24} 
                    color={colors.bodyText} 
                    onPress={toggleColorPicker}
                />
            </View>
            {showColorPicker && (
                <View style={styles.colorPickerContainer}>
                    <ColorPicker
                        value={chosenColor}
                        sliderThickness={20}
                        thumbSize={25}
                        onComplete={(color) => setChosenColor(color.hex)} 
                    >
                        <HueSlider />
                        <Panel1 />
                        <OpacitySlider />
                    </ColorPicker>
                    
                </View>
            )}
            <EditorText 
                chosenColor={chosenColor} 
                overlayText={overlayText} 
                setOverlayText={setOverlayText} 
                onAdd={handleAddText}
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
  text: {
      color: colors.bodyText,
      fontFamily: fonts.body,
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
  image: {
    width: '100%',
    height: '100%',
  },
  imageButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    columnGap: 10,
    marginVertical: 10,
  },
  colorPickerContainer: {
    backgroundColor: colors.background,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: 5,
    position: 'absolute',
    top: 35,
    left: 0,
    width: '100%',
    height: 'auto', 
    padding: 20,
},
overlayText: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    fontSize: 24,
    fontWeight: 'bold',
    padding: 10,
},
});
