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
import EmptyListAnimation from '../components/EmptyListAnimation';
import HeaderBar from '../components/HeaderBar';
import auth from '@react-native-firebase/auth';
import getFirestore from "@react-native-firebase/firestore";
import { useFocusEffect } from '@react-navigation/native';
import { useNavigation, NavigationProp } from '@react-navigation/native';


interface CartItem {
    id: string;
    imagelink_square: string;
    index: number;
    name: string;
    price: number;
    roasted: string;
    special_ingredient: string;
    quantity: number;
    size: string;
}

const CartScreen = ({ route }: { route: any }) => {
    const tabBarHeight = useBottomTabBarHeight();
    const navigation: NavigationProp<any> = useNavigation();

    const [totalPrice, setTotalPrice] = useState<number>(0);

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

                            const totalPrice = data.reduce((acc, item) => {
                                return acc + (item.price * item.quantity);
                            }, 0);
                            setTotalPrice(totalPrice);
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

    const handleQuantity = () => {
        fetchCartItems();
    }

    useFocusEffect(
        React.useCallback(() => {
            fetchCartItems();
        }, [])
    );

    const pay = () => {
        navigation.navigate('Payment');
     }

    if (!cartItems) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color={COLORS.primaryOrangeHex} />
                <Text style={styles.loadingText}>Loading...</Text>
            </View>
        );
    }

    console.log(cartItems);

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
                        {cartItems.length === 0 ? (
                            <EmptyListAnimation title={'Cart is Empty'}  />
                        ) : (
                            <View style={styles.ListItemContainer}>
                                {cartItems.map((item) => {                                
                                    return (
                                        <TouchableOpacity key={item.id + item.size}>
                                            <CartItem
                                                id={item.id}
                                                imagelink_square={item.imagelink_square}
                                                index={item.index}
                                                name={item.name}
                                                price={item.price}
                                                quantity={item.quantity}
                                                roasted={item.roasted}
                                                size={item.size}
                                                onQuantityChange={handleQuantity}
                                            />
                                        </TouchableOpacity>
                                    );
                                })}
                            </View>
                        )}
                    </View>
                    {cartItems.length != 0 ? (
                        <PaymentFooter price={totalPrice.toFixed(2)} text="PAY" onPress={pay} />
                        ) : (
                        <></>
                    )}
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
