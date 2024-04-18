/*eslint-disable */

import React, { useCallback, useReducer, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image, Alert } from "react-native";
import { useNavigation } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import { COLORS, FONTFAMILY, FONTSIZE } from "../theme/theme";
import Input from "../components/Input";
import Button from "../components/Button";
import { reducer } from "../utils/FormReducers";
import { validateInput } from "../utils/FormActions";
import Icon from 'react-native-vector-icons/FontAwesome';

const isTestMode = true;
const initialState = {
    inputValues: {
        email: isTestMode ? "example@example.com" : "",
        password: isTestMode ? "******" : ""

    },
    inputValidities: {
        email: false,
        password: false
    },
    formIsValid: false,
}

const LoginScreen = () => {
    const navigation = useNavigation();

    const [isLoading, setIsLoading] = useState(false);
    const [formState, setFormState] = useReducer(reducer, initialState);
    const [hidePassword, setHidePassword] = useState(true);

    const togglePasswordVisibility = () => {
        setHidePassword(!hidePassword);
    };

    const inputChangedHandler = useCallback((inputId: any, inputValue: any) => {
        const result = validateInput(inputId, inputValue);
        setFormState({ 
            inputId, 
            validationResult: result, 
            inputValue 
        });
    }, [setFormState]);

    const authHandler = async () => {
        try {
            setIsLoading(true);
            await auth().signInWithEmailAndPassword(formState.inputValues.email, formState.inputValues.password);
            setIsLoading(false);
            navigation.navigate('Tab'); 
        } catch (error) {
            setIsLoading(false);
            Alert.alert('Your email or password are not correct!');
        }
    };

    return (
        <View style={styles.container}>
            <View>
                <Image
                    source={require("../assets/app_images/coffee-branch.jpg")}
                    style={styles.topImage}
                    resizeMode="cover"
                />                
            </View>
            <View>
                <Text style={styles.shopNameText}>Coffee Shop</Text>
                <Text style={styles.welcomeText}>Sign in to your account</Text>
            </View>
            <View>
                <Input
                    id="email"
                    placeholder="Email Address"
                    placeholderTextColor={COLORS.primaryDarkGreyHex}
                    errorText={formState.inputValidities["email"]}
                    onInputChanged={inputChangedHandler}
                />
                <View style={styles.passwordInputContainer}>
                    <Input
                        id="password"                    
                        placeholder="Password"
                        placeholderTextColor={COLORS.primaryDarkGreyHex}
                        errorText={formState.inputValidities["password"]}
                        onInputChanged={inputChangedHandler}
                        secureTextEntry={hidePassword}
                    />
                    <TouchableOpacity style={styles.toggleVisibilityIcon} onPress={togglePasswordVisibility}>
                        <Icon name={hidePassword ? 'eye-slash' : 'eye'} size={20} color={COLORS.primaryGreyHex} />
                    </TouchableOpacity>
                </View>
                <Button
                    title="LOGIN"
                    onPress={authHandler}
                />
            </View>
            <View style={styles.bottomContainer}>
                <Text style={styles.registerText}>Don't have an account ?</Text>
                <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
                    <Text style={styles.registerLink}>Register now</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.primaryWhiteHex,
        flex: 1,
    },
    topImage: {
        width: "100%",
        height: 250,
        marginBottom: 6
    },
    shopNameText: {
        textAlign: "center",        
        fontFamily: FONTFAMILY.poppins_extrabold,
        color: COLORS.primaryBlackHex,
        fontSize: 50,
        textShadowColor: "white",
    },
    welcomeText: {
        textAlign: "center",
        fontSize: FONTSIZE.size_20,
        fontFamily: FONTFAMILY.poppins_regular
    },
    btn: {
        width: "90%",
        marginVertical: 8
    },
    bottomContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: 'center',
        marginVertical: 2
    },
    registerText: {
        color: COLORS.primaryLightGreyHex, 
        fontFamily: FONTFAMILY.poppins_regular,
        fontSize: FONTSIZE.size_16
    },
    registerLink: {
        color: COLORS.primaryLightGreyHex, 
        fontFamily: FONTFAMILY.poppins_bold,
        paddingLeft: 5,
        fontSize: FONTSIZE.size_16
    },
    passwordInputContainer: {
        position: 'relative'
    },
    toggleVisibilityIcon: {
        position: 'absolute',
        top: '50%',
        right: 50,
        transform: [{ translateY: -20}]
    },
});

export default LoginScreen;
