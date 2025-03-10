import AsyncStorage from "@react-native-async-storage/async-storage";
import axiosInstance from "./axiosInstance";

interface User{
    name?: string;
    email: string;
    password: string;

}



export const register = async( user: User) => {
    try{
        if (!user.email || !user.password || !user.name) {
            throw new Error("All fields are required!");
        }
        const response = await axiosInstance.post('/auth/register', user);

        if(response.data.token){
            await AsyncStorage.setItem('token', response.data.token)
        }
        return response.data;
    }catch(error){
        console.error("Error registering user", error);
        throw error;
    }
}

export const login = async( user: User) => {
    try{
        
        const response = await axiosInstance.post('/auth/login', user);
        if(response.data.token){
            await AsyncStorage.setItem('token', response.data.token)
        }
        return response.data;
    }catch(error){
        console.error("Error registering user", error);
        throw error;
    }
}