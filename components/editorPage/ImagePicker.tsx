import { Alert, StyleSheet, Text, View } from "react-native";


import { colors } from "../../UI/theme";
import React, { useContext, useReducer, useState } from "react";
import EditorText from "./EditorText";
import ImagePreview from "./imagePreview/ImagePreview";
import TextOverlay from "./imagePreview/TextOverlay";
import SvgOverlay from "./imagePreview/SvgOverlay";
import ImageControl from "./imageControl/ImageControl";
import ColorPickerModal from "./imageControl/ColorPickerModal";
import SvgPickerModal from "./imageControl/SvgPickerModal";
import { ACTIONS} from "../../store/reducerImagePicker";
import { useImageContext } from "../../store/ImageContext";

const ImagePicker: React.FC = () => {
  
 
    // const [state, dispatch] = useReducer(reducer, initialState);
    const { state, dispatch } = useImageContext();

    const [containerWidth, setContainerWidth] = useState< number | null >(null);
    const [containerHeight, setContainerHeight] = useState< number | null >(null);
    const [rotation, setRotation ] = useState<number>(0);


    const toggleSvgModal = (): void => {
        if(!state.photoTaken){
            Alert.alert("Sorry!", "You need to upload a photo first.");
            return;
        }
        dispatch({ type: ACTIONS.TOGGLE_SVG_MODAL})
    }
           
    return(
        <View style={styles.container}>
            <View 
                style={styles.imageContainer}
                onLayout={(event) => {
                    const { width, height } = event.nativeEvent.layout;
                    setContainerWidth(width);
                    setContainerHeight(height);
                  }}
            >
              <ImagePreview />
              <TextOverlay 
                containerWidth={containerWidth}  
                containerHeight={containerHeight}
              />
              { containerWidth! > 0 && containerHeight! > 0 && (
                  <SvgOverlay 
                    containerWidth={containerWidth} 
                    containerHeight={containerHeight}
                    rotation={rotation}  
                    setRotation={setRotation}
                />
            )}
            </View>
            <ImageControl toggleModal={toggleSvgModal}/>

            {state.showColorPicker && (
                <ColorPickerModal />
            )}
            <EditorText />
            <SvgPickerModal onClose={toggleSvgModal}/>
        </View>
    )
}
export default ImagePicker;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background, 
    margin: 10,
  },
 
  imageContainer: {
    width: '100%',
    height: 300,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    marginVertical: 10,
 
  },

});
