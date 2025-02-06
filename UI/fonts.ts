import { useFonts } from 'expo-font';
import { Lora_400Regular } from '@expo-google-fonts/lora';
import { Roboto_400Regular } from '@expo-google-fonts/roboto';
import { useEffect } from 'react';
import * as SplashScreen from 'expo-splash-screen';

type FontsType = {
    title: string;
    body: string;
}

export const fonts: FontsType ={
    title: 'Lora_400Regular',
    body: 'Roboto_400Regular',
}

export const useCustomFonts = (): boolean => { // (): boolean means it returns a boolean value
    const [fontsLoaded] = useFonts({
        Roboto_400Regular,
        Lora_400Regular,
    })

    useEffect(() => {
        if(fontsLoaded){

            SplashScreen.hideAsync();
        }else{
           
            SplashScreen.preventAutoHideAsync();
        }
    }, [fontsLoaded])

    return fontsLoaded;
    
}
