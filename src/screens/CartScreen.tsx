/*eslint-disable */
import React from 'react';
import {
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
} from 'react-native';
import { useStore } from '../store/store';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { COLORS, SPACING } from '../theme/theme';
import PaymentFooter from '../components/PaymentFooter';
import CartItem from '../components/CartItem';
import EmptyListAnimation from '../components/EmpyListAnimation';
import HeaderBar from '../components/HeaderBar';

const CartScreen = () => {
    const tabBarHeight = useBottomTabBarHeight();
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
                            <TouchableOpacity >
                                <CartItem />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <PaymentFooter />
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
        marginTop:20,
        paddingHorizontal: SPACING.space_20,
        gap: SPACING.space_20,
    },
})

export default CartScreen
