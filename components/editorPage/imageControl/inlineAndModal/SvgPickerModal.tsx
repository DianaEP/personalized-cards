import {FlatList, Modal, Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import Button from '../../../../UI/buttons/Button';
import { colors } from '../../../../UI/theme';
import { fonts } from '../../../../UI/fonts';
import { platformStyle } from '../../../../UI/shadowStyle';
import Animated, { useAnimatedStyle, useSharedValue, withTiming, Easing } from 'react-native-reanimated';
import { ASSETS_SVG, AssetSvg } from '../../../../util/dataSvg';
import React from 'react';
import { ACTIONS } from '../../../../store/reducerImagePicker';
import { useImageContext } from '../../../../store/ImageContext';


interface SvgItemProps {
    item: AssetSvg;
    onSelect: (id: string) => void;
}

const SvgItem: React.FC<SvgItemProps> = ({item, onSelect}) => {  
    const scale = useSharedValue(1);

    const animatedStyle = useAnimatedStyle(() => {
        return{
            transform: [{ scale: withTiming(scale.value, { duration: 300, easing: Easing.out(Easing.cubic)})}]
        }
    })

    const pressIn = () => {
        scale.value = 0.90;
    }

    const pressOut = (item: AssetSvg) => {
        scale.value = 1.02;
        setTimeout(() => {
            scale.value = 1;
            onSelect(item.id);
        }, 100)
    }

    const SvgComponent = item.svg;
   
    
    
    
        return (
        <Pressable 
            onPressIn={pressIn}
            onPressOut={() => pressOut(item)} 
        >
            <Animated.View style={[styles.svgContainer, animatedStyle]}>
                <SvgComponent  width={50} height={50} color={colors.line}/>
            </Animated.View>

        </Pressable>
    )
}

interface SvgPickerModalProps {
    onClose : () => void;
}

const SvgPickerModal: React.FC<SvgPickerModalProps> = ({onClose}) => {
    const { state, dispatch} = useImageContext();
    
    const handleSvgSelect = (id: string): void => {
        dispatch({ type: ACTIONS.SELECT_SVG_ID, payload: id})
    }
    const renderSvg = ({ item }: { item: AssetSvg }) => {
        return <SvgItem key={item.id} item={item} onSelect={handleSvgSelect} />
    }

    
    return(
        <Modal
            animationType='slide'
            transparent={true}
            visible={state.showSvgModal}
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
export default SvgPickerModal;

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

