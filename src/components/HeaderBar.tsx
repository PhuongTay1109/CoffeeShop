/*eslint-disable */
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { COLORS, FONTFAMILY, SPACING } from '../theme/theme';
import auth from '@react-native-firebase/auth';
import Icon from 'react-native-vector-icons/EvilIcons';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import CustomIcon from './CustomIcon';

interface HeaderBarProps {
    title?: string;
}

const HeaderBar: React.FC<HeaderBarProps> = ({ title }) => {
    const navigation: NavigationProp<any> = useNavigation();

    
    const infor = () => {
        navigation.navigate('Infor');
    };

    return (
        <View style={styles.HeaderContainer}>
            <Text style={styles.HeaderText}>{title}</Text>
            <TouchableOpacity onPress={infor}>
                <View style={{marginBottom:15}}>
                    <Image source={require('../assets/app_images/avatar.png')} style={styles.image}/>
                </View>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    HeaderContainer: {
        padding: SPACING.space_30,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: COLORS.primaryBlackHex,
    },
    HeaderText: {
        fontFamily: FONTFAMILY.poppins_semibold,
        fontSize: 26,
        color: COLORS.primaryOrangeHex,
    },
    hidden: {
        opacity: 0
    },
    image: {
        width: 40,
        height: 40,
        marginTop: 10
    }
});

export default HeaderBar;