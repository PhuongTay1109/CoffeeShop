/* eslint-disable */

import {  
    Image, 
    StyleSheet, 
    Text, 
    View, 
    TouchableOpacity } 
from "react-native";

import React, { useState } from "react";
import Input from "../components/Input";
import Button from "../components/Button";
import { COLORS, FONTFAMILY, FONTSIZE } from "../theme/theme";
import { useNavigation } from '@react-navigation/native';

const RegistrationScreen = () => {
    const navigation = useNavigation(); 

    const handleLoginPress = () => {
        navigation.navigate('Login'); 
    };

    const [isLoading, setIsLoading] =  useState(false);

    const authHandler = () => {

    };

    return (
        <View style={styles.container}>
            <View style={styles.topImageContainer}>
                <Image
                    source={require("../assets/app_images/coffee-cup.png")}
                    style={styles.topImage}
                />
            </View>
            <View style={styles.helloContainer}>
                <Text style={styles.helloText}>Coffe Shop</Text>
            </View>
            <View>
                <Text style={styles.signInText}>Sign up now for free </Text>
            </View>
            <View>
                <Input
                    id="email"
                    placeholder="Email Address"
                    placeholderTextColor={COLORS.primaryDarkGreyHex}
                />
                <Input
                    id="password"
                    placeholder="Password"
                    placeholderTextColor={COLORS.primaryDarkGreyHex}
                />
                <Button
                    title="SIGN UP"
                    onPress={authHandler}
                />
            </View>
            <View style={styles.bottomContainer}>
                <Text style={{color: COLORS.primaryLightGreyHex, 
                            fontFamily: FONTFAMILY.poppins_regular,
                            fontSize: FONTSIZE.size_16}}>
                    Already have an account ?
                </Text>
                <TouchableOpacity onPress={handleLoginPress}>
                    <Text style={{color: COLORS.primaryLightGreyHex, 
                            fontFamily: FONTFAMILY.poppins_bold,
                            paddingLeft: 5,
                            fontSize: FONTSIZE.size_16}}>
                        Login
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.primaryWhiteHex,
        flex: 1
    },
    topImageContainer: {},
    topImage: {
        width: "100%",
        height: 300,
        marginBottom: 6
    },
    helloContainer: {},
    helloText: {
        textAlign: "center",
        fontFamily: FONTFAMILY.poppins_extrabold,
        color: COLORS.primaryBlackHex,
        fontSize: 50
    },
    signInText: {
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

export default RegistrationScreen;
