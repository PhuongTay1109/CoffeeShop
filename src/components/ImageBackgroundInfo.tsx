/*eslint-disable*/

import React, { useState } from 'react';
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
import { useNavigation } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import getFirestore from "@react-native-firebase/firestore";

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

const ImageBackgroundInfo = (props: any) => {
  const { average_rating, name, roasted, imagelink_portrait } = props;


  const navigation = useNavigation();

  // Handle left press
  const goBackToHomePage = () => {
    navigation.navigate('Tab');
  };

  const db = getFirestore();
  const [favourite, setFavourite] = useState(props.favourite);
  const toggleFavourite = async () => {
    setFavourite(!favourite);
  }
    // try {
    //   const currentUser = auth().currentUser;
    //   if (currentUser != null) {
    //     const userEmail = currentUser.email;
    //     if (userEmail != null) {
    //       // lấy refernce tới user
    //       const userDocRef = db.collection('users').doc(userEmail);

    //       // lấy data của user
    //       const snapshot = await userDocRef.get();
    //       const userData = snapshot.data();

    //       // in ra giá trị favorite tại index đó
    //       console.log(`Giá trị của ProductsList[${props.index}].favourite:`, userData.ProductsList[props.index].favourite);

    //       // từ user lấy reference tới product list
    //       const productsListRef = userDocRef.collection('ProductsList');
    //       const productRef = productsListRef.doc(props.index.toString());
    //       // in ra giá trị favorite tại index đó
    //       console.log((await productRef.get()).data());

          // await productRef.update({
          //   favourite: favourite
          // });

          

    //       const userDocRef = db.collection('users').doc(userEmail);
    //       const snapshot = await userDocRef.get();
    //       const userData = snapshot.data();
    //       if (userData && userData.ProductsList) {
    //           if (userData.ProductsList.length > props.index) {
    //               const product = userData.ProductsList[props.index];
    //               if (product) {
    //                   const newFavoriteStatus = !product.favourite;

    //                   await userDocRef.update({
    //                       [`ProductsList.${props.index}.favourite`]: newFavoriteStatus
    //                   });

    //                   console.log(`Favorite status of product ${product.name} updated to ${newFavoriteStatus}`);
    //               } else {
    //                   console.log("No product exists at index", props.index, "in ProductsList array.");
    //               }
    //           } else {
    //               console.log("No product exists at index", props.index, "in ProductsList array.");
    //           }
    //       } else {
    //           console.log("ProductsList array does not exist in user data.");
    //       }
  //       }
  //     }
  //   } catch (error) {
  //     console.error('Error toggling favourite:', error);
  //   }
  // };


  console.log(favourite);

  return (
    <View>
      <ImageBackground
        source={imagelink_portrait}
        style={styles.ItemBackgroundImage}>
        <View style={styles.ImageHeaderBarContainerWithBack}>
          <TouchableOpacity onPress={goBackToHomePage}>
            <GradientBGIcon
              name="left"
              color={COLORS.primaryBlackHex}
              size={FONTSIZE.size_16}
            />
          </TouchableOpacity>
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