import {Dimensions, FlatList, StyleSheet, Text, View, ViewToken } from 'react-native';
import { colors } from '../../UI/theme';
import { fonts } from '../../UI/fonts';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useImageContext } from '../../store/ImageContext';
import Card, { cardHeight } from '../../components/cardsPage/Card';
import Animated, { useAnimatedScrollHandler, useDerivedValue, useSharedValue } from 'react-native-reanimated';
import Pagination from '../../components/cardsPage/Pagination';
import IconButton from "../../UI/buttons/IconButton";
import uuid from 'react-native-uuid';
import Button from '../../UI/buttons/Button';
import { deleteImage, getImage, getImages } from '../../util/http/postcardApi';
import { ACTIONS } from '../../store/reducerImagePicker';
import axios from 'axios';
import { useRouter } from 'expo-router';


const { width, height } = Dimensions.get("window");
const cardWidth = width * 0.8;

const Cards: React.FC = () => {
  const { state , dispatch} = useImageContext();
  const imageHistory = state.imageHistory;
  const [paginationIndex, setPaginationIndex] = useState(0);
  const scrollX = useSharedValue(0);
  const router = useRouter();

  // const derivedScrollX = useDerivedValue(() => scrollX.value, [scrollX]);


  useEffect(() => {
    const fetchImageHistory = async () => {
      try{
        const response = await getImages();
        // console.log('backend get response');
        // console.log(response);
        
        if (response.length > 0) {
          dispatch({ type: ACTIONS.SET_IMAGE_HISTORY, payload: response });
        }
      }catch(error){
        console.error('Error fetching image history:', error);
      }

    }
    
    fetchImageHistory();
    
  },[])

  
  const handleScrollAnimation = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollX.value =  event.contentOffset.x;
    }
  })

  const onViewableItemsChanged = useCallback(({viewableItems}: {viewableItems: ViewToken[]}) => { //a callback function that will be triggered when items in the list change their viewability status.It receives an object that contains the list of viewableItems
    if(viewableItems[0].index !== undefined && viewableItems[0].index !== null){
      setPaginationIndex(viewableItems[0].index)
    }
  },[])

  const viewabilityConfig = { //the percentage of the item that needs to be visible for it to be considered viewable
    itemVisiblePercentThreshold: 50
  }

  const viewabilityConfigCallbackPairs = useRef([
    {viewabilityConfig, onViewableItemsChanged}
  ])

  
  const handleDeleteCard = async () => { 
      const currentImage = imageHistory[paginationIndex];
      if(!currentImage) return;
      const imageIdToDelete = currentImage.id;
      await deleteImage(imageIdToDelete);
      dispatch({ type: ACTIONS.REMOVE_IMAGE_HiSTORY, payload: imageIdToDelete})

      const updatedHistory = await getImages();
      dispatch({ type: ACTIONS.SET_IMAGE_HISTORY, payload: updatedHistory });

      if (paginationIndex >= updatedHistory.length) {
        setPaginationIndex(updatedHistory.length - 1); // Ensure we're not out of bounds
      }
  }

 
  const handleUpdateCard = async() => {
      const currentImage =  imageHistory[paginationIndex];
      if (!currentImage) return;
      const imageId = currentImage.id;
      dispatch({type: ACTIONS.SET_SELECTED_IMAGE_HISTORY_ID, payload: imageId})
      const backendImageData = await getImage(imageId);
      console.log('update function in cards');
      
      console.log(state.showSvgModal);
      
      
      
      // console.log("Text Position from backend:", backendImageData.textPosition);

      dispatch({type: ACTIONS.SET_PHOTO, payload: backendImageData.originalImageUri});

      // RESTORE TEXT & POSITION
      dispatch({ type: ACTIONS.SET_OVERLAY_TEXT, payload: backendImageData.overlayText }); 
      dispatch({ type: ACTIONS.ADD_TEXT_ON_IMAGE});
      dispatch({type: ACTIONS.SET_TEXT_POSITION, payload: backendImageData.textPosition});
      dispatch({type: ACTIONS.SET_TEXT_FONT, payload: backendImageData.textFont});
      dispatch({type: ACTIONS.SET_CHOSEN_COLOR, payload: backendImageData.chosenColor})
      dispatch({type: ACTIONS.SET_TEXT_FONT_SIZE, payload: backendImageData.textFontSize});

      // RESTORE SVG & POSITION
      if (currentImage.svgData) {
        dispatch({ type: ACTIONS.SELECT_SVG_ID, payload: backendImageData.svgData.id });
        dispatch({ type: ACTIONS.SET_SVG_POSITION, payload: backendImageData.svgData.position });
        dispatch({ type: ACTIONS.SET_SVG_SCALE, payload: backendImageData.svgData.scale });
        dispatch({ type: ACTIONS.SET_SVG_COLOR, payload: backendImageData.svgData.color });
      }

      setTimeout(() => {
        console.log("Text Position from backend after :", backendImageData.textPosition);
        router.push('/editor');
      }, 100);

  }

  const handleDownloadCard = () => {
      
  }


  // console.log(paginationIndex);
  // console.log('ImageHistory');
  
  // console.log(imageHistory);
  
  
  return (
    <View style={styles.container}>
     
      {/* <View style={[styles.stackContainer, { width, height}]}> */}
       {imageHistory.length > 0 ? (  
        <>
          <Animated.FlatList 
            data={imageHistory}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({item, index}) => <Card item={item} index={index} scrollX={scrollX}/>}
            horizontal
            showsHorizontalScrollIndicator={false}
            pagingEnabled
            onScroll={handleScrollAnimation}
            scrollEventThrottle={16}
            contentContainerStyle={{
              alignItems: 'center',
            }}
            viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current} //track the visibility of items as they scroll in and out of view, expects an array of objects, each containing a viewabilityConfig and a corresponding onViewableItemsChanged callback function
          
          />
          <Pagination items={imageHistory} scrollX={scrollX} paginationIndex={paginationIndex}/>
          <View style={styles.cardButton}>
            <Button onPress={handleDownloadCard} card>Download</Button>
            <Button onPress={handleUpdateCard} card>Update</Button>
            <Button onPress={handleDeleteCard} card>Delete</Button>
          </View>
          <Text style={styles.text}>*Only the last 10 images are stored. Be sure to download them before they are replaced!* </Text> 
          
        </>   
        ) : (
          <View style={styles.noImageTextContainer}>
            <Text style={styles.noImageText}>No images saved yet.</Text>
          </View>       
        )}
       
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
    paddingVertical: 20
  },
  text: {
    textAlign: 'center',
    color: colors.bodyText,
    fontFamily: fonts.body,
    fontSize: width > 360 ? 10 : 9,
    paddingLeft: 15,
    paddingRight: 15
  },
  noImageTextContainer: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center',
  },
  noImageText: {
    color: colors.bodyText, 
    fontSize: width > 360 ? 18 : 16, 
    fontFamily: fonts.body
  },
  cardButton: {
    // justifyContent: 'center',
    width: width,
    marginBottom: width > 360 ? 30 : 10,
  },
  // stackContainer: {
  //   flex: 1,
  //   // flexDirection: 'column',
  //   // justifyContent: 'space-evenly',
  //   alignItems: 'center',
  // }
});



