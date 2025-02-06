import { Tabs } from "expo-router";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import AntDesign from '@expo/vector-icons/AntDesign';
import { colors } from "../UI/theme";
import { StyleSheet } from "react-native";
import { fonts, useCustomFonts } from "../UI/fonts";
import React from "react";


const Layout: React.FC = () => {

    const fontsLoaded = useCustomFonts();

    if (!fontsLoaded) {
        return null; 
      }

    return(
            <Tabs screenOptions={{ 
                tabBarActiveTintColor: colors.titleText,
                tabBarInactiveTintColor: colors.bodyText,
                tabBarStyle: {
                    backgroundColor: colors.border
                },
                tabBarLabelStyle: {
                    fontFamily: fonts.body,
                },
                headerStyle: {
                    backgroundColor: colors.background
                },
                headerTintColor: colors.titleText,
                headerTitleStyle: {
                    fontFamily: fonts.title,
                    fontSize: 24,
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


        
    )
}
export default Layout;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    }
})