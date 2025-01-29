import { Image, StyleSheet, Text } from "react-native";
import { fonts } from "../../../UI/fonts";
import { colors } from "../../../UI/theme";

export default function ImagePreview({photoTaken}){
    // console.log(photoTaken);
    
    if(!photoTaken){
        return <Text style={styles.text}>No image taken yet.</Text>
    }

    return <Image style={styles.image} source={{uri: photoTaken}}/>
}
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
