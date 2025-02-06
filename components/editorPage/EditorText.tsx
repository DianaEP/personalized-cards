import React, { useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";
import { colors } from "../../UI/theme";
import { fonts } from "../../UI/fonts";
import Button from "../../UI/buttons/Button";

interface EditorTextProps {
    chosenColor: string;  
    onAdd: () => void;
    overlayText: string; 
    setOverlayText: (text: string) => void;
}

const EditorText: React.FC<EditorTextProps> = ({chosenColor, onAdd, overlayText, setOverlayText}) => {
    
    const appliedColor = chosenColor || colors.titleText;

    const handleTextChange = (text: string) => {
        // console.log("Text Changed:", text);
        setOverlayText(text); 
    };

    return(
        <View style={styles.container}>
            <TextInput 
                style={[styles.input, {color: appliedColor}]}
                value={overlayText} 
                onChangeText={handleTextChange}
                placeholder="Enter your text here"
                placeholderTextColor={colors.bodyText}
                selectionColor={colors.border}
            />
            <Button textOnly onPress={onAdd}>Add</Button>
            
            
        </View>
    )
}
export default EditorText;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center', 
       
    },
    input: {
        fontFamily: fonts.body,
        fontSize: 16,
        width: '60%',
        borderBottomWidth: 2,
        borderBottomColor: colors.line,
        paddingLeft: 10,
        
    },
    
    
})