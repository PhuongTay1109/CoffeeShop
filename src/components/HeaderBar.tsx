/*eslint-disable */
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { COLORS, FONTFAMILY, SPACING } from '../theme/theme';
import auth from '@react-native-firebase/auth';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';

interface HeaderBarProps {
    title?: string;
}

const HeaderBar: React.FC<HeaderBarProps> = ({ title }) => {
    const navigation = useNavigation();
    const [showLogout, setShowLogout] = useState(false);

    const user = auth().currentUser;
    const username = user ? user.displayName : '';
    
    const handleLogout = () => {
        auth()
            .signOut()
            .then(() => navigation.navigate('Login'));
    };

    return (
        <View style={styles.HeaderContainer}>
            <Text style={styles.HeaderText}>{title}</Text>
            <View style={styles.UsernameContainer}>
                <TouchableOpacity onPress={() => setShowLogout(!showLogout)}>
                    <View style={styles.UsernameTextContainer}>
                        <Text style={styles.UsernameText}>{username}</Text>
                        <Icon name="caret-down" size={14} color="#fff" />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleLogout}>
                    <Text style={[styles.LogoutText, !showLogout && styles.hidden]}>Logout</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    HeaderContainer: {
        padding: SPACING.space_30,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    HeaderText: {
        fontFamily: FONTFAMILY.poppins_semibold,
        fontSize: 26,
        color: COLORS.primaryWhiteHex,
    },
    UsernameContainer: {
        flexDirection: 'column',
        alignItems: 'flex-end',
        marginTop: 20
    },
    UsernameTextContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    UsernameText: {
        fontFamily: FONTFAMILY.poppins_medium,
        fontSize: 14,
        color: COLORS.primaryWhiteHex,
        marginRight: 5,
    },
    LogoutText: {
        fontFamily: FONTFAMILY.poppins_medium,
        fontSize: 14,
        color: COLORS.primaryBlackHex,
        marginLeft: 5,
        paddingHorizontal: 20,
        backgroundColor: COLORS.primaryWhiteHex,
        borderRadius: 5,
        paddingVertical:2,
    },
    hidden: {
        opacity: 0
    }
});

export default HeaderBar;