import {FlatList, Modal, Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import Button from '../../UI/buttons/Button';
import { SvgUri, SvgXml } from 'react-native-svg';
import BalletSvg from '../../assets/svg/ballet.svg';
import BirthdaySvg from '../../assets/svg/birthday.svg';
import CoffeeSvg from '../../assets/svg/coffee.svg';
import MeditatingSvg from '../../assets/svg/meditating.svg';
import PlantSvg from '../../assets/svg/plant.svg';
import WeddingSvg from '../../assets/svg/wedding.svg';
import { colors } from '../../UI/theme';
import { fonts } from '../../UI/fonts';
import { platformStyle } from '../../UI/shadowStyle';
import Animated, { useAnimatedStyle, useSharedValue, withTiming, Easing } from 'react-native-reanimated';

const ASSETS_SVG = [
    { id: '1', svg: BalletSvg },
    { id: '2', svg: BirthdaySvg },
    { id: '3', svg: CoffeeSvg }, 
    { id: '4', svg: MeditatingSvg },
    { id: '5', svg: PlantSvg },
    { id: '6', svg: WeddingSvg },
];

export default function SvgPicker({visible, onClose, onSelect}){
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
            onSelect(item);
        }, 100)
    }

    const renderSvg = ({item}) => (
        <Pressable 
            onPressIn={pressIn}
            onPressOut={() => pressOut(item.svg)} 
        >
            <Animated.View style={[styles.svgContainer, animatedStyle]}>
                <item.svg width={50} height={50} />
            </Animated.View>

        </Pressable>
    )

    
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