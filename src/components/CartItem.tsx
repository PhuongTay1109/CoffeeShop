    /*eslint-disable */
    import React, {useEffect, useState} from 'react';
    import {
    StyleSheet,
    Text,
    View,
    ImageProps,
    Image,
    TouchableOpacity,
    } from 'react-native';
    import LinearGradient from 'react-native-linear-gradient';
    import {
    BORDERRADIUS,
    COLORS,
    FONTFAMILY,
    FONTSIZE,
    SPACING,
    } from '../theme/theme';
    import CustomIcon from './CustomIcon';
    import auth from '@react-native-firebase/auth';
    import getFirestore from '@react-native-firebase/firestore';
    import Icon from 'react-native-vector-icons/FontAwesome';

    const CartItem = (props: any) => {
    const {
        id,
        imagelink_square,
        name,
        price,
        roasted,
        special_ingredient,
        quantity,
        size,
        onQuantityChange,
    } = props;

    useEffect(() => {
        setItemQuantity(quantity);
    }, [quantity]);

    const [itemQuantity, setItemQuantity] = useState(quantity);

    const [itemPrice, setItemPrice] = useState(
        Number((price * quantity).toFixed(2)),
    );

    const db = getFirestore();

    const updateCartQuantity = async (newQuantity: number) => {
        setItemQuantity(newQuantity);
        setItemPrice(Number((price * newQuantity).toFixed(2)));

        try {
        const currentUser = auth().currentUser;
        if (currentUser != null) {
            const userEmail = currentUser.email;
            if (userEmail != null) {
            const userDocRef = db.collection('users').doc(userEmail);
            const snapshot = await userDocRef.get();
            const userData = snapshot.data();
            if (userData) {
                let cartList = userData.CartList || [];
                const foundIndex = cartList.findIndex(
                (item: any) => item.id === id && item.size === size,
                );
                cartList[foundIndex].quantity = newQuantity;
                await userDocRef.update({
                CartList: cartList,
                });
            }
            }
        }
        } catch (error) {
        console.error('Error updating quantity of product:', error);
        }
    };

    const increaseQuantity = async () => {
        await updateCartQuantity(itemQuantity + 1);
        onQuantityChange();
    };

    const decreaseQuantity = async () => {
        if (itemQuantity > 1) {
        await updateCartQuantity(itemQuantity - 1);
        onQuantityChange();
        }
    };

    const removeItemFromCart = async () => {
        try {
        const currentUser = auth().currentUser;
        if (currentUser != null) {
            const userEmail = currentUser.email;
            if (userEmail != null) {
            const userDocRef = db.collection('users').doc(userEmail);
            const snapshot = await userDocRef.get();
            const userData = snapshot.data();
            if (userData) {
                let cartList = userData.CartList || [];
                const updatedCartList = cartList.filter(
                (item: any) => !(item.id === id && item.size === size),
                );
                await userDocRef.update({
                CartList: updatedCartList,
                });
                onQuantityChange();
            }
            }
        }
        } catch (error) {
        console.error('Error removing item from cart:', error);
        }
    };

    return (
        <TouchableOpacity activeOpacity={1}>
            <LinearGradient
            start={{x: 0, y: 0}}
            end={{x: 1, y: 1}}
            colors={[COLORS.primaryWhiteHex, COLORS.primaryWhiteHex]}
            style={styles.CartItemLinearGradient}>
            <View style={styles.CartItemRow}>
                <Image source={imagelink_square} style={styles.CartItemImage} />
                <View style={styles.CartItemInfo}>
                <View>
                    <Text style={styles.CartItemTitle}>{name}</Text>
                    <Text style={styles.CartItemSubtitle}>{special_ingredient}</Text>
                </View>
                <View style={styles.CartItemRoastedContainer}>
                    <Text style={styles.CartItemRoastedText}>{roasted}</Text>
                </View>
                </View>
                <View>
                <TouchableOpacity
                    style={[styles.TrashIconContainer, styles.CartItemIcon]}
                    onPress={removeItemFromCart}>
                    <Icon name="remove" size={20} color={COLORS.primaryWhiteHex} />
                </TouchableOpacity>
                </View>
            </View>
            <View style={styles.CartItemSizeRowContainer}>
                <View style={styles.CartItemSizeValueContainer}>
                <View style={styles.SizeBox}>
                    <Text style={[styles.SizeText, {fontSize: FONTSIZE.size_16}]}>
                    {size}
                    </Text>
                </View>
                <Text style={styles.SizeCurrency}>
                    $<Text style={styles.SizePrice}>{itemPrice}</Text>
                </Text>
                </View>
                <View style={styles.CartItemSizeValueContainer}>
                <TouchableOpacity
                    style={styles.CartItemIcon}
                    onPress={decreaseQuantity}>
                    <CustomIcon
                    name="minus"
                    color={COLORS.primaryWhiteHex}
                    size={FONTSIZE.size_10}
                    />
                </TouchableOpacity>
                <View style={styles.CartItemQuantityContainer}>
                    <Text style={styles.CartItemQuantityText}>{itemQuantity}</Text>
                </View>
                <TouchableOpacity
                    style={styles.CartItemIcon}
                    onPress={increaseQuantity}>
                    <CustomIcon
                    name="add"
                    color={COLORS.primaryWhiteHex}
                    size={FONTSIZE.size_10}
                    />
                </TouchableOpacity>
                </View>
            </View>
            </LinearGradient>
        </TouchableOpacity>
    );
    };

    const styles = StyleSheet.create({
    CartItemLinearGradient: {
        flex: 1,
        gap: SPACING.space_12,
        padding: SPACING.space_12,
        borderRadius: BORDERRADIUS.radius_25,
        elevation: 10, // Tăng độ nâng của shadow
        shadowColor: COLORS.primaryBlackHex, // Màu shadow
        shadowOffset: {width: 0, height: 2}, // Offset của shadow
        shadowOpacity: 0.5, // Độ trong suốt của shadow
        shadowRadius: 1,
        marginBottom: 10,
    },
    CartItemRow: {
        flexDirection: 'row',
        marginBottom: 10,
        gap: SPACING.space_12,
        flex: 1,
    },
    CartItemImage: {
        height: 130,
        width: 130,
        borderRadius: BORDERRADIUS.radius_20,
    },
    CartItemInfo: {
        flex: 1,
        paddingVertical: SPACING.space_4,
        justifyContent: 'space-between',
    },
    CartItemTitle: {
        fontFamily: FONTFAMILY.poppins_medium,
        fontSize: FONTSIZE.size_18,
        color: COLORS.primaryBlackHex,
    },
    CartItemSubtitle: {
        fontFamily: FONTFAMILY.poppins_regular,
        fontSize: FONTSIZE.size_12,
        color: COLORS.secondaryLightGreyHex,
    },
    CartItemRoastedContainer: {
        height: 50,
        width: 50 * 2 + SPACING.space_20,
        borderRadius: BORDERRADIUS.radius_15,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.primaryDarkGreyHex,
    },
    CartItemRoastedText: {
        fontFamily: FONTFAMILY.poppins_regular,
        fontSize: FONTSIZE.size_10,
        color: COLORS.primaryWhiteHex,
    },
    CartItemSizeRowContainer: {
        flex: 1,
        alignItems: 'center',
        gap: SPACING.space_20,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    CartItemSizeValueContainer: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    SizeBox: {
        backgroundColor: COLORS.primaryBlackHex,
        height: 40,
        width: 90,
        borderRadius: BORDERRADIUS.radius_10,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: SPACING.space_8,
    },
    SizeText: {
        fontFamily: FONTFAMILY.poppins_medium,
        color: COLORS.primaryWhiteHex,
    },
    SizeCurrency: {
        fontFamily: FONTFAMILY.poppins_semibold,
        fontSize: FONTSIZE.size_18,
        color: COLORS.primaryOrangeHex,
    },
    SizePrice: {
        color: COLORS.primaryBlackHex,
    },
    CartItemIcon: {
        backgroundColor: COLORS.primaryOrangeHex,
        padding: SPACING.space_12,
        borderRadius: BORDERRADIUS.radius_10,
    },
    CartItemQuantityContainer: {
        backgroundColor: COLORS.primaryWhiteHex,
        width: 70,
        borderRadius: BORDERRADIUS.radius_10,
        borderWidth: 2,
        borderColor: COLORS.primaryOrangeHex,
        alignItems: 'center',
        paddingVertical: SPACING.space_4,
        marginHorizontal: SPACING.space_4,
    },
    CartItemQuantityText: {
        fontFamily: FONTFAMILY.poppins_semibold,
        fontSize: FONTSIZE.size_16,
        color: COLORS.primaryBlackHex,
    },
    CartItemSingleLinearGradient: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: SPACING.space_12,
        gap: SPACING.space_12,
        borderRadius: BORDERRADIUS.radius_25,
    },
    CartItemSingleImage: {
        height: 150,
        width: 150,
        borderRadius: BORDERRADIUS.radius_20,
    },
    CartItemSingleInfoContainer: {
        flex: 1,
        alignSelf: 'stretch',
        justifyContent: 'space-around',
    },
    CartItemSingleSizeValueContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
    CartItemSingleQuantityContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
    TrashIconContainer: {
        position: 'absolute',
        top: 0,
        right: 0,
        marginBottom: 30,
    },
    TrashText: {
        color: COLORS.primaryWhiteHex,
        fontSize: 15,
        fontWeight: 'bold',
    },
    });

    export default CartItem;
