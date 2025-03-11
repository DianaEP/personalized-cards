import { StyleSheet, Text, TextInput, View } from "react-native";
import { colors } from "../../UI/theme";
import { useState } from "react";
import Button from "../../UI/buttons/Button";
import { Link } from "expo-router";
import AuthFormTemplate from "../../UI/AuthFormTamplate";
import { User } from "../../util/interfaces";



const Login: React.FC = () =>  {
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

    const handleSubmit = () => {
        console.log(user);
        
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


