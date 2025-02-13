import React, { useState } from "react";
import { Alert, StyleSheet, TextInput, View } from "react-native";
import { colors } from "../../../../UI/theme";
import { fonts } from "../../../../UI/fonts";
import Button from "../../../../UI/buttons/Button";
import { ACTIONS } from "../../../../store/reducerImagePicker";
import { useImageContext } from "../../../../store/ImageContext";



const EditorText: React.FC = () => {
    const { state, dispatch } = useImageContext();
    const appliedColor = state.chosenColor || colors.titleText;

    const handleTextChange = (text: string) => {
        dispatch({ type: ACTIONS.SET_OVERLAY_TEXT, payload: text})
    };

     // Apply text to image
    const handleAddText = (): void => {
        if(!state.photoTaken){
            Alert.alert("Sorry!", "You need to upload a photo first.");
            return;
        }
        dispatch({ type: ACTIONS.ADD_TEXT_ON_IMAGE})
        dispatch({ type: ACTIONS.TOGGLE_EDITOR_TEXT})
    }
        

    
    return(
        <View style={styles.container}>
            <TextInput 
                style={[styles.input, {color: appliedColor}]}
                value={state.overlayText} 
                onChangeText={handleTextChange}
                placeholder="Enter your text here"
                placeholderTextColor={colors.bodyText}
                selectionColor={colors.border}
            />
            <Button textOnly onPress={handleAddText}>Add</Button>
            
            
        </View>
    )
}
export default EditorText;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center', 
        backgroundColor: colors.background,
        borderColor: colors.border,
        borderWidth: 1,
        borderRadius: 5,
        position: 'absolute',
        top: 220,
        left: 0,
        width: '100%',
        height: 'auto', 
        padding: 20,
       
    },
    input: {
        fontFamily: fonts.body,
        fontSize: 16,
        width: '60%',
        borderBottomWidth: 2,
        borderBottomColor: colors.line,
        paddingLeft: 10,
        
    }
    
    
})