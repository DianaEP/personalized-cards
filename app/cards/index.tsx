import {Dimensions, FlatList, StyleSheet, Text, View, ViewToken } from 'react-native';
import { colors } from '../../UI/theme';
import { fonts } from '../../UI/fonts';
import React, { useRef, useState } from 'react';
import { useImageContext } from '../../store/ImageContext';
import Card, { cardHeight } from '../../components/cardsPage/Card';
import Animated, { useAnimatedScrollHandler, useSharedValue } from 'react-native-reanimated';
import Pagination from '../../components/cardsPage/Pagination';
import uuid from 'react-native-uuid';

const { width, height } = Dimensions.get("screen");

const imageData = [
  {
    id: '1',
    finalImageUri : require('../../assets/images/umbrellaCropped.jpg')
  },
  {
    id: '2',
    finalImageUri : require('../../assets/images/umbrellaCropped.jpg')
  },
  {
    id: '3',
    finalImageUri : require('../../assets/images/umbrellaCropped.jpg')
  },
  {
    id: '4',
    finalImageUri : require('../../assets/images/umbrellaCropped.jpg')
  },
]
const cardWidth = width * 0.8;

const Cards: React.FC = () => {
  // const { state } = useImageContext();
  // const imageHistory = state.imageHistory;
  const [paginationIndex, setPaginationIndex] = useState(0);
  const [data, setData] = useState(imageData);
  const scrollX = useSharedValue(0);
  
  const handleScrollAnimation = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollX.value =  event.contentOffset.x;
    }
  })

  const onViewableItemsChanged = ({viewableItems}: {viewableItems: ViewToken[]}) => {
    if(viewableItems[0].index !== undefined && viewableItems[0].index !== null){
      setPaginationIndex(viewableItems[0].index % imageData.length)
    }
  }

  const viewabilityConfig = {
    itemVisiblePercentThreshold: 50
  }

  const viewabilityConfigCallbackPairs = useRef([
    {viewabilityConfig, onViewableItemsChanged}
  ])

  const handleEndReached = () => {
    const newData = imageData.map((item, index) => ({
      ...item,
      id: uuid.v4(), // Modify the ID to ensure uniqueness
    }));
    setData((prevData) => [...prevData, ...newData]); // Add the new data with unique IDs
  };
  
  
  return (
    <View style={styles.container}>
      {/* <Text style={styles.text}>Your Gallery</Text> */}
      {/* <View style={[styles.stackContainer, { width, height}]}> */}
        <Animated.FlatList 
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={({item, index}) => <Card item={item} index={index} scrollX={scrollX}/>}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          onScroll={handleScrollAnimation}
          scrollEventThrottle={16}
          contentContainerStyle={{
            alignItems: 'center',
          }}
          viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current}
          onEndReached={handleEndReached}
        />
        <Pagination items={imageData} scrollX={scrollX} paginationIndex={paginationIndex}/>
      {/* </View> */}
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
    paddingVertical: 20
  },
  text: {
    color: colors.bodyText,
     fontFamily: fonts.body,
  },
  // stackContainer: {
  //   flex: 1,
  //   // flexDirection: 'column',
  //   // justifyContent: 'space-evenly',
  //   alignItems: 'center',
  // }
});
