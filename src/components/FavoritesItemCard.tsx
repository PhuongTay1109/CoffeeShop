/*eslint-disable */
import {StyleSheet, Text, View, ImageProps} from 'react-native';
import React from 'react';
import ImageBackgroundInfo from './ImageBackgroundInfo';
import LinearGradient from 'react-native-linear-gradient';
import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
} from '../theme/theme';

const FavoritesItemCard = (props: any) => {
  const {id, index, imagelink_portrait, name, average_rating, roasted, description, favourite, special_ingredient} = props;
  return (
    <View style={styles.CardContainer}>
       <ImageBackgroundInfo
          average_rating={average_rating}
          name={name}
          roasted={roasted}
          favourite={favourite}
          imagelink_portrait={imagelink_portrait}
          id={id}
          index={index}
          removeFavourite={props.removeFavourite}
          showLeftIcon={false}
          special_ingredient={special_ingredient}
        />
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
        colors={[COLORS.primaryGreyHex, COLORS.primaryBlackHex]}
        style={styles.ContainerLinearGradient}>
        <Text style={styles.DescriptionTitle}>Description</Text>
        <Text style={styles.DescriptionText} numberOfLines={3}>{description}</Text>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  CardContainer: {
    borderRadius: BORDERRADIUS.radius_25,
    overflow: 'hidden',
    marginTop: 20,
    marginBottom: 20
  },
  ContainerLinearGradient: {
    gap: SPACING.space_10,
    padding: SPACING.space_20,
  },
  DescriptionTitle: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_16,
    color: COLORS.secondaryLightGreyHex,
  },
  DescriptionText: {
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_14,
    color: COLORS.primaryWhiteHex,
  },
});

export default FavoritesItemCard;