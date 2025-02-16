import LottieView from "lottie-react-native";
import { StyleSheet } from "react-native";

const PostcardsAnimation: React.FC = () =>{
    return(
        <LottieView
            source={require("../../assets/animations/postcards.json")}
            autoPlay
            loop={false}
            style={styles.container}
            speed={0.8}
        />
    )
}

export default PostcardsAnimation;

const styles = StyleSheet.create({
    container:{
        // flex: 1,
        width: '100%',
        height: 300  
    }
})