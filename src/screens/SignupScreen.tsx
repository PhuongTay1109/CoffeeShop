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

const SignupScreen = () => {
    const navigation = useNavigation();

    const [isLoading, setIsLoading] = useState(false);
    const [formState, setFormState] = useReducer(reducer, initialState);

    const inputChangedHandler = useCallback((inputId: any, inputValue: any) => {
        const result = validateInput(inputId, inputValue);
        setFormState({ 
            inputId, 
            validationResult: result, 
            inputValue });
    }, [setFormState])

    const authHandler = async () => {
        try {
            setIsLoading(true);
            // Đăng ký người dùng mới sử dụng email và mật khẩu
            await auth().createUserWithEmailAndPassword(formState.inputValues.email, formState.inputValues.password);
            setIsLoading(false);
            // Chuyển hướng sau khi đăng ký thành công
            navigation.navigate('Login'); // Chuyển hướng đến trang đăng nhập
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
            style={{flex: 1}}
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
                            id="email"
                            placeholder="Email Address"
                            placeholderTextColor={COLORS.primaryDarkGreyHex}
                            errorText={formState.inputValidities["email"]}
                            onInputChanged={inputChangedHandler}
                        />
                        <Input
                            id="password"
                            placeholder="Password"
                            placeholderTextColor={COLORS.primaryDarkGreyHex}
                            errorText={formState.inputValidities["password"]}
                            onInputChanged={inputChangedHandler}
                        />
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
    }
});

export default SignupScreen;
