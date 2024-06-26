/*eslint-disable */

import React from 'react';
import {
  Dimensions,
  ImageBackground,
  ImageProps,
  //ImageSourcePropType,
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



interface CoffeeCardProps {
    id: string;
    index: number;
    type: string;
    roasted: string;
    imagelink_square: ImageProps;
    name: string;
    special_ingredient: string;
    average_rating: number;
    price: any;
    buttonPressHandler: any;
}

const CoffeeCard: React.FC<CoffeeCardProps> = ({
    id,
    index,
    type,
    roasted,
    imagelink_square,
    name,
    special_ingredient,
    average_rating,
    price,
    buttonPressHandler,
}) => {
    // console.log("image link: " + imagelink_square.uri);
    return (
            <LinearGradient
                start={{x: 0, y: 0}}
                end={{x: 1, y: 1}}
                style={styles.CardLinearGradientContainer}
                colors={[COLORS.primaryWhiteHex, COLORS.primaryWhiteHex]}>
                <ImageBackground
                    source={imagelink_square}
                    style={styles.CardImageBG}
                    resizeMode="cover">
                </ImageBackground>
                <Text style={styles.CardTitle}>{name}</Text>
                <Text style={styles.CardSubtitle}>{special_ingredient}</Text>
                <View style={styles.CardFooterRow}>
                    <Text style={styles.CardPriceCurrency}>
                        $ <Text style={styles.CardPrice}>{price.price}</Text>
                    </Text>
                    <View style={{display:'flex', flexDirection: "row"}}>
                        <CustomIcon
                            name={'star'}
                            color='#FFCB45'
                            size={FONTSIZE.size_16}
                            style={{marginRight: 5}}
                        />
                        <Text style={styles.CardRatingText}>{average_rating}</Text>
                    </View>
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
        width: 170,
        height: 270,
    },
    CardImageBG: {
        borderRadius: BORDERRADIUS.radius_20,
        marginBottom: SPACING.space_15,
        overflow: 'hidden',
        width: 140,
        height: 120
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
        fontFamily: FONTFAMILY.poppins_semibold,
        color: COLORS.primaryBlackHex,
        lineHeight: 22,
        fontSize: FONTSIZE.size_18,
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
        position: 'absolute', // Đặt vị trí tuyệt đối
        bottom: 15, // Cách bottom 15px
        left: 0, // Đặt ở vị trí bên trái
        right: 0, // Đặt ở vị trí bên phải
        paddingHorizontal: SPACING.space_15,
    },
    CardPriceCurrency: {
        fontFamily: FONTFAMILY.poppins_semibold,
        color: COLORS.primaryOrangeHex,
        fontSize: FONTSIZE.size_18,
        alignItems: 'flex-end',
    },
    CardPrice: {
        color: COLORS.primaryBlackHex,
    },
});

export default CoffeeCard;