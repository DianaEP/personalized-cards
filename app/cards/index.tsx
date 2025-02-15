import {Image, StyleSheet, Text, View } from 'react-native';
import { colors } from '../../UI/theme';
import { Link } from 'expo-router';
import { fonts } from '../../UI/fonts';
import React from 'react';
import { useImageContext } from '../../store/ImageContext';



const Cards: React.FC = () => {
  const { state } = useImageContext();
  const imageHistory = state.imageHistory;
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Cards</Text>
      {imageHistory.map((item) => (
        <View key={item.id} style={styles.imageContainer}>
          <Image source={{uri: item.finalImageUri }} style={styles.image}/>
        </View>
      ))}
    
      <Link href='cards/1' style={styles.text}>Card 1</Link>
      <Link href='cards/2' style={styles.text}>Card 2</Link>
    </View>
  );
}
export default Cards;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background, 
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: colors.bodyText,
     fontFamily: fonts.body,
  },
  imageContainer:{
    width: '70%',
    height: '80%'
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain'
  }
});
