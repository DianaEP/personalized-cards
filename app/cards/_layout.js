import { Stack } from "expo-router";
import { colors } from "../../UI/theme";

export default function Layout(){
    return(
        <Stack>
            <Stack.Screen name="index" options={{
                title: 'Your Cards',
                headerStyle: {
                    backgroundColor: colors.background
                },
                headerTintColor: colors.titleText,
            }} />
            <Stack.Screen name="[cardId]" options={{
                title: 'Card id',
                headerStyle: {
                    backgroundColor: colors.background
                },
                headerTintColor: colors.titleText,
            }} />
        </Stack>
    )
}