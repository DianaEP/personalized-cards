import {FlatList, StyleSheet, Text, View } from 'react-native';
import { colors } from '../../UI/theme';
import { fonts } from '../../UI/fonts';
import React from 'react';
import { useImageContext } from '../../store/ImageContext';
import Card from '../../components/cardsPage/Card';



const Cards: React.FC = () => {
  const { state } = useImageContext();
  const imageHistory = state.imageHistory;
  console.log(imageHistory);
  
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Cards</Text>
      <View style={styles.stackContainer}>
        <FlatList 
          data={imageHistory}
          keyExtractor={(item) => item.id}
          renderItem={({item}) => <Card item={item}/>}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </View>
    </View>
  );
}
export default Cards;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background, 
    alignItems: 'center',
  },
  text: {
    color: colors.bodyText,
     fontFamily: fonts.body,
  },
  stackContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  }
});
