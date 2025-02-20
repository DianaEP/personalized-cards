import { Dimensions, StyleSheet, Text, View } from "react-native"
import { ImageItem } from "../../store/reducerImagePicker";
import Animated, { Extrapolation, interpolate, SharedValue, useAnimatedStyle } from "react-native-reanimated";
import { colors } from "../../UI/theme";

interface PaginationProps {
  items: ImageItem[],
  paginationIndex: number,
  scrollX: SharedValue<number>
}

const { width} = Dimensions.get('screen');


const Pagination: React.FC<PaginationProps> = ({items, paginationIndex, scrollX}) => {
  
  
  
    return(
           <View style={styles.container}>
            {items.map((_,index) => {
                // const animationStyle = useAnimatedStyle(() => {
                //     const dotWidth = interpolate(
                //         scrollX.value,
                //         [(index - 1) * width, index * width, (index + 1) * width], 
                //         [6,12,6],
                //         Extrapolation.CLAMP
                //     );
                //     return {
                //         width: dotWidth
                //     }
                // })
                return(
                    <Animated.View 
                        style={[
                            styles.dot,
                            {backgroundColor: paginationIndex === index ? colors.titleText : colors.bodyText },
                            // animationStyle
                        ]} 
                        key={index}
                    ></Animated.View>
                )
            })}
           </View>
    )
}

export default Pagination;

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        flexDirection: 'row',
        height: 60,
        // justifyContent: 'center',
        // alignItems: 'center'
    },
    dot: {
        backgroundColor: colors.bodyText,
        height: 6,
        width: 6,
        marginHorizontal: 2,
        borderRadius: 6
    }
  
  
});