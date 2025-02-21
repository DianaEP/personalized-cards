import {Dimensions, FlatList, StyleSheet, Text, View, ViewToken } from 'react-native';
import { colors } from '../../UI/theme';
import { fonts } from '../../UI/fonts';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useImageContext } from '../../store/ImageContext';
import Card, { cardHeight } from '../../components/cardsPage/Card';
import Animated, { useAnimatedScrollHandler, useSharedValue } from 'react-native-reanimated';
import Pagination from '../../components/cardsPage/Pagination';
import uuid from 'react-native-uuid';

const { width, height } = Dimensions.get("screen");

// const imageHistory = [
//   {
//     id: '1',
//     clientSideId: uuid.v4(),
//     finalImageUri : require('../../assets/images/umbrellaCropped.jpg')
//   },
//   {
//     id: '2',
//     clientSideId: uuid.v4(),
//     finalImageUri : require('../../assets/images/umbrellaCropped.jpg')
//   },
//   {
//     id: '3',
//     clientSideId: uuid.v4(),
//     finalImageUri : require('../../assets/images/umbrellaCropped.jpg')
//   },
//   {
//     id: '4',
//     clientSideId: uuid.v4(),
//     finalImageUri : require('../../assets/images/umbrellaCropped.jpg')
//   },
// ]
const cardWidth = width * 0.8;

const Cards: React.FC = () => {
  const { state } = useImageContext();
  const imageHistory = state.imageHistory;
  const [paginationIndex, setPaginationIndex] = useState(0);
  const [data, setData] = useState(imageHistory);
  const scrollX = useSharedValue(0);

  useEffect(() => {
    setData(imageHistory);
  }, []);

  
  // console.log('imageHistory:', imageHistory);
  const handleScrollAnimation = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollX.value =  event.contentOffset.x;
    }
  })

  const onViewableItemsChanged = useCallback(({viewableItems}: {viewableItems: ViewToken[]}) => { //a callback function that will be triggered when items in the list change their viewability status.It receives an object that contains the list of viewableItems
    if(viewableItems[0].index !== undefined && viewableItems[0].index !== null){
      console.log("Viewable item index changed:", viewableItems[0].index);
      setPaginationIndex(viewableItems[0].index % imageHistory.length)
    }
  },[])

  const viewabilityConfig = { //the percentage of the item that needs to be visible for it to be considered viewable
    itemVisiblePercentThreshold: 50
  }

  const viewabilityConfigCallbackPairs = useRef([
    {viewabilityConfig, onViewableItemsChanged}
  ])

  const handleEndReached = useCallback(() => {
    const newData = imageHistory.map((item, index) => ({
      ...item,
      clientSideId: uuid.v4(), 
    }));
    console.log(`${newData[0].id}--${newData[0].clientSideId}`);
    
    setData((prevData) =>  [...prevData, ...newData]);  // Check performance later!!!!
  },[imageHistory]);

  

  
  return (
    <View style={styles.container}>
     
      {/* <View style={[styles.stackContainer, { width, height}]}> */}
        <Animated.FlatList 
          data={data}
          keyExtractor={(item) => item.clientSideId}
          renderItem={({item, index}) => <Card item={item} index={index} scrollX={scrollX}/>}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          onScroll={handleScrollAnimation}
          scrollEventThrottle={16}
          contentContainerStyle={{
            alignItems: 'flex-end',
          }}
          viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current} //track the visibility of items as they scroll in and out of view, expects an array of objects, each containing a viewabilityConfig and a corresponding onViewableItemsChanged callback function
          onEndReached={handleEndReached}
        />
        <Pagination items={imageHistory} scrollX={scrollX} paginationIndex={paginationIndex}/>
         <Text style={styles.text}>*Only the last 10 images are stored. Be sure to download them before they are replaced!* </Text>
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
    // justifyContent: 'center',
    paddingVertical: 20
  },
  text: {
    textAlign: 'center',
    color: colors.bodyText,
    fontFamily: fonts.body,
    fontSize: 9,
  },
  // stackContainer: {
  //   flex: 1,
  //   // flexDirection: 'column',
  //   // justifyContent: 'space-evenly',
  //   alignItems: 'center',
  // }
});
