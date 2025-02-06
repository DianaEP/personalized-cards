import { StyleSheet, View } from "react-native";
import { colors } from "../../../UI/theme";
import IconButton from "../../../UI/buttons/IconButton";
import React from "react";

interface ImageControlProps {
    pickImage: (fromCamera?: boolean) => Promise<void>; 
    toggleColorPicker: () => void; 
    toggleModal: () => void; 
    switchTarget: () => void;
}

const ImageControl: React.FC<ImageControlProps> = ({pickImage, toggleColorPicker, toggleModal, switchTarget}) => {
    return(
        <View style={styles.imageButtons}>
                <IconButton 
                    icon='camera' 
                    size={24} 
                    color={colors.bodyText} 
                    onPress={() => pickImage(true)}
                />
                <IconButton 
                    icon="image" 
                    size={24} 
                    color={colors.bodyText} 
                    onPress={() => pickImage(false)}
                />
                <IconButton 
                    icon='color-palette' 
                    size={24} 
                    color={colors.bodyText} 
                    onPress={toggleColorPicker}
                />
                <IconButton 
                    icon='swap-horizontal' 
                    size={24} 
                    color={colors.bodyText} 
                    onPress={switchTarget}
                />
                 <IconButton 
                    icon='add-circle' 
                    size={24} 
                    color={colors.bodyText} 
                    onPress={toggleModal}
                />
            </View>
    )
}
export default ImageControl;

const styles = StyleSheet.create({
 
  imageButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    columnGap: 10,
    marginVertical: 10,
  },
});
