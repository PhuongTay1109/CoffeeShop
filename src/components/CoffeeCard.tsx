import React from 'react';
import {
  Dimensions,
  ImageBackground,
  ImageProps,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
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
import BGIcon from './BGIcon';

const CARD_WIDTH = Dimensions.get('window').width * 0.32;

// interface CoffeeCardProps {
//   id: string;
//   index: number;
//   type: string;
//   roasted: string;
//   imagelink_square: ImageProps;
//   name: string;
//   special_ingredient: string;
//   average_rating: number;
//   price: any;
//   buttonPressHandler: any;
// }

const CoffeeCard = () => {
    return (
            <LinearGradient
                start={{x: 0, y: 0}}
                end={{x: 1, y: 1}}
                style={styles.CardLinearGradientContainer}
                colors={[COLORS.primaryWhiteHex, COLORS.primaryWhiteHex]}>
                <ImageBackground
                    source={require("../assets/coffee_assets/americano/square/americano_pic_1_square.png")}
                    style={styles.CardImageBG}
                    resizeMode="cover">
                    <View style={styles.CardRatingContainer}>
                    <CustomIcon
                        name={'star'}
                        color={COLORS.primaryOrangeHex}
                        size={FONTSIZE.size_16}
                    />
                    <Text style={styles.CardRatingText}>4.2</Text>
                    </View>
                </ImageBackground>
                <Text style={styles.CardTitle}>Americano</Text>
                <Text style={styles.CardSubtitle}>With Foam</Text>
                <View style={styles.CardFooterRow}>
                    <Text style={styles.CardPriceCurrency}>
                    $ <Text style={styles.CardPrice}>4.20</Text>
                    </Text>
                    <TouchableOpacity>
                    <BGIcon
                        color={COLORS.primaryWhiteHex}
                        name={'add'}
                        BGColor={COLORS.primaryOrangeHex}
                        size={FONTSIZE.size_10}
                    />
                    </TouchableOpacity>
                </View>
            </LinearGradient>
    );
};

const styles = StyleSheet.create({
    CardLinearGradientContainer: {
        padding: SPACING.space_15,
        borderRadius: BORDERRADIUS.radius_25,
        elevation: 10, // Tăng độ nâng của shadow
        shadowColor: COLORS.primaryBlackHex, // Màu shadow
        shadowOffset: { width: 0, height: 2}, // Offset của shadow
        shadowOpacity: 0.5, // Độ trong suốt của shadow
        shadowRadius: 1, // Bán kính của shadow
    },
    CardImageBG: {
        width: CARD_WIDTH,
        height: CARD_WIDTH,
        borderRadius: BORDERRADIUS.radius_20,
        marginBottom: SPACING.space_15,
        overflow: 'hidden',
    },
    CardRatingContainer: {
        flexDirection: 'row',
        backgroundColor: COLORS.primaryBlackRGBA,
        alignItems: 'center',
        justifyContent: 'center',
        gap: SPACING.space_10,
        paddingHorizontal: SPACING.space_15,
        position: 'absolute',
        borderBottomLeftRadius: BORDERRADIUS.radius_20,
        borderTopRightRadius: BORDERRADIUS.radius_20,
        top: 0,
        right: 0,
    },
    CardRatingText: {
        fontFamily: FONTFAMILY.poppins_medium,
        color: COLORS.primaryWhiteHex,
        lineHeight: 22,
        fontSize: FONTSIZE.size_14,
    },
    CardTitle: {
        fontFamily: FONTFAMILY.poppins_medium,
        color: COLORS.primaryBlackHex,
        fontSize: FONTSIZE.size_16,
    },
    CardSubtitle: {
        fontFamily: FONTFAMILY.poppins_light,
        color: COLORS.primaryBlackHex,
        fontSize: FONTSIZE.size_10,
    },
    CardFooterRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: SPACING.space_15,
    },
    CardPriceCurrency: {
        fontFamily: FONTFAMILY.poppins_semibold,
        color: COLORS.primaryOrangeHex,
        fontSize: FONTSIZE.size_18,
    },
    CardPrice: {
        color: COLORS.primaryBlackHex,
    },
});

export default CoffeeCard;