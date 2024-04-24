import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ImageProps,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import GradientBGIcon from './GradientBGIcon';
import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
} from '../theme/theme';
import CustomIcon from './CustomIcon';

// interface ImageBackgroundInfoProps {
//   EnableBackHandler: boolean;
//   imagelink_portrait: ImageProps;
//   type: string;
//   id: string;
//   favourite: boolean;
//   name: string;
//   special_ingredient: string;
//   ingredients: string;
//   average_rating: number;
//   ratings_count: string;
//   roasted: string;
//   BackHandler?: any;
//   ToggleFavourite: any;
// }

const ImageBackgroundInfo = () => {
  return (
    <View>
      <ImageBackground
        source={require('../assets/coffee_assets/americano/portrait/americano_pic_1_portrait.jpg')}
        style={styles.ItemBackgroundImage}>
            <View style={styles.ImageHeaderBarContainerWithBack}>
                <TouchableOpacity>
                <GradientBGIcon
                    name="left"
                    color={COLORS.primaryBlackHex}
                    size={FONTSIZE.size_16}
                />
                </TouchableOpacity>
                <TouchableOpacity>
                <GradientBGIcon
                    name="like"
                    color={
                        COLORS.primaryBlackHex 
                    }
                    size={FONTSIZE.size_16}
                />
                </TouchableOpacity>
            </View>

            <View style={styles.ImageInfoOuterContainer}>
                <View style={styles.ImageInfoInnerContainer}>
                    <View style={styles.InfoContainerRow}>
                    <View>
                        <Text style={styles.ItemTitleText}>Americano</Text>
                        <Text style={styles.ItemSubtitleText}>
                        Iced
                        </Text>
                    </View>
                    </View>
                    <View style={styles.InfoContainerRow}>
                    <View style={styles.RatingContainer}>
                        <CustomIcon
                        name={'star'}
                        color='yellow'
                        size={FONTSIZE.size_20}
                        />
                        <Text style={styles.RatingText}>4.7</Text>
                        <Text style={styles.RatingCountText}>(123)</Text>
                    </View>
                    <View style={styles.RoastedContainer}>
                        <Text style={styles.RoastedText}>Medium</Text>
                    </View>
                    </View>
                </View>
                </View>
            </ImageBackground>
        </View>
  );
};

const styles = StyleSheet.create({
  ItemBackgroundImage: {
    width: '100%',
    aspectRatio: 20 / 25,
    justifyContent: 'space-between',
  },
  ImageHeaderBarContainerWithBack: {
    padding: SPACING.space_30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  ImageHeaderBarContainerWithoutBack: {
    padding: SPACING.space_30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  ImageInfoOuterContainer: {
    paddingVertical: SPACING.space_24,
    paddingHorizontal: SPACING.space_30,
    backgroundColor: 'rgba(256,256,265, 0.5)',
    borderTopLeftRadius: BORDERRADIUS.radius_20 * 2,
    borderTopRightRadius: BORDERRADIUS.radius_20 * 2,
  },
  ImageInfoInnerContainer: {
    justifyContent: 'space-between',
    gap: SPACING.space_15,
  },
  InfoContainerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  ItemTitleText: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_24,
    color: COLORS.primaryBlackHex,
  },
  ItemSubtitleText: {
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_12,
    color: COLORS.primaryBlackHex,
  },
  ItemPropertiesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.space_20,
  },
  ProperFirst: {
    height: 55,
    width: 55,
    borderRadius: BORDERRADIUS.radius_15,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.primaryBlackHex,
  },
  PropertyTextFirst: {
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_10,
    color: COLORS.primaryBlackHex,
  },
  PropertyTextLast: {
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_10,
    color: COLORS.primaryBlackHex,
    marginTop: SPACING.space_2 + SPACING.space_4,
  },
  RatingContainer: {
    flexDirection: 'row',
    gap: SPACING.space_10,
    alignItems: 'center',
  },
  RatingText: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_18,
    color: COLORS.primaryBlackHex,
  },
  RatingCountText: {
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_12,
    color: COLORS.primaryBlackHex,
  },
  RoastedContainer: {
    height: 55,
    width: 55 * 2 + SPACING.space_20,
    borderRadius: BORDERRADIUS.radius_15,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.primaryOrangeHex,
  },
  RoastedText: {
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_10,
    color: COLORS.primaryWhiteHex,
  },
});

export default ImageBackgroundInfo;