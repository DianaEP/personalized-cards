import { Pressable, StyleSheet, Text } from "react-native";
import { colors } from "../theme";
import { fonts } from "../fonts";

export default function Button({children, onPress}){
    return(
        <Pressable onPress={onPress} style={({pressed}) => [styles.button, pressed && styles.pressed]}>
            <Text style={styles.text}>{children}</Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: colors.primary,
        borderRadius: 5,
        padding: 10,
        width: '90%',
        margin: 15,

    },
    pressed: {
        opacity: 0.7,
    },
    text: {
        color: colors.titleText,
        fontFamily: fonts.body,
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center'
    }
})