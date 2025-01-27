import {FlatList, Modal, Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import Button from '../../../UI/buttons/Button';
import { SvgUri, SvgXml } from 'react-native-svg';
import { colors } from '../../../UI/theme';
import { fonts } from '../../../UI/fonts';
import { platformStyle } from '../../../UI/shadowStyle';
import Animated, { useAnimatedStyle, useSharedValue, withTiming, Easing } from 'react-native-reanimated';
import { ASSETS_SVG } from '../../../util/dataSvg';


const SvgItem = ({item, onSelect}) => {
    const scale = useSharedValue(1);

    const animatedStyle = useAnimatedStyle(() => {
        return{
            transform: [{ scale: withTiming(scale.value, { duration: 300, easing: Easing.out(Easing.cubic)})}]
        }
    })

    const pressIn = () => {
        scale.value = 0.90;
    }

    const pressOut = (item) => {
        scale.value = 1.02;
        setTimeout(() => {
            scale.value = 1;
            onSelect(item.id);
        }, 100)
    }

    const SvgComponent = item.svg;
    console.log(item);
    
    
        return (
        <Pressable 
            onPressIn={pressIn}
            onPressOut={() => pressOut(item)} 
        >
            <Animated.View style={[styles.svgContainer, animatedStyle]}>
                <SvgComponent  width={50} height={50} />
            </Animated.View>

        </Pressable>
    )
}

export default function SvgPickerModal({visible, onClose, onSelect}){
    
    const renderSvg = ({item}) => {
        return <SvgItem key={item.id} item={item} onSelect={onSelect} />
    }

    
    return(
        <Modal
            animationType='slide'
            // transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
           
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Select an illustration</Text>
                    
                        <FlatList
                            data={ASSETS_SVG}
                            keyExtractor={(item) => item.id}
                            renderItem={renderSvg}
                            contentContainerStyle={{gap: 10}}
                            columnWrapperStyle={{gap: 10}}
                            numColumns={3}
                                
                        />
                    
                        <Button textOnly onPress={onClose}>Close</Button>
                    </View>
                </View>

        

        </Modal>
    )
}

const styles = StyleSheet.create({
 
    modalContainer: {
        position: 'absolute', 
        top: 100,
        left: 30,
        backgroundColor: colors.bodyText,
        borderRadius: 5,
        width: 300,
        height: 300,
        padding: 15,
        ...platformStyle.shadow,  
    },
    modalContent: {
        alignItems: 'center',
    },
    modalTitle: {
        fontFamily: fonts.body,
        fontSize: 18,
        color: colors.titleText,
        marginBottom: 15
    },
    svgContainer: {
        borderRadius: '50%',
        backgroundColor: colors.bodyText,
        overflow: 'hidden', 
        padding: 10,   
        ...platformStyle.shadow,
        margin: 5,
        
    },
    
})

//  code for individual animation- not working as intended

// export default function SvgPicker({visible, onClose, onSelect}){
//     const scaleValues = useRef({});

//     const getAnimatedStyle = (id) => {
//         if(!scaleValues.current[id]){
//             scaleValues.current[id] = useSharedValue(1);
//         }

//         const scale = scaleValues.current[id];
//         return useAnimatedStyle(() => {
//             return{
//                 transform: [{ scale: withTiming(scale.value, { duration: 300, easing: Easing.out(Easing.cubic)})}]
//             }
//         })
//     }
    

//     const pressIn = (id) => {
//         scaleValues.current[id].value = 0.90;
//     }

//     const pressOut = (id, item) => {
//         scaleValues.current[id].value = 1.02;
//         setTimeout(() => {
//             scaleValues.current[id].value = 1;
//             onSelect(item);
//         }, 100)
//     }

//     const renderSvg = ({item}) => {
//         const animatedStyle = getAnimatedStyle(item.id);
//         return (
//         <Pressable 
//             onPressIn={() => pressIn(item.id)}
//             onPressOut={() => pressOut(item.id, item.svg)} 
//         >
//             <Animated.View style={[styles.svgContainer, animatedStyle]}>
//                 <item.svg width={50} height={50} />
//             </Animated.View>

//         </Pressable>
//     )}

    
//     return(
//         <Modal
//             animationType='slide'
//             // transparent={true}
//             visible={visible}
//             onRequestClose={onClose}
//         >
           
//                 <View style={styles.modalContainer}>
//                     <View style={styles.modalContent}>
//                         <Text style={styles.modalTitle}>Select an illustration</Text>
                    
//                         <FlatList
//                             data={ASSETS_SVG}
//                             keyExtractor={(item) => item.id}
//                             renderItem={renderSvg}
//                             contentContainerStyle={{gap: 10}}
//                             columnWrapperStyle={{gap: 10}}
//                             numColumns={3}
                                
//                         />
                    
//                         <Button textOnly onPress={onClose}>Close</Button>
//                     </View>
//                 </View>

        

//         </Modal>
//     )
// }