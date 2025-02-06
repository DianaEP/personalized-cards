import { Image, StyleSheet, Text } from "react-native";
import { fonts } from "../../../UI/fonts";
import { colors } from "../../../UI/theme";
import React from "react";

interface ImagePreviewProps {
  photoTaken: string | null;
}

const ImagePreview: React.FC<ImagePreviewProps> = ({photoTaken}) => {
    // console.log(photoTaken);
    
    if(!photoTaken){
        return <Text style={styles.text}>No image taken yet.</Text>
    }

    return <Image style={styles.image} source={{uri: photoTaken}}/>
}
export default ImagePreview;

const styles = StyleSheet.create({
  text: {
      color: colors.bodyText,
      fontFamily: fonts.body,
  },
  image: {
    width: '100%',
    height: '100%',
  },
})
