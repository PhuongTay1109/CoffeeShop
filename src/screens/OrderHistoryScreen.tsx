/*eslint-disable */
import {
    ActivityIndicator,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useStore } from '../store/store';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import {
    BORDERRADIUS,
    COLORS,
    FONTFAMILY,
    FONTSIZE,
    SPACING,
} from '../theme/theme';
import HeaderBar from '../components/HeaderBar';
import OrderHistoryCard from '../components/OrderHistoryCard';
import auth from '@react-native-firebase/auth';
import getFirestore from "@react-native-firebase/firestore";
import { useFocusEffect } from '@react-navigation/native';

interface OrderHistory {
    orderItems: any,
    totalAmount: number,
    orderTime: any
}

const OrderHistoryScreen = () => {
    const tabBarHeight = useBottomTabBarHeight();

    const db = getFirestore();
    const [orderHistoryList, setOrderHistoryList] = useState<OrderHistory[] | null>(null);

    const fetchOrderHistoryList = async () => {
        try {
            const currentUser = auth().currentUser;
            if (currentUser != null) {
                const userEmail = currentUser.email;
                if (userEmail != null) {
                    const userDocRef = db.collection('users').doc(userEmail);
                    const doc = await userDocRef.get();
                    if (doc.exists) {
                        const userData = doc.data();
                        if (userData && userData.OrderHistoryList) {
                            const data: OrderHistory[] = userData.OrderHistoryList;
                            data.reverse();
                            setOrderHistoryList(data);
                        }
                    } else {
                        console.log('No such document!');
                    }
                }
            }
        } catch (error) {
            console.error('Error fetching order history:', error);
            setOrderHistoryList(null);
        }
    };

    useEffect(() => {
        fetchOrderHistoryList();
    }, []);

    useFocusEffect(
        React.useCallback(() => {
            fetchOrderHistoryList();
        }, [])
    );

    if (!orderHistoryList) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color={COLORS.primaryOrangeHex} />
                <Text style={styles.loadingText}>Loading...</Text>
            </View>
        );
    }

    console.log(orderHistoryList);

    return (
        <View style={styles.ScreenContainer}>
            <StatusBar backgroundColor={COLORS.primaryBlackHex} />

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.ScrollViewFlex}>
                <View
                    style={[styles.ScrollViewInnerView, { marginBottom: tabBarHeight }]}>
                    <View style={styles.ItemContainer}>
                        <HeaderBar title="Order History" />
                        <View style={styles.ListItemContainer}>
                            {orderHistoryList.map((item: any) => {
                                return (
                                    <View key={item.index}>
                                        <OrderHistoryCard 
                                            orderItems={item.orderItems}
                                            totalAmount={item.totalAmount}
                                            orderTime={item.orderTime}                                    
                                        />
                                    </View>
                                );
                            })}                            
                        </View>
                    </View>
                    <TouchableOpacity>
                        <Text style={styles.ButtonText}>Download</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    ScreenContainer: {
        flex: 1,
        backgroundColor: COLORS.primaryWhiteHex,
    },
    LottieAnimation: {
        height: 250,
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
        gap: SPACING.space_30,
    },
    DownloadButton: {
        margin: SPACING.space_20,
        backgroundColor: COLORS.primaryOrangeHex,
        alignItems: 'center',
        justifyContent: 'center',
        height: SPACING.space_36 * 2,
        borderRadius: BORDERRADIUS.radius_20,
    },
    ButtonText: {
        fontFamily: FONTFAMILY.poppins_semibold,
        fontSize: FONTSIZE.size_18,
        color: COLORS.primaryWhiteHex,
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

export default OrderHistoryScreen
