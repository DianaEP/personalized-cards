import { Tabs } from "expo-router";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import AntDesign from '@expo/vector-icons/AntDesign';
import { colors } from "../UI/theme";
import { Platform, StyleSheet } from "react-native";
import { fonts, useCustomFonts } from "../UI/fonts";
import React from "react";
import { ImageContextProvider } from "../store/ImageContext";
import { height } from "../util/screenDimension";


const Layout: React.FC = () => {

    const fontsLoaded = useCustomFonts();

    if (!fontsLoaded) {
        return null; 
      }

    return(
        <ImageContextProvider>
            <Tabs screenOptions={{ 
                tabBarActiveTintColor: colors.titleText,
                tabBarInactiveTintColor: colors.bodyText,
                tabBarStyle: {
                    backgroundColor: colors.background,
                    height: height > 620 ? 70 : 55,
                    paddingTop: height > 620 ? 5 : 0,
                },
                tabBarLabelStyle: {
                    fontFamily: fonts.body,
                    fontSize: height > 620 ? 12 : 11,
                },
                headerStyle: {
                    backgroundColor: colors.background,
                    
                },
                headerTintColor: colors.titleText,
                headerTitleStyle: {
                    fontFamily: fonts.title,
                    fontSize: height > 620 ? 26 : 24,
                    marginTop: Platform.OS === 'android' ? (height > 620 ? 10 : 5 ) : 0,
                },
                
            }}>

                <Tabs.Screen name='index' options={{
                    title: 'Home',
                    tabBarIcon: ({color, size}) => <AntDesign name="home" size={size} color={color} />
                }}/>
                <Tabs.Screen name='editor' options={{
                    title: 'Editor',
                    tabBarIcon: ({color, size}) => <MaterialCommunityIcons name="image-edit-outline" size={size} color={color} />
                }}/>
                <Tabs.Screen name='cards' options={{
                    title: 'Your Cards',
                    headerShown: false,
                    tabBarIcon: ({color, size}) => <MaterialCommunityIcons name="cards-outline" size={size} color={color} />
                }}/>
            </Tabs>
        </ImageContextProvider>

        
    )
}
export default Layout;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    }
})