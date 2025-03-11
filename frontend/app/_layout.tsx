import { Stack } from "expo-router";
import { AuthContextProvider, useAuth } from "../store/AuthContext";
import TabsLayout from "./(tabs)/_layout";

const Layout = () => {
    return (
        <AuthContextProvider>
            <Stack screenOptions={{
                headerShown: false
            }}>
                <Stack.Screen name="(tabs)" />
            </Stack>
        </AuthContextProvider>
    );
};

export default Layout;