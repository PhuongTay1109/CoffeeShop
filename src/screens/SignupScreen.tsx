/* eslint-disable */

import {
    Image,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Platform,
    KeyboardAvoidingView,
    ScrollView,
    TouchableWithoutFeedback,
    Keyboard,
    Alert,
}
    from "react-native";

import React, { useCallback, useReducer, useState } from "react";
import Input from "../components/Input";
import Button from "../components/Button";
import { COLORS, FONTFAMILY, FONTSIZE } from "../theme/theme";
import { useNavigation } from '@react-navigation/native';
import { reducer } from "../utils/FormReducers";
import { validateInput } from "../utils/FormActions";
import { SafeAreaView } from "react-native-safe-area-context";
import auth from '@react-native-firebase/auth';
import Icon from 'react-native-vector-icons/FontAwesome';
import getFirestore from "@react-native-firebase/firestore";
import CoffeeData from "../data/CoffeeData";

const isTestMode = true;
const initialState = {
    inputValues: {
        email: isTestMode ? "example@example.com" : "",
        password: isTestMode ? "******" : "",
        username: "",
    },
    inputValidities: {
        email: false,
        password: false
    },
    formIsValid: false,
}

const SignupScreen = () => {
    const navigation = useNavigation();
    const [isLoading, setIsLoading] = useState(false);
    const [formState, setFormState] = useReducer(reducer, initialState);
    const [hidePassword, setHidePassword] = useState(true);

    const togglePasswordVisibility = () => {
        setHidePassword(!hidePassword);
    };

    const inputChangedHandler = useCallback((inputId: any, inputValue: any) => {
        // Không validate cho trường username
        if (inputId !== 'username') {
            const result = validateInput(inputId, inputValue);
            setFormState({
                inputId,
                validationResult: result,
                inputValue
            });
        } else {
            setFormState({
                inputId,
                validationResult: true,
                inputValue
            });
        }
    }, [setFormState])

    const authHandler = async () => {
        try {
            setIsLoading(true);
            await auth().createUserWithEmailAndPassword(
                formState.inputValues.email,
                formState.inputValues.password
            );
            await auth().currentUser.updateProfile({
                displayName: formState.inputValues.username
            });

            // Thêm document mới cho người dùng trong Firestore
            const userEmail = formState.inputValues.email;
            const userDocRef = getFirestore().collection('users').doc(userEmail); // Sử dụng email làm id cho document
            await userDocRef.set({
                ProductsList: CoffeeData 
            });

            setIsLoading(false);
            navigation.navigate('Login');
        } catch (error: any) {
            setIsLoading(false);
            if (error.code === 'auth/email-already-in-use') {
                Alert.alert('That email address is already in use!');
            }
            Alert.alert(error);
        }
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{ flex: 1 }}
            enabled={Platform.OS === 'ios'}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <SafeAreaView style={styles.container}>
                    <View>
                        <Image
                            source={require("../assets/app_images/coffee-branch.jpg")}
                            style={styles.topImage}
                            resizeMode="cover"
                        />
                    </View>
                    <View>
                        <Text style={styles.shopNameText}>Coffee Shop</Text>
                        <Text style={styles.welcomeText}>Sign up now for free</Text>
                    </View>
                    <View>
                        <Input
                            id="username"
                            placeholder="Username"
                            placeholderTextColor={COLORS.primaryDarkGreyHex}
                            onInputChanged={inputChangedHandler}
                        />
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
                            title="SIGN UP"
                            onPress={authHandler}
                        />
                    </View>
                    <View style={styles.bottomContainer}>
                        <Text style={{
                            color: COLORS.primaryLightGreyHex,
                            fontFamily: FONTFAMILY.poppins_regular,
                            fontSize: FONTSIZE.size_16
                        }}>
                            Already have an account ?
                        </Text>
                        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                            <Text style={{
                                color: COLORS.primaryLightGreyHex,
                                fontFamily: FONTFAMILY.poppins_bold,
                                paddingLeft: 5,
                                fontSize: FONTSIZE.size_16
                            }}>
                                Login
                            </Text>
                        </TouchableOpacity>
                    </View>
                </SafeAreaView>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.primaryWhiteHex,
        flex: 1
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

export default SignupScreen;
