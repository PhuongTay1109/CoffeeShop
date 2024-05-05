import React from 'react'
import { View,Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import Icon from 'react-native-vector-icons/EvilIcons'
import { COLORS, FONTFAMILY, FONTSIZE } from '../theme/theme'
import GradientBGIcon from '../components/GradientBGIcon'
import { NavigationProp, useNavigation } from '@react-navigation/native'
import auth from '@react-native-firebase/auth';

function InforScreen() {
    const navigation: NavigationProp<any> = useNavigation();
    const handleLogout = () => {
        auth()
            .signOut()
            .then(() => navigation.navigate('Login'));
    };
    return (
        <View style={styles.inforContainer}>
            <View style={styles.header}>
                <View style={styles.background}>
                    <TouchableOpacity onPress={() => navigation.navigate('Home')} style={styles.back}>
                        <GradientBGIcon
                            name="left"
                            color={COLORS.primaryBlackHex}
                            size={FONTSIZE.size_16}
                        />
                    </TouchableOpacity>
                </View>
                <View>
                    <Image source={require('../assets/app_images/avatar.png')} style={styles.image}/>
                </View>
                <View>
                    <Text style={styles.name}>Name</Text>
                </View>
                <View>
                    <Text style={styles.email}>email@gmail.com</Text>
                </View>
            </View>
            <View style={styles.footer}>
                <TouchableOpacity style={styles.icon} >
                    <Icon name='heart' size={40} color={COLORS.primaryOrangeHex}/>
                    <Text style={styles.text}>Favourites</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.icon} >
                    <Icon name='cart' size={40} color={COLORS.primaryOrangeHex}/>
                    <Text style={styles.text}>Cart</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.icon} >
                    <Icon name='bell' size={40} color={COLORS.primaryOrangeHex}/>
                    <Text style={styles.text}>Order History</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.logout} onPress={handleLogout}>
                    <Icon name='redo' size={40} color={COLORS.primaryOrangeHex}/>
                    <Text style={styles.text}>Logout</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    inforContainer: {flex: 1},
    header: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
    },
    footer: {flex: 1},
    icon: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        borderBottomWidth: 1,
        paddingBottom: 20,
        paddingLeft: 20,
    },
    background: {
        backgroundColor: COLORS.primaryBlackHex,
        height: 180,
        position: 'absolute',
        width: '100%',
        top: 0,
    },
    name: {
        fontFamily: FONTFAMILY.poppins_bold,
        fontSize: 23,
        color: COLORS.primaryBlackHex,
    },
    email: {
        fontFamily: FONTFAMILY.poppins_light,
        fontSize: 16,
        color: COLORS.primaryBlackHex,
    },
    text: {
        fontFamily: FONTFAMILY.poppins_regular,
        fontSize: 16,
        color: COLORS.primaryBlackHex,
        marginTop:10,
        paddingLeft:10
    },
    logout: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        paddingBottom: 20,
        paddingLeft: 20,
    },
    image: {
        height:150,
        width:150,
        borderRadius: 50,
        marginTop: 60,
        marginBottom: 20,
    },
    back: {
        width: 38,
        height: 50,
        marginLeft: 20,
        marginTop: 20,
        alignItems: 'center',
        justifyContent: 'center',
    }
});

export default InforScreen