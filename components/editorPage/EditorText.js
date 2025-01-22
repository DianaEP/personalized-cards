import { useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";
import { colors } from "../../UI/theme";
import { fonts } from "../../UI/fonts";
import IconButton from "../../UI/buttons/IconButton";
import Button from "../../UI/buttons/Button";



export default function EditorText({chosenColor, onAdd, overlayText, setOverlayText}){
    
    const appliedColor = chosenColor || colors.titleText;

    const handleTextChange = (text) => {
        console.log("Text Changed:", text);
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