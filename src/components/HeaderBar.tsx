/*eslint-disable */
import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {COLORS, FONTFAMILY, SPACING} from '../theme/theme';
import auth from '@react-native-firebase/auth';
import Icon from 'react-native-vector-icons/FontAwesome';

interface HeaderBarProps {
  title?: string;
}

const user = auth().currentUser;
const username = user ? user.displayName : '';

const HeaderBar: React.FC<HeaderBarProps> = () => {
    return (
        <View style={styles.HeaderContainer}>
            <Text style={styles.HeaderText}>COFFEE SHOP</Text>
            <Text style={styles.Username}>
                <Icon name="caret-down" size={14} color="#fff"/>
                {' '}
                {username}
            </Text>
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
    Username: {
        fontFamily: FONTFAMILY.poppins_medium,
        fontSize: 14,
        color: COLORS.primaryWhiteHex,
        textAlign: 'right'
    }
});

export default HeaderBar;