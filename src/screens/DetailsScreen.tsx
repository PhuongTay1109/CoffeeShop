/*eslint-disable */

import React, { useState } from 'react';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useStore } from '../store/store';
import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
} from '../theme/theme';
import ImageBackgroundInfo from '../components/ImageBackgroundInfo';
import PaymentFooter from '../components/PaymentFooter';
import auth from '@react-native-firebase/auth';
import firebase from "@react-native-firebase/app"
import getFirestore from "@react-native-firebase/firestore";

const DetailsScreen = (props: any) => {
  const { index, id, roasted, imagelink_portrait, name, average_rating, price, description, favourite, reloadData, imagelink_square } = props.route.params;

  // State to hold the selected size
  const [selectedSize, setSelectedSize] = useState<string>('');

  // Find the price of the selected size
  const selectedPrice = price.find((sizePrice: any) => sizePrice.size === selectedSize)?.price || '0.00';

  // Function to handle adding item to cart
  const db = getFirestore();
  const addToCart = async () => {
    try {
      const currentUser = auth().currentUser;
      if (currentUser != null) {
        const userEmail = currentUser.email;
        if (userEmail != null) {
          const userDocRef = db.collection('users').doc(userEmail);
          const selectedItem = {
            id,
            index,
            name,
            size: selectedSize,
            price: selectedPrice,
            quantity: 1, 
            imagelink_square: imagelink_square,
            roasted: roasted
          };

          await userDocRef.update({
            CartList: firebase.firestore.FieldValue.arrayUnion(selectedItem)
          });

          Alert.alert('Item added to cart successfully!');
        }
      }
    } catch (error) {
      console.error('Error toggling favourite:', error);
    }
  };

  return (
    <View style={styles.ScreenContainer}>
      <StatusBar backgroundColor={COLORS.primaryBlackHex} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.ScrollViewFlex}>
        <ImageBackgroundInfo
          average_rating={average_rating}
          name={name}
          roasted={roasted}
          favourite={favourite}
          imagelink_portrait={imagelink_portrait}
          id={id}
          index={index}
          reloadData={reloadData}
        />

        <View style={styles.FooterInfoArea}>
          <Text style={styles.InfoTitle}>Description</Text>
          <TouchableWithoutFeedback>
            <Text style={styles.DescriptionText}>{description}</Text>
          </TouchableWithoutFeedback>
          <Text style={styles.InfoTitle}>Size</Text>
          <View style={styles.SizeOuterContainer}>
            {price.map((sizePrice: any) => (
              <TouchableOpacity
                key={sizePrice.size}
                style={styles.SizeBox}
                onPress={() => setSelectedSize(sizePrice.size)} // Set the selected size when pressed
              >
                <Text style={styles.SizeText}>{sizePrice.size}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        <PaymentFooter price={selectedPrice} text="ADD TO CART" onPress={addToCart} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  ScreenContainer: {
    flex: 1,
    backgroundColor: COLORS.primaryWhiteHex,
  },
  ScrollViewFlex: {
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  FooterInfoArea: {
    padding: SPACING.space_20,
  },
  InfoTitle: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_16,
    color: COLORS.primaryBlackHex,
    marginBottom: SPACING.space_10,
  },
  DescriptionText: {
    letterSpacing: 0.5,
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_14,
    color: COLORS.primaryBlackHex,
    marginBottom: SPACING.space_30,
  },
  SizeOuterContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: SPACING.space_20,
  },
  SizeBox: {
    flex: 1,
    backgroundColor: COLORS.primaryDarkGreyHex,
    alignItems: 'center',
    justifyContent: 'center',
    height: SPACING.space_24 * 2,
    borderRadius: BORDERRADIUS.radius_10,
    borderWidth: 2
  },
  SizeText: {
    fontFamily: FONTFAMILY.poppins_medium,
    color: COLORS.primaryWhiteHex
  },
});

export default DetailsScreen;