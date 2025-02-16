import React from "react";
import { StyleSheet, View } from "react-native";
import { ImageItem } from "../../store/reducerImagePicker";
import { Link } from "expo-router";
import { Image } from "react-native";
import { platformStyle } from "../../UI/shadowStyle";


const Card: React.FC<{item: ImageItem}> = ({item}) => {
    return(
            <View key={item.id} style={styles.imageContainer}>
            <Link href={`cards/${item.id}`}>
                <Image source={{uri: item.finalImageUri }} style={styles.image}/>
            </Link>
            </View>
    )
}

export default Card;

const styles = StyleSheet.create({
    
  imageContainer:{
    width: 300,
    height: 250,
    margin: 10,
    overflow: 'hidden', 
    borderRadius: 10,
     ...platformStyle.shadow,  
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover'
  },
  
});