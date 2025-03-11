import { StyleSheet, Text, TextInput, View } from "react-native";
import { colors } from "../../UI/theme";
import { useState } from "react";
import Button from "../../UI/buttons/Button";
import { Link, useRouter } from "expo-router";
import AuthFormTemplate from "../../UI/AuthFormTamplate";
import { User } from "../../util/interfaces";
import { useAuth } from "../../store/AuthContext";



const Login: React.FC = () =>  {
    const router = useRouter();
    const { loginUser } = useAuth();
    const [user, setUser] = useState<User>({
        email: '',
        password: ''
    })

    const handleInputChange = (field: keyof User, value: string) => { // keyof User to ensure that the field passed to the handler (field: keyof User) is one of the keys in the User interface
        setUser((prevData) => ({
            ...prevData,
            [field]: value
        })
    )}

    const handleSubmit = async () => {
        await loginUser(user);
        router.push('/(tabs)');
        
    }
  
  return (
    <AuthFormTemplate
        user={user}
        onInputChange={handleInputChange}
        onSubmit={handleSubmit}
        buttonText="Login"
        linkText="Don't have an account?"
        linkUrl="/register"
        showNameField={false}
    />
  );
}
export default Login;


