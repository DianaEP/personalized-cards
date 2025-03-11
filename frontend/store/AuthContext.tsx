import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { getProtectedData } from "../util/http/protectedApi";
import { login, register } from "../util/http/authApi";
import { User } from "../util/interfaces";



interface UserContextType{
    user: Omit<User, 'password'> | null;
    token: string | null;
    registerUser: (user: User) => Promise<void>;
    loginUser: (user: User) => Promise<void>;
    logout: () => Promise<void>;
}

export const AuthContext =  createContext<UserContextType | undefined>(undefined);
export  const AuthContextProvider: React.FC<{children: ReactNode}> = ({children}) => {
    const [user, setUser] = useState<Omit<User, 'password'> | null>(null);
    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {
        const fetchAuthData = async () => {
            const storedToken = await AsyncStorage.getItem('token');
            if(storedToken){
                setToken(storedToken);
                try{
                    const data = await getProtectedData();
                    setUser(data.user)
                }catch(error){
                    console.log('Error fetching protected data:', error);
                }
            }
        }
        fetchAuthData();
    },[])

    const registerUser = async (user: User) => {
        try{
            const { token } = await register(user);
            await AsyncStorage.setItem('token', token);
            setToken(token);

            const data = await getProtectedData();
            setUser(data.user);
        }catch(error){
            console.error('Error logging in', error);
        }
    }

    const loginUser = async (user: User) => {
        try{
            const { token } = await login(user);
            await AsyncStorage.setItem('token', token);
            setToken(token);

            const data = await getProtectedData();
            setUser(data.user);
        }catch(error){
            console.error('Error logging in', error);
        }
    }

    const logout = async () => {
        await AsyncStorage.removeItem('token');
        setUser(null); 
        setToken(null);
    }
    return(
        <AuthContext.Provider value={{user, token, registerUser, loginUser, logout}}>{children}</AuthContext.Provider>
    )
}

export const useAuth = (): UserContextType => {
    const context = useContext(AuthContext);
    if(!context){
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}