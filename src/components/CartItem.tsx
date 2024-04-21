import React from 'react';
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


const CartItem = () => {
    return (
        <View>
            <View>
                <LinearGradient
                start={{x: 0, y: 0}}
                end={{x: 1, y: 1}}
                colors={[COLORS.primaryWhiteHex, COLORS.primaryWhiteHex]}
                style={styles.CartItemLinearGradient}>
                <View style={styles.CartItemRow}>
                    <Image source={require("../assets/coffee_assets/americano/square/americano_pic_1_square.jpg")} style={styles.CartItemImage} />
                    <View style={styles.CartItemInfo}>
                    <View>
                        <Text style={styles.CartItemTitle}>Americano</Text>
                        <Text style={styles.CartItemSubtitle}>
                        With Steamed Milk
                        </Text>
                    </View>
                    <View style={styles.CartItemRoastedContainer}>
                        <Text style={styles.CartItemRoastedText}>Medium Roasted</Text>
                    </View>
                    </View>
                </View>
                    <View style={styles.CartItemSizeRowContainer}>
                    <View style={styles.CartItemSizeValueContainer}>
                        <View style={styles.SizeBox}>
                            <Text style={[styles.SizeText,{ fontSize: FONTSIZE.size_16,},]}>
                                S
                            </Text>
                        </View>
                        <Text style={styles.SizeCurrency}>
                        $
                        <Text style={styles.SizePrice}>
                        4.20
                        </Text>
                        </Text>
                    </View>
                    <View style={styles.CartItemSizeValueContainer}>
                        <TouchableOpacity style={styles.CartItemIcon}>
                        <CustomIcon
                            name="minus"
                            color={COLORS.primaryWhiteHex}
                            size={FONTSIZE.size_10}
                        />
                        </TouchableOpacity>
                        <View style={styles.CartItemQuantityContainer}>
                            <Text style={styles.CartItemQuantityText}>
                                1
                            </Text>
                        </View>
                        <TouchableOpacity style={styles.CartItemIcon}>
                            <CustomIcon
                                name="add"
                                color={COLORS.primaryWhiteHex}
                                size={FONTSIZE.size_10}
                            />
                        </TouchableOpacity>
                    </View>
                    </View>

                </LinearGradient>
            </View>
            <View>
            <LinearGradient
            start={{x: 0, y: 0}}
            end={{x: 1, y: 1}}
            colors={[COLORS.primaryWhiteHex, COLORS.primaryWhiteHex]}
            style={styles.CartItemLinearGradient}>
            <View style={styles.CartItemRow}>
                <Image source={require("../assets/coffee_assets/americano/square/americano_pic_1_square.jpg")} style={styles.CartItemImage} />
                <View style={styles.CartItemInfo}>
                <View>
                    <Text style={styles.CartItemTitle}>Americano</Text>
                    <Text style={styles.CartItemSubtitle}>
                    With Steamed Milk
                    </Text>
                </View>
                <View style={styles.CartItemRoastedContainer}>
                    <Text style={styles.CartItemRoastedText}>Medium Roasted</Text>
                </View>
                </View>
            </View>
                <View style={styles.CartItemSizeRowContainer}>
                <View style={styles.CartItemSizeValueContainer}>
                    <View style={styles.SizeBox}>
                    <Text style={[styles.SizeText,{ fontSize: FONTSIZE.size_16,},]}>
                        S
                    </Text>
                    </View>
                    <Text style={styles.SizeCurrency}>
                    $
                    <Text style={styles.SizePrice}>
                    4.20
                    </Text>
                    </Text>
                </View>
                <View style={styles.CartItemSizeValueContainer}>
                    <TouchableOpacity style={styles.CartItemIcon}>
                    <CustomIcon
                        name="minus"
                        color={COLORS.primaryWhiteHex}
                        size={FONTSIZE.size_10}
                    />
                    </TouchableOpacity>
                    <View style={styles.CartItemQuantityContainer}>
                    <Text style={styles.CartItemQuantityText}>
                        1
                    </Text>
                    </View>
                    <TouchableOpacity style={styles.CartItemIcon}>
                    <CustomIcon
                        name="add"
                        color={COLORS.primaryWhiteHex}
                        size={FONTSIZE.size_10}
                    />
                    </TouchableOpacity>
                </View>
                </View>

            </LinearGradient>
            </View>
        </View>
        
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
        shadowOffset: { width: 0, height: 2}, // Offset của shadow
        shadowOpacity: 0.5, // Độ trong suốt của shadow
        shadowRadius: 1,
        marginBottom: 10
    },
    CartItemRow: {
        flexDirection: 'row',
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
});

export default CartItem;