
import { Pressable } from "react-native";


export default function LinkButton({ onPress, children}){
    return(
        <Pressable onPress={onPress} style={({pressed}) => [styles.button, pressed && styles.pressed]}> 
           
        </Pressable>
        
    )
}

