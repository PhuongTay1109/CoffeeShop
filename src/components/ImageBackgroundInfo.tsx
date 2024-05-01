/*eslint-disable*/

import React, { useEffect, useState } from 'react';
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
import { useNavigation, NavigationProp } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import getFirestore from "@react-native-firebase/firestore";

const ImageBackgroundInfo = (props: any) => {
  const { average_rating, name, roasted, imagelink_portrait } = props;


  const navigation: NavigationProp<any> = useNavigation();

  // Handle left press
  const goBackToHomePage = () => {
    navigation.navigate('Tab');
    props.reloadData();
  };

  const db = getFirestore();
  const [favourite, setFavourite] = useState(props.favourite);
  const toggleFavourite = async () => {
    setFavourite(!favourite);

    try {
      const currentUser = auth().currentUser;
      if (currentUser != null) {
        const userEmail = currentUser.email;
        if (userEmail != null) {
          const userDocRef = db.collection('users').doc(userEmail);
          const snapshot = await userDocRef.get();
          const userData = snapshot.data();
          if (userData) {
            const productsList = userData.ProductsList;

            let updatedProduct = productsList[props.index];
            const favouriteProp = updatedProduct.favourite;
            updatedProduct.favourite = !favouriteProp;

            const updatedProductsList = [...productsList];

            await userDocRef.update({
              [`ProductsList`]: updatedProductsList
            });

            if (props.removeFavourite) {
              console.log(props.removeFavourite);
              props.removeFavourite();
            }
          }
        }
      }
    } catch (error) {
      console.error('Error toggling favourite:', error);
    }
  };

  return (
    <View>
      <ImageBackground
        source={imagelink_portrait}
        style={styles.ItemBackgroundImage}>
        <View style={styles.ImageHeaderBarContainerWithBack}>
          {props.showLeftIcon && (
            <TouchableOpacity onPress={goBackToHomePage}>
              <GradientBGIcon
                name="left"
                color={COLORS.primaryBlackHex}
                size={FONTSIZE.size_16}
              />
            </TouchableOpacity>
          )}
          <TouchableOpacity onPress={toggleFavourite}>
            <GradientBGIcon
              name='like'
              color={favourite ? 'red' : COLORS.primaryBlackHex}
              size={FONTSIZE.size_16}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.ImageInfoOuterContainer}>
          <View style={styles.ImageInfoInnerContainer}>
            <View style={styles.InfoContainerRow}>
              <View>
                <Text style={styles.ItemTitleText}>{name}</Text>
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
                <Text style={styles.RatingText}>{average_rating}</Text>
              </View>
              <View style={styles.RoastedContainer}>
                <Text style={styles.RoastedText}>{roasted}</Text>
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