import {StyleSheet, Text, View, ImageProps, Image} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
} from '../theme/theme';


const OrderItemCard = () => {
  return (
    <LinearGradient
      start={{x: 0, y: 0}}
      end={{x: 1, y: 1}}
      colors={[COLORS.primaryWhiteHex, COLORS.primaryWhiteHex]}
      style={styles.CardLinearGradient}>
      <View style={styles.CardInfoContainer}>
        <View style={styles.CardImageInfoContainer}>
          <Image source={require("../assets/coffee_assets/americano/square/americano_pic_1_square.png")} style={styles.Image} />
          <View>
            <Text style={styles.CardTitle}>Americano</Text>
            <Text style={styles.CardSubtitle}>With Steamed Milk</Text>
          </View>
        </View>
        <View>
          <Text style={styles.CardCurrency}>
            $ <Text style={styles.CardPrice}>4.20</Text>
          </Text>
        </View>
      </View>
        <View style={styles.CardTableRow}>
          <View style={styles.CardTableRow}>
            <View style={styles.SizeBoxLeft}>
              <Text style={styles.SizeText}>
                S
              </Text>
            </View>
            <View style={styles.PriceBoxRight}>
              <Text style={styles.PriceCurrency}>
                $
                <Text style={styles.Price}> 4.20</Text>
              </Text>
            </View>
          </View>

          <View style={styles.CardTableRow}>
            <Text style={styles.CardQuantityPriceText}>
              X <Text style={styles.Quantity}>2</Text>
            </Text>
            <Text style={styles.CardQuantityPriceText}>
              8.40
            </Text>
          </View>
        </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  CardLinearGradient: {
    gap: SPACING.space_20,
    padding: SPACING.space_20,
    borderRadius: BORDERRADIUS.radius_25,
    elevation: 10, // Tăng độ nâng của shadow
    shadowColor: COLORS.primaryBlackHex, // Màu shadow
    shadowOffset: { width: 0, height: 2}, // Offset của shadow
    shadowOpacity: 0.5, // Độ trong suốt của shadow
    shadowRadius: 1,
    marginBottom: 10
  },
  CardInfoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  CardImageInfoContainer: {
    flexDirection: 'row',
    gap: SPACING.space_20,
    alignItems: 'center',
  },
  Image: {
    height: 90,
    width: 90,
    borderRadius: BORDERRADIUS.radius_15,
  },
  CardTitle: {
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_18,
    color: COLORS.primaryBlackHex,
  },
  CardSubtitle: {
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_12,
    color: COLORS.secondaryLightGreyHex,
  },
  CardCurrency: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_20,
    color: COLORS.primaryOrangeHex,
  },
  CardPrice: {
    color: COLORS.primaryBlackHex,
  },
  CardTableRow: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  SizeBoxLeft: {
    backgroundColor: COLORS.primaryBlackHex,
    height: 45,
    flex: 1,
    borderTopLeftRadius: BORDERRADIUS.radius_10,
    borderBottomLeftRadius: BORDERRADIUS.radius_10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRightWidth: 1,
    borderRightColor: COLORS.primaryGreyHex,
  },
  SizeText: {
    fontFamily: FONTFAMILY.poppins_medium,
    color: COLORS.primaryWhiteHex,
    fontSize: FONTSIZE.size_18,
  },
  PriceBoxRight: {
    backgroundColor: COLORS.primaryBlackHex,
    height: 45,
    flex: 1,
    borderTopRightRadius: BORDERRADIUS.radius_10,
    borderBottomRightRadius: BORDERRADIUS.radius_10,
    justifyContent: 'center',
    alignItems: 'center',
    borderLeftWidth: 1,
    borderLeftColor: COLORS.primaryGreyHex,
  },
  PriceCurrency: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_18,
    color: COLORS.primaryOrangeHex,
  },
  Price: {
    color: COLORS.primaryWhiteHex,
  },
  Quantity: {
    color: COLORS.primaryBlackHex
  },
  CardQuantityPriceText: {
    flex: 1,
    textAlign: 'center',
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_18,
    color: COLORS.primaryOrangeHex,
  },
});

export default OrderItemCard;