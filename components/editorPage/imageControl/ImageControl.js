import { StyleSheet, View } from "react-native";
import { colors } from "../../../UI/theme";
import IconButton from "../../../UI/buttons/IconButton";

export default function ImageControl({pickImage, toggleColorPicker, toggleModal}){
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
                    icon='add-circle' 
                    size={24} 
                    color={colors.bodyText} 
                    onPress={toggleModal}
                />
            </View>
    )
}

const styles = StyleSheet.create({
 
  imageButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    columnGap: 10,
    marginVertical: 10,
  },
});
