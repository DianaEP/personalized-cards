import { Alert, Image, StyleSheet, Text, View } from "react-native";
import { launchCameraAsync, PermissionStatus, useCameraPermissions } from 'expo-image-picker';
import { launchImageLibraryAsync } from "expo-image-picker";
import { fonts } from "../UI/fonts";
import { colors } from "../UI/theme";
import { useState } from "react";
import IconButton from "../UI/buttons/IconButton";

export default function ImagePicker(){
    const [photoTaken, setPhotoTaken] = useState(null);
    const[cameraPermissionStatus, requestPermission] = useCameraPermissions();
    
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

    let imagePreview = <Text style={styles.text}>No image taken yet.</Text>;
    if(photoTaken){
        imagePreview = <Image style={styles.image} source={{uri: photoTaken}}/>
    }
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
            </View>
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
  }
});
