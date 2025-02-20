import React from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import { ImageItem } from "../../store/reducerImagePicker";
import { Link } from "expo-router";
import { Image } from "react-native";
import { platformStyle } from "../../UI/shadowStyle";
import Animated, { Extrapolation, interpolate, SharedValue, useAnimatedStyle, useSharedValue } from "react-native-reanimated";
import IconButton from "../../UI/buttons/IconButton";
import { colors } from "../../UI/theme";

const { width, height } = Dimensions.get('screen');

const cardWidth = width * 0.9;
export const cardHeight = height > 700 ? height * 0.5 : height * 0.4;

interface CardProps {
  item: ImageItem,
  index: number,
  scrollX: SharedValue<number>
}


const Card: React.FC<CardProps> = ({item, index, scrollX}) => {
  const animatedStyle = useAnimatedStyle(() => {
    return{
      transform: [
        {
          translateX: interpolate(
            scrollX.value,
            [(index-1)* width, index* width, (index+1)*width],
            [-width*0.15, 0, width*0.15],
            Extrapolation.CLAMP
          )
        },
        {
          scale: interpolate(
            scrollX.value, 
            [(index - 1) * width, index * width, (index + 1) * width], 
            [0.8, 1, 0.8], 
            Extrapolation.CLAMP
          ),
        },
      ]
    }
  })

  const handleDeleteCard = () => {
    
  }
  const handleDownloadCard = () => {
    
  }
  
  
    return(
      <Animated.View key={item.id} style={[styles.imageContainer, animatedStyle]}>
              
        <Link href={`cards/${item.id}`}>
          <View style={styles.imageWrapper}>
            {/* <Image source={{uri: item.finalImageUri }} style={styles.image}/> */}
                
            <Image source={item.finalImageUri} style={styles.image}/>
            <View style={styles.cardButton}>
              <IconButton card materialIcon icon='delete-outline' size={20} color={colors.titleText} onPress={handleDeleteCard}/>
              <IconButton card materialIcon icon='download' size={20} color={colors.titleText} onPress={handleDownloadCard}/>
            </View>
          </View>
        </Link>
      </Animated.View>
    )
}

export default Card;

const styles = StyleSheet.create({
    
  imageContainer:{
    justifyContent: 'center',
    alignItems: 'center',
    width: width,
    height: cardHeight,
    overflow: 'hidden',    
  },
  imageWrapper: {
    width: cardWidth,
    height: cardHeight,
    borderRadius: 10,
    ...platformStyle.shadow, 
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderRadius: 10,
  },
  cardButton: {
    position: 'absolute',
    right: 5,
    top: 5,
    flexDirection: 'row',
    gap: 2
  }
  
});