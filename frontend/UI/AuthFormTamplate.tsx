import { StyleSheet, Text, TextInput, View } from "react-native";
import Button from "./buttons/Button";
import { Link } from "expo-router";
import { colors } from "./theme";
import { User } from "../util/interfaces";

interface FromProps{
    user: User;
    onInputChange: (field: keyof User, value: string) => void;
    onSubmit: () => void;
    buttonText: string;
    linkText: string;
    linkUrl: string;
    showNameField: boolean;
}

const AuthFormTemplate: React.FC<FromProps> = ({
    user,
    onInputChange,
    onSubmit,
    buttonText,
    linkText,
    linkUrl,
    showNameField
}) =>{
    return(
    <View style={styles.container}>
      <Text>{buttonText}</Text>
      <TextInput 
        // style={}
        value={user.email} 
        onChangeText={(text) => onInputChange('email', text)}
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
        // placeholderTextColor={colors.bodyText}
        />
        <TextInput 
        // style={}
        value={user.password} 
        onChangeText={(text) => onInputChange('password', text)}
        placeholder="Password"
        secureTextEntry
        // placeholderTextColor={colors.bodyText}
        />
        { showNameField && (
            <TextInput
            // style={styles.input}
            value={user.name}
            onChangeText={(text) => onInputChange('name', text)}
            placeholder="Name"
        />
        )}
        <Button onPress={onSubmit}>{buttonText}</Button>
        <View>
            <Text>{linkText}</Text>
            <Link href={linkUrl}>{linkText === "Don't have an account?" ? "Register" : "Login"}</Link>
        </View>
    </View>
    )
}

export default AuthFormTemplate;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background, 
      alignItems: 'center',
      justifyContent: 'center',
    },
    
  });