// ---------------------------------------------CONTINUOUS SLIDER------------------------------------------------
// const Cards: React.FC = () => {
//   const { state } = useImageContext();
//   const imageHistory = state.imageHistory;
//   const [paginationIndex, setPaginationIndex] = useState(0);
//   const [data, setData] = useState(imageHistory);
//   const scrollX = useSharedValue(0);

//   useEffect(() => {
//     setData(imageHistory);
//   }, []); // is a problem with the pagination

  
//   // console.log('imageHistory:', imageHistory);
//   const handleScrollAnimation = useAnimatedScrollHandler({
//     onScroll: (event) => {
//       scrollX.value =  event.contentOffset.x;
//     }
//   })

//   const onViewableItemsChanged = useCallback(({viewableItems}: {viewableItems: ViewToken[]}) => { //a callback function that will be triggered when items in the list change their viewability status.It receives an object that contains the list of viewableItems
//     if(viewableItems[0].index !== undefined && viewableItems[0].index !== null){
//       console.log("Viewable item index changed:", viewableItems[0].index);
//       setPaginationIndex(viewableItems[0].index % imageHistory.length)
//     }
//   },[])

//   const viewabilityConfig = { //the percentage of the item that needs to be visible for it to be considered viewable
//     itemVisiblePercentThreshold: 50
//   }

//   const viewabilityConfigCallbackPairs = useRef([
//     {viewabilityConfig, onViewableItemsChanged}
//   ])

//   const handleEndReached = useCallback(() => {
//     const newData = imageHistory.map((item, index) => ({
//       ...item,
//       clientSideId: uuid.v4(), 
//     }));
//     console.log(`${newData[0].id}--${newData[0].clientSideId}`);
    
//     setData((prevData) =>  [...prevData, ...newData]);  // Check performance later!!!!
//   },[imageHistory]);

  

  
//   return (
//     <View style={styles.container}>
     
//       {/* <View style={[styles.stackContainer, { width, height}]}> */}
//         <Animated.FlatList 
//           data={data}
//           keyExtractor={(item) => item.clientSideId}
//           renderItem={({item, index}) => <Card item={item} index={index} scrollX={scrollX}/>}
//           horizontal
//           showsHorizontalScrollIndicator={false}
//           pagingEnabled
//           onScroll={handleScrollAnimation}
//           scrollEventThrottle={16}
//           contentContainerStyle={{
//             alignItems: 'flex-end',
//           }}
//           viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current} //track the visibility of items as they scroll in and out of view, expects an array of objects, each containing a viewabilityConfig and a corresponding onViewableItemsChanged callback function
//           onEndReached={handleEndReached}
//         />
//         <Pagination items={imageHistory} scrollX={scrollX} paginationIndex={paginationIndex}/>
//          <Text style={styles.text}>*Only the last 10 images are stored. Be sure to download them before they are replaced!* </Text>
//       {/* </View> */}
//     </View>
//   );
// }
// export default Cards;
