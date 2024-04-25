/*eslint-disable */
import React, { useEffect, useState } from 'react';
import {
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ActivityIndicator,
} from 'react-native';
import { useStore } from '../store/store';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../theme/theme';
import PaymentFooter from '../components/PaymentFooter';
import CartItem from '../components/CartItem';
import EmptyListAnimation from '../components/EmpyListAnimation';
import HeaderBar from '../components/HeaderBar';
import { Float, Int32 } from 'react-native/Libraries/Types/CodegenTypes';
import auth from '@react-native-firebase/auth';
import getFirestore from "@react-native-firebase/firestore";
import { useFocusEffect } from '@react-navigation/native';

interface CartItem {
    id: string;
    imagelink_square: string;
    index: number;
    name: string;
    price: Float;
    roasted: string;
    special_ingredient: string;
    quantity: Int32
}

const CartScreen = () => {
    const tabBarHeight = useBottomTabBarHeight();

    const db = getFirestore();
    const [cartItems, setCartItems] = useState<CartItem[] | null>(null);

    const fetchCartItems = async () => {
        try {
            const currentUser = auth().currentUser;
            if (currentUser != null) {
                const userEmail = currentUser.email;
                if (userEmail != null) {
                    const userDocRef = db.collection('users').doc(userEmail);
                    const doc = await userDocRef.get();
                    if (doc.exists) {
                        const userData = doc.data();
                        if (userData && userData.CartList) {
                            const data: CartItem[] = userData.CartList;
                            setCartItems(data);
                        }
                    } else {
                        console.log('No such document!');
                    }
                }
            }
        } catch (error) {
            console.error('Error fetching coffee data:', error);
            setCartItems(null);
        }
    };

    useEffect(() => {
        fetchCartItems();
    }, []);

    console.log(cartItems);

    useFocusEffect(
        React.useCallback(() => {
            fetchCartItems();
        }, [])
    );

    const pay = () => { }

    if (!cartItems) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color={COLORS.primaryOrangeHex} />
                <Text style={styles.loadingText}>Loading...</Text>
            </View>
        );
    }
 
    return (
        <View style={styles.ScreenContainer}>
            <StatusBar backgroundColor={COLORS.primaryBlackHex} />
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.ScrollViewFlex}>
                <View
                    style={[styles.ScrollViewInnerView, { marginBottom: tabBarHeight }]}>
                    <View style={styles.ItemContainer}>
                        <HeaderBar title="Cart" />
                        <View style={styles.ListItemContainer}>
                            {cartItems.map((item, index) => (
                                <TouchableOpacity key={index}>
                                    <CartItem {...item} />
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>
                    <PaymentFooter price='0.00' text="PAY" onPress={pay} />
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    ScreenContainer: {
        flex: 1,
        backgroundColor: COLORS.primaryWhiteHex,
    },
    ScrollViewFlex: {
        flexGrow: 1,
    },
    ScrollViewInnerView: {
        flex: 1,
        justifyContent: 'space-between',
    },
    ItemContainer: {
        flex: 1,
    },
    ListItemContainer: {
        marginTop: 20,
        paddingHorizontal: SPACING.space_20,
        gap: SPACING.space_20,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingText: {
        marginTop: SPACING.space_10,
        fontFamily: FONTFAMILY.poppins_regular,
        fontSize: FONTSIZE.size_16,
        color: COLORS.primaryDarkGreyHex,
    }
})

export default CartScreen